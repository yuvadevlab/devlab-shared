/**
 * @file src/schema/tokens.schema.ts
 * @description Master TypeScript contracts and schema definitions for DevLab Tokens.
 */

/**
 * Single typography token definition.
 */
export interface TypographyToken {
  readonly fontFamily: string;
  readonly fontWeight: number;
  readonly fontSize: string;
  readonly lineHeight: number | string;
  readonly letterSpacing: string;
  readonly tabularNums?: boolean;
}

/**
 * Universal typography scale contract.
 */
export interface BaseTypographyScale {
  readonly display: TypographyToken;
  readonly h1: TypographyToken;
  readonly h2: TypographyToken;
  readonly h3: TypographyToken;
  readonly h4: TypographyToken;
  readonly h5: TypographyToken;
  readonly h6: TypographyToken;
  readonly bodyLg: TypographyToken;
  readonly body: TypographyToken;
  readonly bodySm: TypographyToken;
  readonly caption: TypographyToken;
  readonly code: TypographyToken;
  readonly metric: TypographyToken;
}

/**
 * Surface and semantic palette for a theme in a single mode (light/dark).
 */
export interface BrandPalette {
  readonly background: string;
  readonly foreground: string;
  readonly card: string;
  readonly cardForeground: string;
  readonly popover: string;
  readonly popoverForeground: string;
  readonly primary: string;
  readonly primaryForeground: string;
  readonly secondary: string;
  readonly secondaryForeground: string;
  readonly muted: string;
  readonly mutedForeground: string;
  readonly accent: string;
  readonly accentForeground: string;
  readonly destructive: string;
  readonly destructiveForeground: string;
  readonly warning: string;
  readonly warningForeground: string;
  readonly success: string;
  readonly successForeground: string;
  readonly info: string;
  readonly infoForeground: string;
  readonly border: string;
  readonly input: string;
  readonly ring: string;
}

/**
 * Domain-specific brand extension tokens (e.g. charts, indicators).
 */
export interface BrandExtensions {
  readonly charts?: Record<string, string>;
  readonly domain?: Record<string, string>;
  readonly severity?: Record<string, string>;
  readonly states?: Record<string, string>;
}

/**
 * Complete Brand Specification interface.
 */
export interface BrandDefinition {
  readonly name: string;
  readonly label: string;
  readonly fontSans: string;
  readonly fontDisplay: string;
  readonly fontMono: string;
  readonly radius: string;
  readonly density: "compact" | "standard" | "spacious";
  readonly light: BrandPalette;
  readonly dark: BrandPalette;
  readonly extensions?: {
    readonly light?: BrandExtensions;
    readonly dark?: BrandExtensions;
    readonly common?: BrandExtensions;
  };
}
