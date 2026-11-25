import * as React from "react";
import { Brain, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Shimmer } from "@/components/shimmer";
import type {
  ReasoningContentProps,
  ReasoningProps,
  ReasoningTriggerProps,
} from "./reasoning-types";

export type { ReasoningProps, ReasoningTriggerProps, ReasoningContentProps };

interface ReasoningContextValue {
  open: boolean;
  toggle: () => void;
  isStreaming: boolean;
  durationMs?: number;
}

const ReasoningContext = React.createContext<ReasoningContextValue>({
  open: false,
  toggle: () => {},
  isStreaming: false,
});

function formatThinkingTime(ms?: number): string {
  if (ms === undefined || ms <= 0) return "Thought process";
  if (ms < 1000) return `Thought for ${Math.round(ms)}ms`;
  return `Thought for ${(ms / 1000).toFixed(1)}s`;
}

/**
 * Collapsible trigger button showing live shimmering status during thinking
 * or elapsed duration once reasoning completes.
 */
export const ReasoningTrigger = React.forwardRef<
  HTMLButtonElement,
  ReasoningTriggerProps
>(({ className, label, children, onClick, ...props }, ref) => {
  const { open, toggle, isStreaming, durationMs } =
    React.useContext(ReasoningContext);

  const defaultLabel = isStreaming
    ? "Reasoning..."
    : formatThinkingTime(durationMs);

  return (
    <button
      ref={ref}
      type="button"
      aria-expanded={open}
      onClick={(e) => {
        onClick?.(e);
        toggle();
      }}
      className={cn("dl-reasoning__trigger", className)}
      {...props}
    >
      <span className="dl-reasoning__summary">
        <Brain className="dl-reasoning__icon" aria-hidden="true" />
        {children ??
          (isStreaming ? (
            <Shimmer>{label ?? defaultLabel}</Shimmer>
          ) : (
            <span>{label ?? defaultLabel}</span>
          ))}
      </span>
      <ChevronDown className="dl-reasoning__chevron" aria-hidden="true" />
    </button>
  );
});
ReasoningTrigger.displayName = "ReasoningTrigger";

/**
 * Scrollable collapsible body displaying streamed or completed model reasoning.
 */
export const ReasoningContent = React.forwardRef<
  HTMLDivElement,
  ReasoningContentProps
>(({ className, children, ...props }, ref) => {
  const { open } = React.useContext(ReasoningContext);
  if (!open) return null;

  return (
    <div
      ref={ref}
      className={cn("dl-reasoning__content", className)}
      {...props}
    >
      <div className="dl-reasoning__body">{children}</div>
    </div>
  );
});
ReasoningContent.displayName = "ReasoningContent";

/**
 * Collapsible AI model reasoning container with live elapsed timer,
 * automatic open-while-streaming and auto-collapse-on-finish behavior.
 *
 * @example
 * ```tsx
 * <Reasoning isStreaming={false} durationMs={2450}>
 *   <ReasoningTrigger />
 *   <ReasoningContent>
 *     Evaluating monthly cashflow surplus against upcoming goal deadline...
 *   </ReasoningContent>
 * </Reasoning>
 * ```
 */
export function Reasoning({
  isStreaming = false,
  durationMs,
  open: propOpen,
  defaultOpen = false,
  autoCollapse = true,
  onOpenChange,
  className,
  children,
  ...props
}: ReasoningProps) {
  const [internalOpen, setInternalOpen] = React.useState(
    defaultOpen || isStreaming,
  );
  const [elapsedMs, setElapsedMs] = React.useState<number | undefined>(
    durationMs,
  );
  const startTimeRef = React.useRef<number | null>(null);
  const wasStreamingRef = React.useRef(isStreaming);
  const userToggledRef = React.useRef(false);

  const isOpen = propOpen !== undefined ? propOpen : internalOpen;

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (propOpen === undefined) {
        setInternalOpen(next);
      }
      onOpenChange?.(next);
    },
    [propOpen, onOpenChange],
  );

  const toggle = React.useCallback(() => {
    userToggledRef.current = true;
    setOpen(!isOpen);
  }, [isOpen, setOpen]);

  React.useEffect(() => {
    if (durationMs !== undefined) {
      setElapsedMs(durationMs);
    }
  }, [durationMs]);

  React.useEffect(() => {
    if (isStreaming) {
      if (startTimeRef.current === null) {
        startTimeRef.current = Date.now();
      }
      if (!userToggledRef.current && autoCollapse) {
        setOpen(true);
      }
      wasStreamingRef.current = true;
      return;
    }

    if (wasStreamingRef.current) {
      if (durationMs === undefined && startTimeRef.current !== null) {
        setElapsedMs(Date.now() - startTimeRef.current);
      }
      startTimeRef.current = null;
      wasStreamingRef.current = false;
      if (autoCollapse && !userToggledRef.current) {
        const timer = setTimeout(() => setOpen(false), 650);
        return () => clearTimeout(timer);
      }
    }
  }, [isStreaming, durationMs, autoCollapse, setOpen]);

  return (
    <ReasoningContext.Provider
      value={{
        open: isOpen,
        toggle,
        isStreaming,
        durationMs: durationMs ?? elapsedMs,
      }}
    >
      <div
        data-state={isOpen ? "open" : "closed"}
        className={cn("dl-reasoning", className)}
        {...props}
      >
        {children}
      </div>
    </ReasoningContext.Provider>
  );
}
