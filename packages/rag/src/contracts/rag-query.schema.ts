/**
 * @file packages/rag/src/contracts/rag-query.schema.ts
 * @description Zod validation schemas and types for similarity search queries and responses.
 * @module @yuva-devlab/rag
 */

import { z } from "zod";
import { DEFAULT_MIN_SCORE, DEFAULT_TOP_K } from "../constants";
import type { ScoredDocumentChunk } from "./chunk.schema";

/**
 * Zod schema validating inbound vector search queries.
 */
export const RagQuerySchema = z.object({
  /** Raw textual question or query string */
  query: z.string().min(1),
  /** Maximum number of scored results to return */
  topK: z.number().int().positive().default(DEFAULT_TOP_K),
  /** Minimum similarity score threshold */
  minScore: z.number().min(0).max(1).default(DEFAULT_MIN_SCORE),
  /** Optional document foreign key filtering */
  documentId: z.string().uuid().optional(),
  /** Optional tenant identifier for multi-tenant isolation */
  tenantId: z.string().uuid().optional(),
});

/**
 * Validated vector search query payload.
 */
export type RagQuery = z.infer<typeof RagQuerySchema>;

/**
 * Result collection returned from a RAG search invocation.
 */
export interface RagSearchResult {
  /** Inbound search query string */
  readonly query: string;
  /** Ordered list of matched chunks with scores */
  readonly matches: readonly ScoredDocumentChunk[];
  /** Execution elapsed duration in milliseconds */
  readonly durationMs: number;
}
