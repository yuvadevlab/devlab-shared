import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Props for a group of related actions.
 */
export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Layout direction for the grouped controls. */
  orientation?: "horizontal" | "vertical";
}

/**
 * Groups related buttons and exposes its orientation to assistive technology.
 */
export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, orientation = "horizontal", ...props }, ref) => (
    <div
      ref={ref}
      aria-orientation={orientation}
      className={cn(
        "dl-button-group",
        `dl-button-group--${orientation}`,
        className,
      )}
      data-orientation={orientation}
      data-slot="button-group"
      role="group"
      {...props}
    />
  ),
);
ButtonGroup.displayName = "ButtonGroup";
