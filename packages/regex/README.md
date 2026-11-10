# 🔣 @yuva-devlab/regex

[![npm version](https://img.shields.io/npm/v/@yuva-devlab/regex.svg)](https://www.npmjs.com/package/@yuva-devlab/regex)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript 6](https://img.shields.io/badge/TypeScript-6.x-3178c6.svg)](https://www.typescriptlang.org)

> Centralized, security-hardened regular expressions, PII redaction patterns, UUID assertions, URI validators, and ANSI terminal escape filters for the DevLab platform. Zero runtime dependencies.

---

## Features

- 🔒 **Security Guards (`security.regex.ts`)**: Detect SQL injection, cross-site scripting (XSS), path traversal attacks, and command injection attempts.
- 🙈 **PII Masking & Redaction (`pii.regex.ts`)**: Identify and sanitize sensitive data including emails, credit cards, social security numbers, and bearer tokens.
- 🆔 **UUID Assertions (`uuid.regex.ts`)**: RFC-4122 compliant UUID v4 and generic UUID matching with strict boundary checks.
- 🌐 **URI & Scheme Validation (`uri.regex.ts`)**: Validate HTTP/HTTPS URLs, localhost origins, IP addresses, and custom protocol deep links (`antigravity-ide://`, `vscode://`).
- 🎨 **ANSI Terminal Escape Sanitizer (`ansi.regex.ts`)**: Strip colored terminal formatting codes for clean log ingestion and UI rendering.
- ⚡ **Zero External Dependencies**: Pure standard regular expressions compatible with browser, Node.js, Deno, and Cloudflare Workers.

---

## Table of Contents

1. [Installation](#installation)
2. [Quick Start](#quick-start)
3. [PII Redaction](#pii-redaction)
4. [Security & Injection Checks](#security--injection-checks)
5. [Terminal ANSI Stripping](#terminal-ansi-stripping)
6. [Author & Attribution](#author--attribution)

---

## Installation

```bash
# pnpm (recommended)
pnpm add @yuva-devlab/regex

# npm
npm install @yuva-devlab/regex
```

---

## Quick Start

### Validating UUIDs and Deep Links

```typescript
import { isUuidV4, isValidUri } from "@yuva-devlab/regex";

console.log(isUuidV4("1f3e6def-ccd4-4779-9802-b7feb5edbe2b")); // true
console.log(isUuidV4("invalid-uuid-string")); // false

console.log(isValidUri("https://portal.devlab.internal")); // true
console.log(isValidUri("antigravity-ide://file/Users/yuva/project")); // true
```

---

## PII Redaction

Sanitize incoming logs and error payloads before persistence or external streaming:

```typescript
import { redactPii, maskEmail, maskCreditCard } from "@yuva-devlab/regex";

const rawLog =
  "User user.name@domain.com submitted payment with card 4111-2222-3333-4444";
const cleanLog = redactPii(rawLog);

console.log(cleanLog);
// "User u***@domain.com submitted payment with card ****-****-****-4444"
```

---

## Security & Injection Checks

Detect malicious patterns in user inputs or agent-generated SQL queries:

```typescript
import { hasSqlInjectionPattern, hasPathTraversal } from "@yuva-devlab/regex";

const unsafeInput = "admin' OR 1=1 --";
if (hasSqlInjectionPattern(unsafeInput)) {
  throw new Error("Malicious SQL syntax detected");
}

const maliciousPath = "../../etc/passwd";
if (hasPathTraversal(maliciousPath)) {
  throw new Error("Directory traversal detected");
}
```

---

## Terminal ANSI Stripping

Strip color codes and cursor repositioning characters from supervisor stream buffers:

```typescript
import { stripAnsi } from "@yuva-devlab/regex";

const colorizedLog =
  "\u001b[32m[INFO]\u001b[0m Application initialized successfully";
const plainText = stripAnsi(colorizedLog);

console.log(plainText); // "[INFO] Application initialized successfully"
```

---

## Author & Attribution

- **Author**: Yuva DevLab (`yuva.devlab@gmail.com`)
- **License**: MIT
