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
        <span className="flex items-center gap-1 text-xs text-primary font-medium">
          <Loader2 className="size-3 animate-spin" />
          <span>Running</span>
        </span>
      );
    case "completed":
      return (
        <span className="flex items-center gap-1 text-xs text-success font-medium">
          <CheckCircle2 className="size-3" />
          <span>Done</span>
        </span>
      );
    case "failed":
      return (
        <span className="flex items-center gap-1 text-xs text-destructive font-medium">
          <XCircle className="size-3" />
          <span>Failed</span>
        </span>
      );
    case "idle":
    default:
      return (
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Circle className="size-3" />
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
            {model && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-muted text-muted-foreground border border-border">
                {model}
              </span>
            )}
            {conversationId && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-muted text-muted-foreground">
                #{conversationId.slice(0, 6)}
              </span>
            )}
            {getStatusBadge(status)}
            {hasChildren && (
              <ChevronRight
                className={cn(
                  "size-3.5 text-muted-foreground transition-transform shrink-0 ml-1",
                  open && "rotate-90",
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
