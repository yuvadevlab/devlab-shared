/**
 * @file packages/ai-client/src/cascade/fallback-cascade.ts
 * @description Intelligent multi-tier fallback cascade routing across local and cloud providers.
 *
 * Implements high-availability AI completion by attempting execution on primary providers
 * (e.g. local Ollama) and gracefully falling back to secondary tiers (Groq, Gemini, OpenAI)
 * upon rate limits, timeouts, or transient connection errors.
 *
 * @module @yuva-devlab/ai-client
 */

import { DomainError, ErrorCode } from "@yuva-devlab/errors";
import { Logger, loggerWithConfig } from "@yuva-devlab/logger";
import type {
  ILLMProvider,
  LLMRequest,
  LLMResponse,
  LLMStreamChunk,
} from "../types";

const logger = loggerWithConfig(new Logger("FallbackCascade"));

/**
 * Options configuring the FallbackCascade provider.
 */
export interface FallbackCascadeOptions {
  /** Ordered list of provider adapters to attempt in sequence */
  providers: ILLMProvider[];
}

/**
 * Composite ILLMProvider that cascades requests down a priority-ordered provider list.
 *
 * @example
 * ```typescript
 * const cascade = new FallbackCascade({
 *   providers: [new OllamaAdapter(), new GroqAdapter(), new OpenAIAdapter()],
 * });
 * const res = await cascade.complete(request);
 * ```
 */
export class FallbackCascade implements ILLMProvider {
  public readonly name = "fallback-cascade";
  private readonly providers: ILLMProvider[];

  /**
   * Initializes the cascade with candidate providers.
   *
   * @param options - Cascade options containing providers array.
   */
  public constructor(options: FallbackCascadeOptions) {
    if (!options.providers || options.providers.length === 0) {
      throw new DomainError(
        "FallbackCascade requires at least one provider",
        ErrorCode.VALIDATION_ERROR,
        400,
      );
    }
    this.providers = [...options.providers];
  }

  /**
   * Attempts completion through the provider cascade until one succeeds.
   *
   * @param request - Validated completion request.
   * @returns Successful LLMResponse from the first healthy provider.
   */
  public async complete(request: LLMRequest): Promise<LLMResponse> {
    const errors: Array<{ provider: string; error: string }> = [];

    for (const provider of this.providers) {
      try {
        logger.debug(
          `[complete] Attempting provider '${provider.name}' in FallbackCascade`,
        );
        const response = await provider.complete(request);
        return response;
      } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : String(err);
        errors.push({ provider: provider.name, error: errorMsg });

        logger.warn(
          `[complete] Provider '${provider.name}' failed in FallbackCascade, cascading to next candidate`,
          {
            provider: provider.name,
            error: errorMsg,
          },
        );
      }
    }

    // All cascade candidates exhausted
    logger.error("[complete] All providers in FallbackCascade exhausted", {
      errors,
    });
    throw new DomainError(
      `All providers in FallbackCascade failed: ${errors.map((e) => `[${e.provider}: ${e.error}]`).join(", ")}`,
      ErrorCode.MODEL_PROVIDER_ERROR,
      502,
      { errors },
    );
  }

  /**
   * Attempts streaming through the provider cascade until one connects.
   *
   * @param request - Validated completion request.
   * @returns Async iterable emitting token chunks from the first healthy provider.
   */
  public async *stream(request: LLMRequest): AsyncIterable<LLMStreamChunk> {
    let lastError: unknown;

    for (const provider of this.providers) {
      try {
        yield* provider.stream(request);
        return;
      } catch (err: unknown) {
        lastError = err;
        logger.warn(
          `[stream] Provider '${provider.name}' failed streaming, attempting next provider in cascade`,
        );
      }
    }

    throw lastError instanceof Error ? lastError : new Error(String(lastError));
  }
}
