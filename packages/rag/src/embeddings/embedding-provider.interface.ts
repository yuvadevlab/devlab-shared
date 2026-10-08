/**
 * @file packages/rag/src/embeddings/embedding-provider.interface.ts
 * @description Contract interface for generating dense vector embeddings from text.
 * @module @yuva-devlab/rag
 */

/**
 * Universal interface contract for dense vector embedding generation.
 */
export interface IEmbeddingProvider {
  /**
   * Generates a normalized dense vector embedding for single input text.
   *
   * @param text - Source string to embed
   * @returns Array of floating-point numbers representing the dense vector
   */
  embedText(text: string): Promise<readonly number[]>;

  /**
   * Batch generation of dense vector embeddings for multiple texts.
   *
   * @param texts - Array of input strings
   * @returns Array of vector arrays
   */
  embedBatch(texts: readonly string[]): Promise<readonly (readonly number[])[]>;
}
