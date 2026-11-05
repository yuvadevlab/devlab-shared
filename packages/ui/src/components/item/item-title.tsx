import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Primary item heading.
 */
export const ItemTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("dl-item__title", className)}
    data-slot="item-title"
    {...props}
  />
));
ItemTitle.displayName = "ItemTitle";
