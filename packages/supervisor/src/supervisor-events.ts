/**
 * @file packages/supervisor/src/supervisor-events.ts
 * @description Event emission, log buffer management, and lifecycle coordination for supervisor.
 * @module @yuva-devlab/supervisor
 * @author yuva.devlab@gmail.com
 */

import { ReadinessProber } from "./readiness-prober";
import { RingBuffer } from "./ring-buffer";
import { ProcessTreeManager } from "./process-tree";
import { resolveProcessExit } from "./process-runner";
import type { RuntimeStore } from "./runtime-store";
import type { StreamHandler } from "./stream-handler";
import type { ActiveProcessMeta } from "./status-builder";
import type { AppProcessConfig, ProcessLogEntry, ProcessStatus } from "./types";
import {
  ProcessLogLevel,
  ProcessLogStream,
  ProcessState,
  SupervisorEvent,
} from "./types";

export interface EventCoordinatorContext {
  readonly buffers: Map<string, RingBuffer>;
  readonly processes: Map<string, ActiveProcessMeta>;
  readonly streamHandler: StreamHandler;
  readonly maxBufferSize: number;
  readonly healthPollIntervalMs: number;
  readonly emit: (event: string, ...args: unknown[]) => boolean;
  readonly getStatus: (appId: string) => Promise<ProcessStatus>;
}

/**
 * Pushes a log entry to memory buffer and emits stream event.
 */
export function pushAppLog(
  ctx: EventCoordinatorContext,
  appId: string,
  entry: ProcessLogEntry,
): void {
  let buffer = ctx.buffers.get(appId);
  if (!buffer) {
    buffer = new RingBuffer(ctx.maxBufferSize);
    ctx.buffers.set(appId, buffer);
  }
  buffer.push(entry);
  ctx.emit(SupervisorEvent.LOG, appId, entry);
}

/**
 * Appends a synthetic system log entry to stream and buffer.
 */
export function appendAppSystemLog(
  ctx: EventCoordinatorContext,
  appId: string,
  level: ProcessLogLevel,
  msg: string,
): void {
  const entry = ctx.streamHandler.createEntry(
    appId,
    msg,
    ProcessLogStream.SYSTEM,
    level,
  );
  pushAppLog(ctx, appId, entry);
  ctx.streamHandler.writeToDisk(appId, entry).catch(() => {});
}

/**
 * Emits state transition event with full status snapshot.
 */
export async function emitAppState(
  ctx: EventCoordinatorContext,
  appId: string,
  state: ProcessState,
): Promise<void> {
  try {
    const status = await ctx.getStatus(appId);
    ctx.emit(SupervisorEvent.STATE_CHANGED, appId, state, status);
    ctx.emit(SupervisorEvent.STATE, status);
  } catch {
    // Ignored during shutdown
  }
}

/**
 * Polls application HTTP health endpoint until readiness is confirmed or timeout expires.
 */
export async function pollAppReadiness(
  ctx: EventCoordinatorContext,
  appId: string,
  healthUrl: string,
  timeoutMs: number,
): Promise<void> {
  const meta = ctx.processes.get(appId);
  if (!meta) return;
  const controller = new AbortController();
  meta.readinessAbortController = controller;

  await ReadinessProber.verifyReadiness(
    healthUrl,
    timeoutMs,
    ctx.healthPollIntervalMs,
    controller.signal,
    (msg, lvl) => appendAppSystemLog(ctx, appId, lvl, msg),
  );

  if (meta.state === ProcessState.STARTING) {
    meta.state = ProcessState.RUNNING;
    await emitAppState(ctx, appId, ProcessState.RUNNING);
  }
}

/**
 * Handles fatal process spawn or runtime errors.
 */
export function handleProcessError(
  ctx: EventCoordinatorContext,
  appId: string,
  err: Error,
): void {
  const meta = ctx.processes.get(appId);
  if (!meta) return;
  meta.error = err.message;
  meta.state = ProcessState.CRASHED;
  appendAppSystemLog(
    ctx,
    appId,
    ProcessLogLevel.ERROR,
    `Process error: ${err.message}`,
  );
  emitAppState(ctx, appId, ProcessState.CRASHED);
}

/**
 * Handles process exit code, updates records, and notifies listeners.
 */
export async function handleProcessExit(
  ctx: EventCoordinatorContext,
  runtimeStore: RuntimeStore,
  appId: string,
  code: number | null,
  signal: string | null,
): Promise<void> {
  const meta = ctx.processes.get(appId);
  if (!meta) return;
  await runtimeStore.remove(appId);
  const { state, message, isCrash } = resolveProcessExit(meta, code, signal);
  appendAppSystemLog(
    ctx,
    appId,
    isCrash ? ProcessLogLevel.ERROR : ProcessLogLevel.INFO,
    message,
  );
  await emitAppState(ctx, appId, state);
}

/**
 * Gracefully terminates a running application process and cleans up resources.
 */
export async function executeProcessStop(
  ctx: EventCoordinatorContext,
  runtimeStore: RuntimeStore,
  appId: string,
  meta?: ActiveProcessMeta,
  config?: AppProcessConfig,
  force = false,
): Promise<void> {
  if (!meta || meta.state === ProcessState.STOPPED) return;

  const gracefulTimeout = force
    ? 500
    : config?.gracefulShutdownTimeoutMs || 4000;

  meta.state = ProcessState.STOPPING;
  await emitAppState(ctx, appId, ProcessState.STOPPING);
  appendAppSystemLog(
    ctx,
    appId,
    ProcessLogLevel.INFO,
    `Stopping process (PID ${meta.pid})...`,
  );
  meta.readinessAbortController?.abort();

  if (meta.pid > 0) {
    await ProcessTreeManager.killTree(meta.pid, gracefulTimeout);
  }
  meta.state = ProcessState.STOPPED;
  meta.error = null;
  await runtimeStore.remove(appId);
  appendAppSystemLog(ctx, appId, ProcessLogLevel.INFO, "Process stopped.");
  await emitAppState(ctx, appId, ProcessState.STOPPED);
}
