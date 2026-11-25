import * as React from "react";

/**
 * Canonical log severity/category tags for structured {@link TerminalEntry} rows.
 */
export const TerminalEntryLevel = {
  SYS: "SYS",
  INFO: "INFO",
  CTX: "CTX",
  LLM: "LLM",
  TOOL: "TOOL",
  SUBAGENT: "SUBAGENT",
  ACTION: "ACTION",
  DONE: "DONE",
  ERR: "ERR",
} as const;

export type TerminalEntryLevel =
  (typeof TerminalEntryLevel)[keyof typeof TerminalEntryLevel];

/**
 * Height presets for the scrollable {@link TerminalOutput} viewport.
 */
export const TerminalHeight = {
  SM: "sm",
  MD: "md",
  LG: "lg",
} as const;

export type TerminalHeight =
  (typeof TerminalHeight)[keyof typeof TerminalHeight];

/**
 * Structured event log row rendered inside {@link Terminal} when streaming telemetry.
 */
export interface TerminalEntry {
  id: string;
  elapsedMs?: number;
  timestampLabel?: string;
  level?: TerminalEntryLevel | string;
  message: string;
  detail?: string;
}

/**
 * Props for the {@link Terminal} container.
 */
export interface TerminalProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Command or stream title, e.g. "pnpm build" or "Live Agent Stream" */
  command?: string;
  /** Raw preformatted terminal output string */
  output?: string;
  /** Structured timestamped telemetry rows (takes precedence over static output) */
  entries?: TerminalEntry[];
  /** Whether the stream is actively receiving new events */
  isStreaming?: boolean;
  /** Automatically scrolls to the newest line during streaming. Defaults to true. */
  autoScroll?: boolean;
  /** Empty-state message displayed when neither output nor entries exist */
  emptyText?: string;
  /** Viewport height preset. Defaults to "md". */
  height?: TerminalHeight;
  /** Whether to show window dot buttons in header */
  windowControls?: boolean;
}

/**
 * Props for {@link TerminalHeader}.
 */
export interface TerminalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  command?: string;
  windowControls?: boolean;
  isStreaming?: boolean;
  entryCount?: number;
  onCopy?: () => void;
  output?: string;
}

/**
 * Props for {@link TerminalOutput}.
 */
export interface TerminalOutputProps extends React.HTMLAttributes<HTMLDivElement> {
  command?: string;
  height?: TerminalHeight;
  autoScroll?: boolean;
}
