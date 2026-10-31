/**
 * @file src/core/dimensions.ts
 * @description Universal component heights, icon dimensions, and border radii.
 */

/**
 * Component interactive control dimensions (Buttons, Inputs, Selects).
 */
export const CONTROL_HEIGHTS = {
  "control-height-xs": "1.75rem",
  "control-height-sm": "2rem",
  "control-height-md": "2.25rem",
  "control-height-lg": "2.5rem",
  "control-height-xl": "3rem",
} as const;

/**
 * Standard icon bounding box tokens.
 */
export const ICON_SIZES = {
  "icon-xs": "0.875rem",
  "icon-sm": "1rem",
  "icon-md": "1.25rem",
  "icon-lg": "1.5rem",
  "icon-xl": "2rem",
} as const;

/**
 * Border radius scale tokens.
 */
export const BORDER_RADII = {
  "radius-xs": "0.125rem",
  "radius-sm": "0.25rem",
  "radius-md": "0.375rem",
  "radius-lg": "0.5rem",
  "radius-xl": "0.75rem",
  "radius-2xl": "1rem",
  "radius-3xl": "1.5rem",
  "radius-full": "9999px",
} as const;
