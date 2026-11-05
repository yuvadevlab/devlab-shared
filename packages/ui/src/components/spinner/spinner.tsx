import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Accessible loading indicator.
 */
export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Accessible status text announced by screen readers. */
  label?: string;
}

/**
 * Renders a compact spinner with an accessible status label.
 */
export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, label = "Loading", ...props }, ref) => (
    <span
      ref={ref}
      aria-label={label}
      className={cn("dl-spinner", className)}
      data-slot="spinner"
      role="status"
      {...props}
    />
  ),
);
Spinner.displayName = "Spinner";
