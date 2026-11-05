import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Flexible list row that composes ItemMedia, ItemContent, and ItemActions.
 */
export const Item = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("dl-item", className)}
    data-slot="item"
    {...props}
  />
));
Item.displayName = "Item";
