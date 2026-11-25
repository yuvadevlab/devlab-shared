import * as React from "react";
import { cn } from "@/lib/utils";
import {
  ShimmerElement,
  ShimmerSpeed,
  type ShimmerProps,
} from "./shimmer-types";

export { ShimmerElement, ShimmerSpeed, type ShimmerProps };

/**
 * Animated shimmering text indicator for live AI status narration,
 * streaming reasoning headers, and active tool progress labels.
 *
 * @example
 * ```tsx
 * <Shimmer>Scanning 28 May transactions…</Shimmer>
 * ```
 */
export const Shimmer = React.forwardRef<HTMLElement, ShimmerProps>(
  (
    {
      children,
      as = ShimmerElement.SPAN,
      speed = ShimmerSpeed.NORMAL,
      active = true,
      className,
      ...props
    },
    ref,
  ) => {
    return React.createElement(
      as,
      {
        ref,
        className: cn(
          "dl-shimmer-text",
          `dl-shimmer-text--${speed}`,
          active && "dl-shimmer-text--active",
          className,
        ),
        ...props,
      },
      children,
    );
  },
);
Shimmer.displayName = "Shimmer";
