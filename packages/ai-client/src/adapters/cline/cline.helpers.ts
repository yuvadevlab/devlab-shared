/**
 * @file packages/ai-client/src/adapters/cline/cline.helpers.ts
 * @description Helper functions for Cline completion parsing, error mapping, and tool extraction.
 * @module @yuva-devlab/ai-client
 */

import { FinishReason, type ToolCall } from "@/types";
import {
  type ClineCompletionResponse,
  restoreClineToolName,
} from "./cline.types";

/**
 * Parses and restores canonical tool calls from Cline model output.
 *
 * @param choices - Candidate completions from Cline API.
 * @returns Array of parsed ToolCall objects or undefined.
 */
export function extractClineToolCalls(
  choices?: ClineCompletionResponse["choices"],
): ToolCall[] | undefined {
  const choice = choices?.[0];
  const toolCalls = choice?.message?.tool_calls;
  if (!toolCalls || toolCalls.length === 0) {
    return undefined;
  }

  return toolCalls.map((tc, index) => {
    let args: Record<string, unknown> = {};
    try {
      args = tc.function?.arguments
        ? (JSON.parse(tc.function.arguments) as Record<string, unknown>)
        : {};
    } catch {
      args = {};
    }

    return {
      id: tc.id ?? `call_${index}`,
      name: restoreClineToolName(tc.function?.name ?? ""),
      arguments: args,
    };
  });
}

/**
 * Maps raw finish_reason string to canonical FinishReason enum.
 *
 * @param reason - Raw finish reason from API response.
 * @returns Canonical FinishReason member.
 */
export function mapClineFinishReason(reason?: string | null): FinishReason {
  if (reason === "tool_calls") return FinishReason.TOOL_CALLS;
  if (reason === "length") return FinishReason.LENGTH;
  return FinishReason.STOP;
}

/**
 * Extracts rate limit reset delays or retry-after headers from HTTP response.
 *
 * @param response - Fetch response instance.
 * @returns Informational suffix string or empty string.
 */
export function extractClineRetrySuffix(response: Response): string {
  const retryAfter =
    response.headers.get("retry-after") ??
    response.headers.get("x-ratelimit-reset-tokens");
  return retryAfter ? ` (retry-after: ${retryAfter})` : "";
}
