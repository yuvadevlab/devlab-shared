"use client";

import React from "react";
import { Button } from "@yuva-devlab/ui";

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
    <div className="flex items-center gap-1.5 flex-wrap">
      <Button
        variant={activeId === "all" ? "secondary" : "ghost"}
        size="sm"
        onClick={() => onSelect("all")}
        className="h-7 text-xs px-2.5 rounded-full font-medium"
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
            className="h-7 text-xs px-2.5 rounded-full font-medium"
          >
            {v.title}
          </Button>
        );
      })}
    </div>
  );
}
