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
    <div ref={ref} className={cn("dl-plan__header", className)} {...props}>
      <div className="dl-plan__header-title">
        <ListTodo className="size-4 text-primary" />
        <span>{title}</span>
      </div>
      <div className="dl-plan__header-meta">
        {progress && <span>{progress}</span>}
        {status && (
          <span
            className={cn(
              "dl-plan__status-chip",
              status === "completed" && "dl-plan__status-chip--completed",
              status === "in-progress" && "dl-plan__status-chip--in-progress",
              status === "failed" && "dl-plan__status-chip--failed",
              status === "pending" && "dl-plan__status-chip--pending",
            )}
          >
            {status}
          </span>
        )}
        {children}
      </div>
    </div>
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
          return (
            <CheckCircle2
              style={{ width: "1rem", height: "1rem", color: "var(--success)" }}
            />
          );
        case "running":
          return (
            <Loader2
              style={{
                width: "1rem",
                height: "1rem",
                color: "var(--primary)",
                animation: "spin 1s linear infinite",
              }}
            />
          );
        case "failed":
          return (
            <XCircle
              style={{
                width: "1rem",
                height: "1rem",
                color: "var(--destructive)",
              }}
            />
          );
        case "pending":
        default:
          return (
            <Circle
              style={{
                width: "1rem",
                height: "1rem",
                color: "var(--muted-foreground)",
              }}
            />
          );
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "dl-plan__task",
          status === "completed" && "dl-plan__task--completed",
          className,
        )}
        {...props}
      >
        <div
          className="dl-plan__task-header"
          onClick={() => hasChildren && setExpanded((prev) => !prev)}
        >
          <div className="dl-plan__task-icon">{renderIcon()}</div>
          <div className="dl-plan__task-body">
            <span className="dl-plan__task-title">{title}</span>
            {description && !expanded && (
              <span className="dl-plan__task-desc dl-line-clamp-1">
                {description}
              </span>
            )}
          </div>
          {hasChildren && (
            <ChevronRight
              className={cn(
                "dl-plan__chevron",
                expanded && "dl-plan__chevron--expanded",
              )}
            />
          )}
        </div>
        {expanded && hasChildren && (
          <div className="dl-plan__task-details">
            {description && (
              <div className="dl-plan__desc-block">{description}</div>
            )}
            {children}
          </div>
        )}
      </div>
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
      <div ref={ref} className={cn("dl-plan", className)} {...props}>
        {title && (
          <PlanHeader title={title} status={status} progress={progressText} />
        )}
        <div className="dl-plan__tasks">{children}</div>
      </div>
    );
  },
);
Plan.displayName = "Plan";
