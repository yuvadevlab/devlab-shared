/**
 * @file packages/rag/src/similarity/cosine-similarity.ts
 * @description Vector cosine similarity calculation for high-dimensional embeddings.
 * @module @yuva-devlab/rag
 */

/**
 * Computes cosine similarity between two float vectors.
 * Returns a value between -1.0 and 1.0 (1.0 = identical angle).
 *
 * @param a - First vector embedding
 * @param b - Second vector embedding
 * @returns Cosine similarity score rounded to 6 decimal places
 *
 * @example
 * ```typescript
 * import { cosineSimilarity } from "@yuva-devlab/rag";
 *
 * const score = cosineSimilarity([1, 0], [0, 1]); // 0.0
 * ```
 */
export function cosineSimilarity(
  a: readonly number[],
  b: readonly number[],
): number {
  if (a.length !== b.length || a.length === 0) {
    return 0;
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    const valA = a[i] ?? 0;
    const valB = b[i] ?? 0;
    dotProduct += valA * valB;
    normA += valA * valA;
    normB += valB * valB;
  }

  // Guard against zero-vector division
  if (normA === 0 || normB === 0) {
    return 0;
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  return Number((dotProduct / denominator).toFixed(6));
}
