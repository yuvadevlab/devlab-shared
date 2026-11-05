import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Scrollable live region for a sequence of conversational messages.
 */
export const MessageScroller = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, onScroll, ...props }, ref) => {
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const wasAtBottom = React.useRef(true);

  React.useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (viewport && wasAtBottom.current) {
      viewport.scrollTop = viewport.scrollHeight;
    }
  }, [children]);

  return (
    <div
      ref={(node) => {
        viewportRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      aria-live="polite"
      className={cn("dl-message-scroller", className)}
      data-slot="message-scroller"
      onScroll={(event) => {
        const element = event.currentTarget;
        wasAtBottom.current =
          element.scrollHeight - element.scrollTop - element.clientHeight < 32;
        onScroll?.(event);
      }}
      role="log"
      {...props}
    >
      {children}
    </div>
  );
});
MessageScroller.displayName = "MessageScroller";
