import * as React from "react";
import {
  Wrench,
  ChevronDown,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CodeBlock } from "@/components/code-block";
import {
  ToolCallProps,
  ToolCallHeaderProps,
  ToolCallArgsProps,
  ToolCallResultProps,
  ToolCallStatusType,
} from "./tool-call-types";

export type {
  ToolCallProps,
  ToolCallHeaderProps,
  ToolCallArgsProps,
  ToolCallResultProps,
  ToolCallStatusType,
};

const ToolCallContext = React.createContext<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({ open: false, setOpen: () => {} });

export const ToolCallHeader = React.forwardRef<
  HTMLButtonElement,
  ToolCallHeaderProps
>(
  (
    {
      className,
      name,
      status = "success",
      icon,
      children: _children,
      ...props
    },
    ref,
  ) => {
    const { open, setOpen } = React.useContext(ToolCallContext);

    return (
      <button
        ref={ref}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className={cn("dl-tool-call__header", className)}
        {...props}
      >
        <div className="dl-tool-call__title-wrap">
          <span className="dl-tool-call__icon">
            {icon ?? <Wrench className="size-3.5" />}
          </span>
          <span className="dl-tool-call__name">{name}</span>
        </div>

        <div className="dl-tool-call__actions">
          <span
            className={cn(
              "dl-tool-call__status-badge",
              `dl-tool-call__status-badge--${status}`,
            )}
          >
            {status === "running" && (
              <Loader2 className="size-3 animate-spin" />
            )}
            {status === "success" && <CheckCircle2 className="size-3" />}
            {status === "error" && <AlertCircle className="size-3" />}
            <span>{status}</span>
          </span>
          <ChevronDown className="dl-tool-call__chevron" />
        </div>
      </button>
    );
  },
);
ToolCallHeader.displayName = "ToolCallHeader";

export const ToolCallArgs = React.forwardRef<HTMLDivElement, ToolCallArgsProps>(
  ({ className, args, ...props }, ref) => {
    const isObject = typeof args === "object" && args !== null;

    return (
      <div ref={ref} className={cn("dl-tool-call__args", className)} {...props}>
        {isObject ? (
          Object.entries(args).map(([key, val]) => (
            <span key={key} className="dl-tool-call__arg-pill">
              <strong>{key}:</strong> {String(val)}
            </span>
          ))
        ) : (
          <span className="dl-tool-call__arg-pill">{args}</span>
        )}
      </div>
    );
  },
);
ToolCallArgs.displayName = "ToolCallArgs";

export const ToolCallResult = React.forwardRef<
  HTMLDivElement,
  ToolCallResultProps
>(({ className, result, language = "json", ...props }, ref) => (
  <div ref={ref} className={cn("dl-tool-call__result", className)} {...props}>
    <CodeBlock code={result} language={language} copyable lineNumbers={false} />
  </div>
));
ToolCallResult.displayName = "ToolCallResult";

/**
 * Visualizer card for agent tool executions, displaying tool name, parameter pills,
 * live execution status badge, and expandable return payloads.
 *
 * @example
 * ```tsx
 * <ToolCall
 *   name="query_database"
 *   status="success"
 *   args={{ table: "users", limit: 5 }}
 *   result='[{"id": 1, "name": "Alice"}]'
 * />
 * ```
 */
export function ToolCall({
  name,
  status = "success",
  icon,
  args,
  result,
  open: propOpen,
  defaultOpen = false,
  onOpenChange,
  className,
  children,
  ...props
}: ToolCallProps) {
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
    <ToolCallContext.Provider value={{ open: isOpen, setOpen }}>
      <div
        data-state={isOpen ? "open" : "closed"}
        className={cn("dl-tool-call", className)}
        {...props}
      >
        <ToolCallHeader name={name} status={status} icon={icon} />
        {isOpen && (
          <div className="dl-tool-call__body">
            {args && <ToolCallArgs args={args} />}
            {result && <ToolCallResult result={result} />}
            {children}
          </div>
        )}
      </div>
    </ToolCallContext.Provider>
  );
}
