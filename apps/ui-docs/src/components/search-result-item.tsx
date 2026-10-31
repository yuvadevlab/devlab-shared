"use client";

import React from "react";
import { CornerDownLeft } from "lucide-react";
import { Badge, Flex } from "@yuva-devlab/ui";
import type { ComponentMeta } from "@/config/components-meta";

export interface SearchResultItemProps {
  item: ComponentMeta;
  isSelected: boolean;
  onSelect: () => void;
  onHover: () => void;
}

export function SearchResultItem({
  item,
  isSelected,
  onSelect,
  onHover,
}: SearchResultItemProps) {
  return (
    <div
      onClick={onSelect}
      onMouseEnter={onHover}
      className={`dl-search-item ${isSelected ? "dl-search-item--selected" : ""}`.trim()}
    >
      <Flex align="center" gap={3} className="dl-search-item__main">
        <div
          className={`dl-search-item__avatar ${
            isSelected
              ? "dl-search-item__avatar--selected"
              : "dl-search-item__avatar--default"
          }`}
        >
          {item.name.charAt(0)}
        </div>
        <div className="dl-search-item__meta">
          <Flex align="center" gap={2}>
            <span className="dl-search-item__title">{item.name}</span>
            <Badge variant="outline" className="dl-search-item__badge">
              {item.category}
            </Badge>
          </Flex>
          <p className="dl-search-item__desc">{item.description}</p>
        </div>
      </Flex>
      <Flex align="center" gap={2} className="dl-search-item__action">
        {isSelected ? (
          <span className="dl-search-item__jump">
            Jump to doc <CornerDownLeft className="dl-search-item__icon-xs" />
          </span>
        ) : (
          <span className="dl-search-item__slug">{item.slug}</span>
        )}
      </Flex>
    </div>
  );
}
