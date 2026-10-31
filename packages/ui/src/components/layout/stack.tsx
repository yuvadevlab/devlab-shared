import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import type { LayoutGap } from "./flex";

/**
 * Direction orientation for Stack flow.
 */
export type StackDirection = "col" | "row";

/**
 * Alignment options for Stack items.
 */
export type StackAlign = "start" | "center" | "end" | "stretch" | "baseline";

/**
 * Props for the Stack layout primitive.
 */
export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * If true, delegates rendering to the direct child element via Radix Slot.
   * @default false
   */
  asChild?: boolean;
  /**
   * HTML element type to render.
   * @default "div"
   */
  as?: React.ElementType;
  /**
   * Flow orientation of the stack items.
   * @default "col"
   */
  direction?: StackDirection;
  /**
   * Spacing gap token mapped to --space-* CSS variables.
   * @default "3"
   */
  gap?: LayoutGap;
  /**
   * Alignment along the cross axis.
   * @default "stretch"
   */
  align?: StackAlign;
}

/**
 * High-velocity Stack layout primitive for structured vertical or horizontal flows.
 *
 * @example
 * ```tsx
 * <Stack direction="col" gap="4">
 *   <Input label="Name" />
 *   <Input label="Email" />
 *   <Button>Submit</Button>
 * </Stack>
 * ```
 */
export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      className,
      asChild = false,
      as,
      direction = "col",
      gap = "3",
      align = "stretch",
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : as || "div";

    return (
      <Comp
        ref={ref}
        className={cn(
          "dl-stack",
          `dl-stack--${direction}`,
          `dl-flex--align-${align}`,
          gap !== undefined && `dl-gap-${gap}`,
          className,
        )}
        {...props}
      />
    );
  },
);

Stack.displayName = "Stack";
