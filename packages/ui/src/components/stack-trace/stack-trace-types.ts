import * as React from "react";

export interface StackFrameItem {
  id: string;
  functionName?: string;
  fileName: string;
  lineNumber: number;
  columnNumber?: number;
  snippet?: string;
  highlightLine?: number;
  isInternal?: boolean;
}

export interface StackTraceProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title"
> {
  /** Error class name or type (e.g. "TypeError", "InvariantViolation") */
  errorType?: string;
  /** Detailed error message */
  message: string;
  /** Call stack frames list */
  frames?: StackFrameItem[];
  /** Raw unparsed stack trace string */
  rawStack?: string;
  /** Optional root cause or remediation hint */
  cause?: string;
  /** Whether copy stack button is displayed */
  copyable?: boolean;
  /** Allow collapsing stack frames under header. Defaults to false. */
  collapsible?: boolean;
  /** Initial expanded state when collapsible is true. Defaults to true. */
  defaultOpen?: boolean;
}

export interface StackFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  frame: StackFrameItem;
  defaultExpanded?: boolean;
}
