import * as React from "react";
import { Search, Plus, Check, ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { cn } from "@/lib/utils";
import {
  SearchableSelectOption,
  SearchableSelectProps,
} from "./searchable-select-types";
import { useSearchableSelect } from "./use-searchable-select";

export type { SearchableSelectOption, SearchableSelectProps };

/**
 * Searchable select component with live filtering, keyboard navigation, option grouping,
 * and optional creation of new entries.
 *
 * @example
 * ```tsx
 * <SearchableSelect
 *   options={[
 *     { label: "Claude 3.5 Sonnet", value: "anthropic/claude-3-5-sonnet" },
 *     { label: "GPT-4o", value: "openai/gpt-4o" },
 *   ]}
 *   value={selectedModel}
 *   onChange={setSelectedModel}
 *   placeholder="Choose model..."
 * />
 * ```
 */
export function SearchableSelect({
  options,
  value,
  onChange,
  placeholder = "Select an option...",
  searchPlaceholder = "Search...",
  onAddNew,
  addNewLabel = "Add new",
  disabled = false,
  className,
  id,
}: SearchableSelectProps) {
  const {
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
  } = useSearchableSelect({ options, value, onChange, onAddNew });

  let currentIndex = 0;
  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          onKeyDown={handleKeyDown}
          className={cn(
            "dl-searchable-select-trigger",
            !selectedOption && "dl-searchable-select-trigger--placeholder",
            className,
          )}
        >
          <span className="dl-searchable-select-truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown className="dl-select-icon" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="dl-searchable-select-content"
        onKeyDown={handleKeyDown}
      >
        <div className="dl-searchable-select-search">
          <Search className="dl-searchable-select-search-icon" />
          <Input
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="dl-searchable-select-search-input"
            autoFocus
          />
        </div>

        <div
          ref={listRef}
          onWheel={(e) => e.stopPropagation()}
          className="dl-searchable-select-list"
        >
          {Object.keys(groupedOptions).length === 0 ||
          (filteredOptions.length === 0 && !onAddNew) ? (
            <div className="dl-searchable-select-empty">
              No matching options found.
            </div>
          ) : (
            Object.entries(groupedOptions).map(([groupName, groupOpts]) => (
              <div key={groupName} className="dl-searchable-select-group">
                {groupName !== "Default" && (
                  <div className="dl-searchable-select-group-header">
                    {groupName}
                  </div>
                )}
                {groupOpts.map((option) => {
                  const isSelected = option.value === value;
                  const itemIndex = currentIndex++;
                  const isHighlighted = itemIndex === highlightedIndex;

                  return (
                    <div
                      key={option.value}
                      data-highlighted={isHighlighted}
                      onClick={() => handleSelect(option.value)}
                      onMouseEnter={() => setHighlightedIndex(itemIndex)}
                      className={cn(
                        "dl-searchable-select-item",
                        isHighlighted &&
                          "dl-searchable-select-item--highlighted",
                        isSelected &&
                          !isHighlighted &&
                          "dl-searchable-select-item--selected",
                      )}
                    >
                      <span className="dl-searchable-select-item-text">
                        {option.label}
                      </span>
                      {isSelected && <Check className="dl-select-check" />}
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {onAddNew && (
          <div className="dl-searchable-select-add">
            <button
              type="button"
              onClick={handleAddNew}
              className="dl-searchable-select-add-btn"
            >
              <Plus className="dl-searchable-select-add-icon" />
              <span className="dl-searchable-select-truncate">
                {search.trim()
                  ? `${addNewLabel} "${search.trim()}"`
                  : addNewLabel}
              </span>
            </button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
