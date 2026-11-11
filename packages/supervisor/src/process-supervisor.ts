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
import { RuntimeStore } from "./runtime-store";
import { StreamHandler } from "./stream-handler";
import {
  buildProcessStatus,
  restoreRuntimeProcesses,
  type ActiveProcessMeta,
} from "./status-builder";
import { executeProcessSpawn } from "./process-runner";
import { executeAppBuild } from "./supervisor-build";
import { resolveAppDependencies } from "./supervisor-dependencies";
import {
  pushAppLog,
  appendAppSystemLog,
  emitAppState,
  pollAppReadiness,
  handleProcessError,
  handleProcessExit,
  executeProcessStop,
  type EventCoordinatorContext,
} from "./supervisor-events";
import {
  ProcessLogLevel,
  ProcessState,
  type AppProcessConfig,
  type DependencyStatus,
  type ExecutionMode,
  type ProcessLogEntry,
  type ProcessStatus,
  type SupervisorOptions,
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

  private get eventContext(): EventCoordinatorContext {
    return {
      buffers: this.buffers,
      processes: this.processes,
      streamHandler: this.streamHandler,
      maxBufferSize: this.maxBufferSize,
      healthPollIntervalMs: this.healthPollIntervalMs,
      emit: this.emit.bind(this),
      getStatus: this.getStatus.bind(this),
    };
  }

  async init(): Promise<void> {
    if (this.initialized) return;
    try {
      await restoreRuntimeProcesses(
        this.runtimeStore,
        this.processes,
        (appId, pid) =>
          this.logger.info(`Re-attached to '${appId}' (PID ${pid})`),
      );
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

  async checkDependencies(appId: string): Promise<DependencyStatus[]> {
    return resolveAppDependencies(this.configs, this.processes, appId);
  }

  async start(appId: string, mode?: ExecutionMode): Promise<ProcessStatus> {
    const config = this.configs.get(appId);
    if (!config) throw new Error(`Application '${appId}' is not registered`);

    const current = this.processes.get(appId);
    if (
      current &&
      (current.state === ProcessState.RUNNING ||
        current.state === ProcessState.STARTING)
    ) {
      return this.getStatus(appId);
    }

    try {
      const meta = await executeProcessSpawn({
        appId,
        config,
        mode,
        runtimeStore: this.runtimeStore,
        streamHandler: this.streamHandler,
        onLog: (entry) => pushAppLog(this.eventContext, appId, entry),
        onSystemLog: (lvl, msg) =>
          appendAppSystemLog(this.eventContext, appId, lvl, msg),
        onError: (err) => handleProcessError(this.eventContext, appId, err),
        onExit: (code, sig) =>
          handleProcessExit(
            this.eventContext,
            this.runtimeStore,
            appId,
            code,
            sig,
          ),
      });

      this.processes.set(appId, meta);
      await emitAppState(this.eventContext, appId, ProcessState.STARTING);
      if (config.healthUrl) {
        pollAppReadiness(
          this.eventContext,
          appId,
          config.healthUrl,
          config.readinessTimeoutMs || 30000,
        );
      } else {
        setTimeout(() => {
          if (this.processes.get(appId)?.state === ProcessState.STARTING) {
            meta.state = ProcessState.RUNNING;
            emitAppState(this.eventContext, appId, ProcessState.RUNNING);
          }
        }, 1500);
      }
      return await this.getStatus(appId);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      appendAppSystemLog(
        this.eventContext,
        appId,
        ProcessLogLevel.ERROR,
        `Startup failed: ${msg}`,
      );
      await emitAppState(this.eventContext, appId, ProcessState.CRASHED);
      throw err;
    }
  }

  async build(appId: string): Promise<{ success: boolean; exitCode: number }> {
    const config = this.configs.get(appId);
    if (!config) throw new Error(`Application '${appId}' is not registered`);
    return executeAppBuild(this.eventContext, config);
  }

  async stop(appId: string, force = false): Promise<ProcessStatus> {
    await executeProcessStop(
      this.eventContext,
      this.runtimeStore,
      appId,
      this.processes.get(appId),
      this.configs.get(appId),
      force,
    );
    return this.getStatus(appId);
  }

  async restart(appId: string, mode?: ExecutionMode): Promise<ProcessStatus> {
    await this.stop(appId, false);
    return this.start(appId, mode);
  }

  async shutdownAll(): Promise<void> {
    this.logger.info("Gracefully shutting down all managed processes...");
    const running = Array.from(this.processes.keys()).filter((id) => {
      const state = this.processes.get(id)?.state;
      return state === ProcessState.RUNNING || state === ProcessState.STARTING;
    });
    await Promise.all(running.map((id) => this.stop(id, false)));
    this.logger.info("All managed processes have been terminated.");
  }

  async getStatus(appId: string): Promise<ProcessStatus> {
    const config = this.configs.get(appId);
    const meta = this.processes.get(appId);
    const dependencyStatuses = await this.checkDependencies(appId);
    return buildProcessStatus(appId, config, meta, dependencyStatuses);
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
}
