import * as React from "react";

/**
 * Legacy data shape accepted by Queue's task-list rendering.
 */
export interface QueueTask {
  id: string;
  title: string;
  priority?: "low" | "normal" | "high";
  status?: "waiting" | "active" | "paused";
  estimatedDuration?: string;
}

export interface QueueProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional task data for the backwards-compatible data-driven rendering. */
  tasks?: QueueTask[];
  /** Accessible label for the queue trace. */
  title?: string;
  /** Callback when removing or cancelling a task. */
  onRemoveTask?: (taskId: string) => void;
}

/**
 * Props for a data-driven Queue task line.
 */
export interface QueueItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Task represented by the line. */
  task: QueueTask;
  /** Zero-based task position, used for accessibility metadata. */
  index: number;
  /** Callback for the task's optional remove action. */
  onRemove?: () => void;
}
