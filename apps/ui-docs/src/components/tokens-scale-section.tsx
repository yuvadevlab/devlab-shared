import React from "react";
import { Grid, Stack } from "@yuva-devlab/ui";
import type { TypoScaleItem, SpacingItem } from "@/services/tokens-service";

export interface TokensScaleSectionProps {
  typographyScale: TypoScaleItem[];
  spacingScale: SpacingItem[];
}

/**
 * Renders the typography scale specifications and spacing grid without inline styles.
 */
export function TokensScaleSection({
  typographyScale,
  spacingScale,
}: TokensScaleSectionProps): React.JSX.Element {
  return (
    <Stack gap={8}>
      {/* Typography Scale Table */}
      <section>
        <Stack gap={3}>
          <h2 className="dl-tokens-section__title">
            Standardized Typography Scale
          </h2>
          <p className="dl-tokens-section__desc">
            Universal typography classes compiled into{" "}
            <code>@layer dl-components</code>. Used directly via{" "}
            <code>className=&quot;dl-*&quot;</code> or consumed by{" "}
            <code>&lt;Heading&gt;</code> and <code>&lt;Text&gt;</code>{" "}
            primitives.
          </p>
          <div className="dl-code-block">
            <table className="dl-typo-table">
              <thead>
                <tr>
                  <th>Class Selector</th>
                  <th>Font Size</th>
                  <th>Weight</th>
                  <th>Line Height</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {typographyScale.map((item) => (
                  <tr key={item.selector}>
                    <td>
                      <code className="dl-token-card__name">
                        {item.selector}
                      </code>
                    </td>
                    <td>{item.size}</td>
                    <td>{item.weight}</td>
                    <td>{item.lineHeight}</td>
                    <td>{item.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Stack>
      </section>

      {/* Spacing Grid */}
      <section>
        <Stack gap={3}>
          <h2 className="dl-tokens-section__title">Unified Spacing Grid</h2>
          <p className="dl-tokens-section__desc">
            Standard spacing scale applied identically across all brands for
            padding, margins, and layout gaps.
          </p>
          <Grid columns={4} gap={3}>
            {spacingScale.map((s) => (
              <div key={s.token} className="dl-space-card">
                <div>
                  <code className="dl-token-card__name">{s.token}</code>
                  <span className="dl-radius-card__example">
                    {s.rem} ({s.px})
                  </span>
                </div>
              </div>
            ))}
          </Grid>
        </Stack>
      </section>
    </Stack>
  );
}
