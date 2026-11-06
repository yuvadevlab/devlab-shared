import * as React from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { SuggestionProps, SuggestionListProps } from "./suggestion-types";

export type { SuggestionProps, SuggestionListProps };

/**
 * Clickable starter prompt or follow-up question pill.
 *
 * @example
 * ```tsx
 * <Suggestion label="Explain the error in audit-table.tsx" />
 * ```
 */
export const Suggestion = React.forwardRef<HTMLButtonElement, SuggestionProps>(
  ({ className, icon, label, description, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn("dl-suggestion", className)}
        {...props}
      >
        <span className="dl-suggestion__icon">
          {icon ?? <Sparkles className="size-3" />}
        </span>
        <span>{label ?? children}</span>
        {description && (
          <span className="dl-suggestion__description">· {description}</span>
        )}
      </button>
    );
  },
);
Suggestion.displayName = "Suggestion";

/**
 * Row or scrollable list of suggestion pills.
 */
export const SuggestionList = React.forwardRef<
  HTMLDivElement,
  SuggestionListProps
>(({ className, layout = "wrap", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "dl-suggestion-list",
      `dl-suggestion-list--${layout}`,
      className,
    )}
    role="list"
    {...props}
  />
));
SuggestionList.displayName = "SuggestionList";
