/**
 * @file packages/errors/src/domain-errors.ts
 * @description Standardized domain-specific error classes for the DevLab platform ecosystem.
 *
 * Maps common failure modes to typed error classes with explicit HTTP status codes
 * and canonical error codes.
 *
 * @module @yuva-devlab/errors
 */

import { ErrorCode } from "./codes";
import { DomainError } from "./domain-error";

/**
 * Thrown when runtime input validation or schema assertion fails.
 * Maps to HTTP 400 Bad Request.
 */
export class ValidationError extends DomainError<
  typeof ErrorCode.VALIDATION_ERROR
> {
  constructor(message: string, details?: unknown) {
    super(message, ErrorCode.VALIDATION_ERROR, 400, details);
  }
}

/**
 * Thrown when a requested resource cannot be found.
 * Maps to HTTP 404 Not Found.
 */
export class NotFoundError extends DomainError<typeof ErrorCode.NOT_FOUND> {
  constructor(resource: string, identifier: string) {
    super(
      `${resource} not found with identifier: '${identifier}'`,
      ErrorCode.NOT_FOUND,
      404,
      {
        resource,
        identifier,
      },
    );
  }
}

/**
 * Thrown when an unauthenticated caller attempts an operation requiring authentication.
 * Maps to HTTP 401 Unauthorized.
 */
export class UnauthorizedError extends DomainError<
  typeof ErrorCode.UNAUTHORIZED
> {
  constructor(message = "Authentication credentials required or invalid") {
    super(message, ErrorCode.UNAUTHORIZED, 401);
  }
}

/**
 * Thrown when an authenticated caller lacks sufficient permissions or scopes.
 * Maps to HTTP 403 Forbidden.
 */
export class ForbiddenError extends DomainError<typeof ErrorCode.FORBIDDEN> {
  constructor(message = "Access forbidden: insufficient permissions") {
    super(message, ErrorCode.FORBIDDEN, 403);
  }
}

/**
 * Thrown when an operation violates state uniqueness or concurrent modification constraints.
 * Maps to HTTP 409 Conflict.
 */
export class ConflictError extends DomainError<typeof ErrorCode.CONFLICT> {
  constructor(message: string, details?: unknown) {
    super(message, ErrorCode.CONFLICT, 409, details);
  }
}

/**
 * Thrown when a client or agent exceeds assigned rate limits.
 * Maps to HTTP 429 Too Many Requests.
 */
export class RateLimitError extends DomainError<
  typeof ErrorCode.RATE_LIMIT_EXCEEDED
> {
  constructor(
    message = "Rate limit exceeded. Please retry later.",
    details?: unknown,
  ) {
    super(message, ErrorCode.RATE_LIMIT_EXCEEDED, 429, details);
  }
}

/**
 * Thrown when an external AI model request times out or is throttled.
 * Maps to HTTP 504 Gateway Timeout.
 */
export class ModelTimeoutError extends DomainError<
  typeof ErrorCode.MODEL_TIMEOUT
> {
  constructor(modelName: string, timeoutMs: number) {
    super(
      `Model '${modelName}' request timed out after ${timeoutMs}ms`,
      ErrorCode.MODEL_TIMEOUT,
      504,
      {
        modelName,
        timeoutMs,
      },
    );
  }
}

/**
 * Thrown when an agent tool execution encounters an unhandled runtime error or sandbox violation.
 * Maps to HTTP 502 Bad Gateway.
 */
export class ToolExecutionError extends DomainError<
  typeof ErrorCode.TOOL_EXECUTION_FAILED
> {
  constructor(toolName: string, causeMessage: string, details?: unknown) {
    super(
      `Tool '${toolName}' failed during execution: ${causeMessage}`,
      ErrorCode.TOOL_EXECUTION_FAILED,
      502,
      details,
    );
  }
}

/**
 * Thrown when an agent or user operation violates policy, guardrails, or safety rules.
 * Maps to HTTP 403 Forbidden.
 */
export class PolicyViolationError extends DomainError<
  typeof ErrorCode.POLICY_VIOLATION
> {
  constructor(policyName: string, reason: string, details?: unknown) {
    super(
      `Execution rejected by policy '${policyName}': ${reason}`,
      ErrorCode.POLICY_VIOLATION,
      403,
      details,
    );
  }
}

/**
 * Thrown when an incoming task is rejected because the target queue backlog is saturated.
 * Maps to HTTP 503 Service Unavailable.
 */
export class QueueBackpressureError extends DomainError<
  typeof ErrorCode.QUEUE_BACKPRESSURE
> {
  constructor(queueName: string, backlogCount: number, highWatermark: number) {
    super(
      `Queue '${queueName}' rejected task: backlog (${backlogCount}) exceeded high watermark (${highWatermark})`,
      ErrorCode.QUEUE_BACKPRESSURE,
      503,
      { queueName, backlogCount, highWatermark },
    );
  }
}

/**
 * Thrown when document ingestion, chunking, embedding, vector retrieval, or RAG pipeline fails.
 * Maps to HTTP 500 Internal Server Error.
 */
export class RagError extends DomainError<typeof ErrorCode.RAG_ERROR> {
  constructor(message: string, details?: unknown) {
    super(message, ErrorCode.RAG_ERROR, 500, details);
  }
}

/**
 * Thrown when tenant or workspace budget quota is exhausted.
 * Maps to HTTP 402 Payment Required.
 */
export class BillingQuotaExceededError extends DomainError<
  typeof ErrorCode.BILLING_QUOTA_EXCEEDED
> {
  constructor(tenantId: string, currentUsage: number, limit: number) {
    super(
      `Billing quota exceeded for tenant '${tenantId}': usage (${currentUsage}) reached limit (${limit})`,
      ErrorCode.BILLING_QUOTA_EXCEEDED,
      402,
      { tenantId, currentUsage, limit },
    );
  }
}

/**
 * Thrown when an application is deactivated by control-plane kill-switch.
 * Maps to HTTP 503 Service Unavailable.
 */
export class AppDeactivatedError extends DomainError<
  typeof ErrorCode.APP_DEACTIVATED
> {
  constructor(appId: string) {
    super(
      `Application '${appId}' is deactivated by platform administrator`,
      ErrorCode.APP_DEACTIVATED,
      503,
      { appId },
    );
  }
}
