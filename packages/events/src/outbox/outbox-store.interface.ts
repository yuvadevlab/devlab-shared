/**
 * @file packages/events/src/outbox/outbox-store.interface.ts
 * @description Storage contract for transactional outbox persistence and status updates.
 * @module @yuva-devlab/events
 */

import type { DomainEventEnvelope } from "../contracts/envelope";
import type { OutboxRecord } from "./outbox-record";

/**
 * Storage contract implemented by relational or KV databases for outbox buffering.
 */
export interface IOutboxStore {
  /**
   * Persists a domain event inside an existing database transaction or atomically.
   *
   * @param envelope - Domain event envelope to queue for publication.
   * @returns Persisted outbox record.
   */
  save(envelope: DomainEventEnvelope): Promise<OutboxRecord>;

  /**
   * Retrieves a batch of pending outbox records ready for dispatch.
   *
   * @param limit - Maximum number of records to retrieve in a single polling tick.
   * @returns Array of pending outbox records.
   */
  fetchPending(limit: number): Promise<OutboxRecord[]>;

  /**
   * Marks a record as successfully published.
   *
   * @param recordId - Unique identifier of the outbox entry.
   */
  markPublished(recordId: string): Promise<void>;

  /**
   * Records a dispatch failure and increments retry attempts.
   *
   * @param recordId - Unique identifier of the outbox entry.
   * @param error - Error description message.
   */
  markFailed(recordId: string, error: string): Promise<void>;
}
