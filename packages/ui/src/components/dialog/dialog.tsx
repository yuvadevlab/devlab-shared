"use client";
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Root container for accessible modal dialog windows. Built upon Radix UI Dialog.
 *
 * @example
 * ```tsx
 * <Dialog open={isOpen} onOpenChange={setIsOpen}>
 *   <DialogTrigger asChild>
 *     <Button variant="outline">Open Settings</Button>
 *   </DialogTrigger>
 *   <DialogContent size="lg">
 *     <DialogHeader>
 *       <DialogTitle>Account Settings</DialogTitle>
 *       <DialogDescription>Manage your workspace credentials.</DialogDescription>
 *     </DialogHeader>
 *     <DialogBody>Dialog body content here...</DialogBody>
 *     <DialogFooter>
 *       <Button onClick={() => setIsOpen(false)}>Save changes</Button>
 *     </DialogFooter>
 *   </DialogContent>
 * </Dialog>
 * ```
 */
const Dialog = DialogPrimitive.Root;

/** Button or trigger element that opens the dialog modal. */
const DialogTrigger = DialogPrimitive.Trigger;

/** Portals dialog content to the end of document.body for clean stacking context. */
const DialogPortal = DialogPrimitive.Portal;

/** Button that closes the open dialog. */
const DialogClose = DialogPrimitive.Close;

export type DialogOverlayProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Overlay
>;

/** Semi-transparent backdrop overlay rendered beneath the dialog modal. */
const DialogOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  DialogOverlayProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn("dl-dialog-overlay", className)}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

/**
 * Predefined maximum width scale for the modal window.
 */
export type DialogSize = "sm" | "md" | "lg" | "xl" | "2xl" | "full";

export type DialogContentProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
> & {
  /**
   * Predefined maximum width scale for the modal window.
   * - `sm`: 24rem (384px) - confirmations, small prompts
   * - `md`: 32rem (512px) - standard forms, default
   * - `lg`: 42rem (672px) - medium panels
   * - `xl`: 56rem (896px) - data previews, wide forms
   * - `2xl`: 72rem (1152px) - deep traces, code editors, debuggers
   * - `full`: nearly full viewport
   * @default "md"
   */
  size?: DialogSize;
};

/**
 * Modal content container. Renders overlay, content card, and accessible close button.
 */
const DialogContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, children, size = "md", ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "dl-dialog-content",
        size && `dl-dialog--${size}`,
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="dl-dialog-close">
        <X />
        <span className="dl-dialog-sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

/** Top container of the dialog for title and description. */
const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("dl-dialog__header", className)} {...props} />
);
DialogHeader.displayName = "DialogHeader";

/** Scrollable or flexible body container for dialog modal content. */
const DialogBody = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("dl-dialog__body", className)} {...props} />
);
DialogBody.displayName = "DialogBody";

/** Bottom container of the dialog for action buttons. */
const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("dl-dialog__footer", className)} {...props} />
);
DialogFooter.displayName = "DialogFooter";

/** Accessible title heading for the dialog modal. */
const DialogTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("dl-dialog__title", className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

/** Accessible explanatory text for the dialog content. */
const DialogDescription = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("dl-dialog__desc", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
