import * as React from "react";
import { Search, Check, ChevronDown, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover";
import { cn } from "@/lib/utils";
import { MultiSelectOption, MultiSelectProps } from "./multi-select-types";

export type { MultiSelectOption, MultiSelectProps };

/**
 * MultiSelect component allowing users to filter, select, and manage multiple options
 * displayed as dismissible tags in the trigger.
 *
 * @example
 * ```tsx
 * <MultiSelect
 *   options={[
 *     { label: "Engineering", value: "eng" },
 *     { label: "Design", value: "design" },
 *   ]}
 *   value={selectedDepts}
 *   onChange={setSelectedDepts}
 * />
 * ```
 */
export function MultiSelect({
  options,
  value: propValue,
  defaultValue = [],
  onChange,
  placeholder = "Select options...",
  searchPlaceholder = "Search options...",
  maxCount = 3,
  showActions = true,
  disabled = false,
  className,
  id,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [internalVal, setInternalVal] = React.useState<string[]>(defaultValue);
  const [search, setSearch] = React.useState("");

  const isControlled = propValue !== undefined;
  const selectedValues = isControlled ? propValue : internalVal;

  const updateValues = (next: string[]) => {
    if (!isControlled) {
      setInternalVal(next);
    }
    onChange?.(next);
  };

  const handleToggle = (val: string) => {
    if (selectedValues.includes(val)) {
      updateValues(selectedValues.filter((v) => v !== val));
    } else {
      updateValues([...selectedValues, val]);
    }
  };

  const handleRemove = (e: React.MouseEvent, val: string) => {
    e.stopPropagation();
    if (disabled) return;
    updateValues(selectedValues.filter((v) => v !== val));
  };

  const handleSelectAll = () => {
    const selectable = options.filter((o) => !o.disabled).map((o) => o.value);
    updateValues(Array.from(new Set([...selectedValues, ...selectable])));
  };

  const handleClearAll = () => {
    updateValues([]);
  };

  const filtered = React.useMemo(() => {
    if (!search.trim()) return options;
    const query = search.toLowerCase();
    return options.filter((opt) => opt.label.toLowerCase().includes(query));
  }, [options, search]);

  const selectedOptions = React.useMemo(
    () => options.filter((o) => selectedValues.includes(o.value)),
    [options, selectedValues],
  );

  const visibleOptions = selectedOptions.slice(0, maxCount);
  const hiddenCount = selectedOptions.length - maxCount;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          id={id}
          role="combobox"
          tabIndex={disabled ? -1 : 0}
          aria-expanded={open}
          aria-disabled={disabled}
          onClick={() => !disabled && setOpen(!open)}
          onKeyDown={(e) => {
            if (disabled) return;
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setOpen(!open);
            }
          }}
          className={cn(
            "dl-multi-select-trigger",
            disabled && "dl-multi-select-trigger--disabled",
            className,
          )}
        >
          <div className="dl-multi-select-tags">
            {selectedOptions.length === 0 ? (
              <span className="dl-multi-select-placeholder">{placeholder}</span>
            ) : (
              <>
                {visibleOptions.map((opt) => (
                  <span key={opt.value} className="dl-multi-select-chip">
                    {opt.icon}
                    <span className="dl-multi-select-chip__text">
                      {opt.label}
                    </span>
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={(e) => handleRemove(e, opt.value)}
                      aria-label={`Remove ${opt.label}`}
                      className="dl-multi-select-chip__remove"
                    >
                      <X className="dl-multi-select-chip__icon" />
                    </button>
                  </span>
                ))}
                {hiddenCount > 0 && (
                  <span className="dl-multi-select-chip">
                    +{hiddenCount} more
                  </span>
                )}
              </>
            )}
          </div>
          <ChevronDown className="dl-multi-select-chevron" />
        </div>
      </PopoverTrigger>
      <PopoverContent align="start" className="dl-multi-select-content">
        <div className="dl-multi-select-search">
          <Search className="dl-multi-select-search-icon" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={searchPlaceholder}
            className="dl-multi-select-search-input"
            autoFocus
          />
        </div>

        {showActions && (
          <div className="dl-multi-select-actions">
            <span>{selectedValues.length} selected</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleSelectAll}
                className="dl-multi-select-action-btn"
              >
                Select all
              </button>
              {selectedValues.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="dl-multi-select-action-btn"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        )}

        <div
          className="dl-multi-select-list"
          role="listbox"
          aria-multiselectable="true"
        >
          {filtered.length === 0 ? (
            <div className="dl-multi-select-empty">No options found.</div>
          ) : (
            filtered.map((opt) => {
              const isSelected = selectedValues.includes(opt.value);
              return (
                <div
                  key={opt.value}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={opt.disabled}
                  onClick={() => !opt.disabled && handleToggle(opt.value)}
                  className={cn(
                    "dl-multi-select-item",
                    isSelected && "dl-multi-select-item--selected",
                    opt.disabled && "dl-multi-select-item--disabled",
                  )}
                >
                  <span className="dl-multi-select-checkbox">
                    {isSelected && <Check className="size-3 stroke-[3]" />}
                  </span>
                  {opt.icon}
                  <span className="flex-1 truncate">{opt.label}</span>
                </div>
              );
            })
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
