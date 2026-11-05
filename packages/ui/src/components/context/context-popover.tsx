import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/hover-card";
import { Progress } from "@/components/progress";
import type {
  ContextContentProps,
  ContextProps,
  ContextTriggerProps,
  TokenUsageBreakdown,
} from "./context-types";

interface ContextValue {
  usedTokens: number;
  maxTokens: number;
  usage?: TokenUsageBreakdown;
  modelId?: string;
}

const ContextValue = React.createContext<ContextValue | null>(null);

function useContextValue(): ContextValue {
  const value = React.useContext(ContextValue);
  if (!value) {
    throw new Error("Context parts must be rendered inside <Context>.");
  }
  return value;
}

function formatTokens(value: number): string {
  if (!Number.isFinite(value)) return "0";
  if (value < 1000) return String(value);
  return `${(value / 1000).toFixed(1).replace(/\.0$/, "")}k`;
}

function getPercentage(usedTokens: number, maxTokens: number): number {
  if (
    !Number.isFinite(usedTokens) ||
    !Number.isFinite(maxTokens) ||
    maxTokens <= 0
  ) {
    return 0;
  }
  return Math.max(0, Math.min(100, Math.round((usedTokens / maxTokens) * 100)));
}

/**
 * Displays context-window usage in a hover card built from shared primitives.
 *
 * @param props - Usage data, hover-card state, and child components.
 * @returns The context hover-card composition.
 */
export function Context({
  usedTokens,
  maxTokens,
  usage,
  modelId,
  children,
  ...props
}: ContextProps): React.ReactElement {
  return (
    <ContextValue.Provider value={{ usedTokens, maxTokens, usage, modelId }}>
      <HoverCard openDelay={10} closeDelay={100} {...props}>
        {children}
      </HoverCard>
    </ContextValue.Provider>
  );
}

/**
 * Trigger button showing the used percentage of the context window.
 *
 * @param props - Button content and native button props.
 * @returns The trigger for its parent Context hover card.
 */
export function ContextTrigger({
  children,
  ...props
}: ContextTriggerProps): React.ReactElement {
  const { usedTokens, maxTokens } = useContextValue();
  const percentage = getPercentage(usedTokens, maxTokens);
  return (
    <HoverCardTrigger asChild>
      <Button variant="outline" size="sm" {...props}>
        {children ?? `${percentage}% context`}
      </Button>
    </HoverCardTrigger>
  );
}

/**
 * Content panel for the Context hover card.
 *
 * @param props - Content and native div props.
 * @returns The hover-card content region.
 */
export function ContextContent({
  className,
  ...props
}: ContextContentProps): React.ReactElement {
  return (
    <HoverCardContent
      className={cn("flex w-64 flex-col gap-3", className)}
      {...props}
    />
  );
}

/**
 * Header showing the selected model, token count, and usage progress.
 *
 * @returns Context heading and accessible progress indicator.
 */
export function ContextContentHeader(): React.ReactElement {
  const { usedTokens, maxTokens, modelId } = useContextValue();
  const percentage = getPercentage(usedTokens, maxTokens);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-medium">{modelId ?? "Context"}</span>
        <span className="text-muted-foreground">
          {formatTokens(usedTokens)} / {formatTokens(maxTokens)}
        </span>
      </div>
      <Progress value={percentage} aria-label="Context used" />
    </div>
  );
}

/**
 * Lists token categories supplied to the Context root.
 *
 * @returns Token usage rows, or null when no breakdown is available.
 */
export function ContextContentBody(): React.ReactElement | null {
  const { usage } = useContextValue();
  if (!usage) return null;
  const rows = [
    ["Input", usage.inputTokens],
    ["Output", usage.outputTokens],
    ["Reasoning", usage.reasoningTokens],
    ["Cached", usage.cachedTokens],
  ].filter((row): row is [string, number] => row[1] !== undefined);
  return (
    <div className="flex flex-col gap-1 text-sm">
      {rows.map(([label, value]) => (
        <div key={label} className="flex justify-between gap-3">
          <span className="text-muted-foreground">{label}</span>
          <span>{formatTokens(value)}</span>
        </div>
      ))}
    </div>
  );
}

/**
 * Optional footer region for additional context metadata.
 *
 * @param props - Footer content and native div props.
 * @returns The optional footer content.
 */
export function ContextContentFooter(
  props: React.HTMLAttributes<HTMLDivElement>,
): React.ReactElement {
  return <div {...props} />;
}
