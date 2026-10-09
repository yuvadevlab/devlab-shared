/**
 * @file packages/ai-client/src/adapters/groq/groq.adapter.ts
 * @description Ultra-low latency cloud inference adapter for Groq OpenAI-compatible endpoints.
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
  MissingCredentialError,
} from "../../types";
import {
  type GroqAdapterConfig,
  mapGroqMessages,
  type GroqCompletionResponse,
} from "./groq.types";

const logger = loggerWithConfig(new Logger("GroqAdapter"));

/**
 * Groq adapter routing inference to Groq LPU hardware clusters.
 *
 * @example
 * ```typescript
 * const adapter = new GroqAdapter({ apiKey: "gsk_..." });
 * const res = await adapter.complete({
 *   model: "llama-3.3-70b-versatile",
 *   messages: [createUserMessage("Summarize the architectural diffs")],
 * });
 * ```
 */
export class GroqAdapter implements ILLMProvider {
  public readonly name = "groq";
  private readonly config: GroqAdapterConfig;

  /**
   * Initializes the Groq adapter.
   *
   * @param config - Connection options and credentials.
   */
  public constructor(config: GroqAdapterConfig = {}) {
    this.config = config;
  }

  /**
   * Resolves authentication credentials and connection endpoint.
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
      AI_ENDPOINTS.GROQ_DEFAULT_BASE_URL
    ).replace(/\/+$/, "");
    const defaultModel =
      this.config.defaultModel ??
      dynamic.defaultModel ??
      env.defaultModel ??
      AI_DEFAULT_MODELS.GROQ;

    if (!apiKey) {
      throw new MissingCredentialError("Groq", "GROQ_API_KEY");
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

    logger.debug("[complete] Executing Groq completion", { model, baseUrl });

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), request.timeoutMs);

    try {
      const response = await fetch(`${baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: mapGroqMessages(request.messages),
          temperature: request.temperature,
          max_tokens: request.maxTokens,
          top_p: request.topP,
          stop: request.stop,
          response_format:
            request.responseFormat === "json_object"
              ? { type: "json_object" }
              : undefined,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => "");
        logger.error("[complete] Groq API error response", {
          status: response.status,
          errorText,
        });
        throw new DomainError(
          `Groq returned HTTP ${response.status}: ${errorText}`,
          response.status === 429
            ? ErrorCode.MODEL_RATE_LIMIT
            : ErrorCode.MODEL_PROVIDER_ERROR,
          response.status,
        );
      }

      const data = (await response.json()) as GroqCompletionResponse;
      const choice = data.choices[0];
      const text = choice?.message?.content ?? "";
      const durationMs = Date.now() - startTime;

      logger.info("[complete] Groq completion finished", {
        model,
        durationMs,
        tokensOut: data.usage?.completion_tokens,
      });

      return {
        text,
        finishReason:
          choice?.finish_reason === "length"
            ? FinishReason.LENGTH
            : FinishReason.STOP,
        usage: {
          promptTokens: data.usage?.prompt_tokens ?? 0,
          completionTokens: data.usage?.completion_tokens ?? 0,
          totalTokens: data.usage?.total_tokens ?? 0,
        },
        model,
        durationMs,
      };
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") {
        logger.warn("[complete] Groq request timed out", {
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
   * Initiates an SSE stream emitting token deltas incrementally.
   *
   * @param request - Validated completion request.
   * @returns Async iterable emitting token deltas.
   */
  public async *stream(request: LLMRequest): AsyncIterable<LLMStreamChunk> {
    const { apiKey, baseUrl, defaultModel } = await this.resolveCredentials();
    const model = request.model || defaultModel;

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: mapGroqMessages(request.messages),
        temperature: request.temperature,
        stream: true,
      }),
    });

    if (!response.ok || !response.body) {
      throw new DomainError(
        `Groq streaming error HTTP ${response.status}`,
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
          if (!trimmed || !trimmed.startsWith("data:")) continue;
          const payload = trimmed.slice(5).trim();
          if (payload === "[DONE]") break;

          try {
            const parsed = JSON.parse(payload) as {
              choices: Array<{ delta?: { content?: string } }>;
            };
            const delta = parsed.choices[0]?.delta?.content ?? "";
            if (delta) {
              yield { delta };
            }
          } catch {
            // Tolerate partial lines
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }
}
