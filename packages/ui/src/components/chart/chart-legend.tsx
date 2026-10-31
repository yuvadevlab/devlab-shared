import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { cn } from "@/lib/utils";
import { getPayloadConfigFromPayload, useChart } from "./chart-context";

/**
 * Legend component from Recharts.
 */
export const ChartLegend = RechartsPrimitive.Legend;

export type ChartLegendContentProps = React.ComponentProps<"div"> &
  Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
    /** Hides the colored category icon */
    hideIcon?: boolean;
    /** Custom key in payload for data series name */
    nameKey?: string;
  };

/**
 * Standard legend container displaying labeled indicators for active chart series.
 */
export const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  ChartLegendContentProps
>(
  (
    { className, hideIcon = false, payload, verticalAlign = "bottom", nameKey },
    ref,
  ) => {
    const { config } = useChart();

    if (!payload?.length) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          "dl-chart-legend",
          verticalAlign === "top"
            ? "dl-chart-legend--top"
            : "dl-chart-legend--bottom",
          className,
        )}
      >
        {payload
          .filter((item) => item.type !== "none")
          .map((item) => {
            const key = `${nameKey || item.dataKey || "value"}`;
            const itemConfig = getPayloadConfigFromPayload(config, item, key);

            return (
              <div key={item.value} className="dl-chart-legend__item">
                {itemConfig?.icon && !hideIcon ? (
                  <itemConfig.icon />
                ) : (
                  <div
                    className="dl-chart-legend__indicator"
                    style={{ backgroundColor: item.color }}
                  />
                )}
                {itemConfig?.label}
              </div>
            );
          })}
      </div>
    );
  },
);
ChartLegendContent.displayName = "ChartLegend";
