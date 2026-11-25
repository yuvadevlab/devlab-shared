/**
 * @file packages/ai-client/src/adapters/stream-chunk.helpers.ts
 * @description Shared SSE chunk parsers for OpenAI-compatible streaming adapters.
 * @module @yuva-devlab/ai-client
 */

import { FinishReason, type LLMStreamChunk } from "@/types";

interface OpenAiCompatDelta {
  content?: string;
  reasoning_content?: string;
  reasoning?: string;
}

interface OpenAiCompatStreamPayload {
  choices?: Array<{
    delta?: OpenAiCompatDelta;
    finish_reason?: string | null;
  }>;
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
  };
}

/**
 * Extracts normalized delta, reasoningDelta, finishReason, and usage metrics
 * from an OpenAI-compatible SSE `data:` JSON payload.
 *
 * @param payload - Raw JSON string following `data:` in SSE frame.
 * @returns Parsed {@link LLMStreamChunk} or null when chunk carries no emittable fields.
 */
export function parseOpenAiCompatStreamChunk(
  payload: string,
): LLMStreamChunk | null {
  try {
    const parsed = JSON.parse(payload) as OpenAiCompatStreamPayload;
    const choice = parsed.choices?.[0];
    const delta = choice?.delta?.content ?? "";
    const reasoningDelta =
      choice?.delta?.reasoning_content ?? choice?.delta?.reasoning;
    const finishReason =
      choice?.finish_reason === "length"
        ? FinishReason.LENGTH
        : choice?.finish_reason === "tool_calls"
          ? FinishReason.TOOL_CALLS
          : choice?.finish_reason
            ? FinishReason.STOP
            : undefined;
    const usage = parsed.usage
      ? {
          promptTokens: parsed.usage.prompt_tokens ?? 0,
          completionTokens: parsed.usage.completion_tokens ?? 0,
          totalTokens:
            parsed.usage.total_tokens ??
            (parsed.usage.prompt_tokens ?? 0) +
              (parsed.usage.completion_tokens ?? 0),
        }
      : undefined;

    if (!delta && !reasoningDelta && !finishReason && !usage) {
      return null;
    }

    return {
      delta,
      ...(reasoningDelta ? { reasoningDelta } : {}),
      ...(finishReason ? { finishReason } : {}),
      ...(usage ? { usage } : {}),
    };
  } catch {
    return null;
  }
}
