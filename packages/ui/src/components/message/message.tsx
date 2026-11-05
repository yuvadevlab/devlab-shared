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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import { Bubble } from "@/components/bubble";
import { Button } from "@/components/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/tooltip";
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

const MessageRoleContext = React.createContext<MessageRole>("assistant");

function ActionTooltip({
  label,
  children,
}: {
  label: string;
  children: React.ReactElement;
}): React.ReactElement {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

/**
 * Renders an optional image or role-appropriate message avatar.
 */
export const MessageAvatar = React.forwardRef<
  HTMLDivElement,
  MessageAvatarProps
>(({ className, role, src, fallback, ...props }, ref) => {
  const contextRole = React.useContext(MessageRoleContext);
  const resolvedRole = role ?? contextRole;
  let resolvedFallback = fallback;
  if (!resolvedFallback) {
    resolvedFallback =
      resolvedRole === "assistant" ? <Sparkles className="size-4" /> : "U";
  }

  return (
    <Avatar
      ref={ref}
      className={cn("dl-message__avatar", className)}
      {...props}
    >
      {src && <AvatarImage src={src} alt="Avatar" />}
      <AvatarFallback>{resolvedFallback}</AvatarFallback>
    </Avatar>
  );
});
MessageAvatar.displayName = "MessageAvatar";

/**
 * Message body rendered inside the shared role-aware Bubble primitive.
 */
export const MessageContent = React.forwardRef<
  HTMLDivElement,
  MessageContentProps
>(({ className, ...props }, ref) => {
  const role = React.useContext(MessageRoleContext);
  return (
    <Bubble
      ref={ref}
      role={role}
      className={cn("dl-message__content", className)}
      {...props}
    />
  );
});
MessageContent.displayName = "MessageContent";

/**
 * Accessible actions for copying, retrying, or rating a message.
 */
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
      <TooltipProvider>
        <div
          ref={ref}
          className={cn("dl-message__actions", className)}
          {...props}
        >
          {copyText && (
            <ActionTooltip label={copied ? "Copied" : "Copy message"}>
              <Button
                type="button"
                onClick={handleCopy}
                variant="ghost"
                size="icon"
                aria-label={copied ? "Copied" : "Copy message"}
                className="dl-message__action-btn"
              >
                {copied ? (
                  <Check className="size-4" />
                ) : (
                  <Copy className="size-4" />
                )}
              </Button>
            </ActionTooltip>
          )}
          {onRetry && (
            <ActionTooltip label="Retry response">
              <Button
                type="button"
                onClick={onRetry}
                variant="ghost"
                size="icon"
                aria-label="Retry response"
                className="dl-message__action-btn"
              >
                <RotateCw className="size-4" />
              </Button>
            </ActionTooltip>
          )}
          {onThumbsUp && (
            <ActionTooltip label="Good response">
              <Button
                type="button"
                onClick={onThumbsUp}
                variant="ghost"
                size="icon"
                aria-label="Good response"
                className="dl-message__action-btn"
              >
                <ThumbsUp className="size-4" />
              </Button>
            </ActionTooltip>
          )}
          {onThumbsDown && (
            <ActionTooltip label="Bad response">
              <Button
                type="button"
                onClick={onThumbsDown}
                variant="ghost"
                size="icon"
                aria-label="Bad response"
                className="dl-message__action-btn"
              >
                <ThumbsDown className="size-4" />
              </Button>
            </ActionTooltip>
          )}
          {children}
        </div>
      </TooltipProvider>
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
    <MessageRoleContext.Provider value={role}>
      <div
        ref={ref}
        className={cn("dl-message", `dl-message--${role}`, className)}
        {...props}
      >
        {children}
      </div>
    </MessageRoleContext.Provider>
  ),
);
Message.displayName = "Message";
