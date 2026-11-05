import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Legend heading for a semantic field set.
 */
export const FieldLegend = React.forwardRef<
  HTMLLegendElement,
  React.HTMLAttributes<HTMLLegendElement>
>(({ className, ...props }, ref) => (
  <legend
    ref={ref}
    className={cn("dl-field__legend", className)}
    data-slot="field-legend"
    {...props}
  />
));
FieldLegend.displayName = "FieldLegend";
