/**
 * @file packages/supervisor/src/ring-buffer.ts
 * @description In-memory high-throughput circular log buffer with ANSI retention and fast search filtering.
 * @module @yuva-devlab/supervisor
 * @author yuva.devlab@gmail.com
 */

import type { ProcessLogEntry, ProcessLogLevel } from "./types";

/**
 * High-performance circular buffer for storing and streaming process logs.
 * Retains the latest entries up to capacity, automatically dropping the oldest on overflow.
 */
export class RingBuffer {
  private readonly capacity: number;
  private readonly buffer: (ProcessLogEntry | undefined)[];
  private head = 0;
  private count = 0;

  constructor(capacity = 2000) {
    if (capacity <= 0) {
      throw new Error(
        `RingBuffer capacity must be greater than zero. Received: ${capacity}`,
      );
    }
    this.capacity = capacity;
    this.buffer = new Array<ProcessLogEntry | undefined>(capacity);
  }

  /**
   * Appends a log entry to the buffer in O(1) time.
   */
  push(entry: ProcessLogEntry): void {
    const index = (this.head + this.count) % this.capacity;
    this.buffer[index] = entry;

    if (this.count < this.capacity) {
      this.count++;
    } else {
      // Overwrite oldest item: advance head pointer
      this.head = (this.head + 1) % this.capacity;
    }
  }

  /**
   * Retrieves an ordered array of the latest log entries.
   *
   * @param limit - Optional maximum number of recent lines to retrieve (defaults to all available)
   */
  getSnapshot(limit?: number): ProcessLogEntry[] {
    const total = this.count;
    const take = limit && limit > 0 && limit < total ? limit : total;
    const startIndex = (this.head + (total - take)) % this.capacity;
    const result: ProcessLogEntry[] = new Array(take);

    for (let i = 0; i < take; i++) {
      const idx = (startIndex + i) % this.capacity;
      const item = this.buffer[idx];
      if (item !== undefined) {
        result[i] = item;
      }
    }

    return result;
  }

  /**
   * Searches for log entries containing the specified text substring.
   */
  search(query: string, limit?: number): ProcessLogEntry[] {
    const q = query.toLowerCase();
    const snapshot = this.getSnapshot();
    const matched = snapshot.filter(
      (entry) =>
        entry.message.toLowerCase().includes(q) ||
        entry.raw.toLowerCase().includes(q),
    );
    return limit && limit > 0 ? matched.slice(-limit) : matched;
  }

  /**
   * Filters log entries by their evaluated severity level.
   */
  filterByLevel(level: ProcessLogLevel, limit?: number): ProcessLogEntry[] {
    const snapshot = this.getSnapshot();
    const matched = snapshot.filter((entry) => entry.level === level);
    return limit && limit > 0 ? matched.slice(-limit) : matched;
  }

  /**
   * Resets all buffer storage.
   */
  clear(): void {
    this.buffer.fill(undefined);
    this.head = 0;
    this.count = 0;
  }

  /**
   * Current number of stored log entries.
   */
  get size(): number {
    return this.count;
  }

  /**
   * Maximum capacity of the circular buffer.
   */
  get maxCapacity(): number {
    return this.capacity;
  }
}
