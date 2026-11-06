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
  /** Whether copy stack button is displayed */
  copyable?: boolean;
}

export interface StackFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  frame: StackFrameItem;
  defaultExpanded?: boolean;
}
