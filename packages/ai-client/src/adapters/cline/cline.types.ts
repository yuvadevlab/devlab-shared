/**
 * @file packages/ai-client/src/adapters/cline/cline.types.ts
 * @description Wire types, configuration interfaces, and tool name normalization helpers for Cline API.
 * @module @yuva-devlab/ai-client
 */

import { type CredentialResolver, type LLMRequest, MessageRole } from "@/types";

/**
 * Configuration options for initializing the ClineAdapter.
 */
export interface ClineAdapterConfig {
  /** Cline API Gateway authentication key */
  apiKey?: string;
  /** Custom base URL (defaults to AI_ENDPOINTS.CLINE_DEFAULT_BASE_URL) */
  baseUrl?: string;
  /** Default model identifier (defaults to AI_DEFAULT_MODELS.CLINE) */
  defaultModel?: string;
  /** Optional dynamic credential resolver for secret managers */
  credentials?: CredentialResolver;
}

/**
 * Expected response structure from Cline Chat Completions endpoint.
 */
export interface ClineCompletionResponse {
  /** Completion candidates list */
  choices?: Array<{
    message?: {
      content?: string | null;
      tool_calls?: Array<{
        id?: string;
        type?: string;
        function?: {
          name?: string;
          arguments?: string;
        };
      }>;
    };
    finish_reason?: string | null;
  }>;
  /** Data envelope wrapper when returned by certain Cline gateway routes */
  data?: {
    choices?: ClineCompletionResponse["choices"];
  };
  /** Token accounting and usage details */
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
  };
}

/**
 * Normalizes a canonical tool name to OpenAPI specification pattern (alphanumeric and underscores only).
 * Converts dots to underscores (e.g. "transactions.create" -> "transactions_create").
 *
 * @param name - Canonical tool name with domain dot separators.
 * @returns OpenAPI-compliant tool name.
 */
export function sanitizeClineToolName(name: string): string {
  return name.replace(/\./g, "_");
}

/**
 * Restores canonical tool name from OpenAPI normalized string.
 * Converts underscores to dots (e.g. "transactions_create" -> "transactions.create").
 *
 * @param name - Normalized tool name from model invocation.
 * @returns Canonical tool name.
 */
export function restoreClineToolName(name: string): string {
  return name.replace(/_/g, ".");
}

/**
 * Converts canonical messages to Cline/OpenAI wire format.
 *
 * @param messages - Canonical conversation history turns.
 * @returns Array of OpenAI-compatible wire messages.
 */
export function mapClineMessages(messages: LLMRequest["messages"]) {
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
