import * as React from "react";
import {
  SearchableSelectOption,
  SearchableSelectProps,
} from "./searchable-select-types";

/**
 * Encapsulates filtering, keyboard navigation, and grouping state for `SearchableSelect`.
 */
export function useSearchableSelect({
  options,
  value,
  onChange,
  onAddNew,
}: Pick<SearchableSelectProps, "options" | "value" | "onChange" | "onAddNew">) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [highlightedIndex, setHighlightedIndex] = React.useState<number>(0);
  const listRef = React.useRef<HTMLDivElement>(null);

  const selectedOption = React.useMemo(() => {
    return options.find((opt) => opt.value === value);
  }, [options, value]);

  const filteredOptions = React.useMemo(() => {
    if (!search.trim()) return options;
    const q = search.toLowerCase();
    return options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(q) ||
        (opt.group && opt.group.toLowerCase().includes(q)),
    );
  }, [options, search]);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (newOpen) {
      const idx = filteredOptions.findIndex((opt) => opt.value === value);
      setHighlightedIndex(idx >= 0 ? idx : 0);
    } else {
      setSearch("");
    }
  };

  const handleSearchChange = (q: string) => {
    setSearch(q);
    setHighlightedIndex(0);
  };

  React.useEffect(() => {
    if (open && listRef.current) {
      const activeEl = listRef.current.querySelector<HTMLElement>(
        "[data-highlighted='true']",
      );
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest" });
      }
    }
  }, [highlightedIndex, open]);

  const groupedOptions = React.useMemo(() => {
    const hasGroups = filteredOptions.some((opt) => opt.group);
    if (!hasGroups) return { Default: filteredOptions };

    return filteredOptions.reduce<Record<string, SearchableSelectOption[]>>(
      (acc, opt) => {
        const g = opt.group || "Other";
        if (!acc[g]) acc[g] = [];
        acc[g].push(opt);
        return acc;
      },
      {},
    );
  }, [filteredOptions]);

  const handleSelect = (val: string) => {
    onChange?.(val);
    setOpen(false);
    setSearch("");
  };

  const handleAddNew = () => {
    onAddNew?.(search.trim());
    setOpen(false);
    setSearch("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleOpenChange(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((p) =>
          p < filteredOptions.length - 1 ? p + 1 : p,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((p) => (p > 0 ? p - 1 : 0));
        break;
      case "Enter":
        e.preventDefault();
        if (filteredOptions.length > 0 && filteredOptions[highlightedIndex]) {
          handleSelect(filteredOptions[highlightedIndex].value);
        } else if (onAddNew && search.trim()) {
          handleAddNew();
        }
        break;
      case "Escape":
      case "Tab":
        e.preventDefault();
        handleOpenChange(false);
        break;
    }
  };

  return {
    open,
    search,
    highlightedIndex,
    setHighlightedIndex,
    listRef,
    selectedOption,
    filteredOptions,
    groupedOptions,
    handleOpenChange,
    handleSearchChange,
    handleSelect,
    handleAddNew,
    handleKeyDown,
  };
}
