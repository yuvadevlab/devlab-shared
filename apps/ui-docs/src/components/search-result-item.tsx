"use client";

import React from "react";
import { CornerDownLeft } from "lucide-react";
import { Badge } from "@yuva-devlab/ui";
import type { ComponentMeta } from "../config/components-meta";

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
      className={`flex items-center justify-between p-3 rounded-lg text-sm cursor-pointer transition ${
        isSelected
          ? "bg-primary/10 text-foreground border border-primary/30"
          : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={`size-7 rounded-md flex items-center justify-center shrink-0 text-xs font-bold ${
            isSelected
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {item.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground truncate">
              {item.name}
            </span>
            <Badge
              variant="outline"
              className="text-[10px] px-1.5 py-0 shrink-0 font-normal"
            >
              {item.category}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground truncate max-w-md mt-0.5">
            {item.description}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0 pl-3">
        {isSelected ? (
          <span className="flex items-center gap-1 text-[11px] font-medium text-primary">
            Jump to doc <CornerDownLeft className="size-3" />
          </span>
        ) : (
          <span className="text-[11px] text-muted-foreground/60 hidden sm:inline">
            {item.slug}
          </span>
        )}
      </div>
    </div>
  );
}
