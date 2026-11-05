import * as React from "react";
import { AlertCircle, Copy, Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { CodeBlock } from "@/components/code-block";
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceContent,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/trace";
import {
  StackFrameItem,
  StackTraceProps,
  StackFrameProps,
} from "./stack-trace-types";

export type { StackFrameItem, StackTraceProps, StackFrameProps };

/**
 * Renders one call-stack frame with optional collapsible source code.
 */
export const StackFrame = React.forwardRef<HTMLDivElement, StackFrameProps>(
  ({ className, frame, defaultExpanded = false, ...props }, ref) => {
    const [expanded, setExpanded] = React.useState(defaultExpanded);
    const location = `${frame.fileName}:${frame.lineNumber}${
      frame.columnNumber ? `:${frame.columnNumber}` : ""
    }`;
    const line = (
      <TraceLine
        className={cn(
          frame.isInternal && "dl-stack-frame--internal",
          className,
        )}
        {...props}
      >
        {frame.snippet && (
          <ChevronRight
            className={cn(
              "size-4 shrink-0 text-muted-foreground transition-transform",
              expanded && "rotate-90",
            )}
          />
        )}
        <TraceTitle className="min-w-0 flex-1 truncate">
          {frame.functionName ?? "anonymous"}
        </TraceTitle>
        <span className="text-xs text-muted-foreground">{location}</span>
      </TraceLine>
    );

    return (
      <Trace ref={ref}>
        {frame.snippet ? (
          <TraceCollapsible
            open={expanded}
            onOpenChange={setExpanded}
            className="dl-stack-frame__disclosure"
          >
            <TraceCollapsibleTrigger className="w-full">
              {line}
            </TraceCollapsibleTrigger>
            <TraceCollapsibleContent>
              <TraceContent>
                <CodeBlock
                  code={frame.snippet}
                  language="text"
                  copyable={false}
                  lineNumbers={false}
                />
              </TraceContent>
            </TraceCollapsibleContent>
          </TraceCollapsible>
        ) : (
          line
        )}
      </Trace>
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
      <Trace ref={ref} variant="card" className={className} {...props}>
        <TraceLine status="error">
          <TraceIcon>
            <AlertCircle />
          </TraceIcon>
          <TraceTitle>
            {errorType}: {message}
          </TraceTitle>
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
        </TraceLine>

        {frames.length > 0 && (
          <Trace>
            {frames.map((frame) => (
              <StackFrame key={frame.id} frame={frame} />
            ))}
          </Trace>
        )}

        {children}
      </Trace>
    );
  },
);
StackTrace.displayName = "StackTrace";
