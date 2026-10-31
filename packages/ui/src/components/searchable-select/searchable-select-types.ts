/**
 * Option item structure for `SearchableSelect`.
 */
export interface SearchableSelectOption {
  /** The human-readable text label */
  label: string;
  /** The unique value identifier */
  value: string;
  /** Optional grouping category */
  group?: string;
  /** Optional icon identifier */
  icon?: string;
}

/**
 * Props for `SearchableSelect`.
 */
export interface SearchableSelectProps {
  /** List of selectable options */
  options: SearchableSelectOption[];
  /** Currently selected value */
  value?: string;
  /** Callback fired when an option is selected */
  onChange?: (value: string) => void;
  /** Placeholder text when nothing is selected */
  placeholder?: string;
  /** Search input placeholder text */
  searchPlaceholder?: string;
  /** Callback fired when the user adds a new custom option */
  onAddNew?: (searchQuery: string) => void;
  /** Custom label for the add-new button */
  addNewLabel?: string;
  /** Whether the select dropdown is disabled */
  disabled?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Unique HTML id attribute */
  id?: string;
}
