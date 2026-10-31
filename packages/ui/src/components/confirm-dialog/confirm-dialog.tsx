import * as React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/alert-dialog";

export interface ConfirmDialogProps {
  /** Whether the confirmation dialog is visible */
  open: boolean;
  /** Callback fired when the open state changes */
  onOpenChange: (open: boolean) => void;
  /** Modal header title */
  title: string;
  /** Detailed description or warning message */
  description: string;
  /** Action executed when the confirm button is clicked */
  onConfirm: () => void;
  /** Custom text for confirm button (default: "Confirm") */
  confirmText?: string;
  /** Custom text for cancel button (default: "Cancel") */
  cancelText?: string;
  /** Whether the confirmed action is destructive (renders red confirm button) */
  destructive?: boolean;
}

/**
 * Pre-composed modal dialog for confirming critical, permanent, or destructive user actions.
 *
 * @example
 * ```tsx
 * <ConfirmDialog
 *   open={showDeleteModal}
 *   onOpenChange={setShowDeleteModal}
 *   title="Delete Agent Workspace?"
 *   description="This will permanently delete the agent workspace and all historical runs."
 *   confirmText="Delete Workspace"
 *   destructive
 *   onConfirm={handleDelete}
 * />
 * ```
 */
export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  destructive = false,
}: ConfirmDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={destructive ? "dl-btn--destructive" : ""}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
