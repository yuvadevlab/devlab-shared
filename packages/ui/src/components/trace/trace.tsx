import * as React from "react";
import { Loader2, CheckCircle2, AlertCircle, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  TraceStatus,
  TraceProps,
  TraceLineProps,
  TraceIconProps,
  TraceTitleProps,
  TraceDescriptionProps,
  TraceContentProps,
  TraceCollapsibleProps,
  TraceCollapsibleContentProps,
} from "./trace-types";

export type {
  TraceStatus,
  TraceProps,
  TraceLineProps,
  TraceIconProps,
  TraceTitleProps,
  TraceDescriptionProps,
  TraceContentProps,
  TraceCollapsibleProps,
  TraceCollapsibleContentProps,
};

const TraceCollapsibleContext = React.createContext<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({ open: false, setOpen: () => {} });

/**
 * Root trace container for grouped reasoning, tool activity, or task lines.
 */
export const Trace = React.forwardRef<HTMLDivElement, TraceProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "dl-trace",
        variant === "card" && "rounded-md border p-3 bg-card",
        className,
      )}
      {...props}
    />
  ),
);
Trace.displayName = "Trace";

/**
 * Renders one trace row with an optional execution status.
 */
export const TraceLine = React.forwardRef<HTMLDivElement, TraceLineProps>(
  ({ className, status = "default", ...props }, ref) => (
    <div
      ref={ref}
      className={cn("dl-trace-line", `dl-trace-line--${status}`, className)}
      {...props}
    />
  ),
);
TraceLine.displayName = "TraceLine";

/**
 * Renders a status icon for a trace line.
 */
export const TraceIcon = React.forwardRef<HTMLSpanElement, TraceIconProps>(
  ({ className, status = "default", children, ...props }, ref) => {
    let resolvedIcon = children;
    if (!resolvedIcon) {
      if (status === "running") resolvedIcon = <Loader2 className="size-4" />;
      else if (status === "success")
        resolvedIcon = <CheckCircle2 className="size-4" />;
      else if (status === "error")
        resolvedIcon = <AlertCircle className="size-4" />;
      else resolvedIcon = <Circle className="size-2 fill-current" />;
    }

    return (
      <span
        ref={ref}
        className={cn("dl-trace-icon", `dl-trace-icon--${status}`, className)}
        {...props}
      >
        {resolvedIcon}
      </span>
    );
  },
);
TraceIcon.displayName = "TraceIcon";

/**
 * Renders a trace line title.
 */
export const TraceTitle = React.forwardRef<HTMLDivElement, TraceTitleProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("dl-trace-title", className)} {...props} />
  ),
);
TraceTitle.displayName = "TraceTitle";

/**
 * Renders muted supporting text for a trace line.
 */
export const TraceDescription = React.forwardRef<
  HTMLDivElement,
  TraceDescriptionProps
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("dl-trace-description", className)} {...props} />
));
TraceDescription.displayName = "TraceDescription";

/**
 * Renders supporting content below a trace line.
 */
export const TraceContent = React.forwardRef<HTMLDivElement, TraceContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("dl-trace-content", className)} {...props} />
  ),
);
TraceContent.displayName = "TraceContent";

/**
 * Provides controlled or uncontrolled open state for a trace disclosure.
 *
 * @param props - Disclosure state, callback, children, and container props.
 * @returns The provider and wrapper for a collapsible trace group.
 */
export function TraceCollapsible({
  open: propOpen,
  defaultOpen = false,
  onOpenChange,
  className,
  children,
  ...props
}: TraceCollapsibleProps) {
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
    <TraceCollapsibleContext.Provider value={{ open: isOpen, setOpen }}>
      <div className={cn("dl-trace-collapsible", className)} {...props}>
        {children}
      </div>
    </TraceCollapsibleContext.Provider>
  );
}

/**
 * Button that toggles the containing trace group.
 *
 * @param props - Native button props and child content.
 * @returns The accessible trace disclosure button.
 */
export function TraceCollapsibleTrigger({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { open, setOpen } = React.useContext(TraceCollapsibleContext);

  return (
    <button
      type="button"
      onClick={() => setOpen((prev) => !prev)}
      aria-expanded={open}
      className={cn("dl-trace-collapsible-trigger", className)}
      {...props}
    >
      {children}
    </button>
  );
}

/**
 * Content region controlled by its containing trace group.
 *
 * @param props - Content props, including whether to keep closed content mounted.
 * @returns The trace content when open, or null when closed and unmounted.
 */
export function TraceCollapsibleContent({
  className,
  children,
  keepMounted = false,
  ...props
}: TraceCollapsibleContentProps) {
  const { open } = React.useContext(TraceCollapsibleContext);
  if (!open && !keepMounted) return null;

  return (
    <div
      hidden={!open}
      className={cn("dl-trace-collapsible-content", className)}
      {...props}
    >
      {children}
    </div>
  );
}
