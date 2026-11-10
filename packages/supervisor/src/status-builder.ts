/**
 * @file packages/supervisor/src/status-builder.ts
 * @description Helper functions for assembling application status snapshots and tracking process metadata.
 * @module @yuva-devlab/supervisor
 * @author yuva.devlab@gmail.com
 */

import type { ChildProcess } from "node:child_process";
import { PortProber } from "./port-prober";
import type { RuntimeStore } from "./runtime-store";
import type {
  AppProcessConfig,
  DependencyStatus,
  ExecutionMode,
  ProcessState,
  ProcessStatus,
} from "./types";

export interface ActiveProcessMeta {
  process?: ChildProcess;
  pid: number;
  pgid: number | null;
  startedAt: string;
  state: ProcessState;
  mode?: ExecutionMode;
  exitCode: number | null;
  error: string | null;
  readinessAbortController?: AbortController;
  consecutiveCrashes: number;
}

/**
 * Builds a complete live ProcessStatus object from application configuration and process metadata.
 */
export async function buildProcessStatus(
  appId: string,
  config?: AppProcessConfig,
  meta?: ActiveProcessMeta,
  dependencyStatuses?: DependencyStatus[],
): Promise<ProcessStatus> {
  const ports = config?.ports || [];
  const portStatuses = await PortProber.checkPorts(ports);

  let uptimeSeconds = 0;
  if (
    meta?.startedAt &&
    (meta.state === "RUNNING" || meta.state === "STARTING")
  ) {
    const started = new Date(meta.startedAt).getTime();
    uptimeSeconds = Math.max(0, Math.floor((Date.now() - started) / 1000));
  }

  return {
    appId,
    state: meta?.state || "STOPPED",
    mode: meta?.mode || config?.executionMode || "dev",
    pid: meta?.pid || null,
    pgid: meta?.pgid || null,
    exitCode: meta?.exitCode ?? null,
    startedAt: meta?.startedAt || null,
    uptimeSeconds,
    ports,
    portStatuses,
    dependencyStatuses,
    error: meta?.error || null,
  };
}

/**
 * Restores and reconnects living processes from persistent runtime cache into memory.
 */
export async function restoreRuntimeProcesses(
  runtimeStore: RuntimeStore,
  processes: Map<string, ActiveProcessMeta>,
  onReattached?: (appId: string, pid: number) => void,
): Promise<void> {
  await runtimeStore.restoreActive((rec) => {
    onReattached?.(rec.appId, rec.pid);
    processes.set(rec.appId, {
      pid: rec.pid,
      pgid: rec.pgid,
      startedAt: rec.startedAt,
      state: "RUNNING",
      exitCode: null,
      error: null,
      consecutiveCrashes: 0,
    });
  });
}
