"use client";

import React from "react";
import { Search } from "lucide-react";
import { useSearch } from "@/components/search-provider";

export interface SearchTriggerProps {
  className?: string;
  variant?: "header" | "sidebar";
}

/**
 * Clickable search bar trigger that opens the global SearchDialog.
 */
export function SearchTrigger({
  className = "",
  variant = "header",
}: SearchTriggerProps) {
  const { setOpen } = useSearch();

  const variantClass =
    variant === "header"
      ? "dl-search-trigger--header"
      : "dl-search-trigger--sidebar";

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className={`dl-search-trigger ${variantClass} ${className}`.trim()}
      aria-label="Search components (⌘K)"
    >
      <div className="dl-search-trigger__content">
        <Search className="dl-search-trigger__icon" />
        <span className="dl-search-trigger__text">Search components...</span>
      </div>
      <kbd className="dl-search-trigger__kbd">⌘K</kbd>
    </button>
  );
}
