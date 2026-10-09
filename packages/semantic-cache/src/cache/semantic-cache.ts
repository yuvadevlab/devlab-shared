/**
 * @file packages/semantic-cache/src/cache/semantic-cache.ts
 * @description In-memory semantic vector cache providing cosine similarity-based deduplication.
 * @module @yuva-devlab/semantic-cache
 */

import { randomUUID } from "node:crypto";
import { Logger, loggerWithConfig } from "@yuva-devlab/logger";
import {
  DEFAULT_SIMILARITY_THRESHOLD,
  DEFAULT_CACHE_TTL_MS,
  DEFAULT_MAX_CACHE_ENTRIES,
} from "../constants";
import { cosineSimilarity } from "../similarity";
import {
  CacheHitStatus,
  type IEmbeddingProvider,
  type SemanticCacheEntry,
  type SemanticCacheOptions,
  type CacheLookupResult,
  type SemanticCacheStats,
} from "../types";
import { CacheMetricsCollector } from "./cache-metrics";

const logger = loggerWithConfig(new Logger("SemanticCache"));

/**
 * In-memory semantic vector cache that matches inbound prompts against cached embeddings.
 *
 * @template T - The stored value payload type
 *
 * @example
 * ```typescript
 * import { SemanticCache } from "@yuva-devlab/semantic-cache";
 *
 * const cache = new SemanticCache<string>(embeddingProvider, {
 *   similarityThreshold: 0.95,
 *   defaultTtlMs: 3_600_000,
 * });
 *
 * await cache.set("What is the capital of France?", "Paris");
 * const match = await cache.get("What is capital of France?");
 * ```
 */
export class SemanticCache<T = unknown> {
  private readonly entries = new Map<string, SemanticCacheEntry<T>>();
  private readonly metrics = new CacheMetricsCollector();
  private readonly similarityThreshold: number;
  private readonly defaultTtlMs: number;
  private readonly maxEntries: number;

  /**
   * Initializes a new SemanticCache instance.
   *
   * @param embeddingProvider - Provider used to generate vector embeddings
   * @param options - Cache thresholds and capacity configurations
   */
  public constructor(
    private readonly embeddingProvider: IEmbeddingProvider,
    options: SemanticCacheOptions = {},
  ) {
    this.similarityThreshold =
      options.similarityThreshold ?? DEFAULT_SIMILARITY_THRESHOLD;
    this.defaultTtlMs = options.defaultTtlMs ?? DEFAULT_CACHE_TTL_MS;
    this.maxEntries = options.maxEntries ?? DEFAULT_MAX_CACHE_ENTRIES;

    logger.debug("[constructor] SemanticCache initialized", {
      similarityThreshold: this.similarityThreshold,
      defaultTtlMs: this.defaultTtlMs,
      maxEntries: this.maxEntries,
    });
  }

  /**
   * Looks up a cached value for an inbound prompt based on cosine vector similarity.
   *
   * @param prompt - Query text prompt to evaluate
   * @returns CacheLookupResult with match status, score, and stored value
   */
  public async get(prompt: string): Promise<CacheLookupResult<T>> {
    const trimmed = prompt.trim();
    if (!trimmed || this.entries.size === 0) {
      this.metrics.recordMiss();
      return { status: CacheHitStatus.MISS };
    }

    const queryEmbedding = await this.embeddingProvider.embedText(trimmed);
    const now = Date.now();

    let bestScore = -1;
    let bestEntry: SemanticCacheEntry<T> | null = null;

    for (const entry of this.entries.values()) {
      if (now > entry.expiresAt) {
        this.entries.delete(entry.id);
        continue;
      }

      const score = cosineSimilarity(queryEmbedding, entry.embedding);
      if (score > bestScore) {
        bestScore = score;
        bestEntry = entry;
      }
    }

    if (bestEntry && bestScore >= this.similarityThreshold) {
      bestEntry.hits += 1;
      this.metrics.recordHit();

      logger.debug("[get] SemanticCache hit", {
        entryId: bestEntry.id,
        score: bestScore,
        hits: bestEntry.hits,
      });

      return {
        status: CacheHitStatus.HIT,
        value: bestEntry.value,
        similarityScore: bestScore,
        entry: bestEntry,
      };
    }

    this.metrics.recordMiss();
    logger.debug("[get] SemanticCache miss", {
      bestScore: bestScore > 0 ? bestScore : undefined,
      threshold: this.similarityThreshold,
    });

    return {
      status: CacheHitStatus.MISS,
      similarityScore: bestScore > 0 ? bestScore : undefined,
    };
  }

  /**
   * Stores a prompt-value pair with calculated dense vector embeddings.
   *
   * @param prompt - Query prompt to index
   * @param value - Output payload or structured response to store
   * @param ttlMs - Optional custom expiration duration in milliseconds
   * @returns Newly created SemanticCacheEntry record
   */
  public async set(
    prompt: string,
    value: T,
    ttlMs: number = this.defaultTtlMs,
  ): Promise<SemanticCacheEntry<T>> {
    if (this.entries.size >= this.maxEntries) {
      const oldestKey = this.entries.keys().next().value;
      if (oldestKey) {
        this.entries.delete(oldestKey);
        logger.debug("[set] SemanticCache LRU evicted oldest entry", {
          evictedKey: oldestKey,
        });
      }
    }

    const embedding = await this.embeddingProvider.embedText(prompt.trim());
    const now = Date.now();

    const entry: SemanticCacheEntry<T> = {
      id: randomUUID(),
      prompt: prompt.trim(),
      embedding,
      value,
      createdAt: now,
      expiresAt: now + ttlMs,
      hits: 0,
    };

    this.entries.set(entry.id, entry);
    logger.debug("[set] SemanticCache stored entry", {
      entryId: entry.id,
      ttlMs,
    });
    return entry;
  }

  /**
   * Clears all cached entries from memory.
   */
  public clear(): void {
    const previousSize = this.entries.size;
    this.entries.clear();
    this.metrics.reset();
    logger.info("[clear] SemanticCache cleared", {
      removedEntries: previousSize,
    });
  }

  /**
   * Returns aggregate cache operational telemetry statistics.
   *
   * @returns Telemetry metrics including hits, misses, and ratio
   */
  public getStats(): SemanticCacheStats {
    return this.metrics.getStats(this.entries.size);
  }
}
