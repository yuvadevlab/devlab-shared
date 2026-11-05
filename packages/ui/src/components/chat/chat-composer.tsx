import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Form region for sending a chat message.
 */
export const ChatComposer = React.forwardRef<
  HTMLFormElement,
  React.FormHTMLAttributes<HTMLFormElement>
>(({ className, ...props }, ref) => (
  <form
    ref={ref}
    className={cn("dl-chat__composer", className)}
    data-slot="chat-composer"
    {...props}
  />
));
ChatComposer.displayName = "ChatComposer";
