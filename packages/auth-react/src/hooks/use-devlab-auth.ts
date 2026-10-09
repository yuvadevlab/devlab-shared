/**
 * @file packages/auth-react/src/hooks/use-devlab-auth.ts
 * @description Hook providing access to user profile, session token, and auth actions.
 * @module @yuva-devlab/auth-react
 */

import { useContext } from "react";
import { DevLabAuthContext } from "../provider/auth-context";
import type { DevLabAuthContextValue } from "../types";

/**
 * Accesses the reactive DevLab authentication state and methods.
 *
 * @returns DevLabAuthContextValue
 * @throws Error if called outside a DevLabAuthProvider
 *
 * @example
 * ```tsx
 * const { user, isAuthenticated, logout } = useDevLabAuth();
 * ```
 */
export function useDevLabAuth(): DevLabAuthContextValue {
  const context = useContext(DevLabAuthContext);
  if (!context) {
    throw new Error(
      "useDevLabAuth must be used within a <DevLabAuthProvider />",
    );
  }
  return context;
}
