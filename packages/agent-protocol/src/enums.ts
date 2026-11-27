/**
 * @file packages/agent-protocol/src/enums.ts
 * @description Canonical domain-agnostic runtime, stream, phase, activity, and log enums for DevLab AI agents.
 * @module @yuva-devlab/agent-protocol/enums
 */

/** Provider-agnostic chat roles for LLMs. */
export const LlmRole = {
  SYSTEM: "system",
  USER: "user",
  ASSISTANT: "assistant",
  TOOL: "tool",
} as const;

/** Union type of {@link LlmRole} values. */
export type LlmRole = (typeof LlmRole)[keyof typeof LlmRole];

/** Low-level streaming event types emitted by LLM adapters. */
export const LlmStreamEventType = {
  TEXT_DELTA: "text-delta",
  REASONING_DELTA: "reasoning-delta",
  TOOL_CALL: "tool_call",
  USAGE: "usage",
  DONE: "done",
} as const;

/** Union type of {@link LlmStreamEventType} values. */
export type LlmStreamEventType =
  (typeof LlmStreamEventType)[keyof typeof LlmStreamEventType];

/** Agent execution mode determining tool loop availability. */
export const AgentMode = {
  AGENT: "agent",
  CHAT: "chat",
} as const;

/** Union type of {@link AgentMode} values. */
export type AgentMode = (typeof AgentMode)[keyof typeof AgentMode];

/** Presentation card categories returned during conversational turns. */
export const AgentCardType = {
  INSIGHT: "insight",
  TABLE: "table",
  CONFIRMATION: "confirmation",
  BULK_CONFIRMATION: "bulk_confirmation",
  ENTITY: "entity",
  CUSTOM: "custom",
} as const;

/** Union type of {@link AgentCardType} values. */
export type AgentCardType = (typeof AgentCardType)[keyof typeof AgentCardType];

/** Lifecycle execution phases emitted during an SSE agent stream. */
export const ExecutionPhase = {
  LOADING_CONTEXT: "loading_context",
  MODEL_TURN: "model_turn",
  AGENT_LOOP: "agent_loop",
  SYNTHESIZING: "synthesizing",
} as const;

/** Union type of {@link ExecutionPhase} values. */
export type ExecutionPhase =
  (typeof ExecutionPhase)[keyof typeof ExecutionPhase];

/** Phase progression boundary states. */
export const PhaseStatus = {
  START: "start",
  END: "end",
} as const;

/** Union type of {@link PhaseStatus} values. */
export type PhaseStatus = (typeof PhaseStatus)[keyof typeof PhaseStatus];

/** Server-Sent Event stream event types emitted during agent execution. */
export const AgentStreamEventType = {
  RUN: "run",
  PHASE: "phase",
  MODE: "mode",
  LOG: "log",
  REASONING: "reasoning",
  CONVERSATION: "conversation",
  TITLE: "title",
  TEXT: "text",
  TOKEN: "token",
  TOKEN_REPLACE: "token_replace",
  TOOL_START: "tool_start",
  TOOL_END: "tool_end",
  TOOL_CALL: "tool_call",
  TOOL_RESULT: "tool_result",
  CARD: "card",
  UI_CARD: "ui_card",
  CONFIRMATION: "confirmation",
  CONFIRMATION_REQUIRED: "confirmation_required",
  ACTION_UPDATED: "action_updated",
  ACTION_RESULT: "action_result",
  STATUS: "status",
  SUGGESTIONS: "suggestions",
  USAGE: "usage",
  ERROR: "error",
  DONE: "done",
} as const;

/** Union type of {@link AgentStreamEventType} values. */
export type AgentStreamEventType =
  (typeof AgentStreamEventType)[keyof typeof AgentStreamEventType];

/** Lifecycle status of an individual tool call or execution step. */
export const AgentActivityStatus = {
  PENDING: "pending",
  RUNNING: "running",
  SUCCESS: "success",
  ERROR: "error",
} as const;

/** Union type of {@link AgentActivityStatus} values. */
export type AgentActivityStatus =
  (typeof AgentActivityStatus)[keyof typeof AgentActivityStatus];

/** Kind of activity entry in the timeline. */
export const AgentActivityKind = {
  TOOL: "tool",
  PHASE: "phase",
  APPROVAL: "approval",
} as const;

/** Union type of {@link AgentActivityKind} values. */
export type AgentActivityKind =
  (typeof AgentActivityKind)[keyof typeof AgentActivityKind];

/** Confirmation card lifecycle status. */
export const AgentConfirmationStatus = {
  PENDING: "pending",
  EXECUTED: "executed",
  REJECTED: "rejected",
  FAILED: "failed",
} as const;

/** Union type of {@link AgentConfirmationStatus} values. */
export type AgentConfirmationStatus =
  (typeof AgentConfirmationStatus)[keyof typeof AgentConfirmationStatus];

/** Real-time processing log entry levels. */
export const AgentRunLogLevel = {
  SYS: "SYS",
  CTX: "CTX",
  LLM: "LLM",
  TOOL: "TOOL",
  STREAM: "STREAM",
  ACTION: "ACTION",
  DONE: "DONE",
  ERR: "ERR",
} as const;

/** Union type of {@link AgentRunLogLevel} values. */
export type AgentRunLogLevel =
  (typeof AgentRunLogLevel)[keyof typeof AgentRunLogLevel];

/** Role in agent conversation chat messages. */
export const AgentChatRole = {
  USER: "user",
  ASSISTANT: "assistant",
} as const;

/** Union type of {@link AgentChatRole} values. */
export type AgentChatRole = (typeof AgentChatRole)[keyof typeof AgentChatRole];

/** Canonical error codes emitted on SSE error events. */
export const AgentErrorCode = {
  MAX_ITERATIONS: "MAX_ITERATIONS",
  CONVERSATION_NOT_FOUND: "CONVERSATION_NOT_FOUND",
  LLM_UNAVAILABLE: "LLM_UNAVAILABLE",
  AGENT_ERROR: "AGENT_ERROR",
} as const;

/** Union type of {@link AgentErrorCode} values. */
export type AgentErrorCode =
  (typeof AgentErrorCode)[keyof typeof AgentErrorCode];
