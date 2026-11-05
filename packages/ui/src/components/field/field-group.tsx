import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Lays out a related group of form fields.
 */
export const FieldGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("dl-field-group", className)}
    data-slot="field-group"
    {...props}
  />
));
FieldGroup.displayName = "FieldGroup";
