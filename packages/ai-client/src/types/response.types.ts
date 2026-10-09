/**
 * @file packages/ai-client/src/types/response.types.ts
 * @description Standardized LLM provider completion output and streaming chunk schemas.
 * @module @yuva-devlab/ai-client
 */

import { z } from "zod";
import { ToolCallSchema } from "./message.types";

/**
 * Standard completion termination reason in canonical UPPERCASE format.
 */
export const FinishReason = {
  /** Generation finished naturally at a stop sequence or end of turn */
  STOP: "STOP",
  /** Generation stopped due to hitting maxTokens limit */
  LENGTH: "LENGTH",
  /** Model emitted one or more structured tool calls */
  TOOL_CALLS: "TOOL_CALLS",
  /** Generation blocked by safety filters or policy guardrails */
  CONTENT_FILTER: "CONTENT_FILTER",
  /** Generation aborted due to an internal execution error */
  ERROR: "ERROR",
} as const;

export type FinishReason = (typeof FinishReason)[keyof typeof FinishReason];

/**
 * Token consumption metrics for accounting and billing meters.
 */
export const LLMUsageSchema = z.object({
  /** Prompt / context tokens evaluated */
  promptTokens: z.number().int().nonnegative().default(0),
  /** Tokens generated in completion */
  completionTokens: z.number().int().nonnegative().default(0),
  /** Total tokens processed */
  totalTokens: z.number().int().nonnegative().default(0),
});

export type LLMUsage = z.infer<typeof LLMUsageSchema>;

/**
 * Standard complete response output returned by any LLM adapter.
 *
 * @example
 * ```typescript
 * const response: LLMResponse = {
 *   text: "Hello world!",
 *   finishReason: FinishReason.STOP,
 *   usage: { promptTokens: 10, completionTokens: 4, totalTokens: 14 },
 *   model: "gemma4:31b-cloud",
 *   durationMs: 420,
 * };
 * ```
 */
export const LLMResponseSchema = z.object({
  /** Generated completion text */
  text: z.string().describe("Generated completion text"),
  /** Canonical termination reason */
  finishReason: z.enum([
    FinishReason.STOP,
    FinishReason.LENGTH,
    FinishReason.TOOL_CALLS,
    FinishReason.CONTENT_FILTER,
    FinishReason.ERROR,
  ]),
  /** Token usage statistics */
  usage: LLMUsageSchema,
  /** Optional tool invocations emitted by the model */
  toolCalls: z.array(ToolCallSchema).optional(),
  /** Model that generated the completion */
  model: z.string().describe("Model that generated the completion"),
  /** Wall-clock execution time in milliseconds */
  durationMs: z.number().nonnegative().optional(),
});

export type LLMResponse = z.infer<typeof LLMResponseSchema>;

/**
 * Incremental token chunk emitted during streaming completions.
 */
export interface LLMStreamChunk {
  /** Delta text token */
  delta: string;
  /** Finish reason if this chunk is the final stream message */
  finishReason?: FinishReason;
  /** Cumulative token usage if supplied by the provider */
  usage?: LLMUsage;
}
