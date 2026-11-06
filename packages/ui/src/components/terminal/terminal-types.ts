import * as React from "react";

export interface TerminalProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Command executed, e.g. "pnpm build" or "docker compose up" */
  command?: string;
  /** Terminal output string */
  output?: string;
  /** Maximum visible height before scrolling. Defaults to "16rem" */
  maxHeight?: string;
  /** Whether to show window dot buttons in header */
  windowControls?: boolean;
}

export interface TerminalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  command?: string;
  windowControls?: boolean;
  onCopy?: () => void;
  output?: string;
}

export interface TerminalOutputProps extends React.HTMLAttributes<HTMLPreElement> {
  command?: string;
  maxHeight?: string;
}
