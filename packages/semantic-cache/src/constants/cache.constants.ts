/**
 * @file packages/semantic-cache/src/constants/cache.constants.ts
 * @description Centralized operational constants for semantic caching and similarity search.
 * @module @yuva-devlab/semantic-cache
 */

/**
 * Default cosine similarity threshold required to declare a cache hit.
 * 0.97 represents near-verbatim or strictly identical semantic intent.
 */
export const DEFAULT_SIMILARITY_THRESHOLD = 0.97;

/**
 * Minimum permitted cosine similarity threshold allowed in cache configurations.
 */
export const MIN_SIMILARITY_THRESHOLD = 0.5;

/**
 * Maximum permitted cosine similarity threshold allowed in cache configurations.
 */
export const MAX_SIMILARITY_THRESHOLD = 1.0;

/**
 * Default duration in milliseconds before cached entries expire (1 hour = 3,600,000 ms).
 */
export const DEFAULT_CACHE_TTL_MS = 3_600_000;

/**
 * Default maximum number of cached vector entries maintained in memory before LRU eviction.
 */
export const DEFAULT_MAX_CACHE_ENTRIES = 10_000;
