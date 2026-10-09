/**
 * @file packages/rag/src/constants/chunking.constants.ts
 * @description Operational constants and default parameters for document chunking and RAG retrieval.
 * @module @yuva-devlab/rag
 */

/**
 * Default number of characters per document chunk.
 */
export const DEFAULT_CHUNK_SIZE = 500;

/**
 * Default overlapping character count between adjacent chunks to preserve boundary context.
 */
export const DEFAULT_CHUNK_OVERLAP = 50;

/**
 * Minimum allowable chunk size in characters.
 */
export const MIN_CHUNK_SIZE = 50;

/**
 * Maximum allowable chunk size in characters.
 */
export const MAX_CHUNK_SIZE = 4000;

/**
 * Default number of highest-scoring chunks returned from a vector search query.
 */
export const DEFAULT_TOP_K = 5;

/**
 * Default minimum cosine similarity score required for retrieved chunks.
 */
export const DEFAULT_MIN_SCORE = 0.5;

/**
 * Heuristic ratio of characters to tokens used when exact tokenizer is unavailable.
 */
export const CHARS_PER_TOKEN_HEURISTIC = 4.0;
