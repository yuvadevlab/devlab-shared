"use client";

import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Menu item wrapper component within a `Menubar`.
 */
export function MenubarMenu(
  props: React.ComponentProps<typeof MenubarPrimitive.Menu>,
) {
  return <MenubarPrimitive.Menu {...props} />;
}

/**
 * Group wrapper within a `Menubar`.
 */
export function MenubarGroup(
  props: React.ComponentProps<typeof MenubarPrimitive.Group>,
) {
  return <MenubarPrimitive.Group {...props} />;
}

/**
 * Portal wrapper rendering menubar popups to document body.
 */
export function MenubarPortal(
  props: React.ComponentProps<typeof MenubarPrimitive.Portal>,
) {
  return <MenubarPrimitive.Portal {...props} />;
}

/**
 * Radio group wrapper within a `Menubar`.
 */
export function MenubarRadioGroup(
  props: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>,
) {
  return <MenubarPrimitive.RadioGroup {...props} />;
}

/**
 * Submenu container within a `Menubar`.
 */
export function MenubarSub(
  props: React.ComponentProps<typeof MenubarPrimitive.Sub>,
) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />;
}

export type MenubarProps = React.ComponentPropsWithoutRef<
  typeof MenubarPrimitive.Root
>;

/**
 * A persistent horizontal menu bar commonly used in desktop-style web applications.
 *
 * @example
 * ```tsx
 * <Menubar>
 *   <MenubarMenu>
 *     <MenubarTrigger>File</MenubarTrigger>
 *     <MenubarContent>
 *       <MenubarItem>New Tab <MenubarShortcut>⌘T</MenubarShortcut></MenubarItem>
 *       <MenubarItem>New Window</MenubarItem>
 *       <MenubarSeparator />
 *       <MenubarItem>Exit</MenubarItem>
 *     </MenubarContent>
 *   </MenubarMenu>
 * </Menubar>
 * ```
 */
export const Menubar = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.Root>,
  MenubarProps
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn("dl-menubar", className)}
    {...props}
  />
));
Menubar.displayName = MenubarPrimitive.Root.displayName;

export type MenubarTriggerProps = React.ComponentPropsWithoutRef<
  typeof MenubarPrimitive.Trigger
>;

/**
 * The top-level menu button in the horizontal menubar row.
 */
export const MenubarTrigger = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.Trigger>,
  MenubarTriggerProps
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn("dl-menubar-trigger", className)}
    {...props}
  />
));
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName;

export type MenubarSubTriggerProps = React.ComponentPropsWithoutRef<
  typeof MenubarPrimitive.SubTrigger
> & {
  inset?: boolean;
};

/**
 * Trigger item for opening a nested submenu inside a Menubar.
 */
export const MenubarSubTrigger = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.SubTrigger>,
  MenubarSubTriggerProps
>(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
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
  </MenubarPrimitive.SubTrigger>
));
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName;

export type MenubarSubContentProps = React.ComponentPropsWithoutRef<
  typeof MenubarPrimitive.SubContent
>;

/**
 * Popover content rendered when a `MenubarSubTrigger` is expanded.
 */
export const MenubarSubContent = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.SubContent>,
  MenubarSubContentProps
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn("dl-menu-content", className)}
    {...props}
  />
));
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName;

export type MenubarContentProps = React.ComponentPropsWithoutRef<
  typeof MenubarPrimitive.Content
>;

/**
 * Floating panel displaying items under a top-level `MenubarTrigger`.
 */
export const MenubarContent = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.Content>,
  MenubarContentProps
>(
  (
    { className, align = "start", alignOffset = -4, sideOffset = 8, ...props },
    ref,
  ) => (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn("dl-menu-content", className)}
        {...props}
      />
    </MenubarPrimitive.Portal>
  ),
);
MenubarContent.displayName = MenubarPrimitive.Content.displayName;
