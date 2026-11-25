import * as React from "react";
import {
  ListOrdered,
  X,
  Clock,
  Loader2,
  Pause,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  QueueProps,
  QueueItemProps,
  QueueTask,
  QueueTaskStatus,
} from "./queue-types";

export type { QueueProps, QueueItemProps, QueueTask, QueueTaskStatus };

/**
 * Individual task row rendered inside {@link Queue}.
 */
export const QueueItem = React.forwardRef<HTMLDivElement, QueueItemProps>(
  ({ className, task, index, onRemove, ...props }, ref) => {
    const renderStatusIcon = () => {
      switch (task.status) {
        case "active":
          return (
            <Loader2
              className="dl-queue-item__icon dl-queue-item__icon--active"
              aria-hidden="true"
            />
          );
        case "paused":
          return (
            <Pause
              className="dl-queue-item__icon dl-queue-item__icon--paused"
              aria-hidden="true"
            />
          );
        case "completed":
          return (
            <CheckCircle2
              className="dl-queue-item__icon dl-queue-item__icon--completed"
              aria-hidden="true"
            />
          );
        case "failed":
          return (
            <XCircle
              className="dl-queue-item__icon dl-queue-item__icon--failed"
              aria-hidden="true"
            />
          );
        case "waiting":
        default:
          return (
            <Clock
              className="dl-queue-item__icon dl-queue-item__icon--waiting"
              aria-hidden="true"
            />
          );
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "dl-queue-item",
          task.status === "completed" && "dl-queue-item--completed",
          className,
        )}
        {...props}
      >
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
              <X className="dl-queue-item__remove-icon" aria-hidden="true" />
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
 *     { id: "1", title: "Summarize May expenses", priority: "high", status: "active" },
 *     { id: "2", title: "Compare category budgets", priority: "normal", status: "waiting" }
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
            <ListOrdered className="dl-queue__header-icon" aria-hidden="true" />
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
