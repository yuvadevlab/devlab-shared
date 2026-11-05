import * as React from "react";
import { Brain, ChevronDown } from "lucide-react";
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceContent,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/trace";

/**
 * Props for a collapsible model reasoning region.
 */
export interface ReasoningProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Heading shown in the disclosure summary. */
  title?: string;
  /** Optional elapsed generation duration. */
  duration?: string;
  /** Initial expanded state when uncontrolled. */
  defaultOpen?: boolean;
  /** Controlled expanded state. */
  open?: boolean;
  /** Callback fired when the reasoning content opens or closes. */
  onOpenChange?: (open: boolean) => void;
}

/**
 * Collapsible trace disclosure for model reasoning and progress.
 */
export const Reasoning = React.forwardRef<HTMLDivElement, ReasoningProps>(
  (
    {
      className,
      title = "Reasoning",
      duration,
      open,
      defaultOpen,
      onOpenChange,
      children,
      ...props
    },
    ref,
  ) => (
    <Trace ref={ref} className={className} data-slot="reasoning" {...props}>
      <TraceCollapsible
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
      >
        <TraceCollapsibleTrigger className="group w-full">
          <TraceLine>
            <TraceIcon>
              <Brain />
            </TraceIcon>
            <TraceTitle>{title}</TraceTitle>
            {duration && (
              <span className="ml-auto text-xs text-muted-foreground">
                {duration}
              </span>
            )}
            <ChevronDown className="size-4 text-muted-foreground transition-transform group-aria-expanded:rotate-180" />
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent keepMounted>
          <TraceContent>{children}</TraceContent>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </Trace>
  ),
);
Reasoning.displayName = "Reasoning";
