"use client";

import React, { useState } from "react";
import { Badge, Flex, Stack } from "@yuva-devlab/ui";
import { DemoCard, type ComponentVariant } from "@/components/demo-card";
import {
  ApiTable,
  type PropDefinition,
  type CssClassDefinition,
} from "@/components/api-table";
import { VariantFilterBar } from "@/components/variant-filter-bar";

export type { ComponentVariant, PropDefinition, CssClassDefinition };

export interface ComponentViewProps {
  title: string;
  description: string;
  category?: string;
  variants?: ComponentVariant[];
  preview?: React.ReactNode;
  codeSnippet?: string;
  propsList: PropDefinition[];
  cssClasses?: CssClassDefinition[];
}

export function ComponentView({
  title,
  description,
  category,
  variants,
  preview,
  codeSnippet,
  propsList,
  cssClasses,
}: ComponentViewProps) {
  const allVariants: ComponentVariant[] =
    variants && variants.length > 0
      ? variants
      : preview && codeSnippet
        ? [
            {
              id: "basic",
              title: "Basic Usage",
              description: `Standard default implementation of the ${title} component.`,
              preview,
              codeSnippet,
            },
          ]
        : [];

  const [activeFilter, setActiveFilter] = useState<string>("all");

  const displayedVariants =
    activeFilter === "all"
      ? allVariants
      : allVariants.filter(
          (v, idx) => (v.id || `variant-${idx}`) === activeFilter,
        );

  const filterItems = allVariants.map((v, i) => ({
    id: v.id || `variant-${i}`,
    title: v.title,
  }));

  return (
    <div className="dl-comp-view">
      <Stack gap={10}>
        {/* Header Info */}
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
              {allVariants.length > 1 && (
                <Badge
                  variant="outline"
                  className="dl-comp-header__badge-variants"
                >
                  {allVariants.length} Variants
                </Badge>
              )}
            </Flex>
            <h1 className="dl-comp-header__title">{title}</h1>
            <p className="dl-comp-header__desc">{description}</p>
          </Stack>
        </header>

        {/* Examples & Variants Section */}
        <Stack gap={6} className="dl-variants-section">
          <Flex
            align="center"
            justify="between"
            wrap="wrap"
            gap={3}
            className="dl-variants-section__header"
          >
            <div>
              <h2 className="dl-variants-section__title">
                Examples & Variants
              </h2>
              <p className="dl-variants-section__desc">
                Explore interactive use cases and component variants.
              </p>
            </div>

            <VariantFilterBar
              variants={filterItems}
              activeId={activeFilter}
              onSelect={setActiveFilter}
            />
          </Flex>

          <Stack gap={6}>
            {displayedVariants.map((variant, index) => (
              <DemoCard
                key={variant.id || `card-${index}`}
                variant={variant}
                index={index}
              />
            ))}
          </Stack>
        </Stack>

        {/* API Table */}
        <ApiTable propsList={propsList} cssClasses={cssClasses} />
      </Stack>
    </div>
  );
}
