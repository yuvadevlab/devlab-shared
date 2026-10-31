import React from "react";
import { Badge, Flex, Grid, Stack } from "@yuva-devlab/ui";
import type { BrandExtensionItem } from "@/services/tokens-service";

export interface TokensExtensionsSectionProps {
  brandExtensions: BrandExtensionItem[];
}

/**
 * Renders the isolated brand extensions architecture showcase.
 */
export function TokensExtensionsSection({
  brandExtensions,
}: TokensExtensionsSectionProps): React.JSX.Element {
  return (
    <section>
      <Stack gap={4}>
        <Stack gap={1}>
          <Flex align="center" gap={2}>
            <h2 className="dl-tokens-section__title">
              Isolated Brand Extensions
            </h2>
            <Badge variant="outline">Zero-Waste Bundling</Badge>
          </Flex>
          <p className="dl-tokens-section__desc">
            Domain-specific tokens (e.g. financial equity states vs telemetry
            severity) are compiled strictly into that brand&apos;s theme
            stylesheet. Consumer apps download only their own brand extensions.
          </p>
        </Stack>

        <Grid columns={2} gap={4}>
          {brandExtensions.map((item) => (
            <div key={item.brand} className="dl-brand-ext-card">
              <Stack gap={3}>
                <Flex align="center" justify="between">
                  <h3 className="dl-brand-ext-card__title">{item.brand}</h3>
                  <span className="dl-brand-ext-card__cat">
                    {item.category}
                  </span>
                </Flex>

                <Stack gap={2}>
                  {item.tokens.map((tok) => (
                    <Flex
                      key={tok.name}
                      align="center"
                      justify="between"
                      gap={2}
                    >
                      <code className="dl-token-card__name">{tok.name}</code>
                      <span className="dl-token-card__desc">{tok.desc}</span>
                    </Flex>
                  ))}
                </Stack>
              </Stack>
            </div>
          ))}
        </Grid>
      </Stack>
    </section>
  );
}
