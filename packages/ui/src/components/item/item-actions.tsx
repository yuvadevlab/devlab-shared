import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Trailing actions or metadata for an item.
 */
export const ItemActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("dl-item__actions", className)}
    data-slot="item-actions"
    {...props}
  />
));
ItemActions.displayName = "ItemActions";
