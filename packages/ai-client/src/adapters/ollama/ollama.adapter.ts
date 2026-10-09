/**
 * @file packages/ai-client/src/adapters/ollama/ollama.adapter.ts
 * @description Native Ollama HTTP adapter supporting local models and NDJSON streaming.
 * @module @yuva-devlab/ai-client
 */

import { DomainError, ErrorCode, ModelTimeoutError } from "@yuva-devlab/errors";
import { Logger, loggerWithConfig } from "@yuva-devlab/logger";
import { resolveEnvCredentials } from "../../config";
import { AI_DEFAULT_MODELS, AI_ENDPOINTS } from "../../constants";
import {
  FinishReason,
  type ILLMProvider,
  type LLMRequest,
  type LLMResponse,
  type LLMStreamChunk,
} from "../../types";
import {
  mapOllamaMessages,
  type OllamaAdapterConfig,
  type OllamaChatResponseChunk,
} from "./ollama.types";

const logger = loggerWithConfig(new Logger("OllamaAdapter"));

/**
 * Ollama adapter executing completions via local or edge Ollama daemon instances.
 *
 * @example
 * ```typescript
 * const adapter = new OllamaAdapter({ baseUrl: "http://localhost:11434" });
 * const res = await adapter.complete({
 *   model: "qwen2.5:7b",
 *   messages: [createUserMessage("Explain binary search trees")],
 * });
 * ```
 */
export class OllamaAdapter implements ILLMProvider {
  public readonly name = "ollama";
  private readonly config: OllamaAdapterConfig;

  /**
   * Initializes the Ollama adapter with optional configuration.
   *
   * @param config - Adapter connection and model configuration.
   */
  public constructor(config: OllamaAdapterConfig = {}) {
    this.config = config;
  }

  /**
   * Resolves effective connection parameters from explicit config, dynamic resolver, or ambient environment.
   */
  private async resolveCredentials() {
    const dynamic = this.config.credentials
      ? await this.config.credentials()
      : {};
    const env = resolveEnvCredentials(this.name);

    const baseUrl = (
      this.config.baseUrl ??
      dynamic.baseUrl ??
      env.baseUrl ??
      AI_ENDPOINTS.OLLAMA_DEFAULT_BASE_URL
    ).replace(/\/+$/, "");
    const defaultModel =
      this.config.defaultModel ??
      dynamic.defaultModel ??
      env.defaultModel ??
      AI_DEFAULT_MODELS.OLLAMA;

    return { baseUrl, defaultModel };
  }

  /**
   * Executes a full non-streaming completion request against Ollama's /api/chat endpoint.
   *
   * @param request - Validated completion request.
   * @returns Complete model response with token usage metrics.
   */
  public async complete(request: LLMRequest): Promise<LLMResponse> {
    const { baseUrl, defaultModel } = await this.resolveCredentials();
    const startTime = Date.now();
    const model = request.model || defaultModel;

    logger.debug("[complete] Executing Ollama completion", {
      model,
      baseUrl,
      messageCount: request.messages.length,
    });

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), request.timeoutMs);

    try {
      const response = await fetch(`${baseUrl}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          messages: mapOllamaMessages(request.messages),
          stream: false,
          options: {
            temperature: request.temperature,
            num_predict: request.maxTokens,
            top_p: request.topP,
            stop: request.stop,
          },
          format: request.responseFormat === "json_object" ? "json" : undefined,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => "");
        logger.error("[complete] Ollama API error response", {
          status: response.status,
          errorText,
        });
        throw new DomainError(
          `Ollama returned HTTP ${response.status}: ${errorText}`,
          ErrorCode.MODEL_PROVIDER_ERROR,
          502,
        );
      }

      const data = (await response.json()) as OllamaChatResponseChunk;
      const text = data.message?.content ?? "";
      const durationMs = Date.now() - startTime;

      logger.info("[complete] Ollama completion finished", {
        model,
        durationMs,
        tokensOut: data.eval_count,
      });

      return {
        text,
        finishReason:
          data.done_reason === "length"
            ? FinishReason.LENGTH
            : FinishReason.STOP,
        usage: {
          promptTokens: data.prompt_eval_count ?? 0,
          completionTokens: data.eval_count ?? 0,
          totalTokens: (data.prompt_eval_count ?? 0) + (data.eval_count ?? 0),
        },
        model,
        durationMs,
      };
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") {
        logger.warn("[complete] Ollama request timed out", {
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
   * Initiates an NDJSON stream for token-by-token completion generation.
   *
   * @param request - Validated completion request.
   * @returns Async iterable emitting token delta chunks.
   */
  public async *stream(request: LLMRequest): AsyncIterable<LLMStreamChunk> {
    const { baseUrl, defaultModel } = await this.resolveCredentials();
    const model = request.model || defaultModel;

    const response = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        messages: mapOllamaMessages(request.messages),
        stream: true,
        options: {
          temperature: request.temperature,
          num_predict: request.maxTokens,
          top_p: request.topP,
        },
        format: request.responseFormat === "json_object" ? "json" : undefined,
      }),
    });

    if (!response.ok || !response.body) {
      throw new DomainError(
        `Ollama streaming error HTTP ${response.status}`,
        ErrorCode.MODEL_PROVIDER_ERROR,
        502,
      );
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed) continue;
          try {
            const chunk = JSON.parse(trimmed) as OllamaChatResponseChunk;
            const delta = chunk.message?.content ?? "";
            yield {
              delta,
              finishReason: chunk.done ? FinishReason.STOP : undefined,
              usage: chunk.done
                ? {
                    promptTokens: chunk.prompt_eval_count ?? 0,
                    completionTokens: chunk.eval_count ?? 0,
                    totalTokens:
                      (chunk.prompt_eval_count ?? 0) + (chunk.eval_count ?? 0),
                  }
                : undefined,
            };
          } catch {
            // Tolerate incomplete JSON fragments
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }
}
