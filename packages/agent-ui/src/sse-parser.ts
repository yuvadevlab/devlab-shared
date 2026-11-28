/**
 * @file packages/agent-ui/src/sse-parser.ts
 * @description Pure SSE frame decoder and immutable turn reducer for @yuva-devlab/agent-protocol events.
 * @module @yuva-devlab/agent-ui/sse-parser
 */

import {
  AgentStreamEventType,
  type AgentStreamEvent,
} from "@yuva-devlab/agent-protocol";
import { AgentApprovalState } from "./enums";
import type { AgentChatMessageItem, AgentTraceLogItem } from "./types";

/**
 * Parses a raw SSE text buffer into decoded {@link AgentStreamEvent} items plus any trailing partial frame.
 *
 * @param buffer - Unparsed SSE text accumulated from a ReadableStream chunk.
 * @returns Parsed events and remaining un-terminated buffer tail.
 */
export function parseAgentSseChunk(buffer: string): {
  events: AgentStreamEvent[];
  remainder: string;
} {
  const normalized = buffer.replace(/\r\n/g, "\n");
  const frames = normalized.split("\n\n");
  const remainder = frames.pop() ?? "";
  const events: AgentStreamEvent[] = [];

  for (const frame of frames) {
    const dataLines = frame
      .split("\n")
      .filter((line) => line.startsWith("data:"))
      .map((line) => line.slice(5).trimStart());

    if (dataLines.length === 0) continue;
    const rawJson = dataLines.join("\n").trim();
    if (!rawJson || rawJson === "[DONE]") continue;

    try {
      const parsed = JSON.parse(rawJson) as AgentStreamEvent;
      if (parsed && typeof parsed.type === "string") {
        events.push(parsed);
      }
    } catch {
      // Ignore malformed keep-alive or partial JSON frames
    }
  }

  return { events, remainder };
}

/**
 * Applies a single {@link AgentStreamEvent} to an assistant message turn immutably.
 *
 * @param message - Current assistant message state.
 * @param event - Decoded SSE event from the Gateway.
 * @returns Updated assistant message plus optional side-effect metadata.
 */
export function reduceAssistantMessageEvent(
  message: AgentChatMessageItem,
  event: AgentStreamEvent,
): {
  message: AgentChatMessageItem;
  log?: AgentTraceLogItem;
  suggestions?: string[];
  conversationId?: string;
  title?: string;
  error?: string;
  awaitingApproval?: boolean;
} {
  switch (event.type) {
    case AgentStreamEventType.TOKEN:
      return {
        message: {
          ...message,
          content: message.content + event.content,
          isReasoningStreaming: false,
        },
      };

    case AgentStreamEventType.TOKEN_REPLACE:
      return {
        message: {
          ...message,
          content: event.content,
          isReasoningStreaming: false,
        },
      };

    case AgentStreamEventType.REASONING:
      return {
        message: {
          ...message,
          reasoning: (message.reasoning ?? "") + event.content,
          isReasoningStreaming: true,
        },
      };

    case AgentStreamEventType.PLAN:
      return {
        message: {
          ...message,
          plan: {
            title: event.title,
            description: event.description,
            steps: event.steps,
          },
        },
      };

    case AgentStreamEventType.SOURCES:
      return {
        message: { ...message, sources: event.items },
      };

    case AgentStreamEventType.TOOL_CALL: {
      const existing = message.toolCalls ?? [];
      const id = event.callId ?? `${event.tool}-${existing.length + 1}`;
      return {
        message: {
          ...message,
          toolCalls: [
            ...existing,
            { id, name: event.tool, status: "running", args: event.args },
          ],
        },
      };
    }

    case AgentStreamEventType.TOOL_RESULT: {
      const existing = message.toolCalls ?? [];
      let targetIndex = -1;
      if (event.callId) {
        targetIndex = existing.findIndex((item) => item.id === event.callId);
      } else {
        for (let i = existing.length - 1; i >= 0; i -= 1) {
          if (
            existing[i]?.name === event.tool &&
            existing[i]?.status === "running"
          ) {
            targetIndex = i;
            break;
          }
        }
      }

      if (targetIndex === -1) return { message };

      const nextTools = existing.map((item, idx) =>
        idx === targetIndex
          ? {
              ...item,
              status: event.ok ? ("success" as const) : ("error" as const),
              result: event.result ?? event.summary,
              errorText: event.ok ? undefined : (event.summary ?? event.label),
              durationMs: event.durationMs,
            }
          : item,
      );
      return { message: { ...message, toolCalls: nextTools } };
    }

    case AgentStreamEventType.CARD:
      return {
        message: { ...message, cards: [...(message.cards ?? []), event.card] },
      };

    case AgentStreamEventType.UI_CARD:
      return {
        message: {
          ...message,
          cards: [
            ...(message.cards ?? []),
            {
              type: "custom",
              title: event.rendererKey,
              rendererKey: event.rendererKey,
              data: event.data,
            },
          ],
        },
      };

    case AgentStreamEventType.CONFIRMATION_REQUIRED:
      return {
        awaitingApproval: true,
        message: {
          ...message,
          confirmations: [
            ...(message.confirmations ?? []),
            {
              actionId: event.actionId,
              tool: event.tool,
              card: event.card,
              state: AgentApprovalState.REQUESTED,
            },
          ],
        },
      };

    case AgentStreamEventType.USAGE:
      return {
        message: {
          ...message,
          usage: {
            tokensIn: event.tokensIn,
            tokensOut: event.tokensOut,
            costUsd: event.costUsd,
            latencyMs: event.latencyMs,
            modelId: event.modelId,
            provider: event.provider,
          },
        },
      };

    case AgentStreamEventType.LOG:
      return {
        message,
        log: {
          id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          level: event.level,
          message: event.message,
          detail: event.detail,
          timestamp: new Date().toISOString(),
        },
      };

    case AgentStreamEventType.SUGGESTIONS:
      return { message, suggestions: event.items };

    case AgentStreamEventType.CONVERSATION:
      return { message, conversationId: event.conversationId };

    case AgentStreamEventType.TITLE:
      return { message, title: event.title };

    case AgentStreamEventType.ERROR:
      return { message, error: event.error };

    case AgentStreamEventType.DONE:
      return {
        message: { ...message, isReasoningStreaming: false },
      };

    default:
      return { message };
  }
}
