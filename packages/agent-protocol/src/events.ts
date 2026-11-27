/**
 * @file packages/agent-protocol/src/events.ts
 * @description Canonical SSE event payload contracts and frame serializer for DevLab AI agents.
 * @module @yuva-devlab/agent-protocol/events
 */

import {
  AgentCardType,
  AgentMode,
  AgentRunLogLevel,
  AgentStreamEventType,
  ExecutionPhase,
  PhaseStatus,
} from "./enums";

/** Structured presentation card emitted during an agent turn. */
export interface AgentCard {
  /** Card kind — drives which UI component renders it. */
  type: AgentCardType;
  /** Human-readable card heading. */
  title: string;
  /** Optional key–value rows for table or insight cards. */
  rows?: [string, string][];
  /** Optional renderer key for domain-specific custom cards. */
  rendererKey?: string;
  /** Optional structured payload for domain-specific renderers. */
  data?: Record<string, unknown>;
}

/** Discriminated union of every Server-Sent Event pushed during an agent run. */
export type AgentStreamEvent =
  | { type: typeof AgentStreamEventType.CONVERSATION; conversationId: string }
  | { type: typeof AgentStreamEventType.TITLE; title: string }
  | { type: typeof AgentStreamEventType.RUN; runId: string }
  | { type: typeof AgentStreamEventType.MODE; mode: AgentMode }
  | {
      type: typeof AgentStreamEventType.LOG;
      level: AgentRunLogLevel;
      message: string;
      detail?: string;
    }
  | { type: typeof AgentStreamEventType.TOKEN; content: string }
  | { type: typeof AgentStreamEventType.REASONING; content: string }
  | { type: typeof AgentStreamEventType.TOKEN_REPLACE; content: string }
  | { type: typeof AgentStreamEventType.TOOL_CALL; tool: string; runId: string }
  | {
      type: typeof AgentStreamEventType.TOOL_RESULT;
      tool: string;
      ok: boolean;
      summary?: string;
      label?: string;
    }
  | {
      type: typeof AgentStreamEventType.PHASE;
      phase: ExecutionPhase;
      status: PhaseStatus;
      turn?: number;
      pendingAction?: boolean;
      toolCalls?: number;
    }
  | { type: typeof AgentStreamEventType.CARD; card: AgentCard }
  | {
      type: typeof AgentStreamEventType.UI_CARD;
      rendererKey: string;
      data: Record<string, unknown>;
    }
  | {
      type: typeof AgentStreamEventType.CONFIRMATION_REQUIRED;
      actionId: string;
      tool: string;
      card: AgentCard;
    }
  | {
      type: typeof AgentStreamEventType.ACTION_UPDATED;
      actionId: string;
      tool: string;
      card: AgentCard;
      message?: string;
    }
  | {
      type: typeof AgentStreamEventType.ACTION_RESULT;
      actionId: string;
      ok: boolean;
      card?: AgentCard;
    }
  | { type: typeof AgentStreamEventType.SUGGESTIONS; items: string[] }
  | {
      type: typeof AgentStreamEventType.USAGE;
      tokensIn: number;
      tokensOut: number;
    }
  | { type: typeof AgentStreamEventType.ERROR; error: string; code?: string }
  | { type: typeof AgentStreamEventType.DONE };

/**
 * Serializes an {@link AgentStreamEvent} into a single SSE `data:` frame.
 *
 * @param event - Event payload to serialize.
 * @returns Formatted SSE frame terminated by `\n\n`.
 */
export function formatSseFrame(event: AgentStreamEvent): string {
  return `data: ${JSON.stringify(event)}\n\n`;
}
