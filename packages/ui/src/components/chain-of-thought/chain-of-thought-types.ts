import * as React from "react";

export interface ChainOfThoughtStepItem {
  id?: string | number;
  title: string;
  status?: "running" | "success" | "error" | "default";
  icon?: React.ReactNode;
}

export interface ChainOfThoughtProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title"
> {
  /** Whether the agent is currently reasoning */
  isThinking?: boolean;
  /** Elapsed thinking time in seconds */
  durationSeconds?: number;
  /** Controlled open state of reasoning steps */
  open?: boolean;
  /** Initial open state in uncontrolled mode. Defaults to false */
  defaultOpen?: boolean;
  /** Callback fired when collapsible state toggles */
  onOpenChange?: (open: boolean) => void;
  /** Header title override. Defaults to auto-computed summary */
  title?: React.ReactNode;
}

export interface ChainOfThoughtHeaderProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isThinking?: boolean;
  durationSeconds?: number;
}

export interface ChainOfThoughtStepProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: "running" | "success" | "error" | "default";
  icon?: React.ReactNode;
}
