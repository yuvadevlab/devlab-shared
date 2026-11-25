import * as React from "react";
import { Gauge } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/hover-card";
import { ContextUsageProps, TokenUsageBreakdown } from "./context-types";

export type { ContextUsageProps, TokenUsageBreakdown };

const formatNumber = (num: number) =>
  new Intl.NumberFormat("en-US").format(num);

const formatCompact = (num: number) =>
  new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(num);

function ContextRing({
  percentage,
  statusClass,
}: {
  percentage: number;
  statusClass: string;
}) {
  const radius = 8;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg className="dl-context-ring" viewBox="0 0 20 20" aria-hidden="true">
      <circle className="dl-context-ring__track" cx="10" cy="10" r={radius} />
      <circle
        className={cn("dl-context-ring__value", statusClass)}
        cx="10"
        cy="10"
        r={radius}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform="rotate(-90 10 10)"
      />
    </svg>
  );
}

function ContextBreakdownList({
  breakdown,
}: {
  breakdown?: TokenUsageBreakdown;
}) {
  if (!breakdown) return null;
  const entries = [
    { key: "Input", val: breakdown.inputTokens },
    { key: "Output", val: breakdown.outputTokens },
    { key: "Reasoning", val: breakdown.reasoningTokens },
    { key: "Cached", val: breakdown.cachedTokens },
  ].filter((item) => item.val !== undefined);

  if (entries.length === 0) return null;

  return (
    <div className="dl-context-usage__breakdown">
      {entries.map((item) => (
        <span key={item.key} className="dl-context-usage__pill">
          <span className="dl-context-usage__pill-label">{item.key}</span>
          <strong>{formatNumber(item.val as number)}</strong>
        </span>
      ))}
    </div>
  );
}

/**
 * Context window token utilization indicator displaying percentage ring,
 * horizontal progress gauge, and per-token category breakdown.
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
      variant = "card",
      ...props
    },
    ref,
  ) => {
    const safeMax = Math.max(maxTokens, 1);
    const percentage = Math.min(100, Math.round((usedTokens / safeMax) * 100));

    let statusTone = "";
    if (percentage >= 90) statusTone = "danger";
    else if (percentage >= 75) statusTone = "warning";

    const ringClass = statusTone ? `dl-context-ring__value--${statusTone}` : "";
    const barClass = statusTone
      ? `dl-context-usage__bar-rect--${statusTone}`
      : "";

    const cardBody = (
      <>
        <div className="dl-context-usage__header">
          <div className="dl-context-usage__title">
            <ContextRing percentage={percentage} statusClass={ringClass} />
            <Gauge className="dl-context-usage__icon" aria-hidden="true" />
            <span>{label}</span>
          </div>
          <div className="dl-context-usage__fraction">
            {formatNumber(usedTokens)} / {formatNumber(maxTokens)} ({percentage}
            %)
          </div>
        </div>

        <svg
          className="dl-context-usage__bar-svg"
          viewBox="0 0 100 6"
          preserveAspectRatio="none"
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <rect
            className="dl-context-usage__bar-track"
            width="100"
            height="6"
            rx="3"
          />
          <rect
            className={cn("dl-context-usage__bar-rect", barClass)}
            width={Math.max(percentage, usedTokens > 0 ? 2 : 0)}
            height="6"
            rx="3"
          />
        </svg>

        <ContextBreakdownList breakdown={breakdown} />
      </>
    );

    if (variant === "compact") {
      return (
        <div
          ref={ref}
          className={cn("dl-context-compact", className)}
          {...props}
        >
          <HoverCard openDelay={150} closeDelay={100}>
            <HoverCardTrigger asChild>
              <button type="button" className="dl-context-compact__trigger">
                <ContextRing percentage={percentage} statusClass={ringClass} />
                <span className="dl-context-compact__pct">{percentage}%</span>
                <span className="dl-context-compact__sep" aria-hidden="true">
                  ·
                </span>
                <span className="dl-context-compact__tokens">
                  {formatCompact(usedTokens)} / {formatCompact(maxTokens)}
                </span>
              </button>
            </HoverCardTrigger>
            <HoverCardContent
              className="dl-context-compact__popover"
              align="end"
            >
              <div className="dl-context-usage dl-context-usage--popover">
                {cardBody}
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      );
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
        {cardBody}
      </div>
    );
  },
);
ContextUsage.displayName = "ContextUsage";
