"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Root Sheet component for displaying slide-over drawers (left, right, top, bottom).
 * Built upon Radix UI Dialog with smooth CSS transitions.
 *
 * @example
 * ```tsx
 * <Sheet open={isOpen} onOpenChange={setIsOpen}>
 *   <SheetTrigger asChild>
 *     <Button variant="outline">Open Menu</Button>
 *   </SheetTrigger>
 *   <SheetContent side="right">
 *     <SheetHeader>
 *       <SheetTitle>Navigation Menu</SheetTitle>
 *       <SheetDescription>Explore workspace features.</SheetDescription>
 *     </SheetHeader>
 *     <Box py="4">Sheet navigation links...</Box>
 *   </SheetContent>
 * </Sheet>
 * ```
 */
const Sheet = SheetPrimitive.Root;

/** Interactive trigger element that opens the slide-over sheet drawer. */
const SheetTrigger = SheetPrimitive.Trigger;

/** Interactive button that closes the open sheet. */
const SheetClose = SheetPrimitive.Close;

/** Portals sheet content to the end of document.body for clean stacking context. */
const SheetPortal = SheetPrimitive.Portal;

export type SheetOverlayProps = React.ComponentPropsWithoutRef<
  typeof SheetPrimitive.Overlay
>;

/** Semi-transparent backdrop overlay rendered beneath the sliding sheet. */
const SheetOverlay = React.forwardRef<
  React.ComponentRef<typeof SheetPrimitive.Overlay>,
  SheetOverlayProps
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn("dl-dialog-overlay", className)}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

/**
 * Sheet layout variants for top, bottom, left, and right side drawers.
 */
const sheetVariants = cva("dl-sheet-content", {
  variants: {
    side: {
      top: "dl-sheet-content--top",
      bottom: "dl-sheet-content--bottom",
      left: "dl-sheet-content--left",
      right: "dl-sheet-content--right",
    },
  },
  defaultVariants: {
    side: "right",
  },
});

export interface SheetContentProps
  extends
    React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

/** Content panel of the side sheet drawer. */
const SheetContent = React.forwardRef<
  React.ComponentRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      data-side={side}
      {...props}
    >
      <SheetPrimitive.Close className="dl-sheet-close">
        <X />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
      {children}
    </SheetPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = SheetPrimitive.Content.displayName;

/** Header section containing sheet title and description. */
const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("dl-sheet__header", className)} {...props} />
);
SheetHeader.displayName = "SheetHeader";

/** Footer section containing sheet action buttons. */
const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("dl-sheet__footer", className)} {...props} />
);
SheetFooter.displayName = "SheetFooter";

/** Accessible heading title for the sheet panel. */
const SheetTitle = React.forwardRef<
  React.ComponentRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("dl-sheet__title", className)}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

/** Accessible explanatory text for the sheet panel. */
const SheetDescription = React.forwardRef<
  React.ComponentRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("dl-sheet__desc", className)}
    {...props}
  />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  sheetVariants,
};
