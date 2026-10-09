/**
 * @file packages/ai-client/src/types/request.types.ts
 * @description Canonical request schemas and execution options for LLM provider completions.
 * @module @yuva-devlab/ai-client
 */

import { z } from "zod";
import { AI_EXECUTION_DEFAULTS } from "../constants";
import { AIMessageSchema } from "./message.types";

/**
 * Standard request options for LLM completions.
 *
 * @example
 * ```typescript
 * const options: LLMRequestOptions = {
 *   model: "gemma4:31b-cloud",
 *   temperature: 0.2,
 *   maxTokens: 2048,
 *   responseFormat: "json_object",
 *   timeoutMs: 30000,
 * };
 * ```
 */
export const LLMRequestOptionsSchema = z.object({
  /** Model identifier string (e.g. "gemma4:31b-cloud", "qwen2.5:7b", "llama-3.3-70b-versatile") */
  model: z.string().min(1).describe("Target model name or slug"),
  /** Sampling temperature: 0.0 deterministic to 1.0+ creative (defaults to AI_EXECUTION_DEFAULTS.DEFAULT_TEMPERATURE) */
  temperature: z
    .number()
    .min(0)
    .max(2)
    .default(AI_EXECUTION_DEFAULTS.DEFAULT_TEMPERATURE)
    .describe("Sampling temperature"),
  /** Maximum completion output tokens */
  maxTokens: z
    .number()
    .int()
    .positive()
    .optional()
    .describe("Output token limit"),
  /** Nucleus sampling probability cutoff */
  topP: z.number().min(0).max(1).optional().describe("Top-P nucleus sampling"),
  /** Optional stop sequences causing generation to cease */
  stop: z.array(z.string()).optional().describe("Stop sequences"),
  /** Response format enforcement (e.g. json_object or text) */
  responseFormat: z
    .enum(["text", "json_object"])
    .default("text")
    .describe("Output format"),
  /** Per-request timeout limit in milliseconds (defaults to AI_EXECUTION_DEFAULTS.DEFAULT_TIMEOUT_MS) */
  timeoutMs: z
    .number()
    .int()
    .positive()
    .default(AI_EXECUTION_DEFAULTS.DEFAULT_TIMEOUT_MS)
    .describe("Timeout limit in ms"),
});

export type LLMRequestOptions = z.infer<typeof LLMRequestOptionsSchema>;

/**
 * Full completion request payload combining options and conversation turns.
 *
 * @example
 * ```typescript
 * const req: LLMRequest = {
 *   model: "qwen2.5:7b",
 *   messages: [
 *     createUserMessage("What are the key architectural tenets of DevLab?"),
 *   ],
 *   temperature: 0.5,
 *   timeoutMs: 45000,
 * };
 * ```
 */
export const LLMRequestSchema = LLMRequestOptionsSchema.extend({
  /** Ordered conversation history */
  messages: z
    .array(AIMessageSchema)
    .min(1)
    .describe("Conversation history turns"),
});

export type LLMRequest = z.infer<typeof LLMRequestSchema>;
