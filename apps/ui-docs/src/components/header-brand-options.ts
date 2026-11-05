import type { Brand } from "@/components/theme-provider";

/**
 * Brand choices available in the documentation theme controls.
 */
export const BRAND_OPTIONS = [
  {
    value: "orchestrai",
    label: "⚡ OrchestrAI (Emerald Precision)",
  },
  {
    value: "finai",
    label: "💎 FinAI (Cyberpunk Neon)",
  },
  {
    value: "portal",
    label: "🔮 DevLab Portal (Deep Indigo)",
  },
  {
    value: "logs",
    label: "📊 DevLab Logs (Matrix Phosphor)",
  },
  {
    value: "vitalai",
    label: "💪 VitalAI (Volt Kinetic)",
  },
] as const satisfies readonly { value: Brand; label: string }[];
