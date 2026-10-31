/**
 * @file typography.types.ts
 * @description Type definitions and prop contracts for Heading and Text typography primitives.
 */

import type { HTMLAttributes, ReactNode } from "react";

/**
 * Supported heading HTML tag elements for semantic hierarchy.
 */
export type HeadingTag =
  "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div";

/**
 * Typographic visual size levels corresponding to the design token scale.
 */
export type HeadingSize = "display" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

/**
 * Text element tags for semantic markup.
 */
export type TextTag =
  "p" | "span" | "div" | "label" | "small" | "strong" | "em" | "code";

/**
 * Body and inline text scale variants.
 */
export type TextVariant =
  "body-lg" | "body" | "body-sm" | "caption" | "code" | "metric";

/**
 * Typographic color semantics mapped to design tokens.
 */
export type TypographyColor =
  | "default"
  | "muted"
  | "subtle"
  | "primary"
  | "destructive"
  | "warning"
  | "success"
  | "info";

/**
 * Text alignment options.
 */
export type TypographyAlign = "left" | "center" | "right";

/**
 * Font weight overrides.
 */
export type TypographyWeight =
  "normal" | "medium" | "semibold" | "bold" | "extrabold";

/**
 * Props for the Heading component.
 */
export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /**
   * The underlying HTML element tag rendered in the DOM for accessibility and SEO.
   * Allows decoupling semantic hierarchy (e.g. `as="h1"`) from visual appearance (e.g. `size="h3"`).
   * @default Matching the `size` prop if h1-h6, otherwise "h2"
   */
  readonly as?: HeadingTag;

  /**
   * The visual size styling applied to the heading from the design scale.
   * @default "h2"
   */
  readonly size?: HeadingSize;

  /**
   * Semantic color variant.
   * @default "default"
   */
  readonly color?: TypographyColor;

  /**
   * Explicit font-weight override.
   */
  readonly weight?: TypographyWeight;

  /**
   * Horizontal text alignment.
   * @default "left"
   */
  readonly align?: TypographyAlign;

  /**
   * Whether to truncate long text with an ellipsis on a single line.
   * @default false
   */
  readonly truncate?: boolean;

  /**
   * Additional custom CSS classes.
   */
  readonly className?: string;

  /**
   * Heading content.
   */
  readonly children?: ReactNode;
}

/**
 * Props for the Text component.
 */
export interface TextProps extends HTMLAttributes<HTMLElement> {
  /**
   * The underlying HTML element tag rendered in the DOM.
   * @default "p"
   */
  readonly as?: TextTag;

  /**
   * Visual typography variant from the token scale.
   * @default "body"
   */
  readonly variant?: TextVariant;

  /**
   * Semantic color variant.
   * @default "default"
   */
  readonly color?: TypographyColor;

  /**
   * Explicit font-weight override.
   */
  readonly weight?: TypographyWeight;

  /**
   * Horizontal text alignment.
   * @default "left"
   */
  readonly align?: TypographyAlign;

  /**
   * Whether to truncate long text with an ellipsis on a single line.
   * @default false
   */
  readonly truncate?: boolean;

  /**
   * Additional custom CSS classes.
   */
  readonly className?: string;

  /**
   * Text content.
   */
  readonly children?: ReactNode;
}
