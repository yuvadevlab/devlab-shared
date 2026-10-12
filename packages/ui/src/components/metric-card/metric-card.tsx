import * as React from "react";
import { cn } from "../../lib/utils";

export interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Label describing the metric */
  readonly label: string;
  /** Primary numeric or textual value */
  readonly value: React.ReactNode;
  /** Contextual note, subtitle, or percentage delta */
  readonly note?: string;
  /** Indicates positive trend (green highlight) */
  readonly positive?: boolean;
  /** Optional icon displayed next to the label */
  readonly icon?: React.ReactNode;
}

/**
 * MetricCard component displaying key statistical benchmarks with labels, values, and trends.
 *
 * @example
 * ```tsx
 * <MetricCard
 *   label="Active services"
 *   value={5}
 *   note="100% operational"
 *   positive={true}
 * />
 * ```
 */
export const MetricCard = React.forwardRef<HTMLDivElement, MetricCardProps>(
  ({ label, value, note, positive, icon, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("dl-metric-card", className)} {...props}>
        <div className="dl-metric-card__header">
          <span className="dl-metric-card__label">{label}</span>
          {icon && <span className="dl-metric-card__icon">{icon}</span>}
        </div>
        <div className="dl-metric-card__value-row">
          <span className="dl-metric-card__value">{value}</span>
        </div>
        {note && (
          <div
            className={cn(
              "dl-metric-card__note",
              positive === true && "dl-metric-card__note--positive",
              positive === false && "dl-metric-card__note--negative",
            )}
          >
            {note}
          </div>
        )}
      </div>
    );
  },
);
MetricCard.displayName = "MetricCard";

export interface MetricsGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Grid items */
  readonly children: React.ReactNode;
}

/**
 * Container component arranging MetricCards in a cohesive responsive grid layout.
 */
export const MetricsGrid = React.forwardRef<HTMLDivElement, MetricsGridProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("dl-metrics-grid", className)} {...props}>
        {children}
      </div>
    );
  },
);
MetricsGrid.displayName = "MetricsGrid";
