/**
 * @file packages/supervisor/src/status-builder.ts
 * @description Helper functions for assembling application status snapshots and tracking process metadata.
 * @module @yuva-devlab/supervisor
 * @author yuva.devlab@gmail.com
 */

import type { ChildProcess } from "node:child_process";
import { PortProber } from "./port-prober";
import type { AppProcessConfig, ProcessState, ProcessStatus } from "./types";

export interface ActiveProcessMeta {
  process?: ChildProcess;
  pid: number;
  pgid: number | null;
  startedAt: string;
  state: ProcessState;
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
    pid: meta?.pid || null,
    pgid: meta?.pgid || null,
    exitCode: meta?.exitCode ?? null,
    startedAt: meta?.startedAt || null,
    uptimeSeconds,
    ports,
    portStatuses,
    error: meta?.error || null,
  };
}
