import * as React from "react";
import { ListOrdered, X, Clock, Loader2, Pause } from "lucide-react";
import { cn } from "@/lib/utils";
import { QueueProps, QueueItemProps, QueueTask } from "./queue-types";

export type { QueueProps, QueueItemProps, QueueTask };

export const QueueItem = React.forwardRef<HTMLDivElement, QueueItemProps>(
  ({ className, task, index, onRemove, ...props }, ref) => {
    const renderStatusIcon = () => {
      switch (task.status) {
        case "active":
          return (
            <Loader2 className="size-3 text-primary animate-spin shrink-0" />
          );
        case "paused":
          return (
            <Pause
              style={{
                width: "0.75rem",
                height: "0.75rem",
                color: "var(--warning, #eab308)",
                flexShrink: 0,
              }}
            />
          );
        case "waiting":
        default:
          return (
            <Clock
              style={{
                width: "0.75rem",
                height: "0.75rem",
                color: "var(--muted-foreground)",
                flexShrink: 0,
              }}
            />
          );
      }
    };

    return (
      <div ref={ref} className={cn("dl-queue-item", className)} {...props}>
        <div className="dl-queue-item__info">
          <span className="dl-queue-item__index">{index + 1}</span>
          {renderStatusIcon()}
          <span className="dl-queue-item__title">{task.title}</span>
        </div>

        <div className="dl-queue-item__actions">
          {task.priority && (
            <span
              className={cn(
                "dl-queue-item__priority",
                task.priority === "high" && "dl-queue-item__priority--high",
                task.priority === "normal" && "dl-queue-item__priority--normal",
                task.priority === "low" && "dl-queue-item__priority--low",
              )}
            >
              {task.priority}
            </span>
          )}
          {task.estimatedDuration && (
            <span className="dl-queue-item__duration">
              {task.estimatedDuration}
            </span>
          )}
          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              aria-label="Remove task"
              className="dl-queue-item__remove-btn"
            >
              <X style={{ width: "0.875rem", height: "0.875rem" }} />
            </button>
          )}
        </div>
      </div>
    );
  },
);
QueueItem.displayName = "QueueItem";

/**
 * Agent task execution queue container tracking scheduled, running, and queued jobs.
 *
 * @example
 * ```tsx
 * <Queue
 *   tasks={[
 *     { id: "1", title: "Index codebase", priority: "high", status: "active" },
 *     { id: "2", title: "Generate tests", priority: "normal", status: "waiting" }
 *   ]}
 * />
 * ```
 */
export const Queue = React.forwardRef<HTMLDivElement, QueueProps>(
  (
    {
      className,
      tasks = [],
      title = "Execution Queue",
      onRemoveTask,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div ref={ref} className={cn("dl-queue", className)} {...props}>
        <div className="dl-queue__header">
          <div className="dl-queue__header-left">
            <ListOrdered
              style={{ width: "1rem", height: "1rem", color: "var(--primary)" }}
            />
            <span>{title}</span>
          </div>
          <span className="dl-queue__header-count">
            {tasks.length} item{tasks.length === 1 ? "" : "s"}
          </span>
        </div>

        <div className="dl-queue__list">
          {tasks.map((task, idx) => (
            <QueueItem
              key={task.id}
              task={task}
              index={idx}
              onRemove={onRemoveTask ? () => onRemoveTask(task.id) : undefined}
            />
          ))}
        </div>

        {children}
      </div>
    );
  },
);
Queue.displayName = "Queue";
