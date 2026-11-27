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

/** Individual step within a streamed execution plan. */
export interface AgentPlanStep {
  /** Unique step identifier. */
  id: string;
  /** Human-readable step title. */
  title: string;
  /** Optional step detail. */
  description?: string;
  /** Current step lifecycle status. */
  status: "pending" | "running" | "completed" | "failed";
}

/** Grounded source citation emitted during RAG or tool lookup. */
export interface AgentSourceReference {
  /** Unique source identifier. */
  id: string;
  /** 1-based inline citation index. */
  index: number;
  /** Human-readable document or page title. */
  title: string;
  /** Canonical link URL. */
  url: string;
  /** Optional hostname or origin label. */
  domain?: string;
  /** Optional short excerpt or snippet. */
  snippet?: string;
  /** Optional source badge (e.g., "DB", "WEB", "DOC"). */
  badge?: string;
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
  | {
      type: typeof AgentStreamEventType.TOOL_CALL;
      tool: string;
      runId: string;
      callId?: string;
      args?: Record<string, unknown> | string;
    }
  | {
      type: typeof AgentStreamEventType.TOOL_RESULT;
      tool: string;
      callId?: string;
      ok: boolean;
      summary?: string;
      label?: string;
      result?: string;
      durationMs?: number;
    }
  | {
      type: typeof AgentStreamEventType.PHASE;
      phase: ExecutionPhase;
      status: PhaseStatus;
      turn?: number;
      pendingAction?: boolean;
      toolCalls?: number;
    }
  | {
      type: typeof AgentStreamEventType.PLAN;
      title?: string;
      description?: string;
      steps: AgentPlanStep[];
    }
  | {
      type: typeof AgentStreamEventType.SOURCES;
      items: AgentSourceReference[];
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
      costUsd?: number;
      latencyMs?: number;
      modelId?: string;
      provider?: string;
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
