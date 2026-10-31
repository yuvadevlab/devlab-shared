"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

/** Global provider setting delay duration and hover behavior for all child Tooltips. */
const TooltipProvider = TooltipPrimitive.Provider;

/**
 * Root container for accessible hover/focus contextual tooltips.
 * Built upon Radix UI Tooltip.
 *
 * @example
 * ```tsx
 * <TooltipProvider>
 *   <Tooltip>
 *     <TooltipTrigger asChild>
 *       <Button variant="ghost" size="icon">
 *         <Info />
 *       </Button>
 *     </TooltipTrigger>
 *     <TooltipContent side="top">
 *       <p>Display telemetry details</p>
 *     </TooltipContent>
 *   </Tooltip>
 * </TooltipProvider>
 * ```
 */
const Tooltip = TooltipPrimitive.Root;

/** Trigger element that displays the tooltip on hover or keyboard focus. */
const TooltipTrigger = TooltipPrimitive.Trigger;

export type TooltipContentProps = React.ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Content
>;

/**
 * Floating tooltip content element styled with scoped `dl-tooltip` CSS tokens.
 */
const TooltipContent = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn("dl-tooltip", className)}
      {...props}
    />
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
