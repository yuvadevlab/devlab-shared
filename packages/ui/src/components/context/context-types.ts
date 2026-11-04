import * as React from "react";

export interface TokenUsageBreakdown {
  inputTokens?: number;
  outputTokens?: number;
  reasoningTokens?: number;
  cachedTokens?: number;
}

export interface ContextUsageProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Tokens currently used */
  usedTokens: number;
  /** Maximum context window limit */
  maxTokens: number;
  /** Optional detailed breakdown of token consumption */
  breakdown?: TokenUsageBreakdown;
  /** Model or context label, e.g. "Claude 3.5 Sonnet (200k)" */
  label?: string;
  /** Size variant */
  size?: "sm" | "md";
}
