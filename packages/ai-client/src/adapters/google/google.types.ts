/**
 * @file packages/ai-client/src/adapters/google/google.types.ts
 * @description Wire types, configuration interfaces, and body builders for the Google Gemini adapter.
 * @module @yuva-devlab/ai-client
 */

import {
  type CredentialResolver,
  type LLMRequest,
  type LLMStreamChunk,
  MessageRole,
} from "@/types";

/**
 * Configuration options for initializing GoogleAdapter.
 */
export interface GoogleAdapterConfig {
  /** Google AI Studio API key */
  apiKey?: string;
  /** Base URL for Gemini endpoint (defaults to AI_ENDPOINTS.GOOGLE_GEMINI_DEFAULT_BASE_URL) */
  baseUrl?: string;
  /** Default Gemini model (defaults to AI_DEFAULT_MODELS.GOOGLE) */
  defaultModel?: string;
  /** Optional dynamic credential resolver for secret vaults */
  credentials?: CredentialResolver;
}

export interface GeminiCandidate {
  content?: { parts?: Array<{ text?: string; thought?: boolean }> };
  finishReason?: string;
}

export interface GeminiResponse {
  candidates?: GeminiCandidate[];
  usageMetadata?: {
    promptTokenCount?: number;
    candidatesTokenCount?: number;
    totalTokenCount?: number;
  };
}

/**
 * Builds the native Google Gemini request payload.
 *
 * @param request - Canonical LLMRequest payload.
 * @returns JSON-serializable Gemini request body.
 */
export function buildGeminiRequestBody(
  request: LLMRequest,
): Record<string, unknown> {
  const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];
  let systemInstruction: { parts: Array<{ text: string }> } | undefined;

  for (const msg of request.messages) {
    if (msg.role === MessageRole.SYSTEM) {
      systemInstruction = { parts: [{ text: msg.content }] };
    } else {
      contents.push({
        role: msg.role === MessageRole.ASSISTANT ? "model" : "user",
        parts: [{ text: msg.content }],
      });
    }
  }

  return {
    contents,
    systemInstruction,
    generationConfig: {
      temperature: request.temperature,
      maxOutputTokens: request.maxTokens,
      topP: request.topP,
      stopSequences: request.stop,
      responseMimeType:
        request.responseFormat === "json_object"
          ? "application/json"
          : "text/plain",
    },
  };
}

/**
 * Parses a single Google Gemini SSE data payload into a normalized stream chunk.
 *
 * @param jsonStr - Raw JSON payload stripped of the SSE `data:` prefix.
 * @returns Normalized stream chunk when content/reasoning/usage is present, or `null`.
 */
export function parseGeminiSseChunk(jsonStr: string): LLMStreamChunk | null {
  try {
    const chunk = JSON.parse(jsonStr) as GeminiResponse;
    const parts = chunk.candidates?.[0]?.content?.parts ?? [];
    let delta = "";
    let reasoningDelta = "";

    for (const part of parts) {
      if (!part.text) continue;
      if (part.thought) reasoningDelta += part.text;
      else delta += part.text;
    }

    const usage = chunk.usageMetadata
      ? {
          promptTokens: chunk.usageMetadata.promptTokenCount ?? 0,
          completionTokens: chunk.usageMetadata.candidatesTokenCount ?? 0,
          totalTokens: chunk.usageMetadata.totalTokenCount ?? 0,
        }
      : undefined;

    if (!delta && !reasoningDelta && !usage) return null;
    return {
      delta,
      ...(reasoningDelta ? { reasoningDelta } : {}),
      ...(usage ? { usage } : {}),
    };
  } catch {
    return null;
  }
}
