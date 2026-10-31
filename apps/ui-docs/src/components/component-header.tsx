import React from "react";
import { Badge, Flex, Stack } from "@yuva-devlab/ui";
import type { ComponentCategory } from "@/config/meta-types";

export interface ComponentHeaderProps {
  title: string;
  description: string;
  category?: ComponentCategory | string;
  variantCount?: number;
}

/**
 * Server component rendering the hero header section for a component documentation page.
 * Displays category badge, pure-CSS tag, variant count, component name, and description.
 */
export function ComponentHeader({
  title,
  description,
  category,
  variantCount = 0,
}: ComponentHeaderProps) {
  return (
    <header className="dl-comp-header">
      <Stack gap={3}>
        <Flex align="center" wrap="wrap" gap={2}>
          {category && (
            <Badge variant="secondary" className="dl-comp-header__badge">
              {category}
            </Badge>
          )}
          <Badge variant="outline" className="dl-comp-header__badge">
            Pure CSS Scoped
          </Badge>
          {variantCount > 1 && (
            <Badge variant="outline" className="dl-comp-header__badge-variants">
              {variantCount} Variants
            </Badge>
          )}
        </Flex>

        <h1 className="dl-comp-header__title">{title}</h1>

        <p className="dl-comp-header__desc">{description}</p>
      </Stack>
    </header>
  );
}
