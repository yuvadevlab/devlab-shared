/**
 * @file packages/supervisor/src/process-supervisor.ts
 * @description Centralized process supervisor engine managing lifecycle, port allocation, and health checks.
 * @module @yuva-devlab/supervisor
 * @author yuva.devlab@gmail.com
 */

import { EventEmitter } from "node:events";
import path from "node:path";
import os from "node:os";
import { Logger } from "@yuva-devlab/logger";
import { RingBuffer } from "./ring-buffer";
import { ProcessTreeManager } from "./process-tree";
import { RuntimeStore } from "./runtime-store";
import { StreamHandler } from "./stream-handler";
import { ReadinessProber } from "./readiness-prober";
import { buildProcessStatus, type ActiveProcessMeta } from "./status-builder";
import { executeProcessSpawn, resolveProcessExit } from "./process-runner";
import type {
  AppProcessConfig,
  ProcessLogEntry,
  ProcessLogLevel,
  ProcessState,
  ProcessStatus,
  SupervisorOptions,
} from "./types";

/**
 * Master process supervisor orchestrating multi-application development processes.
 */
export class ProcessSupervisor extends EventEmitter {
  private readonly logger = new Logger("ProcessSupervisor");
  private readonly configs = new Map<string, AppProcessConfig>();
  private readonly processes = new Map<string, ActiveProcessMeta>();
  private readonly buffers = new Map<string, RingBuffer>();
  private readonly runtimeStore: RuntimeStore;
  private readonly streamHandler: StreamHandler;
  private readonly maxBufferSize: number;
  private readonly healthPollIntervalMs: number;
  private initialized = false;

  constructor(options: SupervisorOptions = {}) {
    super();
    this.runtimeStore = new RuntimeStore(options.runtimeDir);
    this.streamHandler = new StreamHandler(
      options.logDir || path.join(os.homedir(), ".devlab", "logs"),
    );
    this.maxBufferSize = options.maxLogBufferSize || 2000;
    this.healthPollIntervalMs = options.healthPollIntervalMs || 500;
  }

  async init(): Promise<void> {
    if (this.initialized) return;
    try {
      await this.runtimeStore.restoreActive((rec) => {
        this.logger.info(`Re-attached to '${rec.appId}' (PID ${rec.pid})`);
        this.processes.set(rec.appId, {
          pid: rec.pid,
          pgid: rec.pgid,
          startedAt: rec.startedAt,
          state: "RUNNING",
          exitCode: null,
          error: null,
          consecutiveCrashes: 0,
        });
      });
    } catch (err) {
      this.logger.warn("Failed to restore runtime records", err);
    }
    this.initialized = true;
  }

  registerApp(config: AppProcessConfig): void {
    this.configs.set(config.appId, config);
    if (!this.buffers.has(config.appId)) {
      this.buffers.set(config.appId, new RingBuffer(this.maxBufferSize));
    }
  }

  unregisterApp(appId: string): void {
    this.configs.delete(appId);
  }

  getConfig(appId: string): AppProcessConfig | undefined {
    return this.configs.get(appId);
  }

  async start(appId: string): Promise<ProcessStatus> {
    const config = this.configs.get(appId);
    if (!config) throw new Error(`Application '${appId}' is not registered`);

    const current = this.processes.get(appId);
    if (
      current &&
      (current.state === "RUNNING" || current.state === "STARTING")
    ) {
      return this.getStatus(appId);
    }

    try {
      const meta = await executeProcessSpawn({
        appId,
        config,
        runtimeStore: this.runtimeStore,
        streamHandler: this.streamHandler,
        onLog: (entry) => this.pushLog(appId, entry),
        onSystemLog: (lvl, msg) => this.appendSystemLog(appId, lvl, msg),
        onError: (err) => this.handleProcessError(appId, err),
        onExit: (code, signal) => this.handleProcessExit(appId, code, signal),
      });

      this.processes.set(appId, meta);
      this.emitState(appId, "STARTING");

      if (config.healthUrl) {
        this.pollReadinessAsync(
          appId,
          config.healthUrl,
          config.readinessTimeoutMs || 30000,
        );
      } else {
        setTimeout(() => {
          if (this.processes.get(appId)?.state === "STARTING") {
            meta.state = "RUNNING";
            this.emitState(appId, "RUNNING");
          }
        }, 1500);
      }
      return await this.getStatus(appId);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.appendSystemLog(appId, "error", `Startup failed: ${msg}`);
      this.emitState(appId, "CRASHED");
      throw err;
    }
  }

