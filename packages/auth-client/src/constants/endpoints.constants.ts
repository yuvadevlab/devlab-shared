/**
 * @file packages/auth-client/src/constants/endpoints.constants.ts
 * @description Centralized fallback endpoints and timing constants for DevLab authentication.
 * @module @yuva-devlab/auth-client
 */

/**
 * Fallback Web Portal URL when no custom auth/portal URL is provided by the consumer.
 */
export const DEFAULT_PORTAL_WEB_URL = "http://localhost:3000";

/**
 * Fallback API Gateway URL when no custom gateway/API URL is provided by the consumer.
 */
export const DEFAULT_PORTAL_API_URL = "http://localhost:4000";

/**
 * Platform API path prefix for querying application runtime status.
 */
export const PLATFORM_APP_STATUS_ENDPOINT = "/api/v1/platform/apps";

/**
 * Standard SSO login path relative to the portal base URL.
 */
export const PLATFORM_LOGIN_PATH = "/login";

/**
 * Standard forgot password path relative to the portal base URL.
 */
export const PLATFORM_FORGOT_PASSWORD_PATH = "/forgot-password";

/**
 * Canonical RFC 7517 JSON Web Key Set (JWKS) discovery endpoint path.
 */
export const DEFAULT_JWKS_PATH = "/.well-known/jwks.json";

/**
 * Canonical RFC 8414 OpenID Connect configuration discovery path.
 */
export const DEFAULT_OPENID_CONFIG_PATH = "/.well-known/openid-configuration";

/**
 * Default polling interval in milliseconds for re-verifying application status.
 */
export const APP_STATUS_POLL_INTERVAL_MS = 10_000;
