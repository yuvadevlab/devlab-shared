import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Highlights a short inline phrase without changing its semantic meaning.
 */
export const Marker = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <mark
    ref={ref}
    className={cn("dl-marker", className)}
    data-slot="marker"
    {...props}
  />
));
Marker.displayName = "Marker";
