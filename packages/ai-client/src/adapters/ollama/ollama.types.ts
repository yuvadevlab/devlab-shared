/**
 * @file packages/ai-client/src/adapters/ollama/ollama.types.ts
 * @description Wire types, configuration interfaces, and message mappers for the Ollama adapter.
 * @module @yuva-devlab/ai-client
 */

import {
  type CredentialResolver,
  type LLMRequest,
  MessageRole,
} from "../../types";

/**
 * Configuration options for initializing the OllamaAdapter.
 */
export interface OllamaAdapterConfig {
  /** Base URL for Ollama daemon (defaults to AI_ENDPOINTS.OLLAMA_DEFAULT_BASE_URL) */
  baseUrl?: string;
  /** Default model name if not specified in request */
  defaultModel?: string;
  /** Optional dynamic credential resolver for remote Ollama clusters */
  credentials?: CredentialResolver;
}

/**
 * Low-level wire format message payload expected by Ollama /api/chat.
 */
export interface OllamaWireMessage {
  role: string;
  content: string;
  tool_name?: string;
}

/**
 * Low-level chunk payload streamed or returned by Ollama /api/chat.
 */
export interface OllamaChatResponseChunk {
  model?: string;
  message?: OllamaWireMessage;
  done?: boolean;
  done_reason?: string;
  prompt_eval_count?: number;
  eval_count?: number;
}

/**
 * Converts canonical AIMessage conversation turns to Ollama's wire format.
 *
 * @param messages - Canonical conversation history turns.
 * @returns Array of Ollama wire format messages.
 */
export function mapOllamaMessages(
  messages: LLMRequest["messages"],
): OllamaWireMessage[] {
  return messages.map((m) => {
    let role = "user";
    if (m.role === MessageRole.SYSTEM) role = "system";
    else if (m.role === MessageRole.ASSISTANT) role = "assistant";
    else if (m.role === MessageRole.TOOL) role = "tool";

    return {
      role,
      content: m.content,
      tool_name: m.role === MessageRole.TOOL ? m.name : undefined,
    };
  });
}
