"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Sparkles } from "lucide-react";
import { Flex, Stack } from "@yuva-devlab/ui";
import { COMPONENTS_LIST, ALL_CATEGORIES } from "@/config/components-meta";
import { SearchResultItem } from "@/components/search-result-item";

export interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery("");
      setActiveCategory("All");
    }
  }, [open]);

  const filtered = useMemo(() => {
    return COMPONENTS_LIST.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;
      if (!matchesCategory) return false;
      if (!query.trim()) return true;
      const q = query.toLowerCase().trim();
      return (
        item.name.toLowerCase().includes(q) ||
        item.slug.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    });
  }, [query, activeCategory]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [filtered.length, activeCategory]);

  const navigateTo = (href: string) => {
    onOpenChange(false);
    router.push(href);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onOpenChange(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev === 0 ? Math.max(0, filtered.length - 1) : prev - 1,
      );
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
      className="dl-search-backdrop"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="dl-search-modal"
        onClick={(e) => e.stopPropagation()}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            onOpenChange(false);
          }
        }}
      >
        <Flex align="center" className="dl-search-modal__input-bar">
          <Search className="dl-search-modal__search-icon" />
          <input
            ref={inputRef}
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search components or keywords (e.g. date picker, table)..."
            className="dl-search-modal__input"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="dl-search-modal__btn-clear"
              aria-label="Clear query"
            >
              <X className="dl-search-modal__icon-sm" />
            </button>
          )}
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="dl-search-modal__btn-close"
            aria-label="Close search"
            title="Close (Esc)"
          >
            <X className="dl-search-modal__icon-md" />
          </button>
        </Flex>

        <Flex align="center" gap={1} className="dl-search-modal__categories">
          <button
            type="button"
            onClick={() => setActiveCategory("All")}
            className={`dl-search-modal__category-btn ${
              activeCategory === "All"
                ? "dl-search-modal__category-btn--active"
                : ""
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
                className={`dl-search-modal__category-btn ${
                  isSelected ? "dl-search-modal__category-btn--active" : ""
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </Flex>

        <div ref={listRef} className="dl-search-modal__results">
          {filtered.length === 0 ? (
            <Stack align="center" gap={2} className="dl-search-modal__empty">
              <Search className="dl-search-modal__empty-icon" />
              <p className="dl-search-modal__empty-text">
                No components found matching &ldquo;{query}&rdquo;
              </p>
            </Stack>
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

        <Flex
          align="center"
          justify="between"
          className="dl-search-modal__footer"
        >
          <Flex align="center" gap={3}>
            <span>
              <kbd className="dl-search-modal__kbd">↑↓</kbd> navigate
            </span>
            <span>
              <kbd className="dl-search-modal__kbd">↵</kbd> select
            </span>
            <span>
              <kbd className="dl-search-modal__kbd">ESC</kbd> close
            </span>
          </Flex>
          <Flex align="center" gap={1} className="dl-search-modal__brand-tag">
            <Sparkles className="dl-search-modal__icon-xs" />
            <span>DevLab Design System</span>
          </Flex>
        </Flex>
      </div>
    </div>
  );
}
