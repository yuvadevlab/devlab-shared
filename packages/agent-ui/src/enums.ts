/**
 * @file packages/agent-ui/src/enums.ts
 * @description Canonical enums for AgentChat layout modes, slots, stream lifecycle, and message roles.
 * @module @yuva-devlab/agent-ui/enums
 */

/** Layout presentation mode for {@link AgentChat}. */
export const AgentChatLayout = {
  FULL: "full",
  EMBEDDED: "embedded",
  DRAWER: "drawer",
} as const;

/** Union type of {@link AgentChatLayout} values. */
export type AgentChatLayout =
  (typeof AgentChatLayout)[keyof typeof AgentChatLayout];

/** Styleable slot keys exposed for consumer `classNames` overrides. */
export const AgentChatSlot = {
  ROOT: "root",
  SIDEBAR: "sidebar",
  HEADER: "header",
  VIEWPORT: "viewport",
  MESSAGE_ROW: "messageRow",
  BUBBLE_USER: "bubbleUser",
  BUBBLE_ASSISTANT: "bubbleAssistant",
  COMPOSER: "composer",
  EMPTY_STATE: "emptyState",
  INSPECTOR: "inspector",
} as const;

/** Union type of {@link AgentChatSlot} values. */
export type AgentChatSlot = (typeof AgentChatSlot)[keyof typeof AgentChatSlot];

/** High-level stream connection lifecycle states. */
export const AgentStreamStatus = {
  IDLE: "idle",
  CONNECTING: "connecting",
  STREAMING: "streaming",
  AWAITING_APPROVAL: "awaiting_approval",
  ERROR: "error",
} as const;

/** Union type of {@link AgentStreamStatus} values. */
export type AgentStreamStatus =
  (typeof AgentStreamStatus)[keyof typeof AgentStreamStatus];

/** Speaker role for rendered chat turns. */
export const AgentMessageRole = {
  USER: "user",
  ASSISTANT: "assistant",
  SYSTEM: "system",
} as const;

/** Union type of {@link AgentMessageRole} values. */
export type AgentMessageRole =
  (typeof AgentMessageRole)[keyof typeof AgentMessageRole];

/** Human-in-the-loop confirmation approval lifecycle states. */
export const AgentApprovalState = {
  REQUESTED: "approval-requested",
  ACCEPTED: "approval-accepted",
  REJECTED: "approval-rejected",
} as const;

/** Union type of {@link AgentApprovalState} values. */
export type AgentApprovalState =
  (typeof AgentApprovalState)[keyof typeof AgentApprovalState];
