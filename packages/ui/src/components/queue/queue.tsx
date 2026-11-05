import * as React from "react";
import { X, Clock, Loader2, Pause } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/button";
import { Trace, TraceIcon, TraceLine, TraceTitle } from "@/components/trace";
import { QueueProps, QueueItemProps, QueueTask } from "./queue-types";

export type { QueueProps, QueueItemProps, QueueTask };

/**
 * Renders one data-driven queue task as a trace line.
 *
 * @param props - Task details, position, and optional removal callback.
 * @returns A themed trace line for the queue task.
 */
export const QueueItem = React.forwardRef<HTMLDivElement, QueueItemProps>(
  ({ className, task, index, onRemove, ...props }, ref) => {
    const renderStatusIcon = (): React.ReactNode => {
      switch (task.status) {
        case "active":
          return <Loader2 className="size-4 animate-spin" aria-hidden="true" />;
        case "paused":
          return <Pause className="size-4" aria-hidden="true" />;
        case "waiting":
        default:
          return <Clock className="size-4" aria-hidden="true" />;
      }
    };

    return (
      <TraceLine
        ref={ref}
        className={cn("group", className)}
        aria-posinset={index + 1}
        {...props}
      >
        <TraceIcon>{renderStatusIcon()}</TraceIcon>
        <TraceTitle className="min-w-0 flex-1 truncate">
          {task.title}
        </TraceTitle>
        {task.priority && (
          <span className="text-xs text-muted-foreground capitalize">
            {task.priority}
          </span>
        )}
        {task.estimatedDuration && (
          <span className="text-xs text-muted-foreground">
            {task.estimatedDuration}
          </span>
        )}
        {onRemove && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onRemove}
            aria-label={`Remove ${task.title}`}
            className="size-7 opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
          >
            <X className="size-4" />
          </Button>
        )}
      </TraceLine>
    );
  },
);
QueueItem.displayName = "QueueItem";

/**
 * Queue trace container. Compose Trace parts as children, or pass `tasks` for
 * the backwards-compatible data-driven task list.
 *
 * @example
 * ```tsx
 * <Queue>
 *   <TraceLine>
 *     <TraceIcon><CircleCheck /></TraceIcon>
 *     <TraceTitle>Updated token definitions</TraceTitle>
 *   </TraceLine>
 * </Queue>
 * ```
 */
export const Queue = React.forwardRef<HTMLDivElement, QueueProps>(
  (
    {
      className,
      tasks,
      title = "Execution Queue",
      onRemoveTask,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <Trace ref={ref} className={className} aria-label={title} {...props}>
        {children ??
          tasks?.map((task, idx) => (
            <QueueItem
              key={task.id}
              task={task}
              index={idx}
              onRemove={onRemoveTask ? () => onRemoveTask(task.id) : undefined}
            />
          ))}
      </Trace>
    );
  },
);
Queue.displayName = "Queue";
