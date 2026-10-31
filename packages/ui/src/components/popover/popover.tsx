import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";

/**
 * Root container for non-modal floating panels and flyouts. Built upon Radix UI Popover.
 *
 * @example
 * ```tsx
 * <Popover>
 *   <PopoverTrigger asChild>
 *     <Button variant="outline">Open Filters</Button>
 *   </PopoverTrigger>
 *   <PopoverContent align="start">
 *     <Stack gap="2">
 *       <h4>Filter Results</h4>
 *       <p>Adjust display criteria.</p>
 *     </Stack>
 *   </PopoverContent>
 * </Popover>
 * ```
 */
const Popover = PopoverPrimitive.Root;

/** Interactive trigger element that opens the popover. */
const PopoverTrigger = PopoverPrimitive.Trigger;

/** Optional custom anchor reference element for positioning the popover. */
const PopoverAnchor = PopoverPrimitive.Anchor;

export type PopoverContentProps = React.ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Content
>;

/**
 * Floating panel content for Popover styled with scoped `dl-popover` CSS tokens.
 */
const PopoverContent = React.forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn("dl-popover", className)}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
