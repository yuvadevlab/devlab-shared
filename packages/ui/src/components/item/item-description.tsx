import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Secondary descriptive text for an item.
 */
export const ItemDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("dl-item__description", className)}
    data-slot="item-description"
    {...props}
  />
));
ItemDescription.displayName = "ItemDescription";
