/**
 * @file packages/logger/src/transports.ts
 * @description Transports for console output, disk persistence, and asynchronous HTTP batching.
 * @author yuva.devlab@gmail.com
 */

import fs from "node:fs";
import type { CanonicalLogEvent, LogLevel } from "./types";

/**
 * Creates an appending file writable stream for log persistence.
 */
export function createFileTransport(filePath: string): NodeJS.WritableStream {
  const dir = filePath.split("/").slice(0, -1).join("/") || ".";
  try {
    fs.mkdirSync(dir, { recursive: true });
  } catch {
    // Directory exists or not writable — best-effort
  }
  return fs.createWriteStream(filePath, { flags: "a", encoding: "utf8" });
}

/**
 * High-performance, non-blocking HTTP batch transport transmitting telemetry events to devlab-logs.
 */
export class HttpBatchTransport {
  private buffer: CanonicalLogEvent[] = [];
  private timer: NodeJS.Timeout | null = null;
  private isFlushing = false;
  private isDestroyed = false;

  constructor(
    private readonly ingestUrl: string,
    private readonly apiKey?: string,
    private readonly batchSize: number = 100,
    private readonly flushIntervalMs: number = 1000,
  ) {
    this.timer = setInterval(() => {
      void this.flush();
    }, this.flushIntervalMs);
    if (this.timer.unref) {
      this.timer.unref();
    }
  }

  /**
   * Pushes a canonical log event to the memory buffer.
   */
  push(event: CanonicalLogEvent): void {
    if (this.isDestroyed) return;
    this.buffer.push(event);
    if (this.buffer.length >= this.batchSize) {
      void this.flush();
    }
  }

  /**
   * Flushes current buffer to devlab-logs HTTP ingestion endpoint.
   */
  async flush(): Promise<void> {
    if (this.isFlushing || this.buffer.length === 0) return;
    this.isFlushing = true;
    const batch = this.buffer.splice(0, this.batchSize);

    try {
      const endpoint = `${this.ingestUrl.replace(/\/$/, "")}/api/v1/logs/batch`;
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (this.apiKey) {
        headers["x-api-key"] = this.apiKey;
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify(batch),
        signal: AbortSignal.timeout(3000),
      });

      if (!res.ok) {
        // If unrecoverable or rate-limited, avoid throwing to prevent application crashes
      }
    } catch {
      // Best-effort delivery; fail gracefully without interrupting business operations
    } finally {
      this.isFlushing = false;
    }
  }

  /**
   * Cleans up timers and flushes remaining buffer on process exit.
   */
  async destroy(): Promise<void> {
    this.isDestroyed = true;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    await this.flush();
  }
}

/** Rank table for log severity comparison */
export const LEVEL_RANK: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};
