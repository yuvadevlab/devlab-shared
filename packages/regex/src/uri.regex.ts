/**
 * @file packages/regex/src/uri.regex.ts
 * @description Regular expressions for URI validation, WebSocket endpoints, and tool identifiers.
 * @module @yuva-devlab/regex
 */

/**
 * Standard RFC-3986 canonical URI pattern enforcing protocol scheme and non-empty resource path.
 */
export const CANONICAL_URI_REGEX: RegExp = /^[a-z][a-z0-9+.-]*:\/\/.+$/i;

/**
 * Pattern matching leading http:// or https:// protocol prefixes.
 */
export const HTTP_PROTOCOL_REGEX: RegExp = /^https?:\/\//i;

/**
 * Pattern matching leading ws:// or wss:// protocol prefixes for WebSockets.
 */
export const WEBSOCKET_PROTOCOL_REGEX: RegExp = /^wss?:\/\//i;

/**
 * Pattern matching localhost, 127.0.0.1, or IPv6 ::1 loopback addresses.
 */
export const LOCALHOST_REGEX: RegExp =
  /^(https?:\/\/)?(localhost|127\.0\.0\.1|\[::1\])(:\d+)?(\/.*)?$/i;

/**
 * Identifier pattern for tool names, agent slugs, and resource keys (lowercase alphanumeric, dashes, underscores).
 */
export const TOOL_NAME_REGEX: RegExp = /^[a-zA-Z0-9_-]+$/;

/**
 * Canonical channel or pub/sub topic prefix pattern across DevLab realtime buses.
 */
export const REALTIME_CHANNEL_PREFIX_REGEX: RegExp =
  /^devlab:(realtime|events):/;

/**
 * Validates whether a candidate string is a well-formed HTTP/HTTPS URL.
 *
 * @param candidate - Candidate URL string.
 * @returns True if valid HTTP(S) URL.
 */
export function isValidHttpUrl(candidate: string): boolean {
  // Guard against non-string input
  if (!candidate || typeof candidate !== "string") {
    return false;
  }
  try {
    const url = new URL(candidate);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    // URL parsing threw syntax exception
    return false;
  }
}

/**
 * Validates whether a candidate string is a well-formed WebSocket URL.
 *
 * @param candidate - Candidate WebSocket URL string.
 * @returns True if valid WS(S) URL.
 */
export function isValidWebSocketUrl(candidate: string): boolean {
  // Guard against non-string input
  if (!candidate || typeof candidate !== "string") {
    return false;
  }
  try {
    const url = new URL(candidate);
    return url.protocol === "ws:" || url.protocol === "wss:";
  } catch {
    // URL parsing threw syntax exception
    return false;
  }
}
