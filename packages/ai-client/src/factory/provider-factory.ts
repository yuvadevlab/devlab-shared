/**
 * @file packages/ai-client/src/factory/provider-factory.ts
 * @description Unified factory resolving LLM provider adapters and multi-tier cascades from environment.
 * @module @yuva-devlab/ai-client
 */

import { DomainError, ErrorCode } from "@yuva-devlab/errors";
import { Logger, loggerWithConfig } from "@yuva-devlab/logger";
import {
  AnthropicAdapter,
  GoogleAdapter,
  GroqAdapter,
  OllamaAdapter,
  OpenAIAdapter,
} from "../adapters";
import { FallbackCascade } from "../cascade";
import type { ILLMProvider } from "../types";

const logger = loggerWithConfig(new Logger("ProviderFactory"));

/**
 * Standard provider type identifiers.
 */
export type ProviderType =
  "ollama" | "groq" | "google" | "openai" | "anthropic" | "cascade";

/**
 * Creates an instance of an LLM provider adapter matching the specified type.
 *
 * @example
 * ```typescript
 * const groq = createProvider("groq", { apiKey: "gsk_..." });
 * const ollama = createProvider("ollama", { baseUrl: "http://127.0.0.1:11434" });
 * ```
 *
 * @param type - Target provider type slug.
 * @param config - Optional configuration dictionary.
 * @returns Instantiated ILLMProvider.
 */
export function createProvider(
  type: ProviderType,
  config: Record<string, unknown> = {},
): ILLMProvider {
  logger.debug(`[createProvider] Creating LLM provider instance: ${type}`);
  switch (type) {
    case "ollama":
      return new OllamaAdapter(config);
    case "groq":
      return new GroqAdapter(config);
    case "google":
      return new GoogleAdapter(config);
    case "openai":
      return new OpenAIAdapter(config);
    case "anthropic":
      return new AnthropicAdapter(config);
    case "cascade": {
      const providers =
        (config.providers as ILLMProvider[]) ?? createCascadeCandidates();
      return new FallbackCascade({ providers });
    }
    default:
      throw new DomainError(
        `Unknown provider type: '${String(type)}'`,
        ErrorCode.VALIDATION_ERROR,
        400,
      );
  }
}

/**
 * Automatically inspects ambient environment and builds an ordered cascade of available providers.
 *
 * Priority order:
 * 1. Local Ollama (always registered as offline/local tier)
 * 2. Groq (if GROQ_API_KEY is present)
 * 3. Google Gemini (if GEMINI_API_KEY is present)
 * 4. OpenAI (if OPENAI_API_KEY is present)
 * 5. Anthropic (if ANTHROPIC_API_KEY is present)
 *
 * @returns Ordered array of configured ILLMProvider adapters.
 */
export function createCascadeCandidates(): ILLMProvider[] {
  const candidates: ILLMProvider[] = [];

  // 1. Ollama is always included as first local fallback candidate
  candidates.push(new OllamaAdapter());

  // 2. Groq free ultra-fast tier
  if (typeof process !== "undefined" && process?.env?.GROQ_API_KEY) {
    candidates.push(new GroqAdapter());
  }

  // 3. Google Gemini
  if (
    typeof process !== "undefined" &&
    (process?.env?.GEMINI_API_KEY || process?.env?.GOOGLE_AI_API_KEY)
  ) {
    candidates.push(new GoogleAdapter());
  }

  // 4. OpenAI
  if (typeof process !== "undefined" && process?.env?.OPENAI_API_KEY) {
    candidates.push(new OpenAIAdapter());
  }

  // 5. Anthropic
  if (typeof process !== "undefined" && process?.env?.ANTHROPIC_API_KEY) {
    candidates.push(new AnthropicAdapter());
  }

  return candidates;
}

/**
 * Creates the default provider for the current environment.
 * If specific AI_PROVIDER env var is specified, uses that; otherwise returns a robust FallbackCascade.
 *
 * @example
 * ```typescript
 * const client = createDefaultProvider();
 * const response = await client.complete(request);
 * ```
 *
 * @returns Instantiated ILLMProvider ready for completion.
 */
export function createDefaultProvider(): ILLMProvider {
  const envProvider =
    typeof process !== "undefined"
      ? (process?.env?.AI_PROVIDER as ProviderType | undefined)
      : undefined;
  if (envProvider) {
    logger.info(
      `[createDefaultProvider] Using explicitly configured provider: ${envProvider}`,
    );
    return createProvider(envProvider);
  }
  return new FallbackCascade({ providers: createCascadeCandidates() });
}
