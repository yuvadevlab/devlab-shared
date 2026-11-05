import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Leading or trailing non-interactive content inside an input group.
 */
export const InputGroupAddon = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn("dl-input-group__addon", className)}
    data-slot="input-group-addon"
    {...props}
  />
));
InputGroupAddon.displayName = "InputGroupAddon";
