import * as React from "react";

export type MessageRole = "user" | "assistant" | "system";

export interface MessageProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Speaker role */
  role?: MessageRole;
}

export interface MessageAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  role?: MessageRole;
  src?: string;
  fallback?: React.ReactNode;
}

/**
 * Props for a message body; its role is inherited from the parent Message.
 */
export type MessageContentProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "role"
>;

export interface MessageActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Text content for copy action */
  copyText?: string;
  /** Callback fired on copy */
  onCopy?: () => void;
  /** Callback fired on retry */
  onRetry?: () => void;
  /** Callback fired on thumbs up */
  onThumbsUp?: () => void;
  /** Callback fired on thumbs down */
  onThumbsDown?: () => void;
}
