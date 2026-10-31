"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

export type ProgressProps = React.ComponentPropsWithoutRef<
  typeof ProgressPrimitive.Root
>;

/**
 * Progress indicator component for displaying task completion or loading state.
 *
 * @example
 * ```tsx
 * <Progress value={65} className="w-[60%]" />
 * ```
 */
const Progress = React.forwardRef<
  React.ComponentRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn("dl-progress", className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="dl-progress__indicator"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
