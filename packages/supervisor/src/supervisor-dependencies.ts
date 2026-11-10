/**
 * @file packages/supervisor/src/supervisor-dependencies.ts
 * @description Dependency graph inspection and status evaluation for inter-app prerequisites.
 * @module @yuva-devlab/supervisor
 * @author yuva.devlab@gmail.com
 */

import type { ActiveProcessMeta } from "./status-builder";
import type { AppProcessConfig, DependencyStatus } from "./types";

/**
 * Resolves live runtime status for all prerequisite apps declared in dependsOn.
 */
export function resolveAppDependencies(
  configs: Map<string, AppProcessConfig>,
  processes: Map<string, ActiveProcessMeta>,
  appId: string,
): DependencyStatus[] {
  const config = configs.get(appId);
  const deps = config?.dependsOn || [];
  if (deps.length === 0) return [];

  return deps.map((depId) => {
    const depConfig = configs.get(depId);
    const depMeta = processes.get(depId);
    const state = depMeta?.state || "STOPPED";
    const running = state === "RUNNING" || state === "STARTING";
    return {
      appId: depId,
      name: depConfig?.name || depId,
      running,
      state,
      healthy: state === "RUNNING",
      boundPorts: depConfig?.ports,
    };
  });
}
