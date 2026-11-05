import * as React from "react";
import { Check, Circle, LoaderCircle, X } from "lucide-react";
import {
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/trace";
import type { TaskStatus } from "@/components/plan";

/**
 * Props for an agent task status row.
 */
export interface TaskProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Short task title. */
  title: string;
  /** Optional explanatory text. */
  description?: string;
  /** Current execution state. */
  status?: TaskStatus;
}

/**
 * Displays a task title and its current execution status.
 */
export const Task = React.forwardRef<HTMLDivElement, TaskProps>(
  ({ className, title, description, status = "pending", ...props }, ref) => {
    const StatusIcon =
      status === "completed"
        ? Check
        : status === "failed"
          ? X
          : status === "running"
            ? LoaderCircle
            : Circle;

    return (
      <TraceLine
        ref={ref}
        aria-label={`${title}: ${status}`}
        className={className}
        data-slot="task"
        role="group"
        status={
          status === "completed"
            ? "success"
            : status === "failed"
              ? "error"
              : status === "running"
                ? "running"
                : "pending"
        }
        {...props}
      >
        <TraceIcon>
          <StatusIcon aria-hidden="true" className="size-4" focusable="false" />
        </TraceIcon>
        <div className="flex min-w-0 flex-col gap-1">
          <TraceTitle>{title}</TraceTitle>
          {description && <TraceDescription>{description}</TraceDescription>}
        </div>
      </TraceLine>
    );
  },
);
Task.displayName = "Task";