  async stop(appId: string, force = false): Promise<ProcessStatus> {
    const meta = this.processes.get(appId);
    if (!meta || meta.state === "STOPPED") return this.getStatus(appId);

    const config = this.configs.get(appId);
    const gracefulTimeout = force
      ? 500
      : config?.gracefulShutdownTimeoutMs || 4000;

    meta.state = "STOPPING";
    this.emitState(appId, "STOPPING");
    this.appendSystemLog(
      appId,
      "info",
      `Stopping process (PID ${meta.pid})...`,
    );
    meta.readinessAbortController?.abort();

    if (meta.pid > 0)
      await ProcessTreeManager.killTree(meta.pid, gracefulTimeout);

    meta.state = "STOPPED";
    meta.error = null;
    await this.runtimeStore.remove(appId);
    this.appendSystemLog(appId, "info", "Process stopped.");
    this.emitState(appId, "STOPPED");
    return this.getStatus(appId);
  }

  async restart(appId: string): Promise<ProcessStatus> {
    await this.stop(appId, false);
    return this.start(appId);
  }

  async shutdownAll(): Promise<void> {
    this.logger.info("Gracefully shutting down all managed processes...");
    const running = Array.from(this.processes.keys()).filter((id) => {
      const state = this.processes.get(id)?.state;
      return state === "RUNNING" || state === "STARTING";
    });
    await Promise.all(running.map((id) => this.stop(id, false)));
    this.logger.info("All managed processes have been terminated.");
  }

  async getStatus(appId: string): Promise<ProcessStatus> {
    return buildProcessStatus(
      appId,
      this.configs.get(appId),
      this.processes.get(appId),
    );
  }

  async getAllStatuses(): Promise<ProcessStatus[]> {
    return Promise.all(
      Array.from(this.configs.keys()).map((id) => this.getStatus(id)),
    );
  }

  getLogs(appId: string, limit?: number): ProcessLogEntry[] {
    return this.buffers.get(appId)?.getSnapshot(limit) || [];
  }

  clearLogs(appId: string): void {
    this.buffers.get(appId)?.clear();
  }

  private handleProcessError(appId: string, err: Error): void {
    const meta = this.processes.get(appId);
    if (!meta) return;
    meta.error = err.message;
    meta.state = "CRASHED";
    this.appendSystemLog(appId, "error", `Process error: ${err.message}`);
    this.emitState(appId, "CRASHED");
  }

  private async handleProcessExit(
    appId: string,
    code: number | null,
    signal: string | null,
  ): Promise<void> {
    const meta = this.processes.get(appId);
    if (!meta) return;
    await this.runtimeStore.remove(appId);
    const { state, message, isCrash } = resolveProcessExit(meta, code, signal);
    this.appendSystemLog(appId, isCrash ? "error" : "info", message);
    await this.emitState(appId, state);
  }

  private async pollReadinessAsync(
    appId: string,
    healthUrl: string,
    timeoutMs: number,
  ): Promise<void> {
    const meta = this.processes.get(appId);
    if (!meta) return;
    const controller = new AbortController();
    meta.readinessAbortController = controller;

    await ReadinessProber.verifyReadiness(
      healthUrl,
      timeoutMs,
      this.healthPollIntervalMs,
      controller.signal,
      (msg, lvl) => this.appendSystemLog(appId, lvl, msg),
    );

    if (meta.state === "STARTING") {
      meta.state = "RUNNING";
      await this.emitState(appId, "RUNNING");
    }
  }

  private pushLog(appId: string, entry: ProcessLogEntry): void {
    let buffer = this.buffers.get(appId);
    if (!buffer) {
      buffer = new RingBuffer(this.maxBufferSize);
      this.buffers.set(appId, buffer);
    }
    buffer.push(entry);
    this.emit("log", appId, entry);
  }

  private appendSystemLog(
    appId: string,
    level: ProcessLogLevel,
    msg: string,
  ): void {
    const entry = this.streamHandler.createEntry(appId, msg, "system", level);
    this.pushLog(appId, entry);
    this.streamHandler.writeToDisk(appId, entry).catch(() => {});
  }

  private async emitState(appId: string, state: ProcessState): Promise<void> {
    try {
      const status = await this.getStatus(appId);
      this.emit("stateChanged", appId, state, status);
    } catch {
      // Ignored
    }
  }
}
