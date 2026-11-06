import * as React from "react";

export type TraceStatus = "default" | "running" | "success" | "error";

export interface TraceProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual presentation mode */
  variant?: "default" | "card";
}

export interface TraceLineProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Execution status governing the icon and line tint */
  status?: TraceStatus;
}

export interface TraceIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Execution status */
  status?: TraceStatus;
}

export interface TraceTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Additional custom class names */
  className?: string;
}

export interface TraceContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Additional custom class names */
  className?: string;
}

export interface TraceCollapsibleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Controlled open state */
  open?: boolean;
  /** Initial open state in uncontrolled mode. Defaults to false */
  defaultOpen?: boolean;
  /** Callback fired when collapsible toggle is clicked */
  onOpenChange?: (open: boolean) => void;
}
