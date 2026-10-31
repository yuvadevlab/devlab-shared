import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/tooltip";
import { useSidebar } from "./sidebar-context";

/** Menu button variant styles. */
export const sidebarMenuButtonVariants = cva("dl-sidebar-menu-button", {
  variants: {
    variant: {
      default: "dl-sidebar-menu-button--default",
      outline: "dl-sidebar-menu-button--outline",
    },
    size: {
      default: "dl-sidebar-menu-button--md",
      sm: "dl-sidebar-menu-button--sm",
      lg: "dl-sidebar-menu-button--lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

/** Props for `SidebarMenu`. */
export type SidebarMenuProps = React.ComponentProps<"ul">;

/** Vertical list (`<ul>`) holding sidebar menu items. */
export const SidebarMenu = React.forwardRef<HTMLUListElement, SidebarMenuProps>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      data-sidebar="menu"
      className={cn("dl-sidebar-menu", className)}
      {...props}
    />
  ),
);
SidebarMenu.displayName = "SidebarMenu";

/** Props for `SidebarMenuItem`. */
export type SidebarMenuItemProps = React.ComponentProps<"li">;

/** List item (`<li>`) wrapper for a sidebar navigation button or link. */
export const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  SidebarMenuItemProps
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    data-sidebar="menu-item"
    className={cn("dl-sidebar-menu-item", className)}
    {...props}
  />
));
SidebarMenuItem.displayName = "SidebarMenuItem";

/** Props for `SidebarMenuButton`. */
export type SidebarMenuButtonProps = React.ComponentProps<"button"> & {
  asChild?: boolean;
  isActive?: boolean;
  tooltip?: string | React.ComponentProps<typeof TooltipContent>;
} & VariantProps<typeof sidebarMenuButtonVariants>;

/** Interactive navigation button inside a sidebar menu item, with automatic tooltip in collapsed icon mode. */
export const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps
>(
  (
    {
      asChild = false,
      isActive = false,
      variant = "default",
      size = "default",
      tooltip,
      className,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const { isMobile, state } = useSidebar();

    const button = (
      <Comp
        ref={ref}
        data-sidebar="menu-button"
        data-size={size}
        data-variant={variant}
        data-active={isActive}
        className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
        {...props}
      />
    );

    if (!tooltip) {
      return button;
    }

    const tooltipProps =
      typeof tooltip === "string" ? { children: tooltip } : tooltip;

    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent
          side="right"
          align="center"
          hidden={state !== "collapsed" || isMobile}
          {...tooltipProps}
        />
      </Tooltip>
    );
  },
);
SidebarMenuButton.displayName = "SidebarMenuButton";

/** Props for `SidebarMenuAction`. */
export type SidebarMenuActionProps = React.ComponentProps<"button"> & {
  asChild?: boolean;
  showOnHover?: boolean;
};

/** Secondary action button placed beside a sidebar menu button. */
export const SidebarMenuAction = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuActionProps
>(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      ref={ref}
      data-sidebar="menu-action"
      data-show-on-hover={showOnHover ? "true" : undefined}
      className={cn(
        "dl-sidebar-menu-action",
        showOnHover && "dl-sidebar-menu-action--hover-only",
        className,
      )}
      {...props}
    />
  );
});
SidebarMenuAction.displayName = "SidebarMenuAction";

/** Props for `SidebarMenuBadge`. */
export type SidebarMenuBadgeProps = React.ComponentProps<"div">;

/** Numeric or label badge placed on the right side of a sidebar menu button. */
export const SidebarMenuBadge = React.forwardRef<
  HTMLDivElement,
  SidebarMenuBadgeProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="menu-badge"
    className={cn("dl-sidebar-menu-badge", className)}
    {...props}
  />
));
SidebarMenuBadge.displayName = "SidebarMenuBadge";
