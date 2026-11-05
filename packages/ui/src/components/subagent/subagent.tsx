import * as React from "react";
import {
  Bot,
  ChevronRight,
  CheckCircle2,
  Loader2,
  XCircle,
  Circle,
} from "lucide-react";
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
import { SubagentProps, SubagentStatus } from "./subagent-types";

export type { SubagentProps, SubagentStatus };

const getStatusIcon = (status: SubagentStatus): React.ReactNode => {
  switch (status) {
    case "running":
      return <Loader2 className="size-4 animate-spin" />;
    case "completed":
      return <CheckCircle2 className="size-4" />;
    case "failed":
      return <XCircle className="size-4" />;
    case "idle":
    default:
      return <Circle className="size-4" />;
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
    const hasChildren = Boolean(children);
    const line = (
      <TraceLine
        status={
          status === "running"
            ? "running"
            : status === "failed"
              ? "error"
              : status === "completed"
                ? "success"
                : "default"
        }
      >
        <TraceIcon>
          <Bot />
        </TraceIcon>
        <TraceTitle>{name}</TraceTitle>
        {role && <span className="text-xs text-muted-foreground">{role}</span>}
        {model && (
          <span className="text-xs text-muted-foreground">{model}</span>
        )}
        {conversationId && (
          <span className="font-mono text-xs text-muted-foreground">
            #{conversationId.slice(0, 6)}
          </span>
        )}
        <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
          {getStatusIcon(status)}
          {status}
        </span>
        {hasChildren && (
          <ChevronRight className="size-4 text-muted-foreground transition-transform group-aria-expanded:rotate-90" />
        )}
      </TraceLine>
    );

    return (
      <Trace ref={ref} className={className} {...props}>
        {hasChildren ? (
          <TraceCollapsible defaultOpen={defaultOpen}>
            <TraceCollapsibleTrigger className="group w-full">
              {line}
            </TraceCollapsibleTrigger>
            <TraceCollapsibleContent keepMounted>
              <TraceContent>{children}</TraceContent>
            </TraceCollapsibleContent>
          </TraceCollapsible>
        ) : (
          line
        )}
      </Trace>
    );
  },
);
Subagent.displayName = "Subagent";
