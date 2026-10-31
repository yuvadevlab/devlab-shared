/**
 * @file packages/auth-client/src/provider/auth-context.ts
 * @description React Context instance for DevLab authentication.
 * @module @yuva-devlab/auth-client
 */

import { createContext } from "react";
import type { DevLabAuthContextValue } from "@/types";

/**
 * React context storing current DevLab authentication state and actions.
 */
export const DevLabAuthContext = createContext<DevLabAuthContextValue | null>(
  null,
);
