"use client";

import React from "react";
import { Button, Flex } from "@yuva-devlab/ui";

export interface VariantFilterItem {
  id?: string;
  title: string;
}

export interface VariantFilterBarProps {
  variants: VariantFilterItem[];
  activeId: string;
  onSelect: (id: string) => void;
}

/**
 * Client island pill-bar component for filtering between component variants.
 */
export function VariantFilterBar({
  variants,
  activeId,
  onSelect,
}: VariantFilterBarProps) {
  if (variants.length <= 1) return null;

  return (
    <Flex align="center" wrap="wrap" gap={1} className="dl-variant-filter-bar">
      <Button
        variant={activeId === "all" ? "secondary" : "ghost"}
        size="sm"
        onClick={() => onSelect("all")}
        className="dl-variant-pill"
      >
        All ({variants.length})
      </Button>
      {variants.map((v, i) => {
        const id = v.id || `variant-${i}`;
        const isActive = activeId === id;
        return (
          <Button
            key={id}
            variant={isActive ? "secondary" : "ghost"}
            size="sm"
            onClick={() => onSelect(id)}
            className="dl-variant-pill"
          >
            {v.title}
          </Button>
        );
      })}
    </Flex>
  );
}
