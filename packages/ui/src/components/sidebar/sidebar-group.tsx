import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

/** Props for `SidebarGroup`. */
export type SidebarGroupProps = React.ComponentProps<"div">;

/**
 * Section grouping related sidebar menu items.
 */
export const SidebarGroup = React.forwardRef<HTMLDivElement, SidebarGroupProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-sidebar="group"
        className={cn("dl-sidebar-group", className)}
        {...props}
      />
    );
  },
);
SidebarGroup.displayName = "SidebarGroup";

/** Props for `SidebarGroupLabel`. */
export type SidebarGroupLabelProps = React.ComponentProps<"div"> & {
  asChild?: boolean;
};

/**
 * Text heading or label for a `SidebarGroup`.
 */
export const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  SidebarGroupLabelProps
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      ref={ref}
      data-sidebar="group-label"
      className={cn("dl-sidebar-group-label", className)}
      {...props}
    />
  );
});
SidebarGroupLabel.displayName = "SidebarGroupLabel";

/** Props for `SidebarGroupAction`. */
export type SidebarGroupActionProps = React.ComponentProps<"button"> & {
  asChild?: boolean;
};

/**
 * Secondary action button placed beside a `SidebarGroupLabel` (e.g. "+" to add items).
 */
export const SidebarGroupAction = React.forwardRef<
  HTMLButtonElement,
  SidebarGroupActionProps
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      data-sidebar="group-action"
      className={cn("dl-sidebar-group-action", className)}
      {...props}
    />
  );
});
SidebarGroupAction.displayName = "SidebarGroupAction";

/** Props for `SidebarGroupContent`. */
export type SidebarGroupContentProps = React.ComponentProps<"div">;

/**
 * Content container rendered inside a `SidebarGroup`.
 */
export const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  SidebarGroupContentProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="group-content"
    className={cn("dl-sidebar-group-content", className)}
    {...props}
  />
));
SidebarGroupContent.displayName = "SidebarGroupContent";
