import * as React from "react";
import type { TraceStatus } from "@/components/trace";

export interface TerminalProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Command executed, e.g. "pnpm build" or "docker compose up" */
  command?: string;
  /** Terminal output string */
  output?: string;
  /** Maximum visible height before scrolling. Defaults to "16rem" */
  maxHeight?: string;
  /** Execution state displayed on the command trace. */
  status?: TraceStatus;
  /** Whether the command is still producing output. */
  isStreaming?: boolean;
  /** Initial visibility of the command output. Defaults to `isStreaming`. */
  defaultOpen?: boolean;
  /** Whether to show legacy window dot buttons in the command row. */
  windowControls?: boolean;
}

export interface TerminalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  command?: string;
  /** Whether to show legacy window dot buttons. */
  windowControls?: boolean;
  onCopy?: () => void;
  output?: string;
}

export interface TerminalOutputProps extends React.HTMLAttributes<HTMLPreElement> {
  command?: string;
  /** Maximum visible height before scrolling. Defaults to "16rem". */
  maxHeight?: string;
}
