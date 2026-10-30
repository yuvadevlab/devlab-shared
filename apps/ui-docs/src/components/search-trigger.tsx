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

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className={
        variant === "header"
          ? `relative flex items-center justify-between gap-3 px-3 py-1.5 w-48 sm:w-64 md:w-72 rounded-lg border border-border bg-muted/40 hover:bg-muted text-xs text-muted-foreground hover:text-foreground transition shadow-2xs group cursor-pointer ${className}`
          : `relative flex items-center justify-between gap-2 px-3 py-2 w-full rounded-md border border-border bg-card/60 hover:bg-muted/60 text-xs text-muted-foreground hover:text-foreground transition cursor-pointer ${className}`
      }
      aria-label="Search components (⌘K)"
    >
      <div className="flex items-center gap-2 truncate">
        <Search className="size-3.5 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
        <span className="truncate">Search components...</span>
      </div>
      <kbd className="hidden sm:inline-flex items-center gap-0.5 border border-border bg-background/80 px-1.5 py-0.5 text-[10px] font-mono font-medium rounded text-muted-foreground shadow-2xs">
        ⌘K
      </kbd>
    </button>
  );
}
