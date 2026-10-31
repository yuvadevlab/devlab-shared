"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Root DropdownMenu container managing open/closed state.
 */
export const DropdownMenu = DropdownMenuPrimitive.Root;

/**
 * The trigger button that toggles the dropdown menu.
 */
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

/**
 * Group of related dropdown menu items.
 */
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;

/**
 * Portal rendering dropdown menus in the document body.
 */
export const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

/**
 * Submenu container within a dropdown menu.
 */
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;

/**
 * Radio group container for mutually exclusive dropdown options.
 */
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

export type DropdownMenuSubTriggerProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.SubTrigger
> & {
  inset?: boolean;
};

/**
 * Trigger item for opening a nested dropdown submenu.
 */
export const DropdownMenuSubTrigger = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.SubTrigger>,
  DropdownMenuSubTriggerProps
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "dl-menu-item dl-menu-sub-trigger",
      inset && "dl-menu-item--inset",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="dl-menu-item__chevron" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName;

export type DropdownMenuSubContentProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.SubContent
>;

/**
 * Content container for a nested dropdown submenu.
 */
export const DropdownMenuSubContent = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.SubContent>,
  DropdownMenuSubContentProps
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn("dl-menu-content", className)}
    {...props}
  />
));
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;

export type DropdownMenuContentProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Content
>;

/**
 * Floating content panel containing dropdown menu items.
 */
export const DropdownMenuContent = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Content>,
  DropdownMenuContentProps
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn("dl-menu-content", className)}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
