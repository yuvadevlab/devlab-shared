/**
 * @file packages/ai-client/src/adapters/groq/groq.types.ts
 * @description Wire types and configuration interfaces for Groq OpenAI-compatible endpoints.
 * @module @yuva-devlab/ai-client
 */

import {
  type CredentialResolver,
  type LLMRequest,
  MessageRole,
} from "../../types";

/**
 * Configuration options for initializing the GroqAdapter.
 */
export interface GroqAdapterConfig {
  /** Groq API authentication key */
  apiKey?: string;
  /** Custom base URL (defaults to AI_ENDPOINTS.GROQ_DEFAULT_BASE_URL) */
  baseUrl?: string;
  /** Default model identifier */
  defaultModel?: string;
  /** Optional dynamic credential resolver for secret managers */
  credentials?: CredentialResolver;
}

/**
 * Wire message schema for OpenAI-compatible completions.
 */
export interface OpenAiWireMessage {
  role: string;
  content: string;
}

/**
 * Wire response payload returned by Groq completions.
 */
export interface GroqCompletionResponse {
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
 * Converts canonical messages to wire format.
 *
 * @param messages - Canonical conversation turns.
 * @returns Wire format messages.
 */
export function mapGroqMessages(
  messages: LLMRequest["messages"],
): OpenAiWireMessage[] {
  return messages.map((m) => {
    let role = "user";
    if (m.role === MessageRole.SYSTEM) role = "system";
    else if (m.role === MessageRole.ASSISTANT) role = "assistant";
    return { role, content: m.content };
  });
}
