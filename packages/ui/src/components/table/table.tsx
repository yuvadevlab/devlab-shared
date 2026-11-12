import * as React from "react";
import { cn } from "@/lib/utils";

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  /**
   * Whether to highlight rows on hover using the active theme color.
   * When enabled, applies `.dl-table--hoverable`.
   * @default false
   */
  readonly hoverable?: boolean;
}

/**
 * Responsive table container with pure scoped CSS styling.
 * Automatically wraps in a scrollable horizontal container (`dl-table-wrapper`).
 *
 * @example
 * ```tsx
 * <Table hoverable>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>Invoice</TableHead>
 *       <TableHead>Status</TableHead>
 *       <TableHead className="text-right">Amount</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>INV-001</TableCell>
 *       <TableCell>Paid</TableCell>
 *       <TableCell className="text-right">$250.00</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 * ```
 */
const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, hoverable = false, ...props }, ref) => (
    <div className="dl-table-wrapper">
      <table
        ref={ref}
        className={cn(
          "dl-table",
          hoverable && "dl-table--hoverable",
          className,
        )}
        {...props}
      />
    </div>
  ),
);
Table.displayName = "Table";

export type TableHeaderProps = React.HTMLAttributes<HTMLTableSectionElement>;

/**
 * Header section of a `Table` (`<thead>`).
 */
const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn("dl-table__head", className)} {...props} />
  ),
);
TableHeader.displayName = "TableHeader";

export type TableBodyProps = React.HTMLAttributes<HTMLTableSectionElement>;

/**
 * Body container of a `Table` (`<tbody>`).
 */
const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn("dl-table__body", className)} {...props} />
  ),
);
TableBody.displayName = "TableBody";

export type TableFooterProps = React.HTMLAttributes<HTMLTableSectionElement>;

/**
 * Footer section of a `Table` (`<tfoot>`) for totals or summaries.
 */
const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className, ...props }, ref) => (
    <tfoot ref={ref} className={cn("dl-table__foot", className)} {...props} />
  ),
);
TableFooter.displayName = "TableFooter";

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  /**
   * Whether to highlight this row on hover using the active brand theme color.
   */
  readonly hoverable?: boolean;
}

/**
 * Interactive row within a `Table` (`<tr>`).
 */
const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, hoverable, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        "dl-table__row",
        hoverable && "dl-table__row--hoverable",
        className,
      )}
      {...props}
    />
  ),
);
TableRow.displayName = "TableRow";

export type TableHeadProps = React.ThHTMLAttributes<HTMLTableCellElement>;

/**
 * Header cell within a `TableRow` (`<th>`).
 */
const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, ...props }, ref) => (
    <th ref={ref} className={cn("dl-table__head-cell", className)} {...props} />
  ),
);
TableHead.displayName = "TableHead";

export type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement>;

/**
 * Standard data cell within a `TableRow` (`<td>`).
 */
const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, ...props }, ref) => (
    <td ref={ref} className={cn("dl-table__cell", className)} {...props} />
  ),
);
TableCell.displayName = "TableCell";

export type TableCaptionProps = React.HTMLAttributes<HTMLTableCaptionElement>;

/**
 * Accessible caption element describing the purpose or dataset of a `Table`.
 */
const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  TableCaptionProps
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("dl-table__caption", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
