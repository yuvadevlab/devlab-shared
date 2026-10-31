import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../lib/utils";
import type { LayoutGap } from "./flex";

/**
 * Grid column counts (1 through 12).
 */
export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

/**
 * Props for the Grid layout primitive.
 */
export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * If true, delegates rendering to the direct child element via Radix Slot.
   * @default false
   */
  asChild?: boolean;
  /**
   * Number of uniform columns, or an auto-fit minItemWidth (e.g. "280px").
   * @default 1
   */
  cols?: GridColumns | string;
  /**
   * Spacing gap token mapped to --space-* CSS variables.
   * @default "4"
   */
  gap?: LayoutGap;
  /**
   * Whether to display as inline-grid.
   * @default false
   */
  inline?: boolean;
}

/**
 * Responsive 2D Grid layout primitive.
 * Pure CSS with zero runtime Tailwind dependencies.
 *
 * @example
 * ```tsx
 * <Grid cols={3} gap="4">
 *   <MetricCard title="A" />
 *   <MetricCard title="B" />
 *   <MetricCard title="C" />
 * </Grid>
 * ```
 */
export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      className,
      asChild = false,
      cols = 1,
      gap = "4",
      inline = false,
      style,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "div";

    const inlineStyles: React.CSSProperties = { ...style };
    if (typeof cols === "number") {
      inlineStyles.gridTemplateColumns = `repeat(${cols}, minmax(0, 1fr))`;
    } else if (typeof cols === "string") {
      inlineStyles.gridTemplateColumns = `repeat(auto-fit, minmax(${cols}, 1fr))`;
    }

    return (
      <Comp
        ref={ref}
        className={cn(
          "dl-grid",
          inline && "dl-grid--inline",
          gap !== undefined && `dl-gap-${gap}`,
          className,
        )}
        style={inlineStyles}
        {...props}
      />
    );
  },
);

Grid.displayName = "Grid";
