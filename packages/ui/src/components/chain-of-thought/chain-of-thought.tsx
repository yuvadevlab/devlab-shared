import * as React from "react";
import {
  ChevronDown,
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Shimmer } from "@/components/shimmer";
import {
  ChainOfThoughtProps,
  ChainOfThoughtHeaderProps,
  ChainOfThoughtStepProps,
} from "./chain-of-thought-types";

export type {
  ChainOfThoughtProps,
  ChainOfThoughtHeaderProps,
  ChainOfThoughtStepProps,
};

const ChainOfThoughtContext = React.createContext<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({ open: false, setOpen: () => {} });

/**
 * Interactive collapsible summary button for {@link ChainOfThought}.
 */
export const ChainOfThoughtHeader = React.forwardRef<
  HTMLButtonElement,
  ChainOfThoughtHeaderProps
>(({ className, isThinking, durationSeconds, children, ...props }, ref) => {
  const { open, setOpen } = React.useContext(ChainOfThoughtContext);
  const label =
    children ??
    (isThinking
      ? durationSeconds !== undefined
        ? `Thinking for ${durationSeconds}s...`
        : "Thinking..."
      : durationSeconds !== undefined
        ? `Thought for ${durationSeconds}s`
        : "Thought Process");

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => setOpen((prev) => !prev)}
      aria-expanded={open}
      className={cn("dl-cot__header", className)}
      {...props}
    >
      <div className="dl-cot__summary">
        {isThinking ? (
          <Loader2
            className="dl-cot__header-icon dl-cot__header-icon--spin"
            aria-hidden="true"
          />
        ) : (
          <Sparkles className="dl-cot__header-icon" aria-hidden="true" />
        )}
        {isThinking ? <Shimmer>{label}</Shimmer> : <span>{label}</span>}
      </div>
      <ChevronDown className="dl-cot__chevron" aria-hidden="true" />
    </button>
  );
});
ChainOfThoughtHeader.displayName = "ChainOfThoughtHeader";

/**
 * Individual milestone step inside {@link ChainOfThoughtContent}.
 */
export const ChainOfThoughtStep = React.forwardRef<
  HTMLDivElement,
  ChainOfThoughtStepProps
>(({ className, status = "default", icon, children, ...props }, ref) => {
  let resolvedIcon = icon;
  if (!resolvedIcon) {
    if (status === "running") {
      resolvedIcon = (
        <Loader2
          className="dl-cot__step-icon dl-cot__step-icon--running"
          aria-hidden="true"
        />
      );
    } else if (status === "success") {
      resolvedIcon = (
        <CheckCircle2
          className="dl-cot__step-icon dl-cot__step-icon--success"
          aria-hidden="true"
        />
      );
    } else if (status === "error") {
      resolvedIcon = (
        <AlertCircle
          className="dl-cot__step-icon dl-cot__step-icon--error"
          aria-hidden="true"
        />
      );
    } else {
      resolvedIcon = <span className="dl-cot__step-dot" aria-hidden="true" />;
    }
  }

  return (
    <div
      ref={ref}
      className={cn("dl-cot__step", `dl-cot__step--${status}`, className)}
      {...props}
    >
      <span className="dl-cot__step-marker">{resolvedIcon}</span>
      <span className="dl-cot__step-label">
        {status === "running" ? <Shimmer>{children}</Shimmer> : children}
      </span>
    </div>
  );
});
ChainOfThoughtStep.displayName = "ChainOfThoughtStep";

/**
 * Expandable timeline container for {@link ChainOfThoughtStep} children.
 */
export const ChainOfThoughtContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { open } = React.useContext(ChainOfThoughtContext);
  if (!open) return null;

  return (
    <div ref={ref} className={cn("dl-cot__content", className)} {...props}>
      {children}
    </div>
  );
});
ChainOfThoughtContent.displayName = "ChainOfThoughtContent";

/**
 * Visualizes an AI model's internal step-by-step reasoning and thought process.
 *
 * @example
 * ```tsx
 * <ChainOfThought durationSeconds={3.8}>
 *   <ChainOfThoughtHeader />
 *   <ChainOfThoughtContent>
 *     <ChainOfThoughtStep status="success">Inspected git status</ChainOfThoughtStep>
 *     <ChainOfThoughtStep status="success">Compiled TypeScript bundle</ChainOfThoughtStep>
 *   </ChainOfThoughtContent>
 * </ChainOfThought>
 * ```
 */
export function ChainOfThought({
  isThinking = false,
  durationSeconds,
  open: propOpen,
  defaultOpen = false,
  onOpenChange,
  className,
  title,
  children,
  ...props
}: ChainOfThoughtProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isOpen = propOpen !== undefined ? propOpen : internalOpen;

  const setOpen = React.useCallback(
    (action: React.SetStateAction<boolean>) => {
      const next = typeof action === "function" ? action(isOpen) : action;
      if (propOpen === undefined) {
        setInternalOpen(next);
      }
      onOpenChange?.(next);
    },
    [isOpen, propOpen, onOpenChange],
  );

  return (
    <ChainOfThoughtContext.Provider value={{ open: isOpen, setOpen }}>
      <div
        data-state={isOpen ? "open" : "closed"}
        className={cn("dl-cot", className)}
        {...props}
      >
        {children ?? (
          <>
            <ChainOfThoughtHeader
              isThinking={isThinking}
              durationSeconds={durationSeconds}
            >
              {title}
            </ChainOfThoughtHeader>
            <ChainOfThoughtContent />
          </>
        )}
      </div>
    </ChainOfThoughtContext.Provider>
  );
}
