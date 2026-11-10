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
import { SubagentProps, SubagentStatus } from "./subagent-types";

export type { SubagentProps, SubagentStatus };

const getStatusBadge = (status: SubagentStatus) => {
  switch (status) {
    case "running":
      return (
        <span className="dl-subagent__status dl-subagent__status--running">
          <Loader2
            style={{
              width: "0.75rem",
              height: "0.75rem",
              animation: "spin 1s linear infinite",
            }}
          />
          <span>Running</span>
        </span>
      );
    case "completed":
      return (
        <span className="dl-subagent__status dl-subagent__status--completed">
          <CheckCircle2 style={{ width: "0.75rem", height: "0.75rem" }} />
          <span>Done</span>
        </span>
      );
    case "failed":
      return (
        <span className="dl-subagent__status dl-subagent__status--failed">
          <XCircle style={{ width: "0.75rem", height: "0.75rem" }} />
          <span>Failed</span>
        </span>
      );
    case "idle":
    default:
      return (
        <span className="dl-subagent__status dl-subagent__status--idle">
          <Circle style={{ width: "0.75rem", height: "0.75rem" }} />
          <span>Idle</span>
        </span>
      );
  }
};

/**
 * Subagent delegation card displaying autonomous agent lifecycle and messages.
 *
 * @example
 * ```tsx
 * <Subagent
 *   name="Codebase Researcher"
 *   role="Repository Explorer"
 *   status="running"
 *   model="flash"
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
        <div
          className="dl-subagent__header"
          onClick={() => hasChildren && setOpen((prev) => !prev)}
        >
          <div className="dl-subagent__title-area">
            <div className="dl-subagent__avatar">
              <Bot className="size-3.5" />
            </div>
            <div className="dl-subagent__meta">
              <span className="dl-subagent__name">{name}</span>
              {role && <span className="dl-subagent__role">{role}</span>}
            </div>
          </div>

          <div className="dl-subagent__badges">
            {model && <span className="dl-subagent__chip">{model}</span>}
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
              />
            )}
          </div>
        </div>

        {open && hasChildren && (
          <div className="dl-subagent__content">{children}</div>
        )}
      </div>
    );
  },
);
Subagent.displayName = "Subagent";
