import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { cn } from "@/lib/utils";
import { getPayloadConfigFromPayload, useChart } from "./chart-context";

/**
 * Tooltip trigger component from Recharts.
 */
export const ChartTooltip = RechartsPrimitive.Tooltip;

export type ChartTooltipContentProps = React.ComponentProps<
  typeof RechartsPrimitive.Tooltip
> &
  React.ComponentProps<"div"> & {
    /** Hides the series label */
    hideLabel?: boolean;
    /** Hides the colored indicator icon */
    hideIndicator?: boolean;
    /** Style of indicator: line, dot, or dashed */
    indicator?: "line" | "dot" | "dashed";
    /** Custom key in payload for data series name */
    nameKey?: string;
    /** Custom key in payload for label */
    labelKey?: string;
  };

/**
 * Standard content container rendered inside a `ChartTooltip`.
 */
export const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  ChartTooltipContentProps
>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref,
  ) => {
    const { config } = useChart();

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null;
      }

      const [item] = payload;
      const key = `${labelKey || item?.dataKey || item?.name || "value"}`;
      const itemConfig = getPayloadConfigFromPayload(config, item, key);
      const value =
        !labelKey && typeof label === "string"
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label;

      if (labelFormatter) {
        return (
          <div className={cn("dl-chart-tooltip__label", labelClassName)}>
            {labelFormatter(value, payload)}
          </div>
        );
      }

      if (!value) {
        return null;
      }

      return (
        <div className={cn("dl-chart-tooltip__label", labelClassName)}>
          {value}
        </div>
      );
    }, [
      label,
      labelFormatter,
      payload,
      hideLabel,
      labelClassName,
      config,
      labelKey,
    ]);

    if (!active || !payload?.length) {
      return null;
    }

    const nestLabel = payload.length === 1 && indicator !== "dot";

    return (
      <div ref={ref} className={cn("dl-chart-tooltip", className)}>
        {!nestLabel ? tooltipLabel : null}
        <div className="dl-chart-tooltip__grid">
          {payload
            .filter((item) => item.type !== "none")
            .map((item, index) => {
              const key = `${nameKey || item.name || item.dataKey || "value"}`;
              const itemConfig = getPayloadConfigFromPayload(config, item, key);
              const indicatorColor = color || item.payload.fill || item.color;

              return (
                <div
                  key={item.dataKey}
                  className={cn(
                    "dl-chart-tooltip__item",
                    indicator === "dot" && "dl-chart-tooltip__item--center",
                  )}
                >
                  {formatter && item?.value !== undefined && item.name ? (
                    formatter(item.value, item.name, item, index, item.payload)
                  ) : (
                    <>
                      {itemConfig?.icon ? (
                        <itemConfig.icon />
                      ) : (
                        !hideIndicator && (
                          <div
                            className={cn(
                              "dl-chart-tooltip__indicator",
                              indicator === "dot" &&
                                "dl-chart-tooltip__indicator--dot",
                              indicator === "line" &&
                                "dl-chart-tooltip__indicator--line",
                              indicator === "dashed" &&
                                "dl-chart-tooltip__indicator--dashed",
                              nestLabel &&
                                indicator === "dashed" &&
                                "dl-chart-tooltip__indicator--nested",
                            )}
                            style={
                              {
                                "--color-bg": indicatorColor,
                                "--color-border": indicatorColor,
                              } as React.CSSProperties
                            }
                          />
                        )
                      )}
                      <div
                        className={cn(
                          "dl-chart-tooltip__row",
                          nestLabel && "dl-chart-tooltip__row--end",
                        )}
                      >
                        <div className="dl-chart-tooltip__grid">
                          {nestLabel ? tooltipLabel : null}
                          <span className="dl-chart-tooltip__item-label">
                            {itemConfig?.label || item.name}
                          </span>
                        </div>
                        {item.value && (
                          <span className="dl-chart-tooltip__item-value">
                            {item.value.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    );
  },
);
ChartTooltipContent.displayName = "ChartTooltip";
