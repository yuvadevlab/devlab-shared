# 💳 @yuva-devlab/billing

[![npm version](https://img.shields.io/npm/v/@yuva-devlab/billing.svg)](https://www.npmjs.com/package/@yuva-devlab/billing)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript 6](https://img.shields.io/badge/TypeScript-6.x-3178c6.svg)](https://www.typescriptlang.org)

> Server-driven token metering, LLM cost ledgers, dynamic pricing matrices, and multi-tenant budget quota enforcement for the DevLab platform.

---

## Features

- 🔢 **Token Metering (`TokenCounter`)**: Accurate prompt and completion token accounting across OpenAI, Anthropic, and Google models.
- 💵 **Dynamic Pricing Matrix (`PricingMatrix`)**: Up-to-date pricing models per 1M prompt/completion/cached tokens.
- 📒 **Transactional Cost Ledger (`CostLedger`)**: Audit-grade financial tracking recording inference costs, tenant attribution, and timestamps.
- 🛑 **Budget Quota Enforcement (`QuotaEnforcer`)**: Hard and soft spending caps with automated circuit breaking when thresholds are breached.
- 🏢 **Multi-Tenant Isolation**: Partition usage, meters, and cost summaries strictly by `tenantId`.
- 📦 **Dual ESM & CJS Build**: Ready for microservices, background billing jobs, and edge gateways.

---

## Table of Contents

1. [Installation](#installation)
2. [Quick Start](#quick-start)
3. [Pricing & Cost Calculation](#pricing--cost-calculation)
4. [Cost Ledger](#cost-ledger)
5. [Tenant Quota Enforcement](#tenant-quota-enforcement)
6. [Author & Attribution](#author--attribution)

---

## Installation

```bash
# pnpm (recommended)
pnpm add @yuva-devlab/billing

# npm
npm install @yuva-devlab/billing
```

---

## Quick Start

### Calculating Inference Cost

```typescript
import { calculateCost, PRICING_MATRIX } from "@yuva-devlab/billing";

// Compute cost for a Gemini 2.5 Pro interaction
const costBreakdown = calculateCost({
  model: "gemini-2.5-pro",
  promptTokens: 1450,
  completionTokens: 380,
  cachedTokens: 500,
});

console.log(`Total Cost: $${costBreakdown.totalCostUsd.toFixed(6)}`);
console.log(`Prompt: $${costBreakdown.promptCostUsd.toFixed(6)}`);
console.log(`Completion: $${costBreakdown.completionCostUsd.toFixed(6)}`);
```

---

## Cost Ledger

Record and aggregate financial consumption for billing runs and analytics:

```typescript
import { CostLedger } from "@yuva-devlab/billing";

const ledger = new CostLedger();

await ledger.record({
  tenantId: "tenant_apex",
  userId: "usr_7712",
  appId: "finai",
  model: "gemini-2.5-flash",
  promptTokens: 800,
  completionTokens: 250,
  costUsd: 0.000185,
  metadata: { conversationId: "conv_9901" },
});

// Retrieve aggregated spend for tenant
const summary = await ledger.getTenantSummary("tenant_apex", {
  startDate: new Date("2026-11-01"),
  endDate: new Date(),
});

console.log(
  `Total Spend: $${summary.totalSpendUsd.toFixed(2)} across ${summary.inferenceCount} queries`,
);
```

---

## Tenant Quota Enforcement

Protect tenants from accidental cost overruns with soft alerts and hard cutoffs:

```typescript
import { QuotaEnforcer } from "@yuva-devlab/billing";

const enforcer = new QuotaEnforcer({
  monthlyBudgetUsd: 500.0,
  softLimitPercentage: 80, // Warn at $400
  hardLimitPercentage: 100, // Reject at $500
});

const status = await enforcer.checkQuota("tenant_apex", currentSpend);

if (status.isExceeded) {
  throw new Error(
    "Monthly AI inference budget exhausted. Please upgrade your plan.",
  );
} else if (status.isWarning) {
  console.warn(
    `Tenant has consumed ${status.percentageUsed}% of their monthly quota`,
  );
}
```

---

## Author & Attribution

- **Author**: Yuva DevLab (`yuva.devlab@gmail.com`)
- **License**: MIT
