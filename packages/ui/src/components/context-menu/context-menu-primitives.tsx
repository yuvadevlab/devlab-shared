"use client";

import * as React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Root ContextMenu container.
 */
export const ContextMenu = ContextMenuPrimitive.Root;

/**
 * The area that triggers the context menu on right click or long press.
 */
export const ContextMenuTrigger = ContextMenuPrimitive.Trigger;

/**
 * Group of related context menu items.
 */
export const ContextMenuGroup = ContextMenuPrimitive.Group;

/**
 * Portal rendering the context menu in the document body.
 */
export const ContextMenuPortal = ContextMenuPrimitive.Portal;

/**
 * Submenu container within a context menu.
 */
export const ContextMenuSub = ContextMenuPrimitive.Sub;

/**
 * Radio group container for mutually exclusive context options.
 */
export const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

export type ContextMenuSubTriggerProps = React.ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.SubTrigger
> & {
  inset?: boolean;
};

/**
 * Trigger item for opening a nested context submenu.
 */
export const ContextMenuSubTrigger = React.forwardRef<
  React.ComponentRef<typeof ContextMenuPrimitive.SubTrigger>,
  ContextMenuSubTriggerProps
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
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
  </ContextMenuPrimitive.SubTrigger>
));
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;

export type ContextMenuSubContentProps = React.ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.SubContent
>;

/**
 * Content container for a nested context submenu.
 */
export const ContextMenuSubContent = React.forwardRef<
  React.ComponentRef<typeof ContextMenuPrimitive.SubContent>,
  ContextMenuSubContentProps
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={cn("dl-menu-content", className)}
    {...props}
  />
));
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName;

export type ContextMenuContentProps = React.ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.Content
>;

/**
 * Floating content panel containing context menu items.
 */
export const ContextMenuContent = React.forwardRef<
  React.ComponentRef<typeof ContextMenuPrimitive.Content>,
  ContextMenuContentProps
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn("dl-context-menu-content", className)}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
));
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;
