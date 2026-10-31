"use client";

import React, { useState } from "react";
import { Flex, Stack } from "@yuva-devlab/ui";
import type { ComponentVariant } from "@/types/component-doc";
import { VariantFilterBar } from "@/components/variant-filter-bar";
import { DemoCard } from "@/components/demo-card";

export interface InteractiveVariantsSectionProps {
  variants: ComponentVariant[];
}

/**
 * Client island handling interactive variant filtering and stack display.
 */
export function InteractiveVariantsSection({
  variants,
}: InteractiveVariantsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filterItems = variants.map((v, i) => ({
    id: v.id || `variant-${i}`,
    title: v.title,
  }));

  const displayedVariants =
    activeFilter === "all"
      ? variants
      : variants.filter((v, i) => (v.id || `variant-${i}`) === activeFilter);

  return (
    <Stack gap={6} className="dl-variants-section">
      <Flex
        align="center"
        justify="between"
        wrap="wrap"
        gap={3}
        className="dl-variants-section__header"
      >
        <div>
          <h2 className="dl-variants-section__title">Examples & Variants</h2>
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
  );
}
