# 🔐 @yuva-devlab/auth-client

[![npm version](https://img.shields.io/npm/v/@yuva-devlab/auth-client.svg)](https://www.npmjs.com/package/@yuva-devlab/auth-client)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript 6](https://img.shields.io/badge/TypeScript-6.x-3178c6.svg)](https://www.typescriptlang.org)
[![Pure Platform CSS](https://img.shields.io/badge/CSS-Cascade%20Layers-22c55e.svg)](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer)

> Client-side authentication SDK, React context provider, state hooks, prebuilt accessible UI components, and platform kill-switch screen for the DevLab ecosystem.

---

## What's New in v1.2.0

- **Edge Runtime Safe JWT Utilities**: Added lightweight, zero-dependency JWT inspection utilities (`decodeBase64`, `parseJwtClaims`, `isJwtExpired`). Runs identically in Next.js Edge Middleware, Node.js SSR, and client browsers without requiring native crypto modules or bloated external packages.
- **Clock-Skew Buffer Protection**: `isJwtExpired(token, bufferSeconds)` includes a configurable 10-second safety window to eliminate token expiration race conditions during network requests.

---

## Features

- 🛡️ **Centralized Auth Provider (`<DevLabAuthProvider>`)**: Session bootstrap, silent background token refresh, and cross-tab synchronization.
- ⚡ **Edge Runtime Safe JWT Utilities**: Preemptively inspect token lifetime and parse user claims in Edge Middleware before hitting downstream routes.
- 🪝 **Type-Safe React Hooks**: `useDevLabAuth()` for session state and user identity, and `useAppStatus()` for real-time application availability.
- 🎨 **Prebuilt Accessible UI Components**: Production-ready `<SignIn />`, `<ForgotPassword />`, `<ForgotPasswordSuccess />`, `<UserButton />`, and `<AuthCard />`.
- 🚨 **Platform Kill-Switch Protection (`<AppUnavailableScreen />`)**: Real-time response to maintenance mode, emergency app shutdown, and suspension states.
- 🎯 **Pure Platform Styling**: Built entirely with pure platform CSS and W3C Cascade Layers (`@layer dl-components`) powered by `@yuva-devlab/tokens`.
- 📦 **Dual ESM & CJS Build**: Full compatibility across modern bundlers (Next.js, Vite) and Node.js runtimes.

---

## Table of Contents

1. [Installation](#installation)
2. [Quick Start](#quick-start)
3. [Edge JWT Utilities](#edge-jwt-utilities)
4. [Hooks Reference](#hooks-reference)
5. [Prebuilt Components](#prebuilt-components)
6. [Kill-Switch & Maintenance Mode](#kill-switch--maintenance-mode)
7. [Styling & Design Tokens](#styling--design-tokens)
8. [Author & Attribution](#author--attribution)

---

## Installation

```bash
# pnpm (recommended)
pnpm add @yuva-devlab/auth-client @yuva-devlab/tokens

# npm
npm install @yuva-devlab/auth-client @yuva-devlab/tokens
```

---

## Quick Start

Wrap your application tree in `<DevLabAuthProvider>`:

```tsx
import React from "react";
import { DevLabAuthProvider } from "@yuva-devlab/auth-client";
import "@yuva-devlab/tokens/styles.css";

export function AppRoot({ children }: { children: React.ReactNode }) {
  return (
    <DevLabAuthProvider
      portalUrl={
        process.env.NEXT_PUBLIC_DEVLAB_PORTAL_URL || "http://localhost:4000"
      }
      appId="finai"
      onSessionExpired={() => {
        window.location.href = "/sign-in?expired=true";
      }}
    >
      {children}
    </DevLabAuthProvider>
  );
}
```

---

## Edge JWT Utilities

`@yuva-devlab/auth-client` provides zero-dependency JWT inspection utilities compatible with Next.js Edge Middleware, Node.js SSR, and browser runtimes.

### `parseJwtClaims(token)`

Extracts and decodes claims without cryptographic overhead:

```typescript
import { parseJwtClaims } from "@yuva-devlab/auth-client";

const claims = parseJwtClaims(accessToken);
if (claims) {
  console.log(`User ID: ${claims.sub}, Tenant: ${claims.tenant_id}`);
}
```

### `isJwtExpired(token, bufferSeconds?)`

Evaluates expiration timestamp against current Unix epoch with a default 10-second safety window:

```typescript
import { isJwtExpired } from "@yuva-devlab/auth-client";

// In Next.js Edge Middleware
export function middleware(request: NextRequest) {
  const token = request.cookies.get("devlab_session")?.value;

  if (isJwtExpired(token)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
```

### `decodeBase64(input)`

Safe UTF-8 base64 / base64url decoding across all browser and server runtimes without Node.js `Buffer` dependency:

```typescript
import { decodeBase64 } from "@yuva-devlab/auth-client";

const jsonString = decodeBase64(base64Payload);
```

---

## Hooks Reference

### `useDevLabAuth()`

Provides real-time authentication session state, active tokens, and current user identity:

```tsx
import { useDevLabAuth } from "@yuva-devlab/auth-client";

export function UserProfileHeader() {
  const { user, isAuthenticated, isLoading, signOut } = useDevLabAuth();

  if (isLoading) return <div>Loading session...</div>;
  if (!isAuthenticated || !user) return <div>Please sign in</div>;

  return (
    <div className="profile-badge">
      <span>
        {user.name} ({user.email})
      </span>
      <span className="role-tag">{user.role}</span>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}
```

### `useAppStatus()`

Subscribes to platform availability and maintenance states for the current registered application:

```tsx
import { useAppStatus, AppUnavailableScreen } from "@yuva-devlab/auth-client";

export function ProtectedAppGuard({ children }: { children: React.ReactNode }) {
  const { status, isAvailable, reason } = useAppStatus();

  if (!isAvailable) {
    return <AppUnavailableScreen status={status} reason={reason} />;
  }

  return <>{children}</>;
}
```

---

## Prebuilt Components

### `<SignIn />`

Full-featured sign-in form with multi-brand token styling, validation, and SSO redirection:

```tsx
import { SignIn } from "@yuva-devlab/auth-client";

export function SignInPage() {
  return (
    <main className="auth-layout">
      <SignIn redirectUrl="/dashboard" signUpUrl="/sign-up" brandName="FinAI" />
    </main>
  );
}
```

### `<UserButton />`

Interactive avatar drop-down menu with profile actions, tenant switching, and sign-out:

```tsx
import { UserButton } from "@yuva-devlab/auth-client";

export function TopNavbar() {
  return (
    <header className="navbar">
      <div className="nav-brand">FinAI</div>
      <UserButton afterSignOutUrl="/sign-in" />
    </header>
  );
}
```

---

## Kill-Switch & Maintenance Mode

When an application is deactivated via the DevLab Portal kill-switch, `<AppUnavailableScreen />` automatically renders an enterprise maintenance view adhering to DevLab design tokens:

```tsx
<AppUnavailableScreen
  status="MAINTENANCE"
  reason="Scheduled database index migration in progress"
  supportEmail="yuva.devlab@gmail.com"
/>
```

---

## Author & Attribution

- **Author**: Yuva DevLab (`yuva.devlab@gmail.com`)
- **License**: MIT
