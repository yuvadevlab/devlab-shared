/**
 * @file packages/ai-client/src/adapters/google/google.adapter.ts
 * @description Native Google Gemini API adapter for Gemini 2.5 Flash / Pro models.
 * @module @yuva-devlab/ai-client
 */

import { DomainError, ErrorCode, ModelTimeoutError } from "@yuva-devlab/errors";
import { Logger, loggerWithConfig } from "@yuva-devlab/logger";
import { resolveEnvCredentials } from "../../config";
import { AI_ENDPOINTS } from "../../constants";
import {
  FinishReason,
  type ILLMProvider,
  type LLMRequest,
  type LLMResponse,
  type LLMStreamChunk,
  MissingCredentialError,
} from "../../types";
import {
  buildGeminiRequestBody,
  type GeminiResponse,
  type GoogleAdapterConfig,
} from "./google.types";

const logger = loggerWithConfig(new Logger("GoogleAdapter"));

/**
 * Google AI Studio / Gemini provider adapter.
 *
 * @example
 * ```typescript
 * const adapter = new GoogleAdapter({ apiKey: "AIzaSy..." });
 * const res = await adapter.complete({
 *   model: "gemini-2.5-flash",
 *   messages: [createUserMessage("Write a quick sort in TypeScript")],
 * });
 * ```
 */
export class GoogleAdapter implements ILLMProvider {
  public readonly name = "google";
  private readonly config: GoogleAdapterConfig;

  /**
   * Initializes the Google Gemini adapter.
   *
   * @param config - Connection options and credentials.
   */
  public constructor(config: GoogleAdapterConfig = {}) {
    this.config = config;
  }

  /**
   * Resolves authentication credentials and model defaults.
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
      AI_ENDPOINTS.GOOGLE_GEMINI_DEFAULT_BASE_URL
    ).replace(/\/+$/, "");
    const defaultModel =
      this.config.defaultModel ??
      dynamic.defaultModel ??
      env.defaultModel ??
      "gemini-2.5-flash";

    if (!apiKey) {
      throw new MissingCredentialError("Google Gemini", "GEMINI_API_KEY");
    }

    return { apiKey, baseUrl, defaultModel };
  }

  /**
   * Executes a full non-streaming completion via Google AI Studio generateContent.
   *
   * @param request - Validated completion request.
   * @returns Complete model response.
   */
  public async complete(request: LLMRequest): Promise<LLMResponse> {
    const { apiKey, baseUrl, defaultModel } = await this.resolveCredentials();
    const startTime = Date.now();
    const model = request.model || defaultModel;

    logger.debug("[complete] Executing Gemini completion", { model });

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), request.timeoutMs);

    try {
      const url = `${baseUrl}/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildGeminiRequestBody(request)),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => "");
        logger.error("[complete] Gemini API error response", {
          status: response.status,
          errorText,
        });
        throw new DomainError(
          `Gemini API returned HTTP ${response.status}: ${errorText}`,
          ErrorCode.MODEL_PROVIDER_ERROR,
          response.status,
        );
      }

      const data = (await response.json()) as GeminiResponse;
      const candidate = data.candidates?.[0];
      const text = candidate?.content?.parts?.[0]?.text ?? "";
      const durationMs = Date.now() - startTime;

      logger.info("[complete] Gemini completion finished", {
        model,
        durationMs,
        tokensOut: data.usageMetadata?.candidatesTokenCount,
      });

      return {
        text,
        finishReason:
          candidate?.finishReason === "MAX_TOKENS"
            ? FinishReason.LENGTH
            : FinishReason.STOP,
        usage: {
          promptTokens: data.usageMetadata?.promptTokenCount ?? 0,
          completionTokens: data.usageMetadata?.candidatesTokenCount ?? 0,
          totalTokens: data.usageMetadata?.totalTokenCount ?? 0,
        },
        model,
        durationMs,
      };
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") {
        logger.warn("[complete] Gemini request timed out", {
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
   * Streams token chunks incrementally using Server-Sent Events.
   *
   * @param request - Validated completion request.
   * @returns Async iterable yielding token delta chunks.
   */
  public async *stream(request: LLMRequest): AsyncIterable<LLMStreamChunk> {
    const { apiKey, baseUrl, defaultModel } = await this.resolveCredentials();
    const model = request.model || defaultModel;
    const url = `${baseUrl}/models/${model}:streamGenerateContent?alt=sse&key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildGeminiRequestBody(request)),
    });

    if (!response.ok || !response.body) {
      throw new DomainError(
        `Gemini streaming error HTTP ${response.status}`,
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
          const jsonStr = trimmed.slice(5).trim();

          try {
            const chunk = JSON.parse(jsonStr) as GeminiResponse;
            const delta =
              chunk.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
            if (delta) {
              yield { delta };
            }
          } catch {
            // Tolerate incomplete SSE buffer
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }
}
