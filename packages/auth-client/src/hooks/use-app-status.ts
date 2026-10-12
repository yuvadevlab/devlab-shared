/**
 * @file packages/auth-react/src/hooks/use-app-status.ts
 * @description Hook inspecting host application platform lifecycle status.
 * @module @yuva-devlab/auth-react
 */

import { useDevLabAuth } from "./use-devlab-auth";
import { AppStatus } from "../types";

/**
 * Convenience hook inspecting the active platform lifecycle state.
 *
 * @example
 * ```tsx
 * const { appStatus, isAppActive, refresh } = useAppStatus();
 * ```
 */
export function useAppStatus() {
  const { appStatus, refreshAppStatus } = useDevLabAuth();

  return {
    appStatus,
    isAppActive: appStatus === AppStatus.ACTIVE,
    isUnderMaintenance: appStatus === AppStatus.MAINTENANCE,
    refresh: refreshAppStatus,
  };
}
