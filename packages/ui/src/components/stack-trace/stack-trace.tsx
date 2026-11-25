import * as React from "react";
import {
  AlertCircle,
  Copy,
  Check,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  renderHighlightedTokens,
  tokenizeCodeLines,
} from "@/components/code-block";
import {
  StackFrameItem,
  StackTraceProps,
  StackFrameProps,
} from "./stack-trace-types";

export type { StackFrameItem, StackTraceProps, StackFrameProps };

/**
 * Individual call frame row inside {@link StackTrace} with optional expandable source snippet.
 */
export const StackFrame = React.forwardRef<HTMLDivElement, StackFrameProps>(
  ({ className, frame, defaultExpanded = false, ...props }, ref) => {
    const [expanded, setExpanded] = React.useState(defaultExpanded);
    const hasSnippet = Boolean(frame.snippet);
    const snippetLines = React.useMemo(
      () =>
        frame.snippet
          ? tokenizeCodeLines(frame.snippet.trimEnd(), "typescript")
          : null,
      [frame.snippet],
    );

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
        <button
          type="button"
          className={cn(
            "dl-stack-frame__header",
            hasSnippet && "dl-stack-frame__header--interactive",
          )}
          onClick={() => hasSnippet && setExpanded((prev) => !prev)}
          aria-expanded={hasSnippet ? expanded : undefined}
          disabled={!hasSnippet}
        >
          <span className="dl-stack-frame__fn-wrapper">
            {hasSnippet ? (
              <ChevronRight
                className={cn(
                  "dl-stack-frame__chevron",
                  expanded && "dl-stack-frame__chevron--expanded",
                )}
                aria-hidden="true"
              />
            ) : (
              <span className="dl-stack-frame__dot" aria-hidden="true" />
            )}
            <span className="dl-stack-frame__at">at</span>
            <span className="dl-stack-frame__fn">
              {frame.functionName ?? "anonymous"}
            </span>
          </span>
          <span className="dl-stack-frame__location">
            {frame.fileName}:{frame.lineNumber}
            {frame.columnNumber ? `:${frame.columnNumber}` : ""}
          </span>
        </button>

        {expanded && snippetLines && (
          <pre className="dl-stack-frame__snippet dl-tok-surface">
            <code className="dl-stack-frame__code">
              {snippetLines.map((tokens, idx) => (
                <span key={idx} className="dl-code-block__line">
                  <span className="dl-code-block__line-text">
                    {tokens.length > 0 ? renderHighlightedTokens(tokens) : " "}
                  </span>
                </span>
              ))}
            </code>
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
      cause,
      copyable = true,
      collapsible = false,
      defaultOpen = true,
      children,
      ...props
    },
    ref,
  ) => {
    const [copied, setCopied] = React.useState(false);
    const [open, setOpen] = React.useState(defaultOpen);

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

    const showBody = !collapsible || open;

    return (
      <div ref={ref} className={cn("dl-stack-trace", className)} {...props}>
        <div className="dl-stack-trace__header">
          <div className="dl-stack-trace__header-main">
            <AlertCircle
              className="dl-stack-trace__alert-icon"
              aria-hidden="true"
            />
            <div className="dl-stack-trace__title">
              <div className="dl-stack-trace__headline">
                <span className="dl-stack-trace__error-type">{errorType}</span>
                {frames.length > 0 && (
                  <span className="dl-stack-trace__frame-count">
                    {frames.length} frame{frames.length === 1 ? "" : "s"}
                  </span>
                )}
              </div>
              <span className="dl-stack-trace__message">{message}</span>
            </div>
          </div>
          <div className="dl-stack-trace__actions">
            {copyable && (
              <button
                type="button"
                onClick={handleCopy}
                aria-label={copied ? "Copied" : "Copy stack trace"}
                className="dl-code-block__copy-btn"
              >
                {copied ? (
                  <Check className="dl-stack-trace__copy-ok" />
                ) : (
                  <Copy className="dl-stack-trace__copy-icon" />
                )}
              </button>
            )}
            {collapsible && (
              <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                aria-expanded={open}
                aria-label={
                  open ? "Collapse stack trace" : "Expand stack trace"
                }
                className="dl-code-block__copy-btn"
              >
                <ChevronDown
                  className={cn(
                    "dl-stack-trace__chevron",
                    open && "dl-stack-trace__chevron--open",
                  )}
                />
              </button>
            )}
          </div>
        </div>

        {showBody && cause && (
          <div className="dl-stack-trace__cause">{cause}</div>
        )}

        {showBody && frames.length > 0 && (
          <div className="dl-stack-trace__frames">
            {frames.map((frame) => (
              <StackFrame key={frame.id} frame={frame} />
            ))}
          </div>
        )}

        {showBody && children}
      </div>
    );
  },
);
StackTrace.displayName = "StackTrace";
