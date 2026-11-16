/**
 * @file packages/ai-client/src/config/env-resolver.ts
 * @description Consumer environment credential loader mapping a supplied env dictionary into provider credentials.
 *
 * Utilizes centralized endpoints and default models from the constants module.
 * Never accesses ambient process.env directly.
 *
 * @module @yuva-devlab/ai-client
 */

import { AI_DEFAULT_MODELS, AI_ENDPOINTS } from "@/constants";
import type { ProviderCredentials } from "@/types";

/**
 * Maps environment dictionary supplied by consumer for supported AI providers into a typed credentials object.
 *
 * @example
 * ```typescript
 * const creds = resolveEnvCredentials("groq", process.env);
 * console.log(creds.apiKey);
 * ```
 *
 * @param provider - Name of the provider (case-insensitive).
 * @param env - Consumer environment key-value map.
 * @returns Resolved ProviderCredentials mapped from the consumer dictionary.
 */
export function resolveEnvCredentials(
  provider: string,
  env: Record<string, string | undefined> = {},
): ProviderCredentials {
  const norm = provider.toLowerCase();

  switch (norm) {
    case "ollama":
      return {
        baseUrl: env.OLLAMA_BASE_URL ?? AI_ENDPOINTS.OLLAMA_DEFAULT_BASE_URL,
        defaultModel: env.OLLAMA_MODEL ?? AI_DEFAULT_MODELS.OLLAMA,
      };
    case "groq":
      return {
        apiKey: env.GROQ_API_KEY,
        baseUrl: env.GROQ_BASE_URL ?? AI_ENDPOINTS.GROQ_DEFAULT_BASE_URL,
        defaultModel: env.GROQ_MODEL ?? AI_DEFAULT_MODELS.GROQ,
      };
    case "google":
      return {
        apiKey: env.GEMINI_API_KEY ?? env.GOOGLE_AI_API_KEY,
        defaultModel: env.GEMINI_MODEL ?? AI_DEFAULT_MODELS.GOOGLE,
      };
    case "openai":
      return {
        apiKey: env.OPENAI_API_KEY,
        baseUrl: env.OPENAI_BASE_URL ?? AI_ENDPOINTS.OPENAI_DEFAULT_BASE_URL,
        defaultModel: env.OPENAI_MODEL ?? AI_DEFAULT_MODELS.OPENAI,
      };
    case "anthropic":
      return {
        apiKey: env.ANTHROPIC_API_KEY,
        baseUrl:
          env.ANTHROPIC_BASE_URL ?? AI_ENDPOINTS.ANTHROPIC_DEFAULT_BASE_URL,
        defaultModel: env.ANTHROPIC_MODEL ?? AI_DEFAULT_MODELS.ANTHROPIC,
      };
    default:
      return {};
  }
}
