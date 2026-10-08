/**
 * @file packages/ai-client/src/config/env-resolver.ts
 * @description Safe runtime environment credential loader for opt-in consumer usage.
 *
 * Utilizes centralized endpoints and default models from the constants module.
 *
 * @module @yuva-devlab/ai-client
 */

import { AI_DEFAULT_MODELS, AI_ENDPOINTS } from "../constants";
import type { ProviderCredentials } from "../types";

/**
 * Safely reads an environment variable without crashing in non-Node environments.
 *
 * @param key - The target environment variable name.
 * @returns The string value if present, otherwise undefined.
 */
function safeGetEnv(key: string): string | undefined {
  if (typeof process !== "undefined" && process?.env) {
    return process.env[key];
  }
  return undefined;
}

/**
 * Maps standard environment variables for supported AI providers into a typed credentials object.
 *
 * @example
 * ```typescript
 * const creds = resolveEnvCredentials("groq");
 * console.log(creds.apiKey);
 * ```
 *
 * @param provider - Name of the provider (case-insensitive).
 * @returns Resolved ProviderCredentials from ambient environment if available.
 */
export function resolveEnvCredentials(provider: string): ProviderCredentials {
  const norm = provider.toLowerCase();

  switch (norm) {
    case "ollama":
      return {
        baseUrl:
          safeGetEnv("OLLAMA_BASE_URL") ?? AI_ENDPOINTS.OLLAMA_DEFAULT_BASE_URL,
        defaultModel: safeGetEnv("OLLAMA_MODEL") ?? AI_DEFAULT_MODELS.OLLAMA,
      };
    case "groq":
      return {
        apiKey: safeGetEnv("GROQ_API_KEY"),
        baseUrl:
          safeGetEnv("GROQ_BASE_URL") ?? AI_ENDPOINTS.GROQ_DEFAULT_BASE_URL,
        defaultModel: safeGetEnv("GROQ_MODEL") ?? AI_DEFAULT_MODELS.GROQ,
      };
    case "google":
      return {
        apiKey: safeGetEnv("GEMINI_API_KEY") ?? safeGetEnv("GOOGLE_AI_API_KEY"),
        defaultModel: safeGetEnv("GEMINI_MODEL") ?? AI_DEFAULT_MODELS.GOOGLE,
      };
    case "openai":
      return {
        apiKey: safeGetEnv("OPENAI_API_KEY"),
        baseUrl:
          safeGetEnv("OPENAI_BASE_URL") ?? AI_ENDPOINTS.OPENAI_DEFAULT_BASE_URL,
        defaultModel: safeGetEnv("OPENAI_MODEL") ?? AI_DEFAULT_MODELS.OPENAI,
      };
    case "anthropic":
      return {
        apiKey: safeGetEnv("ANTHROPIC_API_KEY"),
        baseUrl:
          safeGetEnv("ANTHROPIC_BASE_URL") ??
          AI_ENDPOINTS.ANTHROPIC_DEFAULT_BASE_URL,
        defaultModel:
          safeGetEnv("ANTHROPIC_MODEL") ?? AI_DEFAULT_MODELS.ANTHROPIC,
      };
    default:
      return {};
  }
}
