/**
 * @file packages/agent-core/src/harness/policy.schema.ts
 * @description Server-controlled AI profile policy schema, creativity presets, and safe runtime override clamping.
 * @module @yuva-devlab/agent-core/harness/policy-schema
 */

import { z } from "zod";

/** Named creativity / determinism presets configurable per app profile. */
export const AgentCreativityPreset = {
  ANALYTICAL: "analytical",
  BALANCED: "balanced",
  CREATIVE: "creative",
} as const;

/** Union type of {@link AgentCreativityPreset} values. */
export type AgentCreativityPreset =
  (typeof AgentCreativityPreset)[keyof typeof AgentCreativityPreset];

/** Default temperature mapped to each {@link AgentCreativityPreset}. */
export const CREATIVITY_TEMPERATURE_MAP: Record<AgentCreativityPreset, number> =
  {
    [AgentCreativityPreset.ANALYTICAL]: 0.1,
    [AgentCreativityPreset.BALANCED]: 0.4,
    [AgentCreativityPreset.CREATIVE]: 0.8,
  };

/** Feature toggles controllable from `devlab-ai-studio` per app profile. */
export const AppAiFeatureFlagsSchema = z.object({
  enableAgentMode: z.boolean().default(true),
  showReasoning: z.boolean().default(true),
  showLiveConsole: z.boolean().default(true),
  parallelToolCalls: z.boolean().default(true),
  followUpSuggestions: z.boolean().default(true),
  voiceInput: z.boolean().default(true),
});

/** Type inferred from {@link AppAiFeatureFlagsSchema}. */
export type AppAiFeatureFlags = z.infer<typeof AppAiFeatureFlagsSchema>;

/** Canonical versioned AI profile policy consumed by `devlab-ai-studio` and client apps. */
export const AppAiPolicySchema = z.object({
  appId: z.string().min(1),
  profileSlug: z.string().min(1),
  profileVersion: z.number().int().positive().default(1),
  creativityPreset: z
    .enum([
      AgentCreativityPreset.ANALYTICAL,
      AgentCreativityPreset.BALANCED,
      AgentCreativityPreset.CREATIVE,
    ])
    .default(AgentCreativityPreset.ANALYTICAL),
  temperature: z.number().min(0).max(1.5).optional(),
  maxTurns: z.number().int().min(1).max(20).default(8),
  maxTokens: z.number().int().min(128).max(32768).default(4096),
  enabledToolNamespaces: z.array(z.string()).default([]),
  features: AppAiFeatureFlagsSchema.default({
    enableAgentMode: true,
    showReasoning: true,
    showLiveConsole: true,
    parallelToolCalls: true,
    followUpSuggestions: true,
    voiceInput: true,
  }),
});

/** Type inferred from {@link AppAiPolicySchema}. */
export type AppAiPolicy = z.infer<typeof AppAiPolicySchema>;

/** Safe runtime overrides a consumer app may pass alongside a profile slug. */
export interface AppAiPolicyOverrides {
  creativityPreset?: AgentCreativityPreset;
  temperature?: number;
  maxTurns?: number;
  features?: Partial<AppAiFeatureFlags>;
}

/**
 * Resolves the effective runtime policy by merging optional consumer overrides onto a
 * published {@link AppAiPolicy}, clamping `maxTurns` and `temperature` within safe bounds.
 *
 * @param base - Published server policy.
 * @param overrides - Optional per-request overrides from the consumer app.
 * @returns Effective resolved policy with concrete `temperature`.
 */
export function resolveEffectivePolicy(
  base: AppAiPolicy,
  overrides?: AppAiPolicyOverrides,
): AppAiPolicy & { temperature: number } {
  const preset = overrides?.creativityPreset ?? base.creativityPreset;
  const rawTemp =
    overrides?.temperature ??
    base.temperature ??
    CREATIVITY_TEMPERATURE_MAP[preset];
  const temperature = Math.min(1.5, Math.max(0, rawTemp));
  const maxTurns = overrides?.maxTurns
    ? Math.min(base.maxTurns, Math.max(1, overrides.maxTurns))
    : base.maxTurns;

  return {
    ...base,
    creativityPreset: preset,
    temperature,
    maxTurns,
    features: {
      ...base.features,
      ...overrides?.features,
    },
  };
}
