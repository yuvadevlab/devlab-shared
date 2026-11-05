import * as React from "react";
import { cn } from "@/lib/utils";
import { MessageScroller } from "@/components/message-scroller";

/**
 * Props for a chat conversation surface.
 */
export interface ChatProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Accessible name for the conversation region. */
  title?: string;
}

/**
 * Scrollable conversation surface backed by the shared MessageScroller.
 */
export const Chat = React.forwardRef<HTMLDivElement, ChatProps>(
  ({ className, title = "Conversation", ...props }, ref) => (
    <MessageScroller
      ref={ref}
      aria-label={title}
      className={cn("dl-chat", className)}
      data-slot="chat"
      {...props}
    />
  ),
);
Chat.displayName = "Chat";
