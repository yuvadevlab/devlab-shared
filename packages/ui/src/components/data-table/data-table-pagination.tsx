import * as React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/pagination";
import { cn } from "@/lib/utils";
import { DataTablePaginationConfig } from "./data-table-types";

export interface DataTablePaginationProps {
  config: DataTablePaginationConfig;
  activePage: number;
  totalItems: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function DataTablePagination({
  config,
  activePage,
  totalItems,
  totalPages,
  pageSize,
  onPageChange,
}: DataTablePaginationProps) {
  if (totalItems <= 0) return null;

  return (
    <div className="dl-data-table-footer">
      {config.showSummary && (
        <div className="dl-data-table-summary">
          Showing{" "}
          <strong>
            {Math.min((activePage - 1) * pageSize + 1, totalItems)}
          </strong>{" "}
          to <strong>{Math.min(activePage * pageSize, totalItems)}</strong> of{" "}
          <strong>{totalItems}</strong> entries
        </div>
      )}

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (activePage > 1) onPageChange(activePage - 1);
                }}
                className={cn(
                  activePage <= 1 && "pointer-events-none opacity-50",
                )}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
              if (
                totalPages > 7 &&
                p > 2 &&
                p < totalPages - 1 &&
                Math.abs(p - activePage) > 1
              ) {
                if (p === 3 || p === totalPages - 2) {
                  return (
                    <PaginationItem key={`ellipsis-${p}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }
                return null;
              }
              return (
                <PaginationItem key={p}>
                  <PaginationLink
                    href="#"
                    isActive={p === activePage}
                    onClick={(e) => {
                      e.preventDefault();
                      onPageChange(p);
                    }}
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (activePage < totalPages) onPageChange(activePage + 1);
                }}
                className={cn(
                  activePage >= totalPages && "pointer-events-none opacity-50",
                )}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
