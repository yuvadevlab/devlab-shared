/**
 * @file packages/semantic-cache/src/cache/cache-metrics.ts
 * @description Telemetry metrics collector for semantic cache operations.
 * @module @yuva-devlab/semantic-cache
 */

import type { SemanticCacheStats } from "../types";

/**
 * Tracks hit/miss counters and calculates cache efficiency ratios.
 */
export class CacheMetricsCollector {
  private totalHits = 0;
  private totalMisses = 0;

  /**
   * Records a successful cache hit.
   */
  public recordHit(): void {
    this.totalHits++;
  }

  /**
   * Records a cache miss.
   */
  public recordMiss(): void {
    this.totalMisses++;
  }

  /**
   * Resets all metric counters to zero.
   */
  public reset(): void {
    this.totalHits = 0;
    this.totalMisses = 0;
  }

  /**
   * Computes aggregate operational performance statistics.
   *
   * @param totalEntries - Number of active entries currently retained
   * @returns SemanticCacheStats snapshot
   */
  public getStats(totalEntries: number): SemanticCacheStats {
    const totalRequests = this.totalHits + this.totalMisses;
    const hitRatio =
      totalRequests > 0
        ? Number((this.totalHits / totalRequests).toFixed(4))
        : 0;

    return {
      totalHits: this.totalHits,
      totalMisses: this.totalMisses,
      totalEntries,
      hitRatio,
    };
  }
}
