/**
 * @file packages/semantic-cache/src/similarity/cosine-similarity.ts
 * @description Mathematical calculation of cosine similarity between high-dimensional float vectors.
 * @module @yuva-devlab/semantic-cache
 */

/**
 * Calculates the cosine similarity between two floating-point vectors.
 *
 * Formula: dot_product(a, b) / (||a|| * ||b||)
 * Returns a score between -1.0 and 1.0, where 1.0 indicates identical directional orientation.
 *
 * @param a - First float vector embedding
 * @param b - Second float vector embedding
 * @returns Cosine similarity score rounded to 6 decimal places, or 0 if invalid/empty
 *
 * @example
 * ```typescript
 * import { cosineSimilarity } from "@yuva-devlab/semantic-cache";
 *
 * const vecA = [0.1, 0.5, 0.8];
 * const vecB = [0.1, 0.5, 0.8];
 * const score = cosineSimilarity(vecA, vecB);
 * // Returns 1.0
 * ```
 */
export function cosineSimilarity(
  a: readonly number[],
  b: readonly number[],
): number {
  // Guard: vectors must have matching non-zero lengths to be compared
  if (a.length !== b.length || a.length === 0) {
    return 0;
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  // Single pass calculation for dot product and euclidean norms
  for (let i = 0; i < a.length; i++) {
    const valA = a[i] ?? 0;
    const valB = b[i] ?? 0;
    dotProduct += valA * valB;
    normA += valA * valA;
    normB += valB * valB;
  }

  // Guard against division by zero for null/zero vectors
  if (normA === 0 || normB === 0) {
    return 0;
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  // Round to 6 decimal places to normalize floating-point artifacts
  return Number((dotProduct / denominator).toFixed(6));
}
