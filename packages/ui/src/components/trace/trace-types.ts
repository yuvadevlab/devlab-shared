import * as React from "react";

/**
 * Execution state used to style an individual trace line.
 */
export type TraceStatus =
  "default" | "running" | "success" | "error" | "pending" | "completed";

/**
 * Props for a trace container.
 */
export interface TraceProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional card presentation for standalone trace groups. */
  variant?: "default" | "card";
}

/**
 * Props for one line in a trace.
 */
export interface TraceLineProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Execution state governing the line's visual status. */
  status?: TraceStatus;
}

/**
 * Props for an icon displayed beside a trace line.
 */
export interface TraceIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Execution state governing the default icon. */
  status?: TraceStatus;
}

/**
 * Props for the title of a trace line.
 */
export interface TraceTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Additional class names for the title. */
  className?: string;
}

/**
 * Props for descriptive text associated with a trace line.
 */
export interface TraceDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Additional class names for the description. */
  className?: string;
}

/**
 * Props for descriptive content nested under a trace line.
 */
export interface TraceContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Additional class names for the content. */
  className?: string;
}

/**
 * Props for a controlled or uncontrolled collapsible trace group.
 */
export interface TraceCollapsibleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Controlled open state. */
  open?: boolean;
  /** Initial open state in uncontrolled mode. Defaults to false. */
  defaultOpen?: boolean;
  /** Callback fired when the group opens or closes. */
  onOpenChange?: (open: boolean) => void;
}

/**
 * Props for collapsible trace content.
 */
export interface TraceCollapsibleContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Keep the content mounted while the collapsible group is closed. */
  keepMounted?: boolean;
}
