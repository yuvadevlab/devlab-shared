import React from "react";
import Link from "next/link";
import { Badge, Stack, Flex, Grid, Box } from "@yuva-devlab/ui";
import type { ComponentMeta, ComponentCategory } from "@/config/meta-types";

export interface HomeCatalogProps {
  totalComponents: number;
  groupedComponents: Record<ComponentCategory, ComponentMeta[]>;
}

/**
 * Server component rendering the categorized component directory on the homepage.
 */
export function HomeCatalog({
  totalComponents,
  groupedComponents,
}: HomeCatalogProps) {
  const categories = Object.keys(groupedComponents) as ComponentCategory[];

  return (
    <Stack gap={6} as="section">
      <Flex align="center" justify="between" className="dl-catalog-header">
        <div>
          <h2 className="dl-catalog-title">Component Directory</h2>
          <p className="dl-catalog-desc">
            Explore all {totalComponents} primitives grouped by functional
            domain.
          </p>
        </div>
        <Badge variant="outline" className="dl-catalog-badge">
          {totalComponents} Components
        </Badge>
      </Flex>

      <Grid cols="repeat(auto-fit, minmax(320px, 1fr))" gap={6}>
        {categories.map((category) => {
          const comps = groupedComponents[category] || [];
          return (
            <Box
              key={category}
              border
              radius="xl"
              p={5}
              className="dl-catalog-card"
            >
              <Stack gap={3}>
                <Flex
                  align="center"
                  justify="between"
                  className="dl-catalog-card__header"
                >
                  <h3 className="dl-catalog-card__category">{category}</h3>
                  <span className="dl-catalog-card__count">{comps.length}</span>
                </Flex>
                <Grid cols="repeat(auto-fill, minmax(110px, 1fr))" gap={2}>
                  {comps.map((c) => (
                    <Link
                      key={c.slug}
                      href={c.href}
                      className="dl-catalog-link"
                    >
                      {c.name}
                    </Link>
                  ))}
                </Grid>
              </Stack>
            </Box>
          );
        })}
      </Grid>
    </Stack>
  );
}
