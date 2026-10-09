/**
 * @file packages/ai-client/src/adapters/openai/openai.types.ts
 * @description Wire types, configuration interfaces, and helpers for OpenAI Chat Completions.
 * @module @yuva-devlab/ai-client
 */

import {
  type CredentialResolver,
  type LLMRequest,
  MessageRole,
} from "../../types";

/**
 * Configuration options for initializing OpenAIAdapter.
 */
export interface OpenAIAdapterConfig {
  /** OpenAI API authentication key */
  apiKey?: string;
  /** Custom base URL (defaults to AI_ENDPOINTS.OPENAI_DEFAULT_BASE_URL) */
  baseUrl?: string;
  /** Default model identifier (defaults to AI_DEFAULT_MODELS.OPENAI) */
  defaultModel?: string;
  /** Optional dynamic credential resolver for secret managers */
  credentials?: CredentialResolver;
}

export interface OpenAiCompletionResponse {
  choices: Array<{
    message?: { content?: string };
    finish_reason?: string;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

/**
 * Converts canonical messages to OpenAI wire format.
 *
 * @param messages - Canonical conversation history turns.
 * @returns Array of OpenAI wire messages.
 */
export function mapOpenAiMessages(messages: LLMRequest["messages"]) {
  return messages.map((m) => ({
    role:
      m.role === MessageRole.SYSTEM
        ? "system"
        : m.role === MessageRole.ASSISTANT
          ? "assistant"
          : "user",
    content: m.content,
  }));
}
