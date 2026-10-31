import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../lib/utils";

/**
 * Visual padding scale tokens mapped to semantic spacing CSS variables.
 */
export type BoxPadding = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "10";

/**
 * Border radius scale tokens mapped to brand radius CSS variables.
 */
export type BoxRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";

/**
 * Elevation shadow scale tokens.
 */
export type BoxShadow = "none" | "sm" | "md" | "lg" | "glass";

/**
 * Props for the polymorphic Box layout primitive.
 */
export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * If true, delegates rendering to the direct child element via Radix Slot.
   * @default false
   */
  asChild?: boolean;
  /**
   * Internal padding token mapped to --space-* CSS variables.
   */
  p?: BoxPadding;
  /**
   * Horizontal padding token mapped to --space-* CSS variables.
   */
  px?: BoxPadding;
  /**
   * Vertical padding token mapped to --space-* CSS variables.
   */
  py?: BoxPadding;
  /**
   * Border radius token mapped to --radius-* CSS variables.
   */
  radius?: BoxRadius;
  /**
   * Elevation shadow token.
   */
  shadow?: BoxShadow;
  /**
   * Whether to render a default 1px border using var(--border).
   * @default false
   */
  border?: boolean;
  /**
   * Background surface token.
   */
  bg?:
    "background" | "card" | "surface" | "surface-2" | "muted" | "transparent";
}

/**
 * Primitive bounding Box component for structured spacing, borders, and surfaces.
 * Pure CSS platform primitive with zero runtime Tailwind dependencies.
 *
 * @example
 * ```tsx
 * <Box p="6" bg="card" border radius="lg" shadow="md">
 *   <p>Card Content</p>
 * </Box>
 * ```
 */
export const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      className,
      asChild = false,
      p,
      px,
      py,
      radius,
      shadow,
      border = false,
      bg,
      style,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "div";

    const inlineStyles: React.CSSProperties = { ...style };
    if (p) inlineStyles.padding = `var(--space-${p})`;
    if (px) {
      inlineStyles.paddingLeft = `var(--space-${px})`;
      inlineStyles.paddingRight = `var(--space-${px})`;
    }
    if (py) {
      inlineStyles.paddingTop = `var(--space-${py})`;
      inlineStyles.paddingBottom = `var(--space-${py})`;
    }
    if (radius && radius !== "none") {
      inlineStyles.borderRadius = `var(--radius-${radius}, var(--radius))`;
    }
    if (border) {
      inlineStyles.border = "1px solid var(--border)";
    }
    if (bg) {
      inlineStyles.backgroundColor = `var(--${bg})`;
    }

    return (
      <Comp
        ref={ref}
        className={cn(
          "dl-box",
          shadow && shadow !== "none" && `dl-shadow-${shadow}`,
          className,
        )}
        style={inlineStyles}
        {...props}
      />
    );
  },
);

Box.displayName = "Box";
