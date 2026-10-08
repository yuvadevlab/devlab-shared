/**
 * @file packages/errors/src/result.ts
 * @description Type-safe functional Result<T, E> monad for resilient control flow without throwing.
 *
 * Provides a standardized mechanism to return outcomes explicitly, eliminating unhandled
 * runtime exceptions across internal pipeline and async service boundaries.
 *
 * @module @yuva-devlab/errors
 */

/**
 * Successful Result container carrying a computed payload.
 */
export interface Ok<T> {
  readonly ok: true;
  readonly value: T;
}

/**
 * Erroneous Result container carrying a domain or operational failure.
 */
export interface Err<E> {
  readonly ok: false;
  readonly error: E;
}

/**
 * Discriminated union representing either a successful outcome Ok<T> or an error Err<E>.
 */
export type Result<T, E = Error> = Ok<T> | Err<E>;

/**
 * Creates a successful Ok result containing the provided value.
 *
 * @param value - The successful return payload.
 * @returns Ok<T> object.
 */
export function ok<T>(value: T): Ok<T> {
  return { ok: true, value };
}

/**
 * Creates an erroneous Err result containing the provided error.
 *
 * @param error - The failure object or error instance.
 * @returns Err<E> object.
 */
export function err<E>(error: E): Err<E> {
  return { ok: false, error };
}

/**
 * Type guard verifying if a Result is Ok<T>.
 *
 * @param result - The candidate Result instance.
 * @returns True if result succeeded.
 */
export function isOk<T, E>(result: Result<T, E>): result is Ok<T> {
  // Check the discriminant boolean
  return result.ok === true;
}

/**
 * Type guard verifying if a Result is Err<E>.
 *
 * @param result - The candidate Result instance.
 * @returns True if result failed.
 */
export function isErr<T, E>(result: Result<T, E>): result is Err<E> {
  // Check the discriminant boolean
  return result.ok === false;
}

/**
 * Transforms the wrapped value in an Ok result using the supplied mapping function.
 *
 * @param result - Input result.
 * @param fn - Transformer applied only if result is Ok.
 * @returns New Result with transformed value or preserved error.
 */
export function mapResult<T, U, E>(
  result: Result<T, E>,
  fn: (value: T) => U,
): Result<U, E> {
  // Pass through error when result is Err
  if (!result.ok) {
    return result;
  }
  return ok(fn(result.value));
}

/**
 * Transforms the wrapped error in an Err result using the supplied mapping function.
 *
 * @param result - Input result.
 * @param fn - Transformer applied only if result is Err.
 * @returns New Result with preserved value or transformed error.
 */
export function mapErrResult<T, E, F>(
  result: Result<T, E>,
  fn: (error: E) => F,
): Result<T, F> {
  // Pass through value when result is Ok
  if (result.ok) {
    return result;
  }
  return err(fn(result.error));
}

/**
 * Unwraps the value from an Ok result, or throws the contained error if Err.
 *
 * @param result - Input result.
 * @returns Contained successful value.
 * @throws The contained error instance if result is Err.
 */
export function unwrapResult<T, E>(result: Result<T, E>): T {
  // Guard against erroneous result
  if (!result.ok) {
    if (result.error instanceof Error) {
      throw result.error;
    }
    throw new Error(String(result.error));
  }
  return result.value;
}

/**
 * Unwraps the value from an Ok result, or falls back to a provided default value.
 *
 * @param result - Input result.
 * @param fallback - Default fallback value if result is Err.
 * @returns Contained value or fallback.
 */
export function unwrapOrResult<T, E>(result: Result<T, E>, fallback: T): T {
  // Return fallback when result is Err
  if (!result.ok) {
    return fallback;
  }
  return result.value;
}

/**
 * Pattern-matches across Ok and Err branches, returning the computed branch value.
 *
 * @param result - Input result.
 * @param branches - Handler object containing ok and err branches.
 * @returns Value produced by the executed branch handler.
 */
export function matchResult<T, E, R>(
  result: Result<T, E>,
  branches: { ok: (value: T) => R; err: (error: E) => R },
): R {
  // Branch on discrimination flag
  if (result.ok) {
    return branches.ok(result.value);
  }
  return branches.err(result.error);
}
