import * as React from "react";

export interface QueueTask {
  id: string;
  title: string;
  priority?: "low" | "normal" | "high";
  status?: "waiting" | "active" | "paused";
  estimatedDuration?: string;
}

export interface QueueProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Tasks in the execution queue */
  tasks: QueueTask[];
  /** Title of the queue */
  title?: string;
  /** Callback when removing/cancelling a task */
  onRemoveTask?: (taskId: string) => void;
}

export interface QueueItemProps extends React.HTMLAttributes<HTMLDivElement> {
  task: QueueTask;
  index: number;
  onRemove?: () => void;
}
