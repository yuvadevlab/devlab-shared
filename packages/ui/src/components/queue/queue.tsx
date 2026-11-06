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
          return <Pause className="size-3 text-warning shrink-0" />;
        case "waiting":
        default:
          return <Clock className="size-3 text-muted-foreground shrink-0" />;
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
                "px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider",
                task.priority === "high" &&
                  "bg-destructive/15 text-destructive",
                task.priority === "normal" && "bg-primary/15 text-primary",
                task.priority === "low" && "bg-muted text-muted-foreground",
              )}
            >
              {task.priority}
            </span>
          )}
          {task.estimatedDuration && (
            <span className="text-xs text-muted-foreground font-mono">
              {task.estimatedDuration}
            </span>
          )}
          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              aria-label="Remove task"
              className="text-muted-foreground hover:text-foreground p-0.5 rounded"
            >
              <X className="size-3.5" />
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
          <div className="flex items-center gap-1.5">
            <ListOrdered className="size-4 text-primary" />
            <span>{title}</span>
          </div>
          <span className="text-xs text-muted-foreground font-normal">
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
