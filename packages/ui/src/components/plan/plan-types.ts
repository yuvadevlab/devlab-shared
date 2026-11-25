import * as React from "react";
import type { SourceItem } from "@/components/sources";

export type TaskStatus = "pending" | "running" | "completed" | "failed";

export interface PlanTaskItem {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  sources?: SourceItem[];
  subtasks?: Array<{
    id: string;
    title: string;
    completed: boolean;
  }>;
}

export interface PlanProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Title of the plan, defaults to "Execution Plan" */
  title?: string;
  /** Optional subtitle explaining the plan goal */
  description?: string;
  /** Overall plan status */
  status?: "pending" | "in-progress" | "completed" | "failed";
  /** Optional current step index or description */
  currentStep?: number;
  /** Total step count */
  totalSteps?: number;
  /** Transparent list of grounded sources or tools consulted by the plan */
  sources?: SourceItem[];
  /** Callback fired when a plan source item is clicked */
  onSourceClick?: (source: SourceItem) => void;
}

export interface PlanHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  status?: "pending" | "in-progress" | "completed" | "failed";
  progress?: string;
}

export interface PlanTaskProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  status?: TaskStatus;
  defaultExpanded?: boolean;
  /** Transparent references inspected during this step */
  sources?: SourceItem[];
  /** Optional callback when a step source item is clicked */
  onSourceClick?: (source: SourceItem) => void;
}

export interface PlanSourcesProps extends React.HTMLAttributes<HTMLDivElement> {
  sources: SourceItem[];
  label?: string;
  onSourceClick?: (source: SourceItem) => void;
}
