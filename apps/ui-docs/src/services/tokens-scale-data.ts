export interface TypoScaleItem {
  selector: string;
  size: string;
  weight: number | string;
  lineHeight: number | string;
  desc: string;
}

export interface SpacingItem {
  token: string;
  rem: string;
  px: string;
}

export interface BrandExtensionItem {
  brand: string;
  category: string;
  tokens: Array<{ name: string; desc: string }>;
}

export const TYPOGRAPHY_SCALE: TypoScaleItem[] = [
  {
    selector: ".dl-display",
    size: "3rem (48px)",
    weight: 800,
    lineHeight: 1.15,
    desc: "Hero and display titles",
  },
  {
    selector: ".dl-h1",
    size: "2.25rem (36px)",
    weight: 700,
    lineHeight: 1.2,
    desc: "Primary page heading",
  },
  {
    selector: ".dl-h2",
    size: "1.75rem (28px)",
    weight: 600,
    lineHeight: 1.25,
    desc: "Section heading",
  },
  {
    selector: ".dl-h3",
    size: "1.375rem (22px)",
    weight: 600,
    lineHeight: 1.3,
    desc: "Card and panel heading",
  },
  {
    selector: ".dl-h4",
    size: "1.125rem (18px)",
    weight: 600,
    lineHeight: 1.35,
    desc: "Sub-section header",
  },
  {
    selector: ".dl-h5",
    size: "1rem (16px)",
    weight: 500,
    lineHeight: 1.4,
    desc: "Component-level header",
  },
  {
    selector: ".dl-h6",
    size: "0.875rem (14px)",
    weight: 500,
    lineHeight: 1.45,
    desc: "Small header and label",
  },
  {
    selector: ".dl-body-lg",
    size: "1.125rem (18px)",
    weight: 400,
    lineHeight: 1.55,
    desc: "Large lead paragraph",
  },
  {
    selector: ".dl-body",
    size: "0.9375rem (15px)",
    weight: 400,
    lineHeight: 1.5,
    desc: "Standard UI body text",
  },
  {
    selector: ".dl-body-sm",
    size: "0.8125rem (13px)",
    weight: 400,
    lineHeight: 1.45,
    desc: "Secondary helper text",
  },
  {
    selector: ".dl-caption",
    size: "0.75rem (12px)",
    weight: 500,
    lineHeight: 1.4,
    desc: "Microcopy and captions",
  },
  {
    selector: ".dl-code",
    size: "0.8125rem (13px)",
    weight: 400,
    lineHeight: 1.45,
    desc: "Monospace inline code",
  },
  {
    selector: ".dl-metric",
    size: "2rem (32px)",
    weight: 700,
    lineHeight: 1.2,
    desc: "Tabular numeric telemetry",
  },
];

export const SPACING_SCALE: SpacingItem[] = [
  { token: "--space-1", rem: "0.25rem", px: "4px" },
  { token: "--space-2", rem: "0.5rem", px: "8px" },
  { token: "--space-3", rem: "0.75rem", px: "12px" },
  { token: "--space-4", rem: "1rem", px: "16px" },
  { token: "--space-6", rem: "1.5rem", px: "24px" },
  { token: "--space-8", rem: "2rem", px: "32px" },
  { token: "--space-12", rem: "3rem", px: "48px" },
  { token: "--space-16", rem: "4rem", px: "64px" },
];

export const BRAND_EXTENSIONS: BrandExtensionItem[] = [
  {
    brand: "FinAI",
    category: "Financial Domain & Charts",
    tokens: [
      { name: "--chart-bullish", desc: "Bullish equity positive growth" },
      { name: "--chart-bearish", desc: "Bearish loss or correction" },
      { name: "--equity-positive", desc: "Account balance positive status" },
      { name: "--trade-pending", desc: "Order execution pending" },
    ],
  },
  {
    brand: "DevLab Logs",
    category: "Telemetry Severity Levels",
    tokens: [
      { name: "--log-fatal", desc: "Service crash or kernel failure" },
      { name: "--log-error", desc: "Application exception event" },
      { name: "--log-warn", desc: "Degraded performance alert" },
      { name: "--log-info", desc: "Standard informational telemetry" },
    ],
  },
  {
    brand: "VitalAI",
    category: "Biomarkers & Recovery",
    tokens: [
      { name: "--chart-volt", desc: "High-intensity athletic output" },
      { name: "--chart-heartrate", desc: "BPM cardiac telemetry series" },
      { name: "--chart-oxygen", desc: "SpO2 oxygen saturation level" },
      { name: "--vital-recovery-high", desc: "Optimal biometric readiness" },
    ],
  },
  {
    brand: "OrchestrAI",
    category: "Agent Execution States",
    tokens: [
      { name: "--agent-running", desc: "Active task execution in progress" },
      { name: "--agent-completed", desc: "Pipeline run finished successfully" },
      { name: "--agent-failed", desc: "Subagent error or exception" },
      { name: "--agent-idle", desc: "Agent awaiting orchestration prompt" },
    ],
  },
];
