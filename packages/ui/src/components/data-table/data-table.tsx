import * as React from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/table";
import { EmptyState } from "@/components/empty-state";
import { Skeleton } from "@/components/skeleton";
import { cn } from "@/lib/utils";
import {
  DataTableColumn,
  DataTablePaginationConfig,
  DataTableProps,
} from "./data-table-types";
import { DataTablePagination } from "./data-table-pagination";

export type { DataTableColumn, DataTablePaginationConfig, DataTableProps };

/**
 * Generic enterprise data table with integrated sorting, client/server pagination,
 * custom column renderers, and zero-config empty states.
 */
export function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  rowKey = "id",
  pagination = true,
  loading = false,
  emptyState,
  onRowClick,
  hoverable = false,
  className,
}: DataTableProps<T>) {
  const [internalPage, setInternalPage] = React.useState(1);
  const [sortKey, setSortKey] = React.useState<string | null>(null);
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">(
    "asc",
  );

  const paginationConfig: DataTablePaginationConfig | null =
    React.useMemo(() => {
      if (!pagination) return null;
      return typeof pagination === "boolean"
        ? { pageSize: 10, showSummary: true }
        : { pageSize: 10, showSummary: true, ...pagination };
    }, [pagination]);

  const isServerPagination =
    paginationConfig?.total !== undefined &&
    paginationConfig?.onPageChange !== undefined;

  const activePage = paginationConfig?.page ?? internalPage;
  const pageSize = paginationConfig?.pageSize ?? 10;

  const handlePageChange = (nextPage: number) => {
    if (isServerPagination) {
      paginationConfig?.onPageChange?.(nextPage);
    } else {
      setInternalPage(nextPage);
    }
  };

  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else {
        setSortKey(null);
        setSortDirection("asc");
      }
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortKey || isServerPagination) return data;
    const col = columns.find((c) => c.key === sortKey);
    return [...data].sort((a, b) => {
      if (col?.sortFn) {
        return sortDirection === "asc" ? col.sortFn(a, b) : col.sortFn(b, a);
      }
      const valA = a[sortKey];
      const valB = b[sortKey];
      if (valA === valB) return 0;
      if (valA === null || valA === undefined) return 1;
      if (valB === null || valB === undefined) return -1;
      const res = String(valA).localeCompare(String(valB), undefined, {
        numeric: true,
      });
      return sortDirection === "asc" ? res : -res;
    });
  }, [data, sortKey, sortDirection, columns, isServerPagination]);

  const totalItems = isServerPagination
    ? (paginationConfig?.total ?? data.length)
    : sortedData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const displayData = React.useMemo(() => {
    if (!paginationConfig || isServerPagination) return sortedData;
    const start = (activePage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, paginationConfig, isServerPagination, activePage, pageSize]);

  const getRowId = (row: T, index: number): string | number => {
    if (typeof rowKey === "function") return rowKey(row, index);
    const val = row[rowKey as string];
    return typeof val === "string" || typeof val === "number" ? val : index;
  };

  return (
    <div className={cn("dl-data-table-container", className)}>
      <div className="dl-data-table-wrapper">
        <Table hoverable={hoverable || Boolean(onRowClick)}>
          <TableHeader>
            <TableRow>
              {columns.map((col) => {
                const isSorted = sortKey === col.key;
                return (
                  <TableHead
                    key={col.key}
                    className={cn(
                      col.align === "center" && "text-center",
                      col.align === "right" && "text-right",
                      col.className,
                    )}
                  >
                    {col.sortable ? (
                      <button
                        type="button"
                        onClick={() => handleSort(col.key)}
                        className="dl-data-table-sort-btn"
                      >
                        <span>{col.header}</span>
                        {isSorted ? (
                          sortDirection === "asc" ? (
                            <ArrowUp className="dl-data-table-sort-icon" />
                          ) : (
                            <ArrowDown className="dl-data-table-sort-icon" />
                          )
                        ) : (
                          <ArrowUpDown className="dl-data-table-sort-icon" />
                        )}
                      </button>
                    ) : (
                      col.header
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: pageSize }).map((_, idx) => (
                <TableRow key={`skeleton-${idx}`}>
                  {columns.map((col) => (
                    <TableCell key={col.key}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : displayData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="dl-data-table-empty"
                >
                  {emptyState ?? (
                    <EmptyState
                      title="No entries found"
                      description="There is no data matching the current criteria."
                    />
                  )}
                </TableCell>
              </TableRow>
            ) : (
              displayData.map((row, rowIndex) => (
                <TableRow
                  key={getRowId(row, rowIndex)}
                  onClick={() => onRowClick?.(row)}
                  className={cn(onRowClick && "dl-data-table-row--clickable")}
                >
                  {columns.map((col) => (
                    <TableCell
                      key={col.key}
                      className={cn(
                        col.align === "center" && "text-center",
                        col.align === "right" && "text-right",
                        col.className,
                      )}
                    >
                      {col.cell
                        ? col.cell(row, rowIndex)
                        : (row[col.key] as React.ReactNode)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {paginationConfig && (
        <DataTablePagination
          config={paginationConfig}
          activePage={activePage}
          totalItems={totalItems}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
