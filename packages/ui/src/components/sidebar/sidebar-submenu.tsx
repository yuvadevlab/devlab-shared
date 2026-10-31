import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/skeleton";

/** Props for `SidebarMenuSkeleton`. */
export type SidebarMenuSkeletonProps = React.ComponentProps<"div"> & {
  showIcon?: boolean;
};

/** Loading skeleton placeholder simulating a sidebar menu item. */
export const SidebarMenuSkeleton = React.forwardRef<
  HTMLDivElement,
  SidebarMenuSkeletonProps
>(({ className, showIcon = false, ...props }, ref) => {
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);

  return (
    <div
      ref={ref}
      data-sidebar="menu-skeleton"
      className={cn("dl-sidebar-menu-skeleton", className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="dl-sidebar-menu-skeleton-icon"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="dl-sidebar-menu-skeleton-text"
        data-sidebar="menu-skeleton-text"
        style={{ "--skeleton-width": width } as React.CSSProperties}
      />
    </div>
  );
});
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";

/** Props for `SidebarMenuSub`. */
export type SidebarMenuSubProps = React.ComponentProps<"ul">;

/** Nested sub-list container for hierarchical sidebar navigation. */
export const SidebarMenuSub = React.forwardRef<
  HTMLUListElement,
  SidebarMenuSubProps
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu-sub"
    className={cn("dl-sidebar-menu-sub", className)}
    {...props}
  />
));
SidebarMenuSub.displayName = "SidebarMenuSub";

/** Props for `SidebarMenuSubItem`. */
export type SidebarMenuSubItemProps = React.ComponentProps<"li">;

/** Nested item wrapper inside a `SidebarMenuSub`. */
export const SidebarMenuSubItem = React.forwardRef<
  HTMLLIElement,
  SidebarMenuSubItemProps
>(({ ...props }, ref) => <li ref={ref} {...props} />);
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";

/** Props for `SidebarMenuSubButton`. */
export type SidebarMenuSubButtonProps = React.ComponentProps<"a"> & {
  asChild?: boolean;
  size?: "sm" | "md";
  isActive?: boolean;
};

/** Navigation button/link inside a nested `SidebarMenuSub` tree. */
export const SidebarMenuSubButton = React.forwardRef<
  HTMLAnchorElement,
  SidebarMenuSubButtonProps
>(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";
  return (
    <Comp
      ref={ref}
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "dl-sidebar-menu-sub-button",
        size === "sm" && "dl-sidebar-menu-sub-button--sm",
        className,
      )}
      {...props}
    />
  );
});
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";
