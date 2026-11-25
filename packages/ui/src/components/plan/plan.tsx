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
import { Shimmer } from "@/components/shimmer";
import { PlanSources } from "./plan-sources";
import {
  PlanProps,
  PlanHeaderProps,
  PlanTaskProps,
  PlanSourcesProps,
  TaskStatus,
} from "./plan-types";

export {
  PlanSources,
  type PlanProps,
  type PlanHeaderProps,
  type PlanTaskProps,
  type PlanSourcesProps,
  type TaskStatus,
};

/**
 * Header section for {@link Plan} showing title, description, progress, and status badge.
 */
export const PlanHeader = React.forwardRef<HTMLDivElement, PlanHeaderProps>(
  (
    {
      className,
      title = "Execution Plan",
      description,
      status,
      progress,
      children,
      ...props
    },
    ref,
  ) => (
    <div ref={ref} className={cn("dl-plan__header", className)} {...props}>
      <div className="dl-plan__header-left">
        <div className="dl-plan__header-title">
          <ListTodo className="dl-plan__header-icon" aria-hidden="true" />
          {status === "in-progress" ? (
            <Shimmer>{title}</Shimmer>
          ) : (
            <span>{title}</span>
          )}
        </div>
        {description && (
          <p className="dl-plan__header-description">{description}</p>
        )}
      </div>
      <div className="dl-plan__header-meta">
        {progress && <span className="dl-plan__progress-text">{progress}</span>}
        {status && (
          <span
            className={cn(
              "dl-plan__status-chip",
              `dl-plan__status-chip--${status}`,
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

function renderTaskStatusIcon(status: TaskStatus) {
  if (status === "completed") {
    return (
      <CheckCircle2
        className="dl-plan__status-icon dl-plan__status-icon--completed"
        aria-hidden="true"
      />
    );
  }
  if (status === "running") {
    return (
      <Loader2
        className="dl-plan__status-icon dl-plan__status-icon--running"
        aria-hidden="true"
      />
    );
  }
  if (status === "failed") {
    return (
      <XCircle
        className="dl-plan__status-icon dl-plan__status-icon--failed"
        aria-hidden="true"
      />
    );
  }
  return (
    <Circle
      className="dl-plan__status-icon dl-plan__status-icon--pending"
      aria-hidden="true"
    />
  );
}

/**
 * Expandable individual task row inside {@link Plan}.
 */
export const PlanTask = React.forwardRef<HTMLDivElement, PlanTaskProps>(
  (
    {
      className,
      title,
      description,
      status = "pending",
      defaultExpanded = false,
      sources,
      onSourceClick,
      children,
      ...props
    },
    ref,
  ) => {
    const [expanded, setExpanded] = React.useState(defaultExpanded);
    const hasDetails = Boolean(
      children || description || (sources && sources.length > 0),
    );

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
        <button
          type="button"
          className={cn(
            "dl-plan__task-header",
            hasDetails && "dl-plan__task-header--interactive",
          )}
          onClick={() => hasDetails && setExpanded((prev) => !prev)}
          aria-expanded={hasDetails ? expanded : undefined}
          disabled={!hasDetails}
        >
          <span className="dl-plan__task-icon">
            {renderTaskStatusIcon(status)}
          </span>
          <span className="dl-plan__task-body">
            <span className="dl-plan__task-title">
              {status === "running" ? <Shimmer>{title}</Shimmer> : title}
            </span>
            {description && !expanded && (
              <span className="dl-plan__task-desc dl-line-clamp-1">
                {description}
              </span>
            )}
          </span>
          {hasDetails && (
            <ChevronRight
              className={cn(
                "dl-plan__chevron",
                expanded && "dl-plan__chevron--expanded",
              )}
              aria-hidden="true"
            />
          )}
        </button>

        {expanded && hasDetails && (
          <div className="dl-plan__task-details">
            {description && (
              <div className="dl-plan__desc-block">{description}</div>
            )}
            {children}
            {sources && sources.length > 0 && (
              <PlanSources sources={sources} onSourceClick={onSourceClick} />
            )}
          </div>
        )}
      </div>
    );
  },
);
PlanTask.displayName = "PlanTask";

/**
 * Agent task execution plan checklist container displaying overall status,
 * progress counts, step details, and consulted sources.
 */
export const Plan = React.forwardRef<HTMLDivElement, PlanProps>(
  (
    {
      className,
      title = "Execution Plan",
      description,
      status = "in-progress",
      currentStep,
      totalSteps,
      sources,
      onSourceClick,
      children,
      ...props
    },
    ref,
  ) => {
    const progressText =
      currentStep !== undefined && totalSteps !== undefined
        ? `${currentStep} of ${totalSteps} completed`
        : undefined;

    return (
      <div ref={ref} className={cn("dl-plan", className)} {...props}>
        {title && (
          <PlanHeader
            title={title}
            description={description}
            status={status}
            progress={progressText}
          />
        )}
        <div className="dl-plan__tasks">{children}</div>
        {sources && sources.length > 0 && (
          <div className="dl-plan__footer">
            <PlanSources
              label="Sources consulted"
              sources={sources}
              onSourceClick={onSourceClick}
            />
          </div>
        )}
      </div>
    );
  },
);
Plan.displayName = "Plan";
