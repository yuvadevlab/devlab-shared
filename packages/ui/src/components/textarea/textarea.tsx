import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

/**
 * Multi-line text field styled with design system tokens and scoped CSS.
 * Provides accessible focus states, vertical resizing, and clean error integration.
 *
 * @example
 * ```tsx
 * // Basic textarea
 * <Textarea placeholder="Type your message here..." rows={4} />
 *
 * // Controlled textarea with character counter
 * <Textarea
 *   value={notes}
 *   onChange={(e) => setNotes(e.target.value)}
 *   placeholder="Additional instructions..."
 *   disabled={isLoading}
 * />
 * ```
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea className={cn("dl-textarea", className)} ref={ref} {...props} />
  ),
);
Textarea.displayName = "Textarea";

export { Textarea };
