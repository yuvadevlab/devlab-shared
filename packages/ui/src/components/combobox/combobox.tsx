import * as React from "react";
import { SearchableSelect } from "@/components/searchable-select";
import type { SearchableSelectProps } from "@/components/searchable-select";

/**
 * Props for the searchable single-value combobox.
 *
 * Mirrors SearchableSelect's accessible option model, value handling,
 * placeholder behavior, and optional item-creation callback.
 */
export type ComboboxProps = SearchableSelectProps;

/**
 * Searchable combobox using the library's accessible popover and keyboard list.
 */
export function Combobox(props: ComboboxProps) {
  return <SearchableSelect {...props} />;
}
