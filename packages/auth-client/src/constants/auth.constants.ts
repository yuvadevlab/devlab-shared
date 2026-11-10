/**
 * @file packages/auth-client/src/constants/auth.constants.ts
 * @description Centralized enums for URL query parameter keys and storage identifiers.
 * @module @yuva-devlab/auth-client
 */

/**
 * Standard query parameter keys used for authentication flows, redirects, and handoffs.
 */
export enum AuthQueryParamKey {
  /** Redirect target URL parameter */
  REDIRECT = "redirect",
  /** Client or application ID parameter */
  APP = "app",
  /** Primary Bearer JWT token parameter */
  TOKEN = "token",
  /** Alternative OAuth access token parameter */
  ACCESS_TOKEN = "access_token",
}

/**
 * Browser storage keys used for token persistence and cross-tab synchronization.
 */
export enum AuthStorageKey {
  /** Primary JWT authentication token key */
  TOKEN = "devlab_auth_token",
  /** Serialized authenticated user profile key */
  USER = "devlab_auth_user",
  /** Cross-tab session synchronization event key */
  SYNC = "devlab_auth_sync",
  /** Legacy access token fallback key */
  ACCESS_TOKEN_LEGACY = "devlab_access_token",
}
