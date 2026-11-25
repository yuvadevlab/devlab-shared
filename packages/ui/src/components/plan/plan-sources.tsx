import * as React from "react";
import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PlanSourcesProps } from "./plan-types";

/**
 * Transparent source reference strip rendered inside {@link Plan} or {@link PlanTask}.
 */
export const PlanSources = React.forwardRef<HTMLDivElement, PlanSourcesProps>(
  ({ className, sources, label = "Sources", onSourceClick, ...props }, ref) => {
    if (!sources.length) return null;

    return (
      <div ref={ref} className={cn("dl-plan__sources", className)} {...props}>
        <span className="dl-plan__sources-label">
          <BookOpen className="dl-plan__sources-icon" aria-hidden="true" />
          <span>{label}</span>
        </span>
        <div className="dl-plan__sources-list">
          {sources.map((src) => {
            const external = /^https?:\/\//i.test(src.url);
            return (
              <a
                key={src.id}
                href={src.url || "#"}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                onClick={(e) => {
                  if (onSourceClick) {
                    if (!external) e.preventDefault();
                    onSourceClick(src);
                  }
                }}
                className="dl-plan__source-pill"
              >
                <span className="dl-plan__source-idx">{src.index}</span>
                <span>{src.title}</span>
              </a>
            );
          })}
        </div>
      </div>
    );
  },
);
PlanSources.displayName = "PlanSources";
