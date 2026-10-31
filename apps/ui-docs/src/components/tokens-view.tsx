import React from "react";
import { Badge, Flex, Stack, Grid } from "@yuva-devlab/ui";
import type {
  SemanticColorToken,
  RadiusToken,
  TypographyToken,
  TypoScaleItem,
  SpacingItem,
  BrandExtensionItem,
} from "@/services/tokens-service";
import { TokensScaleSection } from "@/components/tokens-scale-section";
import { TokensExtensionsSection } from "@/components/tokens-extensions-section";

export interface TokensViewProps {
  semanticColors: SemanticColorToken[];
  radii: RadiusToken[];
  typography: TypographyToken[];
  typographyScale: TypoScaleItem[];
  spacingScale: SpacingItem[];
  brandExtensions: BrandExtensionItem[];
}

/**
 * Pure React Server Component rendering design system tokens:
 * OKLCH color palettes, typography scale, spacing grid, and brand extensions.
 */
export function TokensView({
  semanticColors,
  radii,
  typography,
  typographyScale,
  spacingScale,
  brandExtensions,
}: TokensViewProps): React.JSX.Element {
  return (
    <div className="dl-tokens-view">
      <Stack gap={10}>
        {/* Header */}
        <header className="dl-tokens-header">
          <Stack gap={2}>
            <Flex align="center" gap={2}>
              <Badge variant="secondary" className="dl-tokens-header__badge">
                Design Tokens v2.0
              </Badge>
              <Badge variant="outline" className="dl-tokens-header__badge">
                Pure TypeScript Engine
              </Badge>
              <Badge variant="outline" className="dl-tokens-header__badge">
                OKLCH Space
              </Badge>
            </Flex>
            <h1 className="dl-tokens-header__title">
              Design Tokens & Architecture
            </h1>
            <p className="dl-tokens-header__desc">
              DevLab design tokens are authored in pure TypeScript and compiled
              into zero-runtime W3C Cascade Layer stylesheets in{" "}
              <code className="dl-tokens-header__code">
                @yuva-devlab/tokens
              </code>
              . Common tokens are shared across all brands, while domain
              extensions are isolated per brand.
            </p>
          </Stack>
        </header>

        {/* Typography Scale & Spacing Grid */}
        <TokensScaleSection
          typographyScale={typographyScale}
          spacingScale={spacingScale}
        />

        {/* Semantic Color Swatches */}
        <section>
          <Stack gap={4}>
            <h2 className="dl-tokens-section__title">Semantic Color Palette</h2>
            <Grid columns={3} gap={3} className="dl-tokens-grid--colors">
              {semanticColors.map((color) => (
                <div key={color.name} className="dl-token-card">
                  <div
                    className="dl-token-card__swatch"
                    data-token={color.name}
                  />
                  <div className="dl-token-card__info">
                    <Flex align="center" justify="between">
                      <span className="dl-token-card__role">{color.role}</span>
                      <code className="dl-token-card__name">{color.name}</code>
                    </Flex>
                    <p className="dl-token-card__desc">{color.desc}</p>
                  </div>
                </div>
              ))}
            </Grid>
          </Stack>
        </section>

        {/* Isolated Brand Extensions */}
        <TokensExtensionsSection brandExtensions={brandExtensions} />

        {/* Corner Radii Scale */}
        <section>
          <Stack gap={4}>
            <h2 className="dl-tokens-section__title">Corner Radii Scale</h2>
            <Grid columns={5} gap={3} className="dl-tokens-grid--radii">
              {radii.map((r) => (
                <Stack
                  key={r.token}
                  align="center"
                  gap={3}
                  className="dl-radius-card"
                >
                  <div className="dl-radius-card__box" data-radius={r.token} />
                  <div>
                    <code className="dl-radius-card__token">{r.token}</code>
                    <span className="dl-radius-card__example">{r.example}</span>
                  </div>
                </Stack>
              ))}
            </Grid>
          </Stack>
        </section>

        {/* Font Stacks */}
        <section>
          <Stack gap={4}>
            <h2 className="dl-tokens-section__title">Typography Stacks</h2>
            <Grid columns={3} gap={3} className="dl-tokens-grid--typo">
              {typography.map((t) => (
                <div key={t.token} className="dl-typo-card">
                  <Flex align="center" justify="between">
                    <span className="dl-typo-card__role">{t.role}</span>
                    <code className="dl-typo-card__token">{t.token}</code>
                  </Flex>
                  <p className="dl-typo-card__value">{t.value}</p>
                </div>
              ))}
            </Grid>
          </Stack>
        </section>
      </Stack>
    </div>
  );
}
