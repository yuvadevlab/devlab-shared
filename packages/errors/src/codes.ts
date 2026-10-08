/**
 * @file packages/errors/src/codes.ts
 * @description Canonical catalog of machine-readable error codes across the DevLab platform ecosystem.
 *
 * Uses standardized UPPERCASE error code values matching enterprise system signals (e.g. ECONNRESET),
 * gRPC status codes, and existing OrchestraI/FinAI domain standards.
 *
 * @module @yuva-devlab/errors
 */

/**
 * Canonical enum-like constant defining all standardized error codes across the DevLab platform.
 * All runtime string values are standardized to UPPERCASE SCREAMING_SNAKE_CASE.
 */
export const ErrorCode = {
  // Standard HTTP / API errors
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  NOT_FOUND: "NOT_FOUND",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  CONFLICT: "CONFLICT",
  RATE_LIMIT_EXCEEDED: "RATE_LIMIT_EXCEEDED",
  BAD_REQUEST: "BAD_REQUEST",
  SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE",
  GATEWAY_TIMEOUT: "GATEWAY_TIMEOUT",
  REQUEST_TIMEOUT: "REQUEST_TIMEOUT",

  // AI & Model execution errors
  MODEL_TIMEOUT: "MODEL_TIMEOUT",
  MODEL_RATE_LIMIT: "MODEL_RATE_LIMIT",
  MODEL_CONTEXT_LENGTH_EXCEEDED: "MODEL_CONTEXT_LENGTH_EXCEEDED",
  MODEL_PROVIDER_ERROR: "MODEL_PROVIDER_ERROR",
  MODEL_OUTPUT_INVALID: "MODEL_OUTPUT_INVALID",

  // Agent, Tool & Swarm errors
  TOOL_EXECUTION_FAILED: "TOOL_EXECUTION_FAILED",
  TOOL_NOT_FOUND: "TOOL_NOT_FOUND",
  TOOL_PERMISSION_DENIED: "TOOL_PERMISSION_DENIED",
  POLICY_VIOLATION: "POLICY_VIOLATION",
  APPROVAL_TIMEOUT: "APPROVAL_TIMEOUT",
  CHECKPOINT_ERROR: "CHECKPOINT_ERROR",
  EXECUTION_ERROR: "EXECUTION_ERROR",

  // Pipeline, Queue & Worker errors
  QUEUE_ERROR: "QUEUE_ERROR",
  QUEUE_BACKPRESSURE: "QUEUE_BACKPRESSURE",
  WORKER_ERROR: "WORKER_ERROR",
  RAG_ERROR: "RAG_ERROR",
  BILLING_QUOTA_EXCEEDED: "BILLING_QUOTA_EXCEEDED",
  SEMANTIC_CACHE_ERROR: "SEMANTIC_CACHE_ERROR",

  // Resilience & Circuit Breaker errors
  CIRCUIT_BREAKER_OPEN: "CIRCUIT_BREAKER_OPEN",
  BULKHEAD_SATURATED: "BULKHEAD_SATURATED",
  DEADLINE_EXCEEDED: "DEADLINE_EXCEEDED",

  // Auth & Platform errors
  APP_DEACTIVATED: "APP_DEACTIVATED",
  TOKEN_EXPIRED: "TOKEN_EXPIRED",
  INVALID_TOKEN: "INVALID_TOKEN",
} as const;

/** Canonical uppercase error code type derived from ErrorCode constant values */
export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

/**
 * Mapping of canonical ErrorCode literals to their respective default HTTP status codes.
 */
export const ERROR_CODE_HTTP_STATUS_MAP: Readonly<Record<ErrorCode, number>> =
  Object.freeze({
    INTERNAL_SERVER_ERROR: 500,
    VALIDATION_ERROR: 400,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    CONFLICT: 409,
    RATE_LIMIT_EXCEEDED: 429,
    BAD_REQUEST: 400,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
    REQUEST_TIMEOUT: 408,

    MODEL_TIMEOUT: 504,
    MODEL_RATE_LIMIT: 429,
    MODEL_CONTEXT_LENGTH_EXCEEDED: 400,
    MODEL_PROVIDER_ERROR: 502,
    MODEL_OUTPUT_INVALID: 422,

    TOOL_EXECUTION_FAILED: 502,
    TOOL_NOT_FOUND: 404,
    TOOL_PERMISSION_DENIED: 403,
    POLICY_VIOLATION: 403,
    APPROVAL_TIMEOUT: 408,
    CHECKPOINT_ERROR: 500,
    EXECUTION_ERROR: 500,

    QUEUE_ERROR: 500,
    QUEUE_BACKPRESSURE: 503,
    WORKER_ERROR: 500,
    RAG_ERROR: 500,
    BILLING_QUOTA_EXCEEDED: 402,
    SEMANTIC_CACHE_ERROR: 500,

    CIRCUIT_BREAKER_OPEN: 503,
    BULKHEAD_SATURATED: 503,
    DEADLINE_EXCEEDED: 504,

    APP_DEACTIVATED: 503,
    TOKEN_EXPIRED: 401,
    INVALID_TOKEN: 401,
  });

/**
 * Normalizes an error code string into its canonical UPPERCASE format.
 *
 * @param code - Raw error code string.
 * @returns Canonical uppercase error code.
 */
export function normalizeErrorCode(code: string): ErrorCode {
  const upper = code.toUpperCase() as ErrorCode;
  // If mapped directly, return uppercase variant
  if (upper in ERROR_CODE_HTTP_STATUS_MAP) {
    return upper;
  }
  // Default fallback if unmapped
  return ErrorCode.INTERNAL_SERVER_ERROR;
}

/**
 * Retrieves the canonical HTTP status code for a given ErrorCode.
 * Defaults to 500 Internal Server Error when unknown.
 *
 * @param code - The machine-readable error code.
 * @returns The associated HTTP status code.
 */
export function getHttpStatusForErrorCode(code: string): number {
  const normalized = normalizeErrorCode(code);
  return ERROR_CODE_HTTP_STATUS_MAP[normalized] ?? 500;
}
