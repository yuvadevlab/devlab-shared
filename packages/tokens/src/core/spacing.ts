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
 * Semantic padding and gap defaults consuming the spacing grid.
 */
export const SEMANTIC_SPACING = {
  "card-padding": "var(--space-4)",
  "dialog-padding": "var(--space-5)",
  "form-field-gap": "var(--space-3)",
  "section-gap": "var(--space-5)",
  "table-row-padding-x": "var(--space-4)",
  "table-row-padding-y": "var(--space-3)",
} as const;
