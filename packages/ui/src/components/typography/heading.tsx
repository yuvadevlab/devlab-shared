/**
 * @file heading.tsx
 * @description Accessible heading primitive decoupling semantic hierarchy from visual presentation.
 */

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import type { HeadingProps, HeadingTag } from "./typography.types";

/**
 * Resolves the default HTML heading tag based on the visual size token.
 *
 * @param size - Visual size level
 * @returns Standard semantic heading tag
 */
function resolveDefaultTag(size: string): HeadingTag {
  if (size === "display") return "h1";
  if (
    size === "h1" ||
    size === "h2" ||
    size === "h3" ||
    size === "h4" ||
    size === "h5" ||
    size === "h6"
  ) {
    return size;
  }
  return "h2";
}

/**
 * Heading primitive component.
 *
 * Allows developers to decouple semantic accessibility (`as="h1"`) from visual
 * design styling (`size="h3"`), ensuring 100% SEO/a11y compliance without breaking layouts.
 *
 * @example
 * ```tsx
 * // Visual h3 styling but semantic h1 tag in document outline
 * <Heading as="h1" size="h3">Financial Overview</Heading>
 *
 * // Standard display heading
 * <Heading size="display" color="primary">Hero Headline</Heading>
 * ```
 */
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  function Heading(
    {
      as,
      size = "h2",
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
    const Component = (as ?? resolveDefaultTag(size)) as HeadingTag;

    return (
      <Component
        ref={ref}
        className={cn("dl-heading", `dl-${size}`, className)}
        data-typography-color={color !== "default" ? color : undefined}
        data-typography-align={align !== "left" ? align : undefined}
        data-typography-weight={weight}
        data-typography-truncate={truncate ? "true" : undefined}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Heading.displayName = "Heading";
