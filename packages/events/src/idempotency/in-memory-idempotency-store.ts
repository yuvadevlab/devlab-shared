/**
 * @file packages/events/src/idempotency/in-memory-idempotency-store.ts
 * @description In-memory TTL idempotency store implementation for testing and single-node services.
 * @module @yuva-devlab/events
 */

import type {
  IIdempotencyStore,
  IdempotencyAcquireResult,
} from "./idempotency-store.interface";

interface RecordEntry {
  state: "IN_FLIGHT" | "COMPLETED";
  expiresAt: number;
  completedAt?: string;
}

/**
 * Single-process in-memory idempotency store with active expiration.
 */
export class InMemoryIdempotencyStore implements IIdempotencyStore {
  private readonly records = new Map<string, RecordEntry>();

  public async acquire(
    key: string,
    ttlSeconds = 60,
  ): Promise<IdempotencyAcquireResult> {
    this.cleanExpired();
    const existing = this.records.get(key);

    if (existing) {
      if (existing.state === "COMPLETED") {
        return {
          state: "ALREADY_COMPLETED",
          completedAt: existing.completedAt ?? new Date().toISOString(),
        };
      }
      return { state: "IN_FLIGHT" };
    }

    // Acquire new in-flight lock
    this.records.set(key, {
      state: "IN_FLIGHT",
      expiresAt: Date.now() + ttlSeconds * 1000,
    });

    return { state: "ACQUIRED" };
  }

  public async markCompleted(
    key: string,
    retentionSeconds = 86400,
  ): Promise<void> {
    this.records.set(key, {
      state: "COMPLETED",
      completedAt: new Date().toISOString(),
      expiresAt: Date.now() + retentionSeconds * 1000,
    });
  }

  public async release(key: string): Promise<void> {
    this.records.delete(key);
  }

  private cleanExpired(): void {
    const now = Date.now();
    for (const [key, entry] of this.records.entries()) {
      if (entry.expiresAt <= now) {
        this.records.delete(key);
      }
    }
  }
}
