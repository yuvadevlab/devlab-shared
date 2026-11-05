import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Flexible text content region for an item.
 */
export const ItemContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("dl-item__content", className)}
    data-slot="item-content"
    {...props}
  />
));
ItemContent.displayName = "ItemContent";
