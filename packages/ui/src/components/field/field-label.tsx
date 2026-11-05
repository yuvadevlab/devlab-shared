import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Label for the associated form control.
 */
export const FieldLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn("dl-field__label", className)}
    data-slot="field-label"
    {...props}
  />
));
FieldLabel.displayName = "FieldLabel";
