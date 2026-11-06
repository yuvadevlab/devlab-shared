import * as React from "react";
import { Terminal as TerminalIcon, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
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
      windowControls = true,
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
            <TerminalIcon className="size-3.5" />
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
              <Check className="size-3.5 text-success" />
            ) : (
              <Copy className="size-3.5" />
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
    style={{ maxHeight }}
    className={cn("dl-terminal__output", className)}
    {...props}
  >
    {command && <div className="dl-terminal__prompt-line">$ {command}</div>}
    <code>{children}</code>
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
      windowControls = true,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div ref={ref} className={cn("dl-terminal", className)} {...props}>
        <TerminalHeader
          command={command}
          output={output}
          windowControls={windowControls}
        />
        <TerminalOutput command={command} maxHeight={maxHeight}>
          {output ?? children}
        </TerminalOutput>
      </div>
    );
  },
);
Terminal.displayName = "Terminal";
