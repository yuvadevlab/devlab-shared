import * as React from "react";
import { cn } from "@/lib/utils";

export interface PanelProps extends React.HTMLAttributes<HTMLElement> {
  /** Optional header title for the panel section */
  title?: string;
  /** Optional metadata node displayed adjacent to the title (e.g. status badge or actions) */
  meta?: React.ReactNode;
}

/**
 * Panel container component for structured dashboard sections, sidebars, and grouped content.
 *
 * @example
 * ```tsx
 * <Panel title="Agent Metrics" meta={<Badge>Active</Badge>}>
 *   <p>Real-time execution analytics.</p>
 * </Panel>
 * ```
 */
export const Panel = React.forwardRef<HTMLElement, PanelProps>(
  ({ title, meta, children, className, ...props }, ref) => {
    return (
      <section ref={ref} className={cn("dl-panel", className)} {...props}>
        {title ? (
          <div className="dl-panel__header">
            <h2 className="dl-panel__title">{title}</h2>
            {meta ? <div className="dl-panel__meta">{meta}</div> : null}
          </div>
        ) : null}
        {children}
      </section>
    );
  },
);
Panel.displayName = "Panel";
