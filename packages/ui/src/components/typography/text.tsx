/**
 * @file text.tsx
 * @description Accessible text primitive for body, captions, code, and metrics.
 */

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import type { TextProps, TextTag } from "./typography.types";

/**
 * Text primitive component.
 *
 * Provides standardized body, caption, code, and metric formatting consuming
 * centralized design tokens across all brands.
 *
 * @example
 * ```tsx
 * <Text variant="body-sm" color="muted">Updated 2 minutes ago</Text>
 * <Text as="span" variant="metric" color="success">+18.4%</Text>
 * ```
 */
export const Text = forwardRef<HTMLElement, TextProps>(function Text(
  {
    as: Component = "p",
    variant = "body",
    color = "default",
    weight,
    align = "left",
    truncate = false,
    className,
    children,
    ...props
  },
  ref,
) {
  const Element = Component as TextTag;

  return (
    <Element
      ref={ref as never}
      className={cn("dl-text", `dl-${variant}`, className)}
      data-typography-color={color !== "default" ? color : undefined}
      data-typography-align={align !== "left" ? align : undefined}
      data-typography-weight={weight}
      data-typography-truncate={truncate ? "true" : undefined}
      {...props}
    >
      {children}
    </Element>
  );
});

Text.displayName = "Text";
