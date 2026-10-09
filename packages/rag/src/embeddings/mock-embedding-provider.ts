/**
 * @file packages/rag/src/embeddings/mock-embedding-provider.ts
 * @description Deterministic pseudo-embedding provider for testing, offline environments, and air-gapped clusters.
 * @module @yuva-devlab/rag
 */

import { Logger, loggerWithConfig } from "@yuva-devlab/logger";
import type { IEmbeddingProvider } from "./embedding-provider.interface";

const logger = loggerWithConfig(new Logger("MockEmbeddingProvider"));

/**
 * Deterministic mock embedding generator producing unit-normalized vectors.
 *
 * @example
 * ```typescript
 * import { MockEmbeddingProvider } from "@yuva-devlab/rag";
 *
 * const provider = new MockEmbeddingProvider(128);
 * const vector = await provider.embedText("Sample text");
 * ```
 */
export class MockEmbeddingProvider implements IEmbeddingProvider {
  private readonly dimensions: number;

  /**
   * Initializes the mock embedding provider.
   *
   * @param dimensions - Vector dimensionality (defaults to 128)
   */
  public constructor(dimensions = 128) {
    this.dimensions = dimensions;
  }

  /**
   * Generates a deterministic unit-normalized pseudo-vector based on input string character codes.
   *
   * @param text - Source text
   * @returns Normalized floating-point vector
   */
  public async embedText(text: string): Promise<readonly number[]> {
    logger.debug("[embedText] Generating mock embedding", {
      textLength: text.length,
      dimensions: this.dimensions,
    });

    const vector: number[] = new Array(this.dimensions).fill(0);
    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i);
      const idx = (code * (i + 1)) % this.dimensions;
      vector[idx] = (vector[idx] ?? 0) + (code % 31) / 31;
    }

    // Compute Euclidean norm
    let norm = 0;
    for (const val of vector) {
      norm += val * val;
    }
    const magnitude = Math.sqrt(norm);

    // Guard against zero-vector
    if (magnitude === 0) {
      vector[0] = 1.0;
      return vector;
    }

    // Normalize to unit length
    return vector.map((v) => Number((v / magnitude).toFixed(6)));
  }

  /**
   * Generates batch mock embeddings in parallel.
   *
   * @param texts - Array of input texts
   * @returns Array of dense vectors
   */
  public async embedBatch(
    texts: readonly string[],
  ): Promise<readonly (readonly number[])[]> {
    return Promise.all(texts.map((t) => this.embedText(t)));
  }
}
