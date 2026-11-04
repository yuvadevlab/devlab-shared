import * as React from "react";

/**
 * Option item structure for `MultiSelect`.
 */
export interface MultiSelectOption {
  /** The human-readable text label */
  label: string;
  /** The unique value identifier */
  value: string;
  /** Whether this individual option is disabled */
  disabled?: boolean;
  /** Optional icon or avatar element */
  icon?: React.ReactNode;
}

/**
 * Props for `MultiSelect`.
 */
export interface MultiSelectProps {
  /** List of selectable options */
  options: MultiSelectOption[];
  /** Currently selected array of values (controlled) */
  value?: string[];
  /** Initial selected array of values (uncontrolled) */
  defaultValue?: string[];
  /** Callback fired when selection changes */
  onChange?: (values: string[]) => void;
  /** Placeholder text when nothing is selected */
  placeholder?: string;
  /** Search input placeholder text */
  searchPlaceholder?: string;
  /** Maximum number of tag chips to display before collapsing into +N more */
  maxCount?: number;
  /** Whether to show the Select All / Clear All action bar */
  showActions?: boolean;
  /** Whether the dropdown control is non-interactive */
  disabled?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Unique HTML id attribute */
  id?: string;
}
