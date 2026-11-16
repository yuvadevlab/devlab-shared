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
} from "@/adapters";
import { FallbackCascade } from "@/cascade";
import type { ILLMProvider } from "@/types";

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
 * Configuration options for assembling a cascade of provider adapters.
 */
export interface CascadeCandidatesConfig {
  /** Optional Ollama configuration */
  ollama?: Record<string, unknown>;
  /** Optional Groq credentials and configuration */
  groq?: Record<string, unknown>;
  /** Optional Google Gemini credentials and configuration */
  google?: Record<string, unknown>;
  /** Optional OpenAI credentials and configuration */
  openai?: Record<string, unknown>;
  /** Optional Anthropic credentials and configuration */
  anthropic?: Record<string, unknown>;
}

/**
 * Builds an ordered cascade of provider candidates based on explicit consumer configuration.
 *
 * @param config - Provider configuration parameters supplied by consumer.
 * @returns Ordered array of configured ILLMProvider adapters.
 */
export function createCascadeCandidates(
  config: CascadeCandidatesConfig = {},
): ILLMProvider[] {
  const candidates: ILLMProvider[] = [];

  // 1. Ollama local/offline candidate if configured
  if (config.ollama) {
    candidates.push(new OllamaAdapter(config.ollama));
  }

  // 2. Groq free ultra-fast tier
  if (config.groq) {
    candidates.push(new GroqAdapter(config.groq));
  }

  // 3. Google Gemini
  if (config.google) {
    candidates.push(new GoogleAdapter(config.google));
  }

  // 4. OpenAI
  if (config.openai) {
    candidates.push(new OpenAIAdapter(config.openai));
  }

  // 5. Anthropic
  if (config.anthropic) {
    candidates.push(new AnthropicAdapter(config.anthropic));
  }

  if (candidates.length === 0) {
    candidates.push(new OllamaAdapter(config.ollama ?? {}));
  }

  return candidates;
}

/**
 * Options for instantiating the default provider.
 */
export interface DefaultProviderOptions {
  /** Explicit provider type name */
  provider?: ProviderType;
  /** Direct adapter configuration dictionary */
  config?: Record<string, unknown>;
  /** Cascade candidate options if falling back to multi-tier cascade */
  cascade?: CascadeCandidatesConfig;
}

/**
 * Creates the default provider based on explicit consumer options.
 *
 * @example
 * ```typescript
 * const client = createDefaultProvider({ provider: "groq", config: { apiKey: "gsk_..." } });
 * const response = await client.complete(request);
 * ```
 *
 * @param options - Consumer-provided configuration and provider selection.
 * @returns Instantiated ILLMProvider ready for completion.
 */
export function createDefaultProvider(
  options: DefaultProviderOptions = {},
): ILLMProvider {
  if (options.provider) {
    logger.info(
      `[createDefaultProvider] Using explicitly configured provider: ${options.provider}`,
    );
    return createProvider(options.provider, options.config);
  }
  return new FallbackCascade({
    providers: createCascadeCandidates(options.cascade),
  });
}
