/**
 * @file packages/auth-server/src/constants/auth.constants.ts
 * @description Centralized constants and header keys for server-side authentication.
 * @module @yuva-devlab/auth-server
 */

/** Standard Authorization HTTP header name (lowercase for case-insensitive lookup) */
export const DEFAULT_AUTH_HEADER = "authorization";

/** Standard machine-to-machine API key HTTP header name */
export const DEFAULT_API_KEY_HEADER = "x-api-key";

/** Standard Bearer token prefix */
export const DEFAULT_BEARER_PREFIX = "Bearer ";

/** Default cache time-to-live for fetched RS256 JWKS public keys (1 hour) */
export const DEFAULT_JWKS_CACHE_TTL_MS = 3_600_000;

/** Default public endpoints bypassing mandatory authentication */
export const DEFAULT_PUBLIC_PATHS = Object.freeze([
  "/health",
  "/ready",
  "/live",
  "/metrics",
]);

/** HTTP Status Code for unauthenticated requests */
export const HTTP_STATUS_UNAUTHORIZED = 401;

/** HTTP Status Code for unauthorized / forbidden role requests */
export const HTTP_STATUS_FORBIDDEN = 403;

/** HTTP Status Code returned when an application is deactivated or killed */
export const HTTP_STATUS_SERVICE_UNAVAILABLE = 503;
