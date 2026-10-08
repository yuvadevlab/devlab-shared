/**
 * @file packages/ai-client/src/adapters/anthropic/anthropic.types.ts
 * @description Wire types, configuration interfaces, and helpers for Anthropic Messages API.
 * @module @yuva-devlab/ai-client
 */

import {
  type CredentialResolver,
  type LLMRequest,
  MessageRole,
} from "../../types";

/**
 * Configuration options for initializing AnthropicAdapter.
 */
export interface AnthropicAdapterConfig {
  /** Anthropic API authentication key */
  apiKey?: string;
  /** Custom base URL (defaults to AI_ENDPOINTS.ANTHROPIC_DEFAULT_BASE_URL) */
  baseUrl?: string;
  /** Default Claude model identifier (defaults to AI_DEFAULT_MODELS.ANTHROPIC) */
  defaultModel?: string;
  /** Optional dynamic credential resolver for secret managers */
  credentials?: CredentialResolver;
}

export interface AnthropicResponse {
  content: Array<{ type: string; text?: string }>;
  stop_reason: string;
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
}

/**
 * Extracts system prompt and non-system turns for Anthropic's Messages format.
 *
 * @param messages - Canonical conversation turns.
 * @returns Separated system string and wire message turns.
 */
export function extractAnthropicSystemAndMessages(
  messages: LLMRequest["messages"],
): {
  system?: string;
  messages: Array<{ role: string; content: string }>;
} {
  let system: string | undefined;
  const turns: Array<{ role: string; content: string }> = [];

  for (const msg of messages) {
    if (msg.role === MessageRole.SYSTEM) {
      system = system ? `${system}\n\n${msg.content}` : msg.content;
    } else {
      turns.push({
        role: msg.role === MessageRole.ASSISTANT ? "assistant" : "user",
        content: msg.content,
      });
    }
  }

  return { system, messages: turns };
}
