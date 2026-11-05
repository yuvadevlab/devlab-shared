import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Props for a role-aware conversational bubble.
 */
export interface BubbleProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "role"
> {
  /** Speaker role controls the bubble's alignment and appearance. */
  role?: "user" | "assistant" | "system";
}

/**
 * Speech-bubble surface for a single user, assistant, or system turn.
 */
export const Bubble = React.forwardRef<HTMLDivElement, BubbleProps>(
  ({ className, role = "assistant", ...props }, ref) => (
    <div
      ref={ref}
      className={cn("dl-bubble", `dl-bubble--${role}`, className)}
      data-slot="bubble"
      {...props}
    />
  ),
);
Bubble.displayName = "Bubble";
