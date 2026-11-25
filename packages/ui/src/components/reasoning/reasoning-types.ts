import * as React from "react";

/**
 * Props for the root {@link Reasoning} collapsible container.
 */
export interface ReasoningProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether the model is actively streaming reasoning tokens. */
  isStreaming?: boolean;
  /** Elapsed thinking duration in milliseconds. */
  durationMs?: number;
  /** Controlled open state. */
  open?: boolean;
  /** Initial open state in uncontrolled mode. */
  defaultOpen?: boolean;
  /** Automatically opens when streaming starts and collapses when streaming finishes. Defaults to true. */
  autoCollapse?: boolean;
  /** Callback invoked when open state changes. */
  onOpenChange?: (open: boolean) => void;
}

/**
 * Props for the interactive {@link ReasoningTrigger} header button.
 */
export interface ReasoningTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Optional custom label overriding the default thinking/duration summary. */
  label?: string;
}

/**
 * Props for the expandable {@link ReasoningContent} body panel.
 */
export interface ReasoningContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Streamed or completed model reasoning text or rich content. */
  children: React.ReactNode;
}
