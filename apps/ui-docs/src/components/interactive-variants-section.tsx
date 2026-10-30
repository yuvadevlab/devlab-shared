"use client";

import React, { useState } from "react";
import type { ComponentVariant } from "../types/component-doc";
import { VariantFilterBar } from "./variant-filter-bar";
import { DemoCard } from "./demo-card";

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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Examples & Variants
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Explore interactive use cases and component variants.
          </p>
        </div>

        <VariantFilterBar
          variants={filterItems}
          activeId={activeFilter}
          onSelect={setActiveFilter}
        />
      </div>

      <div className="space-y-6">
        {displayedVariants.map((variant, index) => (
          <DemoCard
            key={variant.id || `card-${index}`}
            variant={variant}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
