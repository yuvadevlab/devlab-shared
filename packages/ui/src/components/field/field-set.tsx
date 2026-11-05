import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Semantic group for related fields.
 */
export const FieldSet = React.forwardRef<
  HTMLFieldSetElement,
  React.FieldsetHTMLAttributes<HTMLFieldSetElement>
>(({ className, ...props }, ref) => (
  <fieldset
    ref={ref}
    className={cn("dl-field-set", className)}
    data-slot="field-set"
    {...props}
  />
));
FieldSet.displayName = "FieldSet";
