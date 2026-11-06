import * as React from "react";

export type TaskStatus = "pending" | "running" | "completed" | "failed";

export interface PlanTaskItem {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  subtasks?: Array<{
    id: string;
    title: string;
    completed: boolean;
  }>;
}

export interface PlanProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Title of the plan, defaults to "Execution Plan" */
  title?: string;
  /** Overall plan status */
  status?: "pending" | "in-progress" | "completed" | "failed";
  /** Optional current step index or description */
  currentStep?: number;
  /** Total step count */
  totalSteps?: number;
}

export interface PlanHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  status?: "pending" | "in-progress" | "completed" | "failed";
  progress?: string;
}

export interface PlanTaskProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  status?: TaskStatus;
  defaultExpanded?: boolean;
}
