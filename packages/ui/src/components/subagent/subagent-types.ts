import * as React from "react";

/**
 * Execution lifecycle state of a delegated {@link Subagent}.
 */
export type SubagentStatus = "idle" | "running" | "completed" | "failed";

/**
 * Props for {@link Subagent}.
 */
export interface SubagentProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title"
> {
  /** Name of the subagent */
  name: string;
  /** Role description or job title (e.g. 'Spending Auditor') */
  role?: string;
  /** Execution status */
  status?: SubagentStatus;
  /** Model used by the subagent */
  model?: string;
  /** Subagent identifier or conversation ID */
  conversationId?: string;
  /** Elapsed execution duration in milliseconds */
  durationMs?: number;
  /** Concise one-line summary shown in the card header when finished */
  summary?: string;
  /** Whether the subagent details/logs are open */
  defaultOpen?: boolean;
}
