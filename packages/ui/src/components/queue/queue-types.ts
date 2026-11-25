import * as React from "react";

/**
 * Execution state of an item in {@link Queue}.
 */
export type QueueTaskStatus =
  "waiting" | "active" | "paused" | "completed" | "failed";

/**
 * Single task item queued for agent execution.
 */
export interface QueueTask {
  id: string;
  title: string;
  priority?: "low" | "normal" | "high";
  status?: QueueTaskStatus;
  estimatedDuration?: string;
}

/**
 * Props for {@link Queue}.
 */
export interface QueueProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Tasks in the execution queue */
  tasks: QueueTask[];
  /** Title of the queue */
  title?: string;
  /** Callback when removing/cancelling a task */
  onRemoveTask?: (taskId: string) => void;
}

/**
 * Props for {@link QueueItem}.
 */
export interface QueueItemProps extends React.HTMLAttributes<HTMLDivElement> {
  task: QueueTask;
  index: number;
  onRemove?: () => void;
}
