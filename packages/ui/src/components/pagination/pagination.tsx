import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/button";

export type PaginationProps = React.ComponentProps<"nav">;

/**
 * Accessible navigation container for paginated content.
 *
 * @example
 * ```tsx
 * <Pagination>
 *   <PaginationContent>
 *     <PaginationItem>
 *       <PaginationPrevious href="#" />
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationLink href="#" isActive>1</PaginationLink>
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationLink href="#">2</PaginationLink>
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationEllipsis />
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationNext href="#" />
 *     </PaginationItem>
 *   </PaginationContent>
 * </Pagination>
 * ```
 */
const Pagination = ({ className, ...props }: PaginationProps) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("dl-pagination", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

export type PaginationContentProps = React.ComponentProps<"ul">;

/**
 * List container (`<ul>`) holding pagination links and items.
 */
const PaginationContent = React.forwardRef<
  HTMLUListElement,
  PaginationContentProps
>(({ className, ...props }, ref) => (
  <ul ref={ref} className={cn("dl-pagination-content", className)} {...props} />
));
PaginationContent.displayName = "PaginationContent";

export type PaginationItemProps = React.ComponentProps<"li">;

/**
 * List item (`<li>`) wrapper for individual pagination controls.
 */
const PaginationItem = React.forwardRef<HTMLLIElement, PaginationItemProps>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("dl-pagination-item", className)} {...props} />
  ),
);
PaginationItem.displayName = "PaginationItem";

export type PaginationLinkProps = {
  /** Marks this page link as currently active */
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">;

/**
 * Interactive link styled as a button for navigating between pages.
 */
const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className,
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

export type PaginationPreviousProps = React.ComponentProps<
  typeof PaginationLink
>;

/**
 * "Previous" page navigation link with a preceding chevron icon.
 */
const PaginationPrevious = ({
  className,
  ...props
}: PaginationPreviousProps) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("dl-pagination-prev", className)}
    {...props}
  >
    <ChevronLeft className="dl-pagination-icon" />
    <span>Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

export type PaginationNextProps = React.ComponentProps<typeof PaginationLink>;

/**
 * "Next" page navigation link with a trailing chevron icon.
 */
const PaginationNext = ({ className, ...props }: PaginationNextProps) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("dl-pagination-next", className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="dl-pagination-icon" />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

export type PaginationEllipsisProps = React.ComponentProps<"span">;

/**
 * Ellipsis indicator (`...`) denoting skipped pages in a pagination sequence.
 */
const PaginationEllipsis = ({
  className,
  ...props
}: PaginationEllipsisProps) => (
  <span
    aria-hidden
    className={cn("dl-pagination-ellipsis", className)}
    {...props}
  >
    <MoreHorizontal />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
