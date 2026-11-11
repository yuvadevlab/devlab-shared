/**
 * @file packages/supervisor/src/supervisor-dependencies.ts
 * @description Dependency graph inspection and status evaluation for inter-app prerequisites.
 * @module @yuva-devlab/supervisor
 * @author yuva.devlab@gmail.com
 */

import { PortProber } from "./port-prober";
import type { ActiveProcessMeta } from "./status-builder";
import {
  ProcessState,
  type AppProcessConfig,
  type DependencyStatus,
} from "./types";

/**
 * Resolves live runtime status for all prerequisite apps declared in dependsOn.
 * Recognizes the DevLab Platform Core host and verifies TCP port occupancy
 * for prerequisites running as standalone or external processes.
 *
 * @param configs - Map of configured applications
 * @param processes - Map of active child processes tracked by the supervisor
 * @param appId - Target application whose prerequisites are being checked
 * @returns Array of live dependency statuses
 */
export async function resolveAppDependencies(
  configs: Map<string, AppProcessConfig>,
  processes: Map<string, ActiveProcessMeta>,
  appId: string,
): Promise<DependencyStatus[]> {
  const config = configs.get(appId);
  const deps = config?.dependsOn || [];
  if (deps.length === 0) return [];

  return Promise.all(
    deps.map(async (depId) => {
      const depConfig = configs.get(depId);

      // DevLab Platform Core is the host server running the supervisor
      if (depId === "devlab-portal") {
        return {
          appId: depId,
          name: depConfig?.name || "DevLab Portal",
          running: true,
          state: ProcessState.RUNNING,
          healthy: true,
          boundPorts:
            depConfig?.ports && depConfig.ports.length > 0
              ? depConfig.ports
              : [3000, 4000],
        };
      }

      const depMeta = processes.get(depId);
      let state = depMeta?.state || ProcessState.STOPPED;
      let running =
        state === ProcessState.RUNNING || state === ProcessState.STARTING;

      // If not tracked as managed child process, probe bound ports
      if (!running && depConfig?.ports && depConfig.ports.length > 0) {
        const portChecks = await Promise.all(
          depConfig.ports.map((port) => PortProber.isPortInUse(port)),
        );
        if (portChecks.some(Boolean)) {
          state = ProcessState.RUNNING;
          running = true;
        }
      }

      return {
        appId: depId,
        name: depConfig?.name || depId,
        running,
        state,
        healthy: state === ProcessState.RUNNING,
        boundPorts: depConfig?.ports,
      };
    }),
  );
}
