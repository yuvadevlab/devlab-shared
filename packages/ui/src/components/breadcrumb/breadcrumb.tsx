import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";

export type BreadcrumbProps = React.ComponentPropsWithoutRef<"nav"> & {
  separator?: React.ReactNode;
};

/**
 * Breadcrumb navigation landmark providing context about the current page's
 * location within a navigational hierarchy.
 *
 * @example
 * ```tsx
 * <Breadcrumb>
 *   <BreadcrumbList>
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/">Home</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/components">Components</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
 *     </BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 * ```
 */
const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />,
);
Breadcrumb.displayName = "Breadcrumb";

export type BreadcrumbListProps = React.ComponentPropsWithoutRef<"ol">;

/**
 * Ordered list container (`<ol>`) wrapping breadcrumb items and separators.
 */
const BreadcrumbList = React.forwardRef<HTMLOListElement, BreadcrumbListProps>(
  ({ className, ...props }, ref) => (
    <ol ref={ref} className={cn("dl-breadcrumb-list", className)} {...props} />
  ),
);
BreadcrumbList.displayName = "BreadcrumbList";

export type BreadcrumbItemProps = React.ComponentPropsWithoutRef<"li">;

/**
 * Individual item wrapper (`<li>`) within a breadcrumb trail.
 */
const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("dl-breadcrumb-item", className)} {...props} />
  ),
);
BreadcrumbItem.displayName = "BreadcrumbItem";

export type BreadcrumbLinkProps = React.ComponentPropsWithoutRef<"a"> & {
  /** If true, renders the child component as the root link element (e.g. Next.js Link) */
  asChild?: boolean;
};

/**
 * Interactive link element within a breadcrumb trail.
 */
const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ asChild, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "a";

    return (
      <Comp
        ref={ref}
        className={cn("dl-breadcrumb-link", className)}
        {...props}
      />
    );
  },
);
BreadcrumbLink.displayName = "BreadcrumbLink";

export type BreadcrumbPageProps = React.ComponentPropsWithoutRef<"span">;

/**
 * Non-clickable page title representing the active, current page in a breadcrumb trail.
 */
const BreadcrumbPage = React.forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("dl-breadcrumb-page", className)}
      {...props}
    />
  ),
);
BreadcrumbPage.displayName = "BreadcrumbPage";

export type BreadcrumbSeparatorProps = React.ComponentProps<"li">;

/**
 * Decorative divider between breadcrumb items (defaults to a chevron right icon).
 */
const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: BreadcrumbSeparatorProps) => (
  <li
    role="presentation"
    aria-hidden="true"
    data-slot="breadcrumb-separator"
    className={cn("dl-breadcrumb-separator", className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

export type BreadcrumbEllipsisProps = React.ComponentProps<"span">;

/**
 * Ellipsis placeholder indicating intermediate collapsed path items.
 */
const BreadcrumbEllipsis = ({
  className,
  ...props
}: BreadcrumbEllipsisProps) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("dl-breadcrumb-ellipsis", className)}
    {...props}
  >
    <MoreHorizontal />
    <span className="sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
