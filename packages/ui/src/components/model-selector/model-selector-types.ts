import * as React from "react";

export interface AIModel {
  /** Unique model identifier (e.g., "claude-3-5-sonnet", "gpt-4o") */
  id: string;
  /** Human-readable model display name */
  name: string;
  /** Model provider name (e.g., "Anthropic", "OpenAI", "Google", "DeepSeek") */
  provider: string;
  /** Brief summary of model intelligence or use-case */
  description?: string;
  /** Tags describing model capabilities (e.g., "Vision", "Reasoning", "200k") */
  tags?: string[];
  /** Optional icon representing provider or model */
  icon?: React.ReactNode;
  /** Whether the model is disabled or unavailable */
  disabled?: boolean;
}

export interface ModelSelectorProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  /** Available models array */
  models?: AIModel[];
  /** Selected model ID */
  value?: string;
  /** Initial selected model ID when uncontrolled */
  defaultValue?: string;
  /** Change callback with selected model ID */
  onValueChange?: (modelId: string) => void;
  /** Placeholder when no model is chosen */
  placeholder?: string;
  /** Selector size variation */
  size?: "sm" | "md";
  /** Whether the selector is disabled */
  disabled?: boolean;
}
