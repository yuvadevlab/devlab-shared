"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Sparkles } from "lucide-react";
import { COMPONENTS_LIST, ALL_CATEGORIES } from "../config/components-meta";
import { SearchResultItem } from "./search-result-item";

export interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Ant Design-inspired global search modal with keyboard navigation,
 * category filters, auto-focus, close button, and blur detection.
 */
export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Auto-focus input on every open and reopen
  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActiveCategory("All");
    setSelectedIndex(0);

    const focusInput = () => inputRef.current?.focus();
    focusInput();
    const raf = requestAnimationFrame(focusInput);
    const timer = setTimeout(focusInput, 30);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [open]);

  // Handle escape key to close
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onOpenChange(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return COMPONENTS_LIST.filter((comp) => {
      if (activeCategory !== "All" && comp.category !== activeCategory) {
        return false;
      }
      if (!q) return true;
      return (
        comp.name.toLowerCase().includes(q) ||
        comp.slug.toLowerCase().includes(q) ||
        comp.category.toLowerCase().includes(q) ||
        comp.description.toLowerCase().includes(q) ||
        comp.keywords.some((k) => k.toLowerCase().includes(q))
      );
    });
  }, [query, activeCategory]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [filtered.length]);

  const navigateTo = (href: string) => {
    onOpenChange(false);
    router.push(href);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((p) => (p < filtered.length - 1 ? p + 1 : p));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((p) => (p > 0 ? p - 1 : 0));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      navigateTo(filtered[selectedIndex].href);
    }
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Component search"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="w-full max-w-2xl bg-card border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            onOpenChange(false);
          }
        }}
      >
        <div className="flex items-center px-4 border-b border-border bg-muted/20">
          <Search className="size-4.5 text-muted-foreground shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search components or keywords (e.g. date picker, table)..."
            className="w-full h-13 bg-transparent placeholder:text-muted-foreground outline-hidden text-sm"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-1 text-muted-foreground hover:text-foreground rounded-md transition mr-1 cursor-pointer"
              aria-label="Clear query"
            >
              <X className="size-4" />
            </button>
          )}
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/80 rounded-md transition cursor-pointer"
            aria-label="Close search"
            title="Close (Esc)"
          >
            <X className="size-4.5" />
          </button>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border bg-muted/10 overflow-x-auto text-xs scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveCategory("All")}
            className={`px-2.5 py-1 rounded-full text-xs font-medium transition cursor-pointer shrink-0 ${
              activeCategory === "All"
                ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            All ({COMPONENTS_LIST.length})
          </button>
          {ALL_CATEGORIES.map((cat) => {
            const count = COMPONENTS_LIST.filter(
              (c) => c.category === cat,
            ).length;
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition cursor-pointer shrink-0 ${
                  isSelected
                    ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        <div
          ref={listRef}
          className="flex-1 overflow-y-auto p-2 space-y-1 max-h-96 divide-y divide-border/20"
        >
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground space-y-2">
              <Search className="size-8 mx-auto opacity-30" />
              <p className="text-sm font-medium">
                No components found matching &ldquo;{query}&rdquo;
              </p>
            </div>
          ) : (
            filtered.map((item, idx) => (
              <SearchResultItem
                key={item.slug}
                item={item}
                isSelected={idx === selectedIndex}
                onSelect={() => navigateTo(item.href)}
                onHover={() => setSelectedIndex(idx)}
              />
            ))
          )}
        </div>

        <div className="flex items-center justify-between px-4 py-2.5 border-t border-border bg-muted/30 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1.5 py-0.5 bg-background border border-border rounded font-mono text-[10px]">
                ↑↓
              </kbd>{" "}
              navigate
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 bg-background border border-border rounded font-mono text-[10px]">
                ↵
              </kbd>{" "}
              select
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 bg-background border border-border rounded font-mono text-[10px]">
                ESC
              </kbd>{" "}
              close
            </span>
          </div>
          <div className="flex items-center gap-1 text-primary font-medium">
            <Sparkles className="size-3" />
            <span>DevLab Design System</span>
          </div>
        </div>
      </div>
    </div>
  );
}
