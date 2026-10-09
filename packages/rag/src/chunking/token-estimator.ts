/**
 * @file packages/rag/src/chunking/token-estimator.ts
 * @description Fast heuristic token estimator for chunk character counts.
 * @module @yuva-devlab/rag
 */

import { CHARS_PER_TOKEN_HEURISTIC } from "../constants";

/**
 * Estimates token count for a string using standard 4 characters per token heuristic.
 *
 * @param text - Input text string
 * @returns Estimated token count
 *
 * @example
 * ```typescript
 * import { estimateTokenCount } from "@yuva-devlab/rag";
 *
 * const tokens = estimateTokenCount("Hello world, this is a test.");
 * ```
 */
export function estimateTokenCount(text: string): number {
  if (!text || text.length === 0) {
    return 0;
  }
  return Math.ceil(text.length / CHARS_PER_TOKEN_HEURISTIC);
}
