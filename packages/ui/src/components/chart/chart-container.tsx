import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { cn } from "@/lib/utils";
import { ChartConfig, ChartContext, THEMES } from "./chart-context";

export type ChartContainerProps = React.ComponentProps<"div"> & {
  /** Configuration mapping series keys to colors, labels, and icons */
  config: ChartConfig;
  /** Responsive chart content (Recharts element) */
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"];
};

/**
 * Dynamic style block injecting CSS custom properties for chart color keys.
 */
export const ChartStyle = ({
  id,
  config,
}: {
  id: string;
  config: ChartConfig;
}) => {
  const colorConfig = Object.entries(config).filter(
    ([, itemConfig]) => itemConfig.theme || itemConfig.color,
  );

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`,
          )
          .join("\n"),
      }}
    />
  );
};

/**
 * Responsive wrapper for Recharts visualizations with CSS variable theming and unified legend/tooltip support.
 *
 * @example
 * ```tsx
 * <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
 *   <BarChart data={chartData}>
 *     <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
 *   </BarChart>
 * </ChartContainer>
 * ```
 */
export const ChartContainer = React.forwardRef<
  HTMLDivElement,
  ChartContainerProps
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn("dl-chart-container", className)}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = "Chart";
