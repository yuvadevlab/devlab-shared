import * as React from "react";
import {
  ChevronDown,
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/button";
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/trace";
import type {
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
 * Toggles the chain-of-thought trace and summarizes current reasoning.
 */
export const ChainOfThoughtHeader = React.forwardRef<
  HTMLButtonElement,
  ChainOfThoughtHeaderProps
>(({ className, isThinking, durationSeconds, children, ...props }, ref) => {
  const { open, setOpen } = React.useContext(ChainOfThoughtContext);

  return (
    <Button
      ref={ref}
      type="button"
      onClick={() => setOpen((prev) => !prev)}
      aria-expanded={open}
      variant="ghost"
      className={cn("group w-full justify-start", className)}
      {...props}
    >
      <TraceLine className="w-full">
        <TraceIcon>
          {isThinking ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Sparkles className="size-4" />
          )}
        </TraceIcon>
        <TraceTitle>
          {children ??
            (isThinking
              ? durationSeconds !== undefined
                ? `Thinking for ${durationSeconds}s...`
                : "Thinking..."
              : durationSeconds !== undefined
                ? `Thought for ${durationSeconds}s`
                : "Thought Process")}
        </TraceTitle>
        <ChevronDown className="ml-auto size-4 text-muted-foreground transition-transform group-aria-expanded:rotate-180" />
      </TraceLine>
    </Button>
  );
});
ChainOfThoughtHeader.displayName = "ChainOfThoughtHeader";

/**
 * Renders one status-bearing step in a chain-of-thought trace.
 */
export const ChainOfThoughtStep = React.forwardRef<
  HTMLDivElement,
  ChainOfThoughtStepProps
>(({ className, status = "default", icon, children, ...props }, ref) => {
  let resolvedIcon = icon;
  if (!resolvedIcon) {
    if (status === "running")
      resolvedIcon = <Loader2 className="size-4 animate-spin text-primary" />;
    else if (status === "success")
      resolvedIcon = <CheckCircle2 className="size-4 text-success" />;
    else if (status === "error")
      resolvedIcon = <AlertCircle className="size-4 text-destructive" />;
  }

  return (
    <TraceLine
      ref={ref}
      className={className}
      status={
        status === "success"
          ? "success"
          : status === "error"
            ? "error"
            : status === "running"
              ? "running"
              : "default"
      }
      {...props}
    >
      {resolvedIcon && <TraceIcon>{resolvedIcon}</TraceIcon>}
      <TraceTitle className={cn(status === "running" && "dl-shimmer")}>
        {children}
      </TraceTitle>
    </TraceLine>
  );
});
ChainOfThoughtStep.displayName = "ChainOfThoughtStep";

/**
 * Collapsible trace content containing chain-of-thought steps.
 */
export const ChainOfThoughtContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <TraceCollapsibleContent keepMounted className={className} {...props}>
      <Trace ref={ref}>{children}</Trace>
    </TraceCollapsibleContent>
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
    <TraceCollapsible
      open={isOpen}
      onOpenChange={setOpen}
      className={className}
      data-state={isOpen ? "open" : "closed"}
      {...props}
    >
      <ChainOfThoughtContext.Provider value={{ open: isOpen, setOpen }}>
        <Trace>
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
        </Trace>
      </ChainOfThoughtContext.Provider>
    </TraceCollapsible>
  );
}
