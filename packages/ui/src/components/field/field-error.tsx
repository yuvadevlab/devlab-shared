import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Announces a field validation error to assistive technology.
 */
export const FieldError = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("dl-field__error", className)}
    data-slot="field-error"
    role="alert"
    {...props}
  />
));
FieldError.displayName = "FieldError";
