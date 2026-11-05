import * as React from "react";
import {
  Terminal as TerminalIcon,
  Copy,
  Check,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
} from "@/components/trace";
import { CodeBlock } from "@/components/code-block";
import {
  TerminalProps,
  TerminalHeaderProps,
  TerminalOutputProps,
} from "./terminal-types";

export type { TerminalProps, TerminalHeaderProps, TerminalOutputProps };

export const TerminalHeader = React.forwardRef<
  HTMLDivElement,
  TerminalHeaderProps
>(
  (
    {
      className,
      command,
      windowControls = false,
      output = "",
      children,
      ...props
    },
    ref,
  ) => {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
      if (!output && !command) return;
      navigator.clipboard?.writeText(output || command || "").then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    };

    return (
      <div
        ref={ref}
        className={cn("dl-terminal__header", className)}
        {...props}
      >
        <div className="flex items-center gap-2">
          {windowControls && (
            <div className="dl-terminal__dots" aria-hidden="true">
              <span className="dl-terminal__dot" />
              <span className="dl-terminal__dot" />
              <span className="dl-terminal__dot" />
            </div>
          )}
          <div className="dl-terminal__title">
            <TerminalIcon className="size-4" />
            <span>{command ?? "Terminal"}</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? "Copied" : "Copy output"}
            className="dl-code-block__copy-btn"
          >
            {copied ? (
              <Check className="size-4 text-success" />
            ) : (
              <Copy className="size-4" />
            )}
          </button>
          {children}
        </div>
      </div>
    );
  },
);
TerminalHeader.displayName = "TerminalHeader";

export const TerminalOutput = React.forwardRef<
  HTMLPreElement,
  TerminalOutputProps
>(({ className, command, maxHeight = "16rem", children, ...props }, ref) => (
  <pre
    ref={ref}
    data-max-height={maxHeight}
    className={cn("dl-terminal__output", className)}
    {...props}
  >
    <code>
      {command && `$ ${command}\n`}
      {children}
    </code>
  </pre>
));
TerminalOutput.displayName = "TerminalOutput";

/**
 * Shell command execution terminal container displaying CLI prompts and streaming logs.
 *
 * @example
 * ```tsx
 * <Terminal command="pnpm build" output="✓ built in 941ms" />
 * ```
 */
export const Terminal = React.forwardRef<HTMLDivElement, TerminalProps>(
  (
    {
      className,
      command,
      output,
      maxHeight = "16rem",
      windowControls = false,
      status,
      isStreaming = false,
      defaultOpen,
      children,
      ...props
    },
    ref,
  ) => {
    const resolvedStatus =
      status ?? (isStreaming ? "running" : output ? "success" : "default");
    const isRunning = resolvedStatus === "running";
    const outputContent = output ?? children;
    const code =
      typeof outputContent === "string"
        ? `${command ? `$ ${command}\n` : ""}${outputContent}`
        : undefined;

    return (
      <div ref={ref} className={cn("dl-terminal", className)} {...props}>
        <Trace variant="default" className="dl-terminal__trace">
          <TraceCollapsible defaultOpen={defaultOpen ?? isRunning}>
            <TraceLine status={resolvedStatus} className="dl-terminal__line">
              <TraceCollapsibleTrigger className="dl-terminal__trigger">
                {windowControls && (
                  <span className="dl-terminal__dots" aria-hidden="true">
                    <span className="dl-terminal__dot" />
                    <span className="dl-terminal__dot" />
                    <span className="dl-terminal__dot" />
                  </span>
                )}
                <TraceIcon>
                  <TerminalIcon className="size-4" />
                </TraceIcon>
                <span className="dl-trace-title">
                  {command
                    ? `${isRunning ? "Running" : resolvedStatus === "default" ? "Run" : "Ran"} ${command}`
                    : "Terminal"}
                </span>
                {isRunning && (
                  <Loader2
                    className="dl-terminal__spinner size-4"
                    aria-label="Command is running"
                  />
                )}
                <ChevronDown
                  className="dl-terminal__chevron size-4"
                  aria-hidden="true"
                />
              </TraceCollapsibleTrigger>
            </TraceLine>
            <TraceCollapsibleContent className="dl-terminal__content">
              <CodeBlock
                code={code}
                copyable={Boolean(code)}
                className="dl-terminal__code-block"
                data-max-height={maxHeight}
              >
                {outputContent}
              </CodeBlock>
            </TraceCollapsibleContent>
          </TraceCollapsible>
        </Trace>
      </div>
    );
  },
);
Terminal.displayName = "Terminal";
