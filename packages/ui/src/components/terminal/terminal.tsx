import * as React from "react";
import { Terminal as TerminalIcon, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  TerminalHeight,
  type TerminalHeaderProps,
  type TerminalOutputProps,
  type TerminalProps,
} from "./terminal-types";
import {
  formatTerminalOffset,
  getTerminalLevelModifier,
  serializeTerminalEntries,
} from "./terminal.helpers";

export {
  TerminalEntryLevel,
  TerminalHeight,
  type TerminalEntry,
  type TerminalHeaderProps,
  type TerminalOutputProps,
  type TerminalProps,
} from "./terminal-types";

/**
 * Top toolbar for {@link Terminal} showing window controls, active stream indicator,
 * event counter, and copy-to-clipboard trigger.
 */
export const TerminalHeader = React.forwardRef<
  HTMLDivElement,
  TerminalHeaderProps
>(
  (
    {
      className,
      command,
      windowControls = true,
      isStreaming = false,
      entryCount,
      output = "",
      onCopy,
      children,
      ...props
    },
    ref,
  ) => {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
      onCopy?.();
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
        <div className="dl-terminal__header-left">
          {windowControls && (
            <div className="dl-terminal__dots" aria-hidden="true">
              <span className="dl-terminal__dot" />
              <span className="dl-terminal__dot" />
              <span className="dl-terminal__dot" />
            </div>
          )}
          <div className="dl-terminal__title">
            <TerminalIcon className="dl-terminal__icon" aria-hidden="true" />
            <span>{command ?? "Terminal"}</span>
          </div>
          {isStreaming && (
            <span className="dl-terminal__live-badge">
              <span className="dl-terminal__live-dot" aria-hidden="true" />
              <span>Running</span>
            </span>
          )}
        </div>
        <div className="dl-terminal__header-actions">
          {entryCount !== undefined && (
            <span className="dl-terminal__count">
              {entryCount} event{entryCount === 1 ? "" : "s"}
            </span>
          )}
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? "Copied" : "Copy output"}
            className="dl-code-block__copy-btn"
          >
            {copied ? (
              <Check
                className="dl-terminal__icon dl-terminal__copy-icon--copied"
                aria-hidden="true"
              />
            ) : (
              <Copy className="dl-terminal__icon" aria-hidden="true" />
            )}
          </button>
          {children}
        </div>
      </div>
    );
  },
);
TerminalHeader.displayName = "TerminalHeader";

/**
 * Scrollable terminal viewport supporting optional auto-scroll for streaming logs.
 */
export const TerminalOutput = React.forwardRef<
  HTMLDivElement,
  TerminalOutputProps
>(
  (
    {
      className,
      command,
      height = TerminalHeight.MD,
      autoScroll = true,
      children,
      ...props
    },
    ref,
  ) => {
    const innerRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
      if (autoScroll && innerRef.current) {
        innerRef.current.scrollTop = innerRef.current.scrollHeight;
      }
    }, [autoScroll, children]);

    return (
      <div
        ref={(node) => {
          innerRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn(
          "dl-terminal__output",
          `dl-terminal__output--${height}`,
          className,
        )}
        {...props}
      >
        {command && <div className="dl-terminal__prompt-line">$ {command}</div>}
        {children}
      </div>
    );
  },
);
TerminalOutput.displayName = "TerminalOutput";

/**
 * Execution terminal container displaying CLI commands or structured streaming logs.
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
      entries,
      isStreaming = false,
      autoScroll = true,
      emptyText = "No execution events recorded yet.",
      height = TerminalHeight.MD,
      windowControls = true,
      children,
      ...props
    },
    ref,
  ) => {
    const copyPayload = entries ? serializeTerminalEntries(entries) : output;

    return (
      <div ref={ref} className={cn("dl-terminal", className)} {...props}>
        <TerminalHeader
          command={command}
          output={copyPayload}
          isStreaming={isStreaming}
          entryCount={entries?.length}
          windowControls={windowControls}
        />
        <TerminalOutput
          command={entries ? undefined : command}
          height={height}
          autoScroll={autoScroll}
        >
          {entries ? (
            entries.length === 0 ? (
              <p className="dl-terminal__empty">{emptyText}</p>
            ) : (
              <div className="dl-terminal__entries">
                {entries.map((entry) => {
                  const time =
                    entry.timestampLabel ??
                    formatTerminalOffset(entry.elapsedMs);
                  return (
                    <div key={entry.id} className="dl-terminal__row">
                      {time && (
                        <span className="dl-terminal__time">{time}</span>
                      )}
                      {entry.level && (
                        <span
                          className={cn(
                            "dl-terminal__level",
                            getTerminalLevelModifier(entry.level),
                          )}
                        >
                          {entry.level}
                        </span>
                      )}
                      <span className="dl-terminal__msg">
                        {entry.message}
                        {entry.detail && (
                          <span className="dl-terminal__detail">
                            [{entry.detail}]
                          </span>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            )
          ) : (
            <code>{output ?? children}</code>
          )}
        </TerminalOutput>
      </div>
    );
  },
);
Terminal.displayName = "Terminal";
