/**
 * @file packages/supervisor/src/process-runner.ts
 * @description Spawns, hooks streams, and manages low-level child process execution for an application.
 * @module @yuva-devlab/supervisor
 * @author yuva.devlab@gmail.com
 */

import os from "node:os";
import { PortProber } from "./port-prober";
import { ProcessTreeManager } from "./process-tree";
import type { RuntimeStore } from "./runtime-store";
import type { StreamHandler } from "./stream-handler";
import type { ActiveProcessMeta } from "./status-builder";
import type {
  AppProcessConfig,
  ProcessLogEntry,
  ProcessLogLevel,
} from "./types";

export interface SpawnProcessContext {
  readonly appId: string;
  readonly config: AppProcessConfig;
  readonly runtimeStore: RuntimeStore;
  readonly streamHandler: StreamHandler;
  readonly onLog: (entry: ProcessLogEntry) => void;
  readonly onSystemLog: (level: ProcessLogLevel, msg: string) => void;
  readonly onError: (err: Error) => void;
  readonly onExit: (code: number | null, signal: string | null) => void;
}

/**
 * Executes port clearing and process spawning with attached stream pipelines.
 */
export async function executeProcessSpawn(
  context: SpawnProcessContext,
): Promise<ActiveProcessMeta> {
  const {
    appId,
    config,
    runtimeStore,
    streamHandler,
    onLog,
    onSystemLog,
    onError,
    onExit,
  } = context;

  await PortProber.clearOccupiedPorts(config.ports, (msg, lvl) =>
    onSystemLog(lvl, msg),
  );
  onSystemLog(
    "info",
    `Spawning: ${config.command} ${(config.args || []).join(" ")}`,
  );

  const child = ProcessTreeManager.spawnProcess(
    config.command,
    config.args || [],
    {
      cwd: config.workingDir,
      env: config.env as Record<string, string> | undefined,
    },
  );

  if (!child.pid) throw new Error(`Failed to spawn process for '${appId}'`);

  const startedAt = new Date().toISOString();
  const pgid = os.platform() === "win32" ? null : child.pid;

  const meta: ActiveProcessMeta = {
    process: child,
    pid: child.pid,
    pgid,
    startedAt,
    state: "STARTING",
    exitCode: null,
    error: null,
    consecutiveCrashes: 0,
  };

  await runtimeStore.save({
    appId,
    pid: child.pid,
    pgid,
    command: `${config.command} ${(config.args || []).join(" ")}`.trim(),
    workingDir: config.workingDir,
    startedAt,
    ports: config.ports || [],
  });

  streamHandler.attach(appId, child, onLog);
  child.on("error", onError);
  child.on("exit", onExit);

  return meta;
}

export interface ProcessExitResolution {
  readonly state: "STOPPED" | "CRASHED";
  readonly error: string | null;
  readonly message: string;
  readonly isCrash: boolean;
}

/**
 * Evaluates process termination state and produces diagnostics.
 */
export function resolveProcessExit(
  meta: ActiveProcessMeta,
  code: number | null,
  signal: string | null,
): ProcessExitResolution {
  meta.exitCode = code;

  if (meta.state === "STOPPING") {
    meta.state = "STOPPED";
    meta.error = null;
    return {
      state: "STOPPED",
      error: null,
      message: `Process exited cleanly (signal: ${signal || "none"}).`,
      isCrash: false,
    };
  }

  const isCrash = code !== 0 && code !== null;
  meta.state = isCrash ? "CRASHED" : "STOPPED";
  meta.error = isCrash ? `Process exited abnormally with code ${code}` : null;
  return {
    state: meta.state,
    error: meta.error,
    message: isCrash
      ? `Process crashed with code ${code} (signal: ${signal || "none"})`
      : `Process exited with code ${code ?? "null"}`,
    isCrash,
  };
}
