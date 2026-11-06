import * as React from "react";

export type SubagentStatus = "idle" | "running" | "completed" | "failed";

export interface SubagentProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title"
> {
  /** Name of the subagent */
  name: string;
  /** Role description or job title (e.g. 'Codebase Researcher') */
  role?: string;
  /** Execution status */
  status?: SubagentStatus;
  /** Model used by the subagent */
  model?: string;
  /** Subagent identifier or conversation ID */
  conversationId?: string;
  /** Whether the subagent details/logs are open */
  defaultOpen?: boolean;
}
