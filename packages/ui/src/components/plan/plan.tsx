import * as React from "react";
import {
  CheckCircle2,
  Circle,
  Loader2,
  XCircle,
  ChevronRight,
  ListTodo,
} from "lucide-react";
import { cn } from "@/lib/utils";
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
  PlanProps,
  PlanHeaderProps,
  PlanTaskProps,
  TaskStatus,
} from "./plan-types";

export type { PlanProps, PlanHeaderProps, PlanTaskProps, TaskStatus };

export const PlanHeader = React.forwardRef<HTMLDivElement, PlanHeaderProps>(
  (
    {
      className,
      title = "Execution Plan",
      status,
      progress,
      children,
      ...props
    },
    ref,
  ) => (
    <TraceLine ref={ref} className={className} {...props}>
      <TraceIcon>
        <ListTodo />
      </TraceIcon>
      <TraceTitle>{title}</TraceTitle>
      <div className="ml-auto flex items-center gap-2 text-xs">
        {progress && <span className="text-muted-foreground">{progress}</span>}
        {status && (
          <span
            className={cn(
              "px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider",
              status === "completed" && "bg-success/15 text-success",
              status === "in-progress" && "bg-primary/15 text-primary",
              status === "failed" && "bg-destructive/15 text-destructive",
              status === "pending" && "bg-muted text-muted-foreground",
            )}
          >
            {status}
          </span>
        )}
        {children}
      </div>
    </TraceLine>
  ),
);
PlanHeader.displayName = "PlanHeader";

export const PlanTask = React.forwardRef<HTMLDivElement, PlanTaskProps>(
  (
    {
      className,
      title,
      description,
      status = "pending",
      defaultExpanded = false,
      children,
      ...props
    },
    ref,
  ) => {
    const [expanded, setExpanded] = React.useState(defaultExpanded);
    const hasChildren = Boolean(children || description);

    const renderIcon = () => {
      switch (status) {
        case "completed":
          return <CheckCircle2 className="size-4 text-success" />;
        case "running":
          return <Loader2 className="size-4 text-primary animate-spin" />;
        case "failed":
          return <XCircle className="size-4 text-destructive" />;
        case "pending":
        default:
          return <Circle className="size-4 text-muted-foreground" />;
      }
    };

    const traceStatus =
      status === "completed"
        ? "success"
        : status === "failed"
          ? "error"
          : status === "running"
            ? "running"
            : "pending";
    const line = (
      <TraceLine
        ref={ref}
        status={traceStatus}
        className={className}
        {...props}
      >
        <TraceIcon>{renderIcon()}</TraceIcon>
        <div className="flex min-w-0 flex-col gap-1">
          <TraceTitle>{title}</TraceTitle>
          {description && !expanded && (
            <span className="truncate text-xs text-muted-foreground">
              {description}
            </span>
          )}
        </div>
        {hasChildren && (
          <ChevronRight
            className={cn(
              "ml-auto size-4 shrink-0 text-muted-foreground transition-transform",
              expanded && "rotate-90",
            )}
          />
        )}
      </TraceLine>
    );

    if (!hasChildren) return line;
    return (
      <TraceCollapsible
        open={expanded}
        onOpenChange={setExpanded}
        className="dl-plan__task-group"
      >
        <TraceCollapsibleTrigger className="w-full">
          {line}
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent keepMounted>
          <TraceContent>
            {description}
            {children}
          </TraceContent>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    );
  },
);
PlanTask.displayName = "PlanTask";

/**
 * Agent task execution plan checklist container.
 * Displays overall plan status, progress counts, and granular step tasks.
 *
 * @example
 * ```tsx
 * <Plan title="Refactoring Architecture" status="in-progress">
 *   <PlanHeader progress="2 of 4 steps" status="in-progress" />
 *   <div className="dl-plan__tasks">
 *     <PlanTask title="Read schema" status="completed" />
 *     <PlanTask title="Migrate columns" status="running" />
 *   </div>
 * </Plan>
 * ```
 */
export const Plan = React.forwardRef<HTMLDivElement, PlanProps>(
  (
    {
      className,
      title = "Execution Plan",
      status = "in-progress",
      currentStep,
      totalSteps,
      children,
      ...props
    },
    ref,
  ) => {
    const progressText =
      currentStep && totalSteps
        ? `${currentStep} of ${totalSteps} completed`
        : undefined;

    return (
      <Trace ref={ref} className={className} {...props}>
        {title && (
          <PlanHeader title={title} status={status} progress={progressText} />
        )}
        <Trace>{children}</Trace>
      </Trace>
    );
  },
);
Plan.displayName = "Plan";
