import * as React from "react";
import {
  Bot,
  ChevronRight,
  CheckCircle2,
  Loader2,
  XCircle,
  Circle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { SubagentProps, SubagentStatus } from "./subagent-types";

export type { SubagentProps, SubagentStatus };

function getStatusBadge(status: SubagentStatus) {
  switch (status) {
    case "running":
      return (
        <span className="dl-subagent__status dl-subagent__status--running">
          <Loader2
            className="dl-subagent__status-icon dl-subagent__status-icon--spin"
            aria-hidden="true"
          />
          <span>Running</span>
        </span>
      );
    case "completed":
      return (
        <span className="dl-subagent__status dl-subagent__status--completed">
          <CheckCircle2
            className="dl-subagent__status-icon"
            aria-hidden="true"
          />
          <span>Done</span>
        </span>
      );
    case "failed":
      return (
        <span className="dl-subagent__status dl-subagent__status--failed">
          <XCircle className="dl-subagent__status-icon" aria-hidden="true" />
          <span>Failed</span>
        </span>
      );
    case "idle":
    default:
      return (
        <span className="dl-subagent__status dl-subagent__status--idle">
          <Circle className="dl-subagent__status-icon" aria-hidden="true" />
          <span>Idle</span>
        </span>
      );
  }
}

/**
 * Subagent delegation card displaying autonomous specialist lifecycle and nested outputs.
 *
 * @example
 * ```tsx
 * <Subagent
 *   name="Portfolio Analyst"
 *   role="Asset Allocation Auditor"
 *   status="running"
 *   model="gemini-flash"
 * />
 * ```
 */
export const Subagent = React.forwardRef<HTMLDivElement, SubagentProps>(
  (
    {
      className,
      name,
      role,
      status = "idle",
      model,
      conversationId,
      durationMs,
      summary,
      defaultOpen = false,
      children,
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(defaultOpen);
    const hasChildren = Boolean(children);

    return (
      <div ref={ref} className={cn("dl-subagent", className)} {...props}>
        <button
          type="button"
          className={cn(
            "dl-subagent__header",
            hasChildren && "dl-subagent__header--interactive",
            open && hasChildren && "dl-subagent__header--open",
          )}
          onClick={() => hasChildren && setOpen((prev) => !prev)}
          aria-expanded={hasChildren ? open : undefined}
          disabled={!hasChildren}
        >
          <div className="dl-subagent__title-area">
            <div
              className={cn(
                "dl-subagent__avatar",
                status === "running" && "dl-subagent__avatar--running",
              )}
            >
              <Bot className="dl-subagent__bot-icon" aria-hidden="true" />
            </div>
            <div className="dl-subagent__meta">
              <span className="dl-subagent__name">{name}</span>
              {(summary || role) && (
                <span className="dl-subagent__role">{summary ?? role}</span>
              )}
            </div>
          </div>

          <div className="dl-subagent__badges">
            {model && <span className="dl-subagent__chip">{model}</span>}
            {durationMs !== undefined && (
              <span className="dl-subagent__chip">
                {durationMs < 1000
                  ? `${Math.round(durationMs)}ms`
                  : `${(durationMs / 1000).toFixed(1)}s`}
              </span>
            )}
            {conversationId && (
              <span className="dl-subagent__chip">
                #{conversationId.slice(0, 6)}
              </span>
            )}
            {getStatusBadge(status)}
            {hasChildren && (
              <ChevronRight
                className={cn(
                  "dl-subagent__chevron",
                  open && "dl-subagent__chevron--open",
                )}
                aria-hidden="true"
              />
            )}
          </div>
        </button>

        {open && hasChildren && (
          <div className="dl-subagent__content">{children}</div>
        )}
      </div>
    );
  },
);
Subagent.displayName = "Subagent";
