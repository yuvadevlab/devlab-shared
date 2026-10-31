import React from "react";
import { Badge, Flex, Stack, Grid } from "@yuva-devlab/ui";
import type {
  SemanticColorToken,
  RadiusToken,
  TypographyToken,
} from "@/services/tokens-service";

export interface TokensViewProps {
  semanticColors: SemanticColorToken[];
  radii: RadiusToken[];
  typography: TypographyToken[];
}

/**
 * Pure React Server Component rendering design system tokens:
 * OKLCH color palettes, corner radii scales, and typography hierarchies.
 */
export function TokensView({
  semanticColors,
  radii,
  typography,
}: TokensViewProps): React.JSX.Element {
  return (
    <div className="dl-tokens-view">
      <Stack gap={10}>
        {/* Header */}
        <header className="dl-tokens-header">
          <Stack gap={2}>
            <Flex align="center" gap={2}>
              <Badge variant="secondary" className="dl-tokens-header__badge">
                Design Tokens
              </Badge>
              <Badge variant="outline" className="dl-tokens-header__badge">
                OKLCH Space
              </Badge>
            </Flex>
            <h1 className="dl-tokens-header__title">Design Tokens & Palette</h1>
            <p className="dl-tokens-header__desc">
              DevLab UI design tokens are defined in{" "}
              <code className="dl-tokens-header__code">
                @yuva-devlab/tokens
              </code>
              . Colors adapt dynamically when switching brands (OrchestrAI vs
              FinAI) or modes (Light vs Dark).
            </p>
          </Stack>
        </header>

        {/* Semantic Color Swatches */}
        <section>
          <Stack gap={4}>
            <h2 className="dl-tokens-section__title">Semantic Color Palette</h2>
            <Grid columns={3} gap={3} className="dl-tokens-grid--colors">
              {semanticColors.map((color) => (
                <div key={color.name} className="dl-token-card">
                  <div
                    className="dl-token-card__swatch"
                    style={
                      {
                        "--swatch-bg": `var(${color.name})`,
                      } as React.CSSProperties
                    }
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
                  <div
                    className="dl-radius-card__box"
                    style={
                      {
                        "--box-radius": `var(${r.token})`,
                      } as React.CSSProperties
                    }
                  />
                  <div>
                    <code className="dl-radius-card__token">{r.token}</code>
                    <span className="dl-radius-card__example">{r.example}</span>
                  </div>
                </Stack>
              ))}
            </Grid>
          </Stack>
        </section>

        {/* Typography Scale */}
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
