/**
 * @file packages/supervisor/src/supervisor-build.ts
 * @description Executes on-demand production build commands with attached stream logging.
 * @module @yuva-devlab/supervisor
 * @author yuva.devlab@gmail.com
 */

import { ProcessTreeManager } from "./process-tree";
import { resolveCommandAndArgs } from "./process-runner";
import {
  appendAppSystemLog,
  pushAppLog,
  type EventCoordinatorContext,
} from "./supervisor-events";
import { type AppProcessConfig, ProcessLogLevel } from "./types";

/**
 * Spawns production build command and streams output to memory ring buffer and disk.
 */
export async function executeAppBuild(
  ctx: EventCoordinatorContext,
  config: AppProcessConfig,
): Promise<{ success: boolean; exitCode: number }> {
  const { appId } = config;
  if (!config.buildCommand) {
    appendAppSystemLog(
      ctx,
      appId,
      ProcessLogLevel.INFO,
      "No buildCommand configured for this application.",
    );
    return { success: true, exitCode: 0 };
  }

  const { command, args } = resolveCommandAndArgs(
    config.buildCommand,
    config.buildArgs,
  );
  appendAppSystemLog(
    ctx,
    appId,
    ProcessLogLevel.INFO,
    `[BUILD] Executing: ${command} ${args.join(" ")} in ${config.workingDir}`,
  );

  return new Promise((resolve) => {
    const child = ProcessTreeManager.spawnProcess(command, args, {
      cwd: config.workingDir,
      env: { NODE_ENV: "production", ...config.env },
    });
    ctx.streamHandler.attach(appId, child, (entry) =>
      pushAppLog(ctx, appId, entry),
    );
    child.on("exit", (code) => {
      const exitCode = code ?? 0;
      const success = exitCode === 0;
      appendAppSystemLog(
        ctx,
        appId,
        success ? ProcessLogLevel.INFO : ProcessLogLevel.ERROR,
        `[BUILD] Completed with exit code ${exitCode}`,
      );
      resolve({ success, exitCode });
    });
    child.on("error", (err) => {
      appendAppSystemLog(
        ctx,
        appId,
        ProcessLogLevel.ERROR,
        `[BUILD] Error: ${err.message}`,
      );
      resolve({ success: false, exitCode: 1 });
    });
  });
}
