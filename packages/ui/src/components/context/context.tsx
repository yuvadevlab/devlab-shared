import * as React from "react";
import { Gauge } from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  ContextContentProps,
  ContextProps,
  ContextTriggerProps,
  ContextUsageProps,
  TokenUsageBreakdown,
} from "./context-types";

export * from "./context-popover";
export type {
  ContextContentProps,
  ContextProps,
  ContextTriggerProps,
  ContextUsageProps,
  TokenUsageBreakdown,
};

const formatNumber = (num: number): string =>
  new Intl.NumberFormat("en-US").format(num);

/**
 * Context window token utilization gauge displaying consumption metrics and breakdown.
 *
 * @example
 * ```tsx
 * <ContextUsage
 *   usedTokens={48200}
 *   maxTokens={200000}
 *   label="Claude 3.5 Sonnet"
 *   breakdown={{ inputTokens: 42000, outputTokens: 6200 }}
 * />
 * ```
 */
export const ContextUsage = React.forwardRef<HTMLDivElement, ContextUsageProps>(
  (
    {
      className,
      usedTokens,
      maxTokens,
      breakdown,
      label = "Context Window",
      size = "md",
      ...props
    },
    ref,
  ) => {
    const percentage =
      maxTokens > 0
        ? Math.max(0, Math.min(100, Math.round((usedTokens / maxTokens) * 100)))
        : 0;

    let fillStatusClass = "";
    if (percentage >= 90) {
      fillStatusClass = "dl-context-usage__bar-fill--danger";
    } else if (percentage >= 75) {
      fillStatusClass = "dl-context-usage__bar-fill--warning";
    }

    return (
      <div
        ref={ref}
        className={cn(
          "dl-context-usage",
          size === "sm" && "dl-context-usage--sm",
          className,
        )}
        {...props}
      >
        <div className="dl-context-usage__header">
          <div className="dl-context-usage__title">
            <Gauge className="size-3.5 text-primary" />
            <span>{label}</span>
          </div>
          <div className="dl-context-usage__fraction">
            {formatNumber(usedTokens)} / {formatNumber(maxTokens)} ({percentage}
            %)
          </div>
        </div>

        <div className="dl-context-usage__bar-bg">
          <div
            className={cn("dl-context-usage__bar-fill", fillStatusClass)}
            style={{ width: `${percentage}%` }}
          />
        </div>

        {breakdown && (
          <div className="dl-context-usage__breakdown">
            {breakdown.inputTokens !== undefined && (
              <span className="dl-context-usage__pill">
                Input: <strong>{formatNumber(breakdown.inputTokens)}</strong>
              </span>
            )}
            {breakdown.outputTokens !== undefined && (
              <span className="dl-context-usage__pill">
                Output: <strong>{formatNumber(breakdown.outputTokens)}</strong>
              </span>
            )}
            {breakdown.reasoningTokens !== undefined && (
              <span className="dl-context-usage__pill">
                Reasoning:{" "}
                <strong>{formatNumber(breakdown.reasoningTokens)}</strong>
              </span>
            )}
            {breakdown.cachedTokens !== undefined && (
              <span className="dl-context-usage__pill">
                Cached: <strong>{formatNumber(breakdown.cachedTokens)}</strong>
              </span>
            )}
          </div>
        )}
      </div>
    );
  },
);
ContextUsage.displayName = "ContextUsage";
