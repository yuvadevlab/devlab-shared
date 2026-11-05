import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Props for a form field layout region.
 */
export type FieldProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Groups a field's label, control, and supporting text.
 */
export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("dl-field", className)}
      data-slot="field"
      {...props}
    />
  ),
);
Field.displayName = "Field";
