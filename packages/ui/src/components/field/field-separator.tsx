import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Decorative divider between groups of fields.
 */
export const FieldSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    aria-hidden="true"
    className={cn("dl-field-separator", className)}
    data-slot="field-separator"
    {...props}
  />
));
FieldSeparator.displayName = "FieldSeparator";
