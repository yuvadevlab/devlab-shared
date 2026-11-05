import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Input wrapper that joins a control with inline adornments.
 */
export const InputGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("dl-input-group", className)}
    data-slot="input-group"
    {...props}
  />
));
InputGroup.displayName = "InputGroup";
