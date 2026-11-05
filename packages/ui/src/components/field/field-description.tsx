import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Supporting text for a form control.
 */
export const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("dl-field__description", className)}
    data-slot="field-description"
    {...props}
  />
));
FieldDescription.displayName = "FieldDescription";
