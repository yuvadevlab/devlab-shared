import * as React from "react";

export type ToolCallStatusType = "running" | "success" | "error";

export interface ToolCallProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Name of the executed tool, e.g. "search_database" or "execute_bash" */
  name: string;
  /** Status of the tool execution */
  status?: ToolCallStatusType;
  /** Optional icon override */
  icon?: React.ReactNode;
  /** Optional arguments object or record */
  args?: Record<string, unknown> | string;
  /** Optional output result */
  result?: string;
  /** Controlled open state of result preview */
  open?: boolean;
  /** Default open state in uncontrolled mode */
  defaultOpen?: boolean;
  /** Callback fired when collapsible state toggles */
  onOpenChange?: (open: boolean) => void;
}

export interface ToolCallHeaderProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  status?: ToolCallStatusType;
  icon?: React.ReactNode;
}

export interface ToolCallArgsProps extends React.HTMLAttributes<HTMLDivElement> {
  args: Record<string, unknown> | string;
}

export interface ToolCallResultProps extends React.HTMLAttributes<HTMLDivElement> {
  result: string;
  language?: string;
}
