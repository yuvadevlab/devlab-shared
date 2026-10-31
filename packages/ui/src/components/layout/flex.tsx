import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../lib/utils";

/**
 * Flexbox direction options.
 */
export type FlexDirection = "row" | "row-reverse" | "col" | "col-reverse";

/**
 * Flexbox content alignment options along the main axis.
 */
export type FlexJustify =
  "start" | "center" | "end" | "between" | "around" | "evenly";

/**
 * Flexbox item alignment options along the cross axis.
 */
export type FlexAlign = "start" | "center" | "end" | "stretch" | "baseline";

/**
 * Spacing gap scale tokens mapped to --space-* CSS variables.
 */
export type LayoutGap = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "10";

/**
 * Props for the Flex layout primitive.
 */
export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * If true, delegates rendering to the direct child element via Radix Slot.
   * @default false
   */
  asChild?: boolean;
  /**
   * Flex direction.
   * @default "row"
   */
  direction?: FlexDirection;
  /**
   * Main axis alignment (justify-content).
   */
  justify?: FlexJustify;
  /**
   * Cross axis alignment (align-items).
   */
  align?: FlexAlign;
  /**
   * Flex wrap behavior.
   * @default false
   */
  wrap?: boolean | "reverse";
  /**
   * Gap spacing token mapped to --space-*.
   */
  gap?: LayoutGap;
  /**
   * Whether to display as inline-flex.
   * @default false
   */
  inline?: boolean;
}

/**
 * Polymorphic Flex container component for fluid 1-dimensional layouts.
 * Pure CSS with zero runtime Tailwind dependencies.
 *
 * @example
 * ```tsx
 * <Flex justify="between" align="center" gap="4">
 *   <span>Title</span>
 *   <Button size="sm">Action</Button>
 * </Flex>
 * ```
 */
export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      className,
      asChild = false,
      direction = "row",
      justify,
      align,
      wrap = false,
      gap,
      inline = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "div";

    return (
      <Comp
        ref={ref}
        className={cn(
          "dl-flex",
          inline && "dl-flex--inline",
          direction && `dl-flex--${direction}`,
          justify && `dl-flex--justify-${justify}`,
          align && `dl-flex--align-${align}`,
          wrap === true && "dl-flex--wrap",
          wrap === "reverse" && "dl-flex--wrap-reverse",
          gap !== undefined && `dl-gap-${gap}`,
          className,
        )}
        {...props}
      />
    );
  },
);

Flex.displayName = "Flex";
