/**
 * @file packages/rag/src/chunking/text-chunker.ts
 * @description Recursive text chunker splitting documents by structural boundaries with sliding overlap.
 * @module @yuva-devlab/rag
 */

import { Logger, loggerWithConfig } from "@yuva-devlab/logger";
import {
  DEFAULT_CHUNK_OVERLAP,
  DEFAULT_CHUNK_SIZE,
  MAX_CHUNK_SIZE,
  MIN_CHUNK_SIZE,
} from "../constants";
import type { CreateChunkInput } from "../contracts";
import type { ChunkingOptions, ITextChunker } from "./chunker.interface";
import { estimateTokenCount } from "./token-estimator";

const logger = loggerWithConfig(new Logger("TextChunker"));

/**
 * Structural text chunker that decomposes long documents into overlapping segments.
 *
 * @example
 * ```typescript
 * import { TextChunker } from "@yuva-devlab/rag";
 *
 * const chunker = new TextChunker();
 * const chunks = await chunker.chunkText("doc_uuid", "Document content...", {
 *   chunkSize: 500,
 *   chunkOverlap: 50,
 * });
 * ```
 */
export class TextChunker implements ITextChunker {
  /**
   * Splits a raw document string into an array of ordered chunk inputs.
   *
   * @param documentId - Parent document UUID
   * @param text - Full raw document text content
   * @param options - Chunking options
   * @returns Array of chunk inputs ready for persistence
   */
  public async chunkText(
    documentId: string,
    text: string,
    options?: ChunkingOptions,
  ): Promise<readonly CreateChunkInput[]> {
    const rawText = text.trim();
    if (!rawText) {
      return [];
    }

    const chunkSize = Math.max(
      MIN_CHUNK_SIZE,
      Math.min(MAX_CHUNK_SIZE, options?.chunkSize ?? DEFAULT_CHUNK_SIZE),
    );
    const chunkOverlap = Math.max(
      0,
      Math.min(chunkSize - 1, options?.chunkOverlap ?? DEFAULT_CHUNK_OVERLAP),
    );

    logger.debug("[chunkText] Initiating document text chunking", {
      documentId,
      textLength: rawText.length,
      chunkSize,
      chunkOverlap,
    });

    const chunks: CreateChunkInput[] = [];
    let start = 0;
    let chunkIndex = 0;

    while (start < rawText.length) {
      let end = start + chunkSize;

      // If not at the end of the document, try to break cleanly at sentence or paragraph boundary
      if (end < rawText.length) {
        const slice = rawText.slice(start, end);
        const lastDoubleNewline = slice.lastIndexOf("\n\n");
        const lastNewline = slice.lastIndexOf("\n");
        const lastPeriod = slice.lastIndexOf(". ");

        // Prefer breaking at paragraph or sentence endings if reasonably close to the chunk limit
        const minBreakPoint = Math.floor(chunkSize * 0.6);
        if (lastDoubleNewline > minBreakPoint) {
          end = start + lastDoubleNewline + 2;
        } else if (lastPeriod > minBreakPoint) {
          end = start + lastPeriod + 2;
        } else if (lastNewline > minBreakPoint) {
          end = start + lastNewline + 1;
        }
      } else {
        end = rawText.length;
      }

      const chunkContent = rawText.slice(start, end).trim();
      if (chunkContent.length > 0) {
        chunks.push({
          documentId,
          chunkIndex,
          content: chunkContent,
          tokenCount: estimateTokenCount(chunkContent),
          metadata: {
            startOffset: start,
            endOffset: end,
          },
        });
        chunkIndex++;
      }

      // Advance window with sliding overlap
      const step = end - start - chunkOverlap;
      start += Math.max(1, step);
    }

    logger.info("[chunkText] Document chunking completed", {
      documentId,
      totalChunks: chunks.length,
    });

    return chunks;
  }
}
