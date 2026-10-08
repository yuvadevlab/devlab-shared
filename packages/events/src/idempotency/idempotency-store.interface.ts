/**
 * @file packages/events/src/idempotency/idempotency-store.interface.ts
 * @description Contract for distributed idempotency stores preventing duplicate event processing.
 * @module @yuva-devlab/events
 */

/**
 * Result returned when attempting to acquire an idempotency lock for an event key.
 */
export type IdempotencyAcquireResult =
  | { state: "ACQUIRED" }
  | { state: "ALREADY_COMPLETED"; completedAt: string }
  | { state: "IN_FLIGHT" };

/**
 * Interface implemented by Redis, memory, or database idempotency backends.
 */
export interface IIdempotencyStore {
  /**
   * Attempts to acquire an execution lock for a given idempotency key.
   *
   * @param key - The unique event or transaction key.
   * @param ttlSeconds - Lock TTL in seconds.
   * @returns Result indicating whether the lock was acquired, in-flight, or already completed.
   */
  acquire(key: string, ttlSeconds?: number): Promise<IdempotencyAcquireResult>;

  /**
   * Marks the operation as successfully finished with a retention TTL.
   *
   * @param key - The idempotency key.
   * @param retentionSeconds - How long to retain the completed state (default: 86400s / 24h).
   */
  markCompleted(key: string, retentionSeconds?: number): Promise<void>;

  /**
   * Releases an in-flight lock, typically on unexpected processing error to allow retry.
   *
   * @param key - The idempotency key to release.
   */
  release(key: string): Promise<void>;
}
