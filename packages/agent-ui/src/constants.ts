/**
 * @file packages/agent-ui/src/constants.ts
 * @description Centralized UI copy dictionary and execution defaults for AgentChat.
 * @module @yuva-devlab/agent-ui/constants
 */

/** User-facing UI copy contract for {@link AgentChat}, overridable per consumer app. */
export interface AgentChatCopy {
  /** Sidebar new-thread button label. */
  newThread: string;
  /** Sidebar thread search input placeholder. */
  searchThreadsPlaceholder: string;
  /** Sidebar empty thread list message. */
  noThreads: string;
  /** Default thread title when none is assigned yet. */
  untitledThread: string;
  /** Default header title in single-thread or empty state. */
  defaultTitle: string;
  /** Empty state heading. */
  emptyTitle: string;
  /** Empty state description. */
  emptyDescription: string;
  /** Prompt input placeholder. */
  composerPlaceholder: string;
  /** Reasoning panel title while streaming. */
  thinkingLabel: string;
  /** Reasoning panel title when finished. */
  thoughtProcessLabel: string;
  /** Execution plan heading. */
  planTitle: string;
  /** Sources disclosure label. */
  sourcesLabel: string;
  /** Confirmation approval button label. */
  approveLabel: string;
  /** Confirmation reject button label. */
  rejectLabel: string;
  /** Confirmation approved status label. */
  approvedLabel: string;
  /** Confirmation rejected status label. */
  rejectedLabel: string;
  /** Inspector drawer toggle label. */
  traceToggleLabel: string;
  /** Inspector drawer heading. */
  traceTitle: string;
  /** Inspector empty state. */
  traceEmpty: string;
  /** Jump to latest message button label. */
  scrollToBottomLabel: string;
  /** Generic stream error fallback. */
  streamErrorFallback: string;
  /** Retry action button label. */
  retryLabel: string;
}

/** Default English copy catalog for {@link AgentChat}. */
export const DEFAULT_AGENT_CHAT_COPY: AgentChatCopy = {
  newThread: "New conversation",
  searchThreadsPlaceholder: "Search conversations...",
  noThreads: "No conversations yet",
  untitledThread: "New conversation",
  defaultTitle: "AI Workspace",
  emptyTitle: "Transparent AI Workspace",
  emptyDescription:
    "Ask anything. Inspect live reasoning, execution plans, tool calls, grounded sources, and token telemetry in real time.",
  composerPlaceholder: "Ask a question or describe a task...",
  thinkingLabel: "Thinking...",
  thoughtProcessLabel: "Reasoning process",
  planTitle: "Execution Plan",
  sourcesLabel: "Grounded Sources",
  approveLabel: "Approve & Execute",
  rejectLabel: "Reject",
  approvedLabel: "Approved",
  rejectedLabel: "Rejected",
  traceToggleLabel: "Trace",
  traceTitle: "Execution Trace",
  traceEmpty:
    "Run logs and phase transitions will appear here during execution.",
  scrollToBottomLabel: "Jump to latest",
  streamErrorFallback: "Unable to complete the request. Please try again.",
  retryLabel: "Retry",
};

/** Behavioral constants for {@link AgentChat}. */
export const AGENT_CHAT_DEFAULTS = {
  MAX_ATTACHMENTS: 5,
  AUTO_SCROLL_THRESHOLD_PX: 96,
  TEXTAREA_PLACEHOLDER_DELAY_MS: 0,
} as const;
