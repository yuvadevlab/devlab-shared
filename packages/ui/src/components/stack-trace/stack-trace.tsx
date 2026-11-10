import * as React from "react";
import { AlertCircle, Copy, Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  StackFrameItem,
  StackTraceProps,
  StackFrameProps,
} from "./stack-trace-types";

export type { StackFrameItem, StackTraceProps, StackFrameProps };

export const StackFrame = React.forwardRef<HTMLDivElement, StackFrameProps>(
  ({ className, frame, defaultExpanded = false, ...props }, ref) => {
    const [expanded, setExpanded] = React.useState(defaultExpanded);
    const hasSnippet = Boolean(frame.snippet);

    return (
      <div
        ref={ref}
        className={cn(
          "dl-stack-frame",
          frame.isInternal && "dl-stack-frame--internal",
          className,
        )}
        {...props}
      >
        <div
          className="dl-stack-frame__header"
          onClick={() => hasSnippet && setExpanded((prev) => !prev)}
        >
          <div className="dl-stack-frame__fn-wrapper">
            {hasSnippet && (
              <ChevronRight
                className={cn(
                  "dl-stack-frame__chevron",
                  expanded && "dl-stack-frame__chevron--expanded",
                )}
              />
            )}
            <span className="dl-stack-frame__fn">
              {frame.functionName ?? "anonymous"}
            </span>
          </div>
          <span className="dl-stack-frame__location">
            {frame.fileName}:{frame.lineNumber}
            {frame.columnNumber ? `:${frame.columnNumber}` : ""}
          </span>
        </div>
        {expanded && frame.snippet && (
          <pre className="dl-stack-frame__snippet">
            <code>{frame.snippet}</code>
          </pre>
        )}
      </div>
    );
  },
);
StackFrame.displayName = "StackFrame";

/**
 * Diagnostic stack trace viewer formatting error exceptions and code call frames.
 *
 * @example
 * ```tsx
 * <StackTrace
 *   errorType="TypeError"
 *   message="Cannot read properties of undefined (reading 'map')"
 *   frames={frames}
 * />
 * ```
 */
export const StackTrace = React.forwardRef<HTMLDivElement, StackTraceProps>(
  (
    {
      className,
      errorType = "Error",
      message,
      frames = [],
      rawStack,
      copyable = true,
      children,
      ...props
    },
    ref,
  ) => {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
      const fullText =
        rawStack ||
        `${errorType}: ${message}\n` +
          frames
            .map(
              (f) =>
                `    at ${f.functionName || "anonymous"} (${f.fileName}:${f.lineNumber})`,
            )
            .join("\n");

      navigator.clipboard?.writeText(fullText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    };

    return (
      <div ref={ref} className={cn("dl-stack-trace", className)} {...props}>
        <div className="dl-stack-trace__header">
          <div className="flex items-start gap-2 min-w-0">
            <AlertCircle className="size-4 text-destructive shrink-0 mt-0.5" />
            <div className="dl-stack-trace__title">
              <span className="dl-stack-trace__error-type">{errorType}</span>
              <span className="dl-stack-trace__message">{message}</span>
            </div>
          </div>
          {copyable && (
            <button
              type="button"
              onClick={handleCopy}
              aria-label={copied ? "Copied" : "Copy stack trace"}
              className="dl-code-block__copy-btn shrink-0"
            >
              {copied ? (
                <Check className="size-3.5 text-success" />
              ) : (
                <Copy className="size-3.5" />
              )}
            </button>
          )}
        </div>

        {frames.length > 0 && (
          <div className="dl-stack-trace__frames">
            {frames.map((frame) => (
              <StackFrame key={frame.id} frame={frame} />
            ))}
          </div>
        )}

        {children}
      </div>
    );
  },
);
StackTrace.displayName = "StackTrace";
