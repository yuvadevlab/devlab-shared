/**
 * @file packages/ai-client/src/adapters/cline/cline.adapter.ts
 * @description Standard Cline API Gateway adapter supporting Nemotron, Solar, DeepSeek, and Qwen.
 * @module @yuva-devlab/ai-client
 */

import { DomainError, ErrorCode, ModelTimeoutError } from "@yuva-devlab/errors";
import { Logger, loggerWithConfig } from "@yuva-devlab/logger";
import { AI_DEFAULT_MODELS, AI_ENDPOINTS } from "@/constants";
import {
  type ILLMProvider,
  type LLMRequest,
  type LLMResponse,
  type LLMStreamChunk,
  MissingCredentialError,
} from "@/types";
import {
  extractClineRetrySuffix,
  extractClineToolCalls,
  mapClineFinishReason,
} from "./cline.helpers";
import {
  type ClineAdapterConfig,
  type ClineCompletionResponse,
  mapClineMessages,
} from "./cline.types";

const logger = loggerWithConfig(new Logger("ClineAdapter"));

/**
 * Cline adapter executing completions and streaming via the Cline API Gateway.
 */
export class ClineAdapter implements ILLMProvider {
  public readonly name = "cline";
  private readonly config: ClineAdapterConfig;

  public constructor(config: ClineAdapterConfig = {}) {
    this.config = config;
  }

  private async resolveCredentials() {
    const dynamic = this.config.credentials
      ? await this.config.credentials()
      : {};

    const apiKey = this.config.apiKey ?? dynamic.apiKey;
    const baseUrl = (
      this.config.baseUrl ??
      dynamic.baseUrl ??
      AI_ENDPOINTS.CLINE_DEFAULT_BASE_URL
    ).replace(/\/+$/, "");
    const defaultModel =
      this.config.defaultModel ??
      dynamic.defaultModel ??
      AI_DEFAULT_MODELS.CLINE;

    if (!apiKey) {
      throw new MissingCredentialError("Cline", "apiKey");
    }

    return { apiKey, baseUrl, defaultModel };
  }

  public async complete(request: LLMRequest): Promise<LLMResponse> {
    const { apiKey, baseUrl, defaultModel } = await this.resolveCredentials();
    const startTime = Date.now();
    const model = request.model || defaultModel;

    logger.debug("[complete] Executing Cline completion", { model, baseUrl });

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
          messages: mapClineMessages(request.messages),
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
        const suffix = extractClineRetrySuffix(response);
        logger.error("[complete] Cline API error response", {
          status: response.status,
          errorText,
        });
        throw new DomainError(
          `Cline returned HTTP ${response.status}: ${errorText}${suffix}`,
          response.status === 429
            ? ErrorCode.MODEL_RATE_LIMIT
            : ErrorCode.MODEL_PROVIDER_ERROR,
          response.status,
        );
      }

      const raw = (await response.json()) as ClineCompletionResponse;
      const choices = raw.choices ?? raw.data?.choices ?? [];
      const choice = choices[0];
      const text = choice?.message?.content ?? "";
      const toolCalls = extractClineToolCalls(choices);
      const durationMs = Date.now() - startTime;

      return {
        text,
        finishReason: mapClineFinishReason(choice?.finish_reason),
        usage: {
          promptTokens: raw.usage?.prompt_tokens ?? 0,
          completionTokens: raw.usage?.completion_tokens ?? 0,
          totalTokens: raw.usage?.total_tokens ?? 0,
        },
        toolCalls,
        model,
        durationMs,
      };
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") {
        logger.warn("[complete] Cline request timed out", {
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
        messages: mapClineMessages(request.messages),
        temperature: request.temperature,
        stream: true,
      }),
    });

    if (!response.ok || !response.body) {
      const errorText = await response.text().catch(() => "");
      const suffix = extractClineRetrySuffix(response);
      throw new DomainError(
        `Cline streaming error HTTP ${response.status}: ${errorText}${suffix}`,
        response.status === 429
          ? ErrorCode.MODEL_RATE_LIMIT
          : ErrorCode.MODEL_PROVIDER_ERROR,
        response.status,
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
              choices?: Array<{ delta?: { content?: string } }>;
            };
            const delta = parsed.choices?.[0]?.delta?.content ?? "";
            if (delta) {
              yield { delta };
            }
          } catch {
            // Tolerate partial stream chunks
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }
}
