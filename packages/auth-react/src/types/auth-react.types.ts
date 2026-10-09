/**
 * @file packages/auth-react/src/types/auth-react.types.ts
 * @description Types and context contracts for React authentication and app lifecycle.
 * @module @yuva-devlab/auth-react
 */

import type { ReactNode } from "react";

/**
 * Operational state of an application on the DevLab platform.
 */
export enum AppStatus {
  /** Application is fully operational and serving traffic */
  ACTIVE = "ACTIVE",
  /** Application has been administratively disabled / deactivated (Kill-Switch triggered) */
  INACTIVE = "INACTIVE",
  /** Application is undergoing scheduled maintenance */
  MAINTENANCE = "MAINTENANCE",
}

/**
 * Authenticated user profile representation for the frontend.
 */
export interface AuthUser {
  /** Canonical user UUID */
  readonly id: string;
  /** Primary user email address */
  readonly email?: string;
  /** Human-readable display name */
  readonly name?: string;
  /** Granted role slugs */
  readonly roles: readonly string[];
  /** Tenant isolation partition ID */
  readonly tenantId?: string;
  /** User profile picture URL */
  readonly avatarUrl?: string;
}

/**
 * Reactive state snapshot exposed by the DevLab authentication context.
 */
export interface AuthState {
  /** Whether the user is currently logged in with a valid token */
  readonly isAuthenticated: boolean;
  /** Whether the initial auth or app-status check is in flight */
  readonly isLoading: boolean;
  /** Currently authenticated user profile or null */
  readonly user: AuthUser | null;
  /** Active session Bearer token or null */
  readonly token: string | null;
  /** Current operational platform status of the host application */
  readonly appStatus: AppStatus;
}

/**
 * Full value contract provided by DevLabAuthContext including actions.
 */
export interface DevLabAuthContextValue extends AuthState {
  /** Stores credentials and authenticates session */
  login(token: string, user: AuthUser): void;
  /** Clears session credentials and broadcasts logout across tabs */
  logout(): void;
  /** Re-evaluates platform application lifecycle status */
  refreshAppStatus(): Promise<void>;
}

/**
 * Properties accepted by the DevLabAuthProvider wrapper component.
 */
export interface DevLabAuthProviderProps {
  /** Unique platform application slug (e.g. "finai", "orchestrai") */
  readonly appId: string;
  /** Optional gateway base URL for fetching app status */
  readonly gatewayUrl?: string;
  /** Child component subtree to render when app is active */
  readonly children: ReactNode;
  /** Optional custom replacement component when app is deactivated */
  readonly customUnavailableScreen?: ReactNode;
}
