/**
 * @file packages/supervisor/src/process-runner.ts
 * @description Child process spawning, detached process group isolation, and exit handling.
 * @module @yuva-devlab/supervisor
 * @author yuva.devlab@gmail.com
 */

import os from "node:os";
import { PortProber } from "./port-prober";
import { ProcessTreeManager } from "./process-tree";
import type { StreamHandler } from "./stream-handler";
import type { RuntimeStore } from "./runtime-store";
import type { ActiveProcessMeta } from "./status-builder";
import type { AppProcessConfig, ProcessLogEntry } from "./types";
import {
  ExecutionMode,
  ProcessLogLevel,
  ProcessSignal,
  ProcessState,
} from "./types";

export interface SpawnProcessContext {
  readonly appId: string;
  readonly config: AppProcessConfig;
  readonly mode?: ExecutionMode;
  readonly runtimeStore: RuntimeStore;
  readonly streamHandler: StreamHandler;
  readonly onLog: (entry: ProcessLogEntry) => void;
  readonly onSystemLog: (level: ProcessLogLevel, msg: string) => void;
  readonly onError: (err: Error) => void;
  readonly onExit: (code: number | null, signal: string | null) => void;
}

/**
 * Splits a freeform command string into an executable binary and argument array safely.
 */
export function resolveCommandAndArgs(
  rawCommand: string,
  rawArgs?: readonly string[],
): { command: string; args: string[] } {
  if (rawArgs && rawArgs.length > 0) {
    return { command: rawCommand, args: [...rawArgs] };
  }
  const parts: string[] = [];
  const regex = /[^\s"']+|"([^"]*)"|'([^']*)'/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(rawCommand)) !== null) {
    parts.push(match[1] || match[2] || match[0]);
  }
  if (parts.length === 0) {
    return { command: rawCommand, args: [] };
  }
  return {
    command: parts[0],
    args: parts.slice(1),
  };
}

/**
 * Resolves the effective executable command, arguments, and environment variables based on execution mode.
 */
export function resolveExecutionCommand(
  config: AppProcessConfig,
  mode: ExecutionMode = ExecutionMode.DEV,
): { command: string; args: string[]; env: Record<string, string> } {
  const isProd = mode === ExecutionMode.PROD;
  const rawCmd = isProd
    ? config.startCommand || config.command
    : config.devCommand || config.command;
  const rawArgs = isProd
    ? (config.startArgs ?? config.args)
    : (config.devArgs ?? config.args);

  const { command, args } = resolveCommandAndArgs(rawCmd, rawArgs);
  const env: Record<string, string> = {
    ...config.env,
    NODE_ENV: isProd ? "production" : config.env?.NODE_ENV || "development",
  };
  return { command, args, env };
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
    mode = config.executionMode || ExecutionMode.DEV,
    runtimeStore,
    streamHandler,
    onLog,
    onSystemLog,
    onError,
    onExit,
  } = context;

  const { command, args, env } = resolveExecutionCommand(config, mode);

  await PortProber.clearOccupiedPorts(config.ports, (msg, lvl) =>
    onSystemLog(lvl, msg),
  );
  onSystemLog(
    ProcessLogLevel.INFO,
    `Spawning [mode: ${mode}]: ${command} ${args.join(" ")}`,
  );

  const child = ProcessTreeManager.spawnProcess(command, args, {
    cwd: config.workingDir,
    env,
  });

  if (!child.pid) throw new Error(`Failed to spawn process for '${appId}'`);

  const startedAt = new Date().toISOString();
  const pgid = os.platform() === "win32" ? null : child.pid;

  const meta: ActiveProcessMeta = {
    process: child,
    pid: child.pid,
    pgid,
    startedAt,
    state: ProcessState.STARTING,
    mode,
    exitCode: null,
    error: null,
    consecutiveCrashes: 0,
  };

  await runtimeStore.save({
    appId,
    pid: child.pid,
    pgid,
    command: `${command} ${args.join(" ")}`.trim(),
    workingDir: config.workingDir,
    startedAt,
    ports: config.ports || [],
  });

  streamHandler.attach(appId, child, onLog);
  child.on("error", onError);
  child.on("exit", onExit);

  return meta;
}

/**
 * Analyzes process exit signal or exit code to determine whether termination was intentional or a crash.
 */
export function resolveProcessExit(
  meta: ActiveProcessMeta,
  code: number | null,
  signal: string | null,
): { state: ProcessState; message: string; isCrash: boolean } {
  meta.exitCode = code;
  const isIntentionalStop =
    meta.state === ProcessState.STOPPING ||
    signal === ProcessSignal.SIGTERM ||
    signal === ProcessSignal.SIGKILL;

  if (isIntentionalStop) {
    meta.state = ProcessState.STOPPED;
    meta.error = null;
    meta.consecutiveCrashes = 0;
    return {
      state: ProcessState.STOPPED,
      message: `Process exited cleanly (signal: ${signal || "none"}).`,
      isCrash: false,
    };
  }

  const isCrash = code !== 0 && code !== null;
  meta.state = isCrash ? ProcessState.CRASHED : ProcessState.STOPPED;
  meta.error = isCrash ? `Process exited abnormally with code ${code}` : null;
  if (isCrash) meta.consecutiveCrashes += 1;

  return {
    state: meta.state,
    message: isCrash
      ? `Process crashed with code ${code} (signal: ${signal || "none"})`
      : `Process exited with code ${code ?? "null"}`,
    isCrash,
  };
}
