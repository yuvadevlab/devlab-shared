import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Leading icon, avatar, or media region for an item.
 */
export const ItemMedia = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("dl-item__media", className)}
    data-slot="item-media"
    {...props}
  />
));
ItemMedia.displayName = "ItemMedia";
