import * as React from "react";
import { Search, X, Loader2 } from "lucide-react";
import { Input, type InputProps } from "@/components/input";
import { cn } from "@/lib/utils";

export interface SearchInputProps extends InputProps {
  /**
   * Callback fired when the clear search button is clicked.
   */
  onClear?: () => void;
  /**
   * Whether to display an inline loading spinner indicating background filtering.
   * @default false
   */
  loading?: boolean;
}

/**
 * Standardized search input control with integrated search icon, clear button,
 * and loading indicator.
 *
 * @example
 * ```tsx
 * <SearchInput
 *   value={search}
 *   onChange={(e) => setSearch(e.target.value)}
 *   onClear={() => setSearch("")}
 *   placeholder="Search applications..."
 * />
 * ```
 */
export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      className,
      value,
      onChange,
      onClear,
      loading = false,
      startIcon = <Search className="size-4" aria-hidden="true" />,
      endIcon,
      ...props
    },
    ref,
  ) => {
    const hasValue = Boolean(
      value !== undefined && value !== null && String(value).length > 0,
    );

    const clearButton =
      onClear && hasValue ? (
        <button
          type="button"
          className="dl-search-clear-btn"
          onClick={onClear}
          aria-label="Clear search query"
          tabIndex={-1}
        >
          <X className="dl-search-icon" aria-hidden="true" />
        </button>
      ) : null;

    const trailingIcon = loading ? (
      <Loader2 className="dl-search-spinner" aria-hidden="true" />
    ) : (
      (clearButton ?? endIcon)
    );

    return (
      <Input
        type="search"
        ref={ref}
        value={value}
        onChange={onChange}
        className={cn("dl-search-input", className)}
        startIcon={startIcon}
        endIcon={trailingIcon}
        {...props}
      />
    );
  },
);

SearchInput.displayName = "SearchInput";
