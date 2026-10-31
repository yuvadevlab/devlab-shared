import * as React from "react";
import { cn } from "@/lib/utils";

const statusCategoryMap: Record<string, string> = {
  Completed: "dl-status-badge--success",
  COMPLETED: "dl-status-badge--success",
  Operational: "dl-status-badge--success",
  OPERATIONAL: "dl-status-badge--success",
  Active: "dl-status-badge--success",
  ACTIVE: "dl-status-badge--success",
  ONLINE: "dl-status-badge--success",
  "In Progress": "dl-status-badge--info",
  RUNNING: "dl-status-badge--info",
  "Needs Approval": "dl-status-badge--warning",
  Degraded: "dl-status-badge--warning",
  PAUSED: "dl-status-badge--warning",
  Failed: "dl-status-badge--destructive",
  FAILED: "dl-status-badge--destructive",
  Offline: "dl-status-badge--muted",
  DISABLED: "dl-status-badge--muted",
  IDLE: "dl-status-badge--muted",
};

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** The status string to display (e.g. "Active", "Operational", "Failed") */
  status: string;
}

/**
 * Visual status pill featuring a colored indicator dot and text label,
 * with automatic color mapping according to system status names.
 *
 * @example
 * ```tsx
 * <StatusBadge status="Active" />
 * <StatusBadge status="Failed" />
 * <StatusBadge status="In Progress" />
 * ```
 */
export const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ status, className, ...props }, ref) => {
    const normalizedStatus = status?.trim() ?? "";
    const colorClass =
      statusCategoryMap[normalizedStatus] ?? "dl-status-badge--muted";

    return (
      <span
        ref={ref}
        className={cn("dl-status-badge", colorClass, className)}
        {...props}
      >
        <span className="dl-status-badge__dot" />
        {normalizedStatus}
      </span>
    );
  },
);
StatusBadge.displayName = "StatusBadge";
