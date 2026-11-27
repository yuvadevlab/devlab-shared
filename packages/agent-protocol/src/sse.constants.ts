/**
 * @file packages/agent-protocol/src/sse.constants.ts
 * @description Canonical HTTP status and response headers for Server-Sent Event (SSE) agent streams.
 * @module @yuva-devlab/agent-protocol/sse-constants
 */

/**
 * HTTP status code required for SSE streaming responses.
 * Reverse proxies (such as Cloud Run / Google Frontend) buffer non-200 responses like 201 Created.
 */
export const SSE_HTTP_STATUS_OK = 200;

/**
 * Canonical HTTP response headers for unbuffered SSE streams.
 */
export const SSE_RESPONSE_HEADERS = {
  CONTENT_TYPE: "Content-Type",
  CONTENT_TYPE_VALUE: "text/event-stream; charset=utf-8",
  CACHE_CONTROL: "Cache-Control",
  CACHE_CONTROL_VALUE: "no-cache, no-transform",
  CONNECTION: "Connection",
  CONNECTION_VALUE: "keep-alive",
  ACCEL_BUFFERING: "X-Accel-Buffering",
  ACCEL_BUFFERING_VALUE: "no",
} as const;
