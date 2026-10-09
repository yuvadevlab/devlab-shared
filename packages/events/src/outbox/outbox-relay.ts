/**
 * @file packages/events/src/outbox/outbox-relay.ts
 * @description Background polling relay engine delivering transactional outbox events to the event bus.
 * @module @yuva-devlab/events
 */

import { logger } from "@yuva-devlab/logger";
import type { IEventPublisher } from "../contracts/event-bus.interface";
import type { IOutboxStore } from "./outbox-store.interface";

/**
 * Configuration options for the background outbox dispatch relay.
 */
export interface OutboxRelayOptions {
  /** Polling interval in milliseconds (default: 1000ms) */
  pollIntervalMs?: number;
  /** Max records to drain in each tick (default: 50) */
  batchSize?: number;
}

/**
 * Background poller ensuring guaranteed at-least-once delivery of outbox records.
 */
export class OutboxRelay {
  private isRunning = false;
  private timer: NodeJS.Timeout | null = null;
  private readonly pollIntervalMs: number;
  private readonly batchSize: number;

  constructor(
    private readonly store: IOutboxStore,
    private readonly publisher: IEventPublisher,
    options: OutboxRelayOptions = {},
  ) {
    this.pollIntervalMs = options.pollIntervalMs ?? 1000;
    this.batchSize = options.batchSize ?? 50;
  }

  /**
   * Starts the background relay polling loop.
   */
  public start(): void {
    if (this.isRunning) {
      return;
    }
    this.isRunning = true;
    this.scheduleNextTick();
    logger.info("OutboxRelay started", {
      pollIntervalMs: this.pollIntervalMs,
      batchSize: this.batchSize,
    });
  }

  /**
   * Stops the background relay polling loop.
   */
  public stop(): void {
    this.isRunning = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    logger.info("OutboxRelay stopped");
  }

  /**
   * Executes a single polling tick, draining pending outbox records.
   *
   * @returns Number of events successfully processed during this tick.
   */
  public async drainOnce(): Promise<number> {
    try {
      const records = await this.store.fetchPending(this.batchSize);
      if (records.length === 0) {
        return 0;
      }

      let processedCount = 0;
      for (const record of records) {
        try {
          await this.publisher.publish(record.envelope);
          await this.store.markPublished(record.id);
          processedCount++;
        } catch (publishError) {
          const errMsg =
            publishError instanceof Error
              ? publishError.message
              : String(publishError);
          logger.error("OutboxRelay failed to publish event", {
            recordId: record.id,
            error: errMsg,
          });
          await this.store.markFailed(record.id, errMsg);
        }
      }

      return processedCount;
    } catch (storeError) {
      logger.error("OutboxRelay error fetching pending records", {
        error:
          storeError instanceof Error ? storeError.message : String(storeError),
      });
      return 0;
    }
  }

  /**
   * Schedules the next execution tick with timer guard.
   */
  private scheduleNextTick(): void {
    if (!this.isRunning) {
      return;
    }
    this.timer = setTimeout(async () => {
      await this.drainOnce();
      this.scheduleNextTick();
    }, this.pollIntervalMs);
  }
}
