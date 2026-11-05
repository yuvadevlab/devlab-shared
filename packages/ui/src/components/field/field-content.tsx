import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Content region that keeps a field control and its messages together.
 */
export const FieldContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("dl-field-content", className)}
    data-slot="field-content"
    {...props}
  />
));
FieldContent.displayName = "FieldContent";
