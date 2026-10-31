import * as React from "react";
import { cn } from "@/lib/utils";

const statusToneMap: Record<string, string> = {
  active: "dl-status-chip--primary",
  running: "dl-status-chip--primary",
  completed: "dl-status-chip--muted",
  done: "dl-status-chip--muted",
  indexed: "dl-status-chip--primary",
  enabled: "dl-status-chip--primary",
  available: "dl-status-chip--primary",
  published: "dl-status-chip--primary",
  ok: "dl-status-chip--primary",
  waiting: "dl-status-chip--warning",
  paused: "dl-status-chip--warning",
  processing: "dl-status-chip--warning",
  degraded: "dl-status-chip--warning",
  warn: "dl-status-chip--warning",
  "requires-approval": "dl-status-chip--warning",
  draft: "dl-status-chip--warning",
  failed: "dl-status-chip--destructive",
  error: "dl-status-chip--destructive",
  offline: "dl-status-chip--destructive",
};

export interface StatusChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** The lowercase machine or human status key (e.g. "active", "processing", "failed") */
  status: string;
}

/**
 * Compact chip indicator displaying lifecycle status states with a colored indicator dot.
 *
 * @example
 * ```tsx
 * <StatusChip status="running" />
 * <StatusChip status="processing" />
 * <StatusChip status="error" />
 * ```
 */
export const StatusChip = React.forwardRef<HTMLSpanElement, StatusChipProps>(
  ({ status, className, ...props }, ref) => {
    const toneClass = statusToneMap[status] ?? "dl-status-chip--muted";

    return (
      <span
        ref={ref}
        className={cn("dl-status-chip", toneClass, className)}
        {...props}
      >
        <span className="dl-status-chip__dot" />
        {status}
      </span>
    );
  },
);
StatusChip.displayName = "StatusChip";
