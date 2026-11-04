import * as React from "react";

/**
 * Column definition for generic `DataTable`.
 */
export interface DataTableColumn<T> {
  /** Unique key identifying the column (matches a field in T or arbitrary string) */
  key: string;
  /** Header title or custom rendered header */
  header: React.ReactNode;
  /** Custom cell renderer. Defaults to rendering `row[key]` */
  cell?: (row: T, index: number) => React.ReactNode;
  /** Whether the column can be sorted */
  sortable?: boolean;
  /** Text alignment within cells */
  align?: "left" | "center" | "right";
  /** Optional custom CSS class for header and cells */
  className?: string;
  /** Optional custom sort comparator function */
  sortFn?: (a: T, b: T) => number;
}

/**
 * Pagination configuration options for `DataTable`.
 */
export interface DataTablePaginationConfig {
  /** Number of items per page. Defaults to 10 */
  pageSize?: number;
  /** Active page (1-based index) for controlled mode */
  page?: number;
  /** Total count of items for server-side pagination */
  total?: number;
  /** Callback fired when page index changes */
  onPageChange?: (page: number) => void;
  /** Whether to show "Showing X to Y of Z entries" summary. Defaults to true */
  showSummary?: boolean;
}

/**
 * Props for generic `DataTable`.
 */
export interface DataTableProps<T> {
  /** Dataset rows array */
  data: T[];
  /** Column definitions */
  columns: DataTableColumn<T>[];
  /** Unique row key extractor or field name. Defaults to "id" */
  rowKey?: keyof T | ((row: T, index: number) => string | number);
  /** Pagination configuration or boolean to toggle client-side pagination */
  pagination?: boolean | DataTablePaginationConfig;
  /** Loading state indicator */
  loading?: boolean;
  /** Custom empty state message or element */
  emptyState?: React.ReactNode;
  /** Callback fired when clicking a table row */
  onRowClick?: (row: T) => void;
  /** Additional CSS class names */
  className?: string;
}
