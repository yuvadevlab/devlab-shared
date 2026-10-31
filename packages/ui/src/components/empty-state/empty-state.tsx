import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Properties for configuring the {@link EmptyState} component.
 */
export interface EmptyStateProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title"
> {
  /** Primary headline or title text */
  readonly title: React.ReactNode;
  /** Secondary explanatory description */
  readonly description?: React.ReactNode;
  /** Optional visual icon displayed in the central badge */
  readonly icon?: React.ReactNode;
  /** Primary action button or trigger node */
  readonly action?: React.ReactNode;
  /** Custom children rendered beneath the description */
  readonly children?: React.ReactNode;
}

/**
 * Universal EmptyState component displaying cybernetic or theme-adaptive placeholders
 * when queries, tables, or collections yield zero entries.
 *
 * @example
 * ```tsx
 * <EmptyState
 *   icon={<Search />}
 *   title="No results found"
 *   description="Try adjusting your filters or search keywords."
 *   action={<Button variant="outline">Reset filters</Button>}
 * />
 * ```
 */
export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    { title, description, icon, action, children, className, ...props },
    ref,
  ) => {
    return (
      <div ref={ref} className={cn("dl-empty-state", className)} {...props}>
        {icon && <div className="dl-empty-state__icon-box">{icon}</div>}
        <h3 className="dl-empty-state__title">{title}</h3>
        {description && (
          <p className="dl-empty-state__description">{description}</p>
        )}
        {children}
        {action && <div className="dl-empty-state__actions">{action}</div>}
      </div>
    );
  },
);
EmptyState.displayName = "EmptyState";
