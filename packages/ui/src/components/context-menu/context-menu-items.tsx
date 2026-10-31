"use client";

import * as React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export type ContextMenuItemProps = React.ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.Item
> & {
  inset?: boolean;
};

/**
 * Selectable item within a context menu.
 */
export const ContextMenuItem = React.forwardRef<
  React.ComponentRef<typeof ContextMenuPrimitive.Item>,
  ContextMenuItemProps
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn("dl-menu-item", inset && "dl-menu-item--inset", className)}
    {...props}
  />
));
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;

export type ContextMenuCheckboxItemProps = React.ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.CheckboxItem
>;

/**
 * Checkbox menu item supporting checked/unchecked toggle state in a context menu.
 */
export const ContextMenuCheckboxItem = React.forwardRef<
  React.ComponentRef<typeof ContextMenuPrimitive.CheckboxItem>,
  ContextMenuCheckboxItemProps
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn("dl-menu-item dl-menu-checkbox-item", className)}
    {...props}
  >
    <span className="dl-menu-checkbox-item__indicator">
      <ContextMenuPrimitive.ItemIndicator>
        <Check className="dl-menu-item__icon" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
));
ContextMenuCheckboxItem.displayName =
  ContextMenuPrimitive.CheckboxItem.displayName;

export type ContextMenuRadioItemProps = React.ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.RadioItem
>;

/**
 * Radio menu item supporting mutual exclusion in a ContextMenuRadioGroup.
 */
export const ContextMenuRadioItem = React.forwardRef<
  React.ComponentRef<typeof ContextMenuPrimitive.RadioItem>,
  ContextMenuRadioItemProps
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={cn("dl-menu-item dl-menu-radio-item", className)}
    {...props}
  >
    <span className="dl-menu-radio-item__indicator">
      <ContextMenuPrimitive.ItemIndicator>
        <Circle className="dl-menu-item__radio-dot" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
));
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;

export type ContextMenuLabelProps = React.ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.Label
> & {
  inset?: boolean;
};

/**
 * Header label for grouping context menu items.
 */
export const ContextMenuLabel = React.forwardRef<
  React.ComponentRef<typeof ContextMenuPrimitive.Label>,
  ContextMenuLabelProps
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn("dl-menu-label", inset && "dl-menu-label--inset", className)}
    {...props}
  />
));
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;

export type ContextMenuSeparatorProps = React.ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.Separator
>;

/**
 * Horizontal rule separating sections within a context menu.
 */
export const ContextMenuSeparator = React.forwardRef<
  React.ComponentRef<typeof ContextMenuPrimitive.Separator>,
  ContextMenuSeparatorProps
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={cn("dl-menu-separator", className)}
    {...props}
  />
));
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;

export type ContextMenuShortcutProps = React.HTMLAttributes<HTMLSpanElement>;

/**
 * Keyboard shortcut hint displayed at the trailing end of a context menu item.
 */
export const ContextMenuShortcut = ({
  className,
  ...props
}: ContextMenuShortcutProps) => {
  return <span className={cn("dl-menu-shortcut", className)} {...props} />;
};
ContextMenuShortcut.displayName = "ContextMenuShortcut";
