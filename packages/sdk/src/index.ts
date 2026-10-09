/**
 * @file packages/sdk/src/index.ts
 * @description Master entry point for @yuva-devlab/sdk.
 * Unified TypeScript SDK for the DevLab platform ecosystem.
 * @module @yuva-devlab/sdk
 */

export * from "./constants";
export * from "./types";
export * from "./client";

// Re-export foundational platform building blocks for convenience
export * from "@yuva-devlab/errors";
export * from "@yuva-devlab/agent-core";
export * from "@yuva-devlab/ai-client";
export * from "@yuva-devlab/billing";
export * from "@yuva-devlab/events";
export * from "@yuva-devlab/resilience";

// Disambiguated re-exports between RAG and Semantic-Cache
export * from "@yuva-devlab/semantic-cache";
export {
  type Document,
  DocumentSchema,
  type CreateDocumentInput,
  CreateDocumentInputSchema,
  type DocumentChunk,
  DocumentChunkSchema,
  type CreateChunkInput,
  CreateChunkInputSchema,
  type ScoredDocumentChunk,
  type RagQuery,
  RagQuerySchema,
  type RagSearchResult,
  type ITextChunker,
  type ChunkingOptions,
  TextChunker,
  estimateTokenCount,
  MockEmbeddingProvider,
  InMemoryVectorStore,
} from "@yuva-devlab/rag";
