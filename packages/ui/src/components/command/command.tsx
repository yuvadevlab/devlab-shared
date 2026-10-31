"use client";

import * as React from "react";
import { type DialogProps } from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/dialog";

export type CommandProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive
>;

/**
 * Fast, composable, unstyled command menu component for React.
 *
 * @example
 * ```tsx
 * <Command>
 *   <CommandInput placeholder="Type a command or search..." />
 *   <CommandList>
 *     <CommandEmpty>No results found.</CommandEmpty>
 *     <CommandGroup heading="Suggestions">
 *       <CommandItem>Calendar</CommandItem>
 *       <CommandItem>Search Emoji</CommandItem>
 *       <CommandItem>Calculator</CommandItem>
 *     </CommandGroup>
 *   </CommandList>
 * </Command>
 * ```
 */
const Command = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive>,
  CommandProps
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn("dl-command", className)}
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

export interface CommandDialogProps extends DialogProps {
  children?: React.ReactNode;
}

/**
 * Modal dialog wrapper for rendering a command palette over page content.
 *
 * @example
 * ```tsx
 * <CommandDialog open={open} onOpenChange={setOpen}>
 *   <CommandInput placeholder="Search all commands..." />
 *   <CommandList>
 *     <CommandItem>Profile</CommandItem>
 *     <CommandItem>Billing</CommandItem>
 *   </CommandList>
 * </CommandDialog>
 * ```
 */
const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="dl-command-dialog-content">
        <Command>{children}</Command>
      </DialogContent>
    </Dialog>
  );
};

export type CommandInputProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive.Input
>;

/**
 * Search input field for filtering options in a command list.
 */
const CommandInput = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Input>,
  CommandInputProps
>(({ className, ...props }, ref) => (
  <div className="dl-command-input-wrapper" cmdk-input-wrapper="">
    <Search className="dl-command-input-icon" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn("dl-command-input", className)}
      {...props}
    />
  </div>
));
CommandInput.displayName = CommandPrimitive.Input.displayName;

export type CommandListProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive.List
>;

/**
 * Scrollable list container that renders filtered items and groups.
 */
const CommandList = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.List>,
  CommandListProps
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("dl-command-list", className)}
    {...props}
  />
));
CommandList.displayName = CommandPrimitive.List.displayName;

export type CommandEmptyProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive.Empty
>;

/**
 * Message shown automatically when no items match the command search filter.
 */
const CommandEmpty = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Empty>,
  CommandEmptyProps
>((props, ref) => (
  <CommandPrimitive.Empty ref={ref} className="dl-command-empty" {...props} />
));
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

export type CommandGroupProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive.Group
>;

/**
 * Grouping container for related command items with an optional heading label.
 */
const CommandGroup = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Group>,
  CommandGroupProps
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn("dl-command-group", className)}
    {...props}
  />
));
CommandGroup.displayName = CommandPrimitive.Group.displayName;

export type CommandSeparatorProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive.Separator
>;

/**
 * Divider separating groups or sections within a command list.
 */
const CommandSeparator = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Separator>,
  CommandSeparatorProps
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("dl-command-separator", className)}
    {...props}
  />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

export type CommandItemProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive.Item
>;

/**
 * Selectable command item with keyboard navigation and focus styling.
 */
const CommandItem = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Item>,
  CommandItemProps
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn("dl-command-item", className)}
    {...props}
  />
));
CommandItem.displayName = CommandPrimitive.Item.displayName;

export type CommandShortcutProps = React.HTMLAttributes<HTMLSpanElement>;

/**
 * Visual badge displaying a keyboard shortcut associated with a command item.
 */
const CommandShortcut = ({ className, ...props }: CommandShortcutProps) => {
  return <span className={cn("dl-command-shortcut", className)} {...props} />;
};
CommandShortcut.displayName = "CommandShortcut";

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
