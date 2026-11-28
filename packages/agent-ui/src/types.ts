/**
 * @file packages/agent-ui/src/types.ts
 * @description Public TypeScript contracts for AgentChat transport, state, renderers, and component props.
 * @module @yuva-devlab/agent-ui/types
 */

import type { CSSProperties, ReactNode } from "react";
import type {
  AgentCard,
  AgentPlanStep,
  AgentSourceReference,
  ExecutionPhase,
  PhaseStatus,
} from "@yuva-devlab/agent-protocol";
import type { PromptInputAttachmentItem } from "@yuva-devlab/ui";
import type { AgentChatCopy } from "./constants";
import type {
  AgentApprovalState,
  AgentChatLayout,
  AgentChatSlot,
  AgentMessageRole,
  AgentStreamStatus,
} from "./enums";

/** Execution status of a single tool call inside an assistant turn. */
export interface AgentToolCallState {
  /** Unique tool call identifier. */
  id: string;
  /** Registered tool name. */
  name: string;
  /** Execution lifecycle state. */
  status: "running" | "success" | "error";
  /** Optional arguments payload. */
  args?: Record<string, unknown> | string;
  /** Optional formatted tool output or summary. */
  result?: string;
  /** Optional error message when failed. */
  errorText?: string;
  /** Elapsed execution time in milliseconds. */
  durationMs?: number;
}

/** Human-in-the-loop confirmation request attached to an assistant turn. */
export interface AgentConfirmationState {
  /** Server-issued action identifier. */
  actionId: string;
  /** Tool awaiting user approval. */
  tool: string;
  /** Structured card describing the pending action. */
  card: AgentCard;
  /** Approval lifecycle state. */
  state: AgentApprovalState;
  /** Optional outcome message after resolution. */
  message?: string;
}

/** Token, latency, and cost telemetry for a turn. */
export interface AgentTurnUsage {
  tokensIn: number;
  tokensOut: number;
  costUsd?: number;
  latencyMs?: number;
  modelId?: string;
  provider?: string;
}

/** Single structured execution log entry shown in the Trace inspector. */
export interface AgentTraceLogItem {
  id: string;
  level: string;
  message: string;
  detail?: string;
  timestamp: string;
}

/** Single chat message turn with full transparent agent metadata. */
export interface AgentChatMessageItem {
  id: string;
  role: AgentMessageRole;
  content: string;
  reasoning?: string;
  isReasoningStreaming?: boolean;
  reasoningDurationMs?: number;
  plan?: {
    title?: string;
    description?: string;
    steps: AgentPlanStep[];
  };
  toolCalls?: AgentToolCallState[];
  confirmations?: AgentConfirmationState[];
  sources?: AgentSourceReference[];
  cards?: AgentCard[];
  usage?: AgentTurnUsage;
  attachments?: PromptInputAttachmentItem[];
  createdAt: string;
}

/** Conversation thread summary. */
export interface AgentChatThread {
  id: string;
  title: string;
  updatedAt: string;
  messages?: AgentChatMessageItem[];
}

/** Selectable model or agent profile option displayed in the composer. */
export interface AgentModelOption {
  id: string;
  label: string;
  provider?: string;
  description?: string;
}

/** Explicit transport configuration supplied by the consumer app. */
export interface AgentChatTransportConfig {
  /** Full or relative URL for the SSE streaming endpoint (e.g. `/api/gateway/runs/stream`). */
  streamUrl: string;
  /** Optional URL for HITL confirmation approval/rejection. */
  confirmUrl?: string;
  /** Optional custom handler for HITL confirmation approval/rejection. */
  onConfirmAction?: (actionId: string, approved: boolean) => Promise<void>;
  /** Optional custom HITL confirmation handler overriding `confirmUrl`. */
  resolveConfirmation?: (
    actionId: string,
    approved: boolean,
    threadId?: string,
  ) => Promise<void>;
  /** Consumer app slug forwarded to the Gateway. */
  appSlug: string;
  /** Default agent profile slug. */
  profileSlug?: string;
  /** Static or async headers (e.g., Bearer token). */
  headers?:
    | Record<string, string>
    | (() => Record<string, string> | Promise<Record<string, string>>);
  /** Optional request body customizer. */
  buildBody?: (input: {
    prompt: string;
    messages: Array<{ role: string; content: string }>;
    threadId?: string;
    modelId?: string;
    attachments: PromptInputAttachmentItem[];
  }) => Record<string, unknown>;
}

/** Optional persistence adapter if the consumer stores threads externally. */
export interface AgentThreadAdapter {
  listThreads?: () => Promise<AgentChatThread[]>;
  loadThread?: (threadId: string) => Promise<AgentChatMessageItem[]>;
  deleteThread?: (threadId: string) => Promise<void>;
}

/** Custom slot and domain card renderers injected by consumer apps. */
export interface AgentChatRenderers {
  /** Custom renderer per tool name (e.g. FinAI transaction card, QuantAI candlestick card). */
  toolRenderers?: Record<string, (tool: AgentToolCallState) => ReactNode>;
  /** Custom renderer per `UI_CARD.rendererKey`. */
  cardRenderers?: Record<string, (card: AgentCard) => ReactNode>;
  /** Custom empty-state view when no messages exist. */
  renderEmptyState?: (onSelectPrompt: (prompt: string) => void) => ReactNode;
  /** Extra actions rendered in the top header bar. */
  renderHeaderActions?: () => ReactNode;
  /** Custom header above the thread list in the sidebar. */
  renderSidebarHeader?: () => ReactNode;
  /** Custom footer rendered below each assistant message. */
  renderMessageFooter?: (message: AgentChatMessageItem) => ReactNode;
  /** Custom footer rendered inside the composer bar. */
  renderComposerFooter?: () => ReactNode;
}

/** Top-level props for {@link AgentChat}. */
export interface AgentChatProps {
  /** Gateway SSE transport configuration. */
  transport: AgentChatTransportConfig;
  /** Optional external thread persistence adapter. */
  threadAdapter?: AgentThreadAdapter;
  /** Initial threads for uncontrolled/SSR hydration. */
  initialThreads?: AgentChatThread[];
  /** Initial messages for single-thread embedded mode. */
  initialMessages?: AgentChatMessageItem[];
  /** Layout variant (`full`, `embedded`, `drawer`). */
  layout?: AgentChatLayout;
  /** Show or hide the thread sidebar. Defaults to `true` in `full` mode. */
  showSidebar?: boolean;
  /** Show or hide the live execution trace inspector toggle. Defaults to `true`. */
  showTraceInspector?: boolean;
  /** Starter suggestion prompts shown in empty state or above composer. */
  starterPrompts?: string[];
  /** Selectable models or agent profiles. */
  models?: AgentModelOption[];
  /** Initial selected model ID. */
  defaultModelId?: string;
  /** Partial UI copy overrides. */
  copy?: Partial<AgentChatCopy>;
  /** Per-slot CSS class overrides. */
  classNames?: Partial<Record<AgentChatSlot, string>>;
  /** Optional CSS custom property overrides (e.g. `--dl-chat-accent`). */
  style?: CSSProperties;
  /** Custom domain renderers and slot overrides. */
  renderers?: AgentChatRenderers;
  /** Current execution phase callback for host telemetry. */
  onPhaseChange?: (phase: ExecutionPhase, status: PhaseStatus) => void;
  /** Current stream status callback. */
  onStatusChange?: (status: AgentStreamStatus) => void;
}
