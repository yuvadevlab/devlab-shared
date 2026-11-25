import * as React from "react";

export type ConfirmationApprovalState =
  "approval-requested" | "approval-accepted" | "approval-rejected";

export interface ConfirmationProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual appearance style */
  variant?: "outline" | "card" | "destructive";
  /** Size variant */
  size?: "sm" | "md";
  /** Optional lifecycle state matching AI SDK tool-approval parts */
  state?: ConfirmationApprovalState;
}

export interface ConfirmationMediaProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Variant */
  variant?: "icon" | "avatar";
}

export type ConfirmationContentProps = React.HTMLAttributes<HTMLDivElement>;

export type ConfirmationTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

export type ConfirmationDescriptionProps =
  React.HTMLAttributes<HTMLParagraphElement>;

export type ConfirmationActionsProps = React.HTMLAttributes<HTMLDivElement>;
