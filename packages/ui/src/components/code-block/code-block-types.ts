import * as React from "react";

export interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional file path or label displayed in the header */
  filename?: string;
  /** Programming language label, e.g. "typescript", "json", "python" */
  language?: string;
  /** Code string to display and copy */
  code?: string;
  /** Whether to show the copy to clipboard action. Defaults to true */
  copyable?: boolean;
  /** Whether to display line numbers. Defaults to false */
  lineNumbers?: boolean;
}

export interface CodeBlockHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** File name or title */
  filename?: string;
  /** Code language badge text */
  language?: string;
}

export interface CodeBlockContentProps extends React.HTMLAttributes<HTMLPreElement> {
  /** Whether code should wrap instead of scrolling horizontally */
  wrap?: boolean;
  /** Whether line numbers are rendered */
  lineNumbers?: boolean;
}
