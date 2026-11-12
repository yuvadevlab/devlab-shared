/**
 * @file src/core/spacing.ts
 * @description Universal spacing scale and semantic padding/gap token contracts.
 */

/**
 * Universal spacing grid tokens mapped to rem dimensions.
 */
export const SPACING_GRID = {
  "space-0": "0rem",
  "space-1": "0.25rem",
  "space-2": "0.5rem",
  "space-3": "0.75rem",
  "space-4": "1rem",
  "space-5": "1.25rem",
  "space-6": "1.5rem",
  "space-8": "2rem",
  "space-10": "2.5rem",
  "space-12": "3rem",
  "space-16": "4rem",
  "space-20": "5rem",
} as const;

/**
 * Semantic padding and gap defaults consuming the spacing grid with fluid mobile scaling.
 */
export const SEMANTIC_SPACING = {
  "page-gutter": "clamp(1rem, 3.5vw, 2.5rem)",
  "card-padding": "clamp(0.875rem, 2vw, 1.5rem)",
  "dialog-padding": "clamp(1rem, 2.5vw, 1.5rem)",
  "form-field-gap": "var(--space-3)",
  "section-gap": "clamp(1.25rem, 2.5vw, 2.5rem)",
  "table-row-padding-x": "clamp(0.75rem, 1.5vw, 1rem)",
  "table-row-padding-y": "clamp(0.5rem, 1vw, 0.75rem)",
} as const;
