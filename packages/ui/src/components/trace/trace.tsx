import * as React from "react";
import { Loader2, CheckCircle2, AlertCircle, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  TraceStatus,
  TraceProps,
  TraceLineProps,
  TraceIconProps,
  TraceTitleProps,
  TraceContentProps,
  TraceCollapsibleProps,
} from "./trace-types";

export type {
  TraceStatus,
  TraceProps,
  TraceLineProps,
  TraceIconProps,
  TraceTitleProps,
  TraceContentProps,
  TraceCollapsibleProps,
};

const TraceCollapsibleContext = React.createContext<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({ open: false, setOpen: () => {} });

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

export const TraceIcon = React.forwardRef<HTMLSpanElement, TraceIconProps>(
  ({ className, status = "default", children, ...props }, ref) => {
    let resolvedIcon = children;
    if (!resolvedIcon) {
      if (status === "running") resolvedIcon = <Loader2 className="size-3.5" />;
      else if (status === "success")
        resolvedIcon = <CheckCircle2 className="size-3.5" />;
      else if (status === "error")
        resolvedIcon = <AlertCircle className="size-3.5" />;
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

export const TraceTitle = React.forwardRef<HTMLDivElement, TraceTitleProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("dl-trace-title", className)} {...props} />
  ),
);
TraceTitle.displayName = "TraceTitle";

export const TraceContent = React.forwardRef<HTMLDivElement, TraceContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("dl-trace-content", className)} {...props} />
  ),
);
TraceContent.displayName = "TraceContent";

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

export function TraceCollapsibleContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { open } = React.useContext(TraceCollapsibleContext);
  if (!open) return null;

  return (
    <div className={cn("dl-trace-collapsible-content", className)} {...props}>
      {children}
    </div>
  );
}
