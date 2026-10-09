/**
 * @file packages/semantic-cache/src/types/cache.types.ts
 * @description Type definitions and contracts for semantic caching and similarity evaluations.
 * @module @yuva-devlab/semantic-cache
 */

/**
 * Result classification returned from a semantic vector cache lookup.
 */
export enum CacheHitStatus {
  /** Embedding match was found with similarity at or above threshold */
  HIT = "HIT",
  /** No match was found or similarity fell below threshold */
  MISS = "MISS",
  /** A matching entry was found but its TTL had elapsed */
  EXPIRED = "EXPIRED",
  /** Cache lookup was bypassed due to explicit override or empty prompt */
  BYPASS = "BYPASS",
}

/**
 * Interface contract for vector embedding generation.
 */
export interface IEmbeddingProvider {
  /**
   * Generates a dense floating-point vector embedding for input text.
   *
   * @param text - Source text to embed
   * @returns Array of floating-point numbers representing the dense vector
   */
  embedText(text: string): Promise<readonly number[]>;

  /**
   * Optional batch embedding generation for multiple texts.
   *
   * @param texts - Array of input texts
   * @returns Array of dense vector arrays
   */
  embedBatch?(
    texts: readonly string[],
  ): Promise<readonly (readonly number[])[]>;
}

/**
 * Stored cache entry containing text, embedding, output payload, and telemetry metadata.
 *
 * @template T - The stored value payload type
 */
export interface SemanticCacheEntry<T = unknown> {
  /** Unique identifier for the cached record */
  readonly id: string;
  /** Inbound user prompt or query text */
  readonly prompt: string;
  /** Normalized float vector embedding */
  readonly embedding: readonly number[];
  /** Cached result payload or structured response */
  readonly value: T;
  /** Epoch timestamp in milliseconds when entry was stored */
  readonly createdAt: number;
  /** Epoch timestamp in milliseconds when entry expires */
  readonly expiresAt: number;
  /** Lifetime count of cache hits served by this entry */
  hits: number;
}

/**
 * Configuration options for initializing a semantic cache instance.
 */
export interface SemanticCacheOptions {
  /**
   * Minimum cosine similarity required to declare a cache hit (0.0 to 1.0).
   * @default 0.97
   */
  readonly similarityThreshold?: number;
  /**
   * Default time-to-live in milliseconds before cached entries expire.
   * @default 3600000 (1 hour)
   */
  readonly defaultTtlMs?: number;
  /**
   * Maximum number of entries maintained in memory before LRU eviction.
   * @default 10000
   */
  readonly maxEntries?: number;
}

/**
 * Outcome resolution returned from an embedding-based cache lookup.
 *
 * @template T - The stored value payload type
 */
export interface CacheLookupResult<T = unknown> {
  /** Cache hit or miss status */
  readonly status: CacheHitStatus;
  /** The retrieved value if status is HIT */
  readonly value?: T;
  /** Cosine similarity score achieved against best matching entry */
  readonly similarityScore?: number;
  /** The full cached entry if status is HIT */
  readonly entry?: SemanticCacheEntry<T>;
}

/**
 * Operational telemetry metrics and performance statistics for the cache.
 */
export interface SemanticCacheStats {
  /** Total number of successful cache hits */
  readonly totalHits: number;
  /** Total number of cache misses */
  readonly totalMisses: number;
  /** Total number of active entries currently retained in the cache */
  readonly totalEntries: number;
  /** Ratio of hits to total requests (0.0000 to 1.0000) */
  readonly hitRatio: number;
}
