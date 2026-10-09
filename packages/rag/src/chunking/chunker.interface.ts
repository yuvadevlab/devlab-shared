/**
 * @file packages/rag/src/chunking/chunker.interface.ts
 * @description Contract interfaces and options for document text chunking engines.
 * @module @yuva-devlab/rag
 */

import type { CreateChunkInput } from "../contracts";

/**
 * Options configuring chunk size and overlap windows.
 */
export interface ChunkingOptions {
  /** Maximum chunk size in characters (defaults to DEFAULT_CHUNK_SIZE) */
  readonly chunkSize?: number;
  /** Overlap character count between consecutive chunks (defaults to DEFAULT_CHUNK_OVERLAP) */
  readonly chunkOverlap?: number;
}

/**
 * Interface contract for text chunking implementations.
 */
export interface ITextChunker {
  /**
   * Splits a raw document string into an array of ordered chunk inputs.
   *
   * @param documentId - Parent document UUID
   * @param text - Full raw document text content
   * @param options - Chunking options
   * @returns Array of chunk inputs ready for persistence
   */
  chunkText(
    documentId: string,
    text: string,
    options?: ChunkingOptions,
  ): Promise<readonly CreateChunkInput[]>;
}
