# 🤖 @yuva-devlab/agent-core

[![npm version](https://img.shields.io/npm/v/@yuva-devlab/agent-core.svg)](https://www.npmjs.com/package/@yuva-devlab/agent-core)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript 6](https://img.shields.io/badge/TypeScript-6.x-3178c6.svg)](https://www.typescriptlang.org)

> Universal tool contracts, type-safe tool definition factory with Zod validation, tool registries, and dynamic prompt compilation engine for autonomous agents in the DevLab ecosystem.

---

## Features

- 🛠️ **Universal Tool Contracts (`defineTool`)**: Standardized tool schemas with Zod input/output validation, metadata, and async executors.
- 📚 **Tool Registry (`ToolRegistry`)**: Centralized catalog supporting namespace scoping, capability queries, and runtime authorization.
- 📝 **Dynamic Prompt Compiler (`compilePrompt`)**: High-performance prompt templating engine injecting tool descriptions, variable substitutions, and system instructions.
- ⚡ **Zero-Overhead Schema Conversion**: Direct serialization to OpenAI, Anthropic, and Google tool call signatures without manual mapping.
- 📦 **Dual ESM & CJS Build**: Clean usage across serverless functions, agent daemons, and microservices.

---

## Table of Contents

1. [Installation](#installation)
2. [Quick Start](#quick-start)
3. [Defining Tools](#defining-tools)
4. [Tool Registry & Scoping](#tool-registry--scoping)
5. [Prompt Compilation Engine](#prompt-compilation-engine)
6. [Author & Attribution](#author--attribution)

---

## Installation

```bash
# pnpm (recommended)
pnpm add @yuva-devlab/agent-core zod

# npm
npm install @yuva-devlab/agent-core zod
```

---

## Quick Start

### Defining a Tool

```typescript
import { z } from "zod";
import { defineTool } from "@yuva-devlab/agent-core";

export const getAccountBalanceTool = defineTool({
  name: "get_account_balance",
  description:
    "Retrieves current cash and portfolio equity balance for a tenant account",
  parameters: z.object({
    accountId: z.string().describe("Target account identifier"),
    currency: z.enum(["USD", "EUR", "INR"]).default("USD"),
  }),
  execute: async ({ accountId, currency }) => {
    return {
      accountId,
      currency,
      cashBalance: 45200.5,
      equityValue: 128900.0,
      timestamp: new Date().toISOString(),
    };
  },
});
```

---

## Tool Registry & Scoping

Manage collections of tools across swarms and subagents:

```typescript
import { ToolRegistry } from "@yuva-devlab/agent-core";
import { getAccountBalanceTool } from "./tools/balance";

const registry = new ToolRegistry();
registry.register(getAccountBalanceTool);

// Query tools by name
const tool = registry.get("get_account_balance");

// Format tools for LLM provider definitions
const openAiTools = registry.toOpenAiDefinitions();
const anthropicTools = registry.toAnthropicDefinitions();
```

---

## Prompt Compilation Engine

Compile dynamic system prompts injecting runtime variables and active tool manifests:

```typescript
import { compilePrompt } from "@yuva-devlab/agent-core";

const template = `
You are {{agentName}}, a specialized autonomous financial assistant for {{tenantName}}.
Current Date: {{currentDate}}

Available Tools:
{{toolsManifest}}

Guidelines:
1. Always confirm transaction amounts before execution.
2. Maintain strict confidentiality of financial records.
`;

const systemPrompt = compilePrompt(template, {
  variables: {
    agentName: "FinAI Portfolio Bot",
    tenantName: "Apex Capital",
    currentDate: new Date().toLocaleDateString(),
  },
  tools: registry.getAll(),
});

console.log(systemPrompt);
```

---

## Author & Attribution

- **Author**: Yuva DevLab (`yuva.devlab@gmail.com`)
- **License**: MIT
