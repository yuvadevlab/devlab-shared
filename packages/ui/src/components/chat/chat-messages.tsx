import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Scrollable message region inside a Chat.
 */
export const ChatMessages = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("dl-chat__messages", className)}
    data-slot="chat-messages"
    {...props}
  />
));
ChatMessages.displayName = "ChatMessages";
