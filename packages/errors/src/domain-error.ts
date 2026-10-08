/**
 * @file packages/errors/src/domain-error.ts
 * @description Base domain error class for the DevLab platform ecosystem.
 * Enforces structured error codes, HTTP status mapping, operational tracking, and JSON serialization.
 *
 * @module @yuva-devlab/errors
 */

import {
  type ErrorCode,
  ErrorCode as ErrorCodeEnum,
  getHttpStatusForErrorCode,
  normalizeErrorCode,
} from "./codes";

/**
 * Standardized serializable payload representing an error across network and log boundaries.
 */
export interface SerializedDomainError {
  /** The error constructor or class name */
  readonly name: string;
  /** Human-readable explanation of what failed */
  readonly message: string;
  /** Machine-readable error code in canonical uppercase form */
  readonly code: string;
  /** Canonical HTTP status code equivalent */
  readonly statusCode: number;
  /** Indicates whether the failure is an expected domain operational issue or fatal defect */
  readonly isOperational: boolean;
  /** Contextual debug metadata, payload, or schema validation issues */
  readonly details?: unknown;
  /** ISO-8601 timestamp when the error occurred */
  readonly timestamp: string;
}

/**
 * Root domain error class for all DevLab applications, packages, and services.
 * All domain, infrastructure, and runtime errors must inherit from this class.
 *
 * @typeParam TCode - Machine-readable error code narrowed to an ErrorCode literal.
 */
export class DomainError<TCode extends ErrorCode = ErrorCode> extends Error {
  /** ISO-8601 timestamp recorded at instantiation */
  public readonly timestamp: string;

  /** True if error is an expected operational occurrence (e.g. invalid input, network timeout) */
  public readonly isOperational: boolean;

  /**
   * Constructs a typed DomainError instance.
   *
   * @param message - Human-readable error description.
   * @param code - Machine-readable error code constrained to ErrorCode.
   * @param statusCode - Optional HTTP status override. If omitted, inferred from code map.
   * @param details - Optional contextual debug metadata or structured validation issues.
   * @param isOperational - Flags whether the error is expected domain behavior (default: true).
   */
  constructor(
    message: string,
    public readonly code: TCode = ErrorCodeEnum.INTERNAL_SERVER_ERROR as TCode,
    public readonly statusCode: number = getHttpStatusForErrorCode(code),
    public readonly details?: unknown,
    isOperational = true,
  ) {
    super(message);
    this.name = this.constructor.name;
    this.timestamp = new Date().toISOString();
    this.isOperational = isOperational;

    // Preserve clean stack trace in V8 runtimes without the constructor frame
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  /**
   * Serializes the error to a clean JSON-compatible data transfer object.
   * Strips non-enumerable properties while preserving typed properties.
   *
   * @returns SerializedDomainError representation safe for HTTP/gRPC transport.
   */
  public toJSON(): SerializedDomainError {
    return {
      name: this.name,
      message: this.message,
      code: normalizeErrorCode(this.code),
      statusCode: this.statusCode,
      isOperational: this.isOperational,
      details: this.details,
      timestamp: this.timestamp,
    };
  }

  /**
   * Type guard to check if an unknown error object is an instance of DomainError.
   *
   * @param error - The candidate object or exception to inspect.
   * @returns True if error inherits from DomainError.
   */
  public static isDomainError(error: unknown): error is DomainError {
    // Verify object reference and prototype chain
    if (!error || typeof error !== "object") {
      return false;
    }
    return error instanceof DomainError;
  }
}

/**
 * Alias for DomainError to maintain drop-in compatibility across legacy services.
 */
export const PlatformError = DomainError;
