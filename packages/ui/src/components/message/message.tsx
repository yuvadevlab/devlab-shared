import * as React from "react";
import {
  Sparkles,
  Copy,
  Check,
  RotateCw,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  MessageProps,
  MessageAvatarProps,
  MessageContentProps,
  MessageActionsProps,
  MessageRole,
} from "./message-types";

export type {
  MessageProps,
  MessageAvatarProps,
  MessageContentProps,
  MessageActionsProps,
  MessageRole,
};

export const MessageAvatar = React.forwardRef<
  HTMLDivElement,
  MessageAvatarProps
>(({ className, role = "assistant", src, fallback, ...props }, ref) => {
  let resolvedFallback = fallback;
  if (!resolvedFallback) {
    resolvedFallback =
      role === "assistant" ? <Sparkles className="size-3.5" /> : "U";
  }

  return (
    <div ref={ref} className={cn("dl-message__avatar", className)} {...props}>
      {src ? (
        <img
          src={src}
          alt="Avatar"
          className="size-full rounded-full object-cover"
        />
      ) : (
        resolvedFallback
      )}
    </div>
  );
});
MessageAvatar.displayName = "MessageAvatar";

export const MessageContent = React.forwardRef<
  HTMLDivElement,
  MessageContentProps
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("dl-message__content", className)} {...props} />
));
MessageContent.displayName = "MessageContent";

export const MessageActions = React.forwardRef<
  HTMLDivElement,
  MessageActionsProps
>(
  (
    {
      className,
      copyText,
      onCopy,
      onRetry,
      onThumbsUp,
      onThumbsDown,
      children,
      ...props
    },
    ref,
  ) => {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
      onCopy?.();
      if (!copyText) return;
      navigator.clipboard?.writeText(copyText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    };

    return (
      <div
        ref={ref}
        className={cn("dl-message__actions", className)}
        {...props}
      >
        {copyText && (
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? "Copied" : "Copy message"}
            className="dl-message__action-btn"
          >
            {copied ? (
              <Check className="size-3 text-success" />
            ) : (
              <Copy className="size-3" />
            )}
          </button>
        )}
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            aria-label="Retry response"
            className="dl-message__action-btn"
          >
            <RotateCw className="size-3" />
          </button>
        )}
        {onThumbsUp && (
          <button
            type="button"
            onClick={onThumbsUp}
            aria-label="Good response"
            className="dl-message__action-btn"
          >
            <ThumbsUp className="size-3" />
          </button>
        )}
        {onThumbsDown && (
          <button
            type="button"
            onClick={onThumbsDown}
            aria-label="Bad response"
            className="dl-message__action-btn"
          >
            <ThumbsDown className="size-3" />
          </button>
        )}
        {children}
      </div>
    );
  },
);
MessageActions.displayName = "MessageActions";

/**
 * Conversational turn wrapper representing user or AI agent responses with
 * avatars, rich content blocks, and action toolbars.
 *
 * @example
 * ```tsx
 * <Message role="assistant">
 *   <MessageAvatar />
 *   <div className="dl-message__body">
 *     <MessageContent>Here is the updated schema.</MessageContent>
 *     <MessageActions copyText="Here is the updated schema." />
 *   </div>
 * </Message>
 * ```
 */
export const Message = React.forwardRef<HTMLDivElement, MessageProps>(
  ({ className, role = "assistant", children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("dl-message", `dl-message--${role}`, className)}
      {...props}
    >
      {children}
    </div>
  ),
);
Message.displayName = "Message";
