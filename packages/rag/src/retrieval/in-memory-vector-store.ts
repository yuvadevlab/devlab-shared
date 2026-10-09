/**
 * @file packages/rag/src/retrieval/in-memory-vector-store.ts
 * @description In-memory dense vector storage and cosine similarity retrieval engine.
 * @module @yuva-devlab/rag
 */

import { Logger, loggerWithConfig } from "@yuva-devlab/logger";
import { DEFAULT_MIN_SCORE, DEFAULT_TOP_K } from "../constants";
import type {
  DocumentChunk,
  RagQuery,
  RagSearchResult,
  ScoredDocumentChunk,
} from "../contracts";
import type { IEmbeddingProvider } from "../embeddings";
import { cosineSimilarity } from "../similarity";

const logger = loggerWithConfig(new Logger("InMemoryVectorStore"));

/**
 * High-speed in-memory vector store matching query embeddings against stored chunks.
 *
 * @example
 * ```typescript
 * import { InMemoryVectorStore, MockEmbeddingProvider } from "@yuva-devlab/rag";
 *
 * const store = new InMemoryVectorStore(new MockEmbeddingProvider());
 * await store.addChunks([chunk1, chunk2]);
 * const results = await store.search({ query: "What is the policy?", topK: 3 });
 * ```
 */
export class InMemoryVectorStore {
  private readonly chunks = new Map<string, DocumentChunk>();

  /**
   * Initializes the vector store.
   *
   * @param embeddingProvider - Provider used to generate query embeddings during search
   */
  public constructor(private readonly embeddingProvider: IEmbeddingProvider) {}

  /**
   * Adds or updates document chunks in the store.
   *
   * @param chunks - Array of DocumentChunk records (must contain embeddings)
   */
  public async addChunks(chunks: readonly DocumentChunk[]): Promise<void> {
    for (const chunk of chunks) {
      this.chunks.set(chunk.chunkId, chunk);
    }
    logger.debug("[addChunks] Added chunks to vector store", {
      count: chunks.length,
      totalStoreSize: this.chunks.size,
    });
  }

  /**
   * Executes a similarity search against stored chunk embeddings.
   *
   * @param query - Search query parameters
   * @returns Scored document chunks ranked by descending similarity
   */
  public async search(query: RagQuery): Promise<RagSearchResult> {
    const startTime = Date.now();
    const topK = query.topK ?? DEFAULT_TOP_K;
    const minScore = query.minScore ?? DEFAULT_MIN_SCORE;

    logger.debug("[search] Executing vector similarity search", {
      query: query.query,
      topK,
      minScore,
      candidatePoolSize: this.chunks.size,
    });

    if (this.chunks.size === 0) {
      return {
        query: query.query,
        matches: [],
        durationMs: Date.now() - startTime,
      };
    }

    const queryEmbedding = await this.embeddingProvider.embedText(query.query);
    const scoredCandidates: ScoredDocumentChunk[] = [];

    for (const chunk of this.chunks.values()) {
      // Filter by documentId if specified
      if (query.documentId && chunk.documentId !== query.documentId) {
        continue;
      }

      if (!chunk.embedding || chunk.embedding.length === 0) {
        continue;
      }

      const score = cosineSimilarity(queryEmbedding, chunk.embedding);
      if (score >= minScore) {
        scoredCandidates.push({
          chunk,
          score,
        });
      }
    }

    // Sort by descending score and take topK
    scoredCandidates.sort((a, b) => b.score - a.score);
    const matches = scoredCandidates.slice(0, topK);
    const durationMs = Date.now() - startTime;

    logger.info("[search] Vector search completed", {
      query: query.query,
      matchesFound: matches.length,
      durationMs,
    });

    return {
      query: query.query,
      matches,
      durationMs,
    };
  }

  /**
   * Deletes all chunks associated with a specific document ID.
   *
   * @param documentId - Target document identifier
   * @returns Number of removed chunks
   */
  public deleteByDocumentId(documentId: string): number {
    let removed = 0;
    for (const [id, chunk] of this.chunks.entries()) {
      if (chunk.documentId === documentId) {
        this.chunks.delete(id);
        removed++;
      }
    }
    logger.debug("[deleteByDocumentId] Removed chunks for document", {
      documentId,
      removed,
    });
    return removed;
  }

  /**
   * Returns total count of chunks retained in memory.
   */
  public count(): number {
    return this.chunks.size;
  }

  /**
   * Clears all stored chunks.
   */
  public clear(): void {
    const previousSize = this.chunks.size;
    this.chunks.clear();
    logger.info("[clear] Cleared vector store", { removedCount: previousSize });
  }
}
