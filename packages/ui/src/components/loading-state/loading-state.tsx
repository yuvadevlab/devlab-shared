import * as React from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/skeleton";

export interface LoadingStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of skeleton placeholder rows to render (default: 3) */
  rows?: number;
  /** Optional message to display along with a spinner instead of skeleton rows */
  message?: string;
}

/**
 * Flexible loading indicator supporting both skeleton placeholder rows and spinner modes.
 *
 * @example
 * ```tsx
 * // Skeleton row placeholder
 * <LoadingState rows={4} />
 *
 * // Spinner with message
 * <LoadingState message="Fetching agent logs..." />
 * ```
 */
export function LoadingState({
  rows = 3,
  message,
  className,
  ...props
}: LoadingStateProps) {
  if (message) {
    return (
      <div className={cn("dl-loading", className)} {...props}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
        <span>{message}</span>
      </div>
    );
  }

  return (
    <div className={cn("dl-loading-skeleton", className)} {...props}>
      <Skeleton className="dl-loading-skeleton__header" />
      <div className="dl-loading-skeleton__list">
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton key={i} className="dl-loading-skeleton__row" />
        ))}
      </div>
    </div>
  );
}
