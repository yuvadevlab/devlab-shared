import "server-only";
import { SEMANTIC_COLORS, RADII, TYPOGRAPHY } from "./tokens-palette-data";
import {
  TYPOGRAPHY_SCALE,
  SPACING_SCALE,
  BRAND_EXTENSIONS,
} from "./tokens-scale-data";

export type {
  SemanticColorToken,
  RadiusToken,
  TypographyToken,
} from "./tokens-palette-data";
export type {
  TypoScaleItem,
  SpacingItem,
  BrandExtensionItem,
} from "./tokens-scale-data";

/**
 * Server-only service providing design tokens, scales, and brand extension catalogs.
 */
export async function getTokensCatalog() {
  return {
    semanticColors: SEMANTIC_COLORS,
    radii: RADII,
    typography: TYPOGRAPHY,
    typographyScale: TYPOGRAPHY_SCALE,
    spacingScale: SPACING_SCALE,
    brandExtensions: BRAND_EXTENSIONS,
  };
}
