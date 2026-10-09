/**
 * @file packages/ai-client/src/adapters/anthropic/anthropic.adapter.ts
 * @description Anthropic Claude Messages API adapter (Claude 3.5 Sonnet / Haiku).
 * @module @yuva-devlab/ai-client
 */

import { DomainError, ErrorCode, ModelTimeoutError } from "@yuva-devlab/errors";
import { Logger, loggerWithConfig } from "@yuva-devlab/logger";
import { resolveEnvCredentials } from "../../config";
import {
  AI_DEFAULT_MODELS,
  AI_ENDPOINTS,
  AI_EXECUTION_DEFAULTS,
} from "../../constants";
import {
  FinishReason,
  type ILLMProvider,
  type LLMRequest,
  type LLMResponse,
  type LLMStreamChunk,
  MissingCredentialError,
} from "../../types";
import {
  type AnthropicAdapterConfig,
  type AnthropicResponse,
  extractAnthropicSystemAndMessages,
} from "./anthropic.types";

const logger = loggerWithConfig(new Logger("AnthropicAdapter"));

/**
 * Anthropic adapter communicating via the v1/messages protocol.
 *
 * @example
 * ```typescript
 * const adapter = new AnthropicAdapter({ apiKey: "sk-ant-..." });
 * const res = await adapter.complete({
 *   model: "claude-3-5-haiku-latest",
 *   messages: [createUserMessage("Write an SRE runbook for disk pressure")],
 * });
 * ```
 */
export class AnthropicAdapter implements ILLMProvider {
  public readonly name = "anthropic";
  private readonly config: AnthropicAdapterConfig;

  /**
   * Initializes the Anthropic adapter.
   *
   * @param config - Connection options and credentials.
   */
  public constructor(config: AnthropicAdapterConfig = {}) {
    this.config = config;
  }

  /**
   * Resolves authentication credentials and endpoint.
   */
  private async resolveCredentials() {
    const dynamic = this.config.credentials
      ? await this.config.credentials()
      : {};
    const env = resolveEnvCredentials(this.name);

    const apiKey = this.config.apiKey ?? dynamic.apiKey ?? env.apiKey;
    const baseUrl = (
      this.config.baseUrl ??
      dynamic.baseUrl ??
      env.baseUrl ??
      AI_ENDPOINTS.ANTHROPIC_DEFAULT_BASE_URL
    ).replace(/\/+$/, "");
    const defaultModel =
      this.config.defaultModel ??
      dynamic.defaultModel ??
      env.defaultModel ??
      AI_DEFAULT_MODELS.ANTHROPIC;

    if (!apiKey) {
      throw new MissingCredentialError("Anthropic", "ANTHROPIC_API_KEY");
    }

    return { apiKey, baseUrl, defaultModel };
  }

  /**
   * Executes a full non-streaming completion request.
   *
   * @param request - Validated completion request.
   * @returns Complete model response.
   */
  public async complete(request: LLMRequest): Promise<LLMResponse> {
    const { apiKey, baseUrl, defaultModel } = await this.resolveCredentials();
    const startTime = Date.now();
    const model = request.model || defaultModel;

    logger.debug("[complete] Executing Anthropic completion", {
      model,
      baseUrl,
    });

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), request.timeoutMs);

    try {
      const { system, messages } = extractAnthropicSystemAndMessages(
        request.messages,
      );

      const response = await fetch(`${baseUrl}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": AI_ENDPOINTS.ANTHROPIC_VERSION_HEADER,
        },
        body: JSON.stringify({
          model,
          system,
          messages,
          max_tokens:
            request.maxTokens ??
            AI_EXECUTION_DEFAULTS.DEFAULT_MAX_OUTPUT_TOKENS,
          temperature: request.temperature,
          stop_sequences: request.stop,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => "");
        logger.error("[complete] Anthropic API error response", {
          status: response.status,
          errorText,
        });
        throw new DomainError(
          `Anthropic returned HTTP ${response.status}: ${errorText}`,
          response.status === 429
            ? ErrorCode.MODEL_RATE_LIMIT
            : ErrorCode.MODEL_PROVIDER_ERROR,
          response.status,
        );
      }

      const data = (await response.json()) as AnthropicResponse;
      const text = data.content.find((c) => c.type === "text")?.text ?? "";
      const durationMs = Date.now() - startTime;

      logger.info("[complete] Anthropic completion finished", {
        model,
        durationMs,
        tokensOut: data.usage.output_tokens,
      });

      return {
        text,
        finishReason:
          data.stop_reason === "max_tokens"
            ? FinishReason.LENGTH
            : FinishReason.STOP,
        usage: {
          promptTokens: data.usage.input_tokens,
          completionTokens: data.usage.output_tokens,
          totalTokens: data.usage.input_tokens + data.usage.output_tokens,
        },
        model,
        durationMs,
      };
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") {
        logger.warn("[complete] Anthropic request timed out", {
          model,
          timeoutMs: request.timeoutMs,
        });
        throw new ModelTimeoutError(model, request.timeoutMs);
      }
      throw err;
    } finally {
      clearTimeout(timeout);
    }
  }

  /**
   * Streams completion tokens.
   *
   * @param request - Validated completion request.
   * @returns Async iterable yielding token deltas.
   */
  public async *stream(request: LLMRequest): AsyncIterable<LLMStreamChunk> {
    const res = await this.complete(request);
    yield {
      delta: res.text,
      finishReason: res.finishReason,
      usage: res.usage,
    };
  }
}
