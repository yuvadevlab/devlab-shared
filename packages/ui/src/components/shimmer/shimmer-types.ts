import * as React from "react";

/**
 * Supported animation speed presets for the Shimmer text indicator.
 */
export const ShimmerSpeed = {
  FAST: "fast",
  NORMAL: "normal",
  SLOW: "slow",
} as const;

export type ShimmerSpeed = (typeof ShimmerSpeed)[keyof typeof ShimmerSpeed];

/**
 * Supported wrapper elements for the Shimmer animated text component.
 */
export const ShimmerElement = {
  SPAN: "span",
  PARAGRAPH: "p",
  DIV: "div",
} as const;

export type ShimmerElement =
  (typeof ShimmerElement)[keyof typeof ShimmerElement];

/**
 * Props for the {@link Shimmer} component.
 */
export interface ShimmerProps extends React.HTMLAttributes<HTMLElement> {
  /** Text or inline content rendered with a sweeping shimmer highlight. */
  children: React.ReactNode;
  /** Semantic HTML tag used to render the shimmer container. Defaults to "span". */
  as?: ShimmerElement;
  /** Animation sweep speed preset. Defaults to "normal". */
  speed?: ShimmerSpeed;
  /** When false, renders static muted text without animation. Defaults to true. */
  active?: boolean;
}
