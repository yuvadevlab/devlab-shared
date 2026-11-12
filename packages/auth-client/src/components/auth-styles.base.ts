/**
 * @file packages/auth-client/src/components/auth-styles.base.ts
 * @description Viewport defense, layout shells, alert banners, and card container styling.
 * @module @yuva-devlab/auth-client
 */

export const AUTH_BASE_STYLES = `
/* ── Universal Scoped Box-Sizing & Viewport Defense ─────────────────── */
.dl-auth-card, .dl-auth-card *, .dl-auth-card *::before, .dl-auth-card *::after,
.dl-auth-page, .dl-auth-page *, .dl-auth-page *::before, .dl-auth-page *::after {
  box-sizing: border-box;
}

body:has(.dl-auth-page) {
  margin: 0;
  padding: 0;
}

/* ── Full-Viewport Centering Page Shell ──────────────────────────────── */
.dl-auth-page {
  min-height: 100vh;
  min-height: 100dvh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4, 1rem) var(--space-4, 1rem) var(--space-3, 0.75rem);
  background-color: var(--background, #09090b);
  color: var(--foreground, #f4f4f5);
  overflow-x: hidden;
  box-sizing: border-box;
}

.dl-auth-page-main {
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.dl-auth-page-footer {
  flex-shrink: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: var(--space-2, 0.5rem);
}

/* ── Embedded Auth Legal Footer ───────────────────────────────────────── */
.dl-auth-legal-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1-5, 0.375rem);
  font-size: var(--link-font-size, 0.75rem);
  color: var(--muted-foreground, #71717a);
  text-align: center;
}

.dl-auth-legal-footer__links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2, 0.5rem);
  flex-wrap: wrap;
}

.dl-auth-legal-footer__app-name {
  font-weight: 500;
  color: var(--foreground, #d4d4d8);
}

.dl-auth-legal-footer__link {
  color: var(--muted-foreground, #a1a1aa);
  text-decoration: none;
  transition: color 0.15s ease;
}

.dl-auth-legal-footer__link:hover {
  color: var(--foreground, #fafafa);
  text-decoration: underline;
}

.dl-auth-legal-footer__divider {
  color: var(--border, #3f3f46);
  user-select: none;
}

.dl-auth-legal-footer__copy {
  margin: 0;
  font-size: 0.7rem;
  color: var(--muted-foreground, #71717a);
}

/* ── Auth Card Wrapper ──────────────────────────────────────────────── */
.dl-auth-card {
  max-width: min(100%, var(--auth-card-max-width, 450px));
  width: 100%;
  margin: 0 auto;
  padding: var(--card-padding, var(--space-8, 2rem));
  background-color: var(--card, #111113);
  border: 1px solid var(--border, #27272a);
  border-radius: var(--radius, 0.75rem);
  box-shadow: var(--card-shadow, 0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.4));
  font-family: var(--font-sans, inherit);
  color: var(--card-foreground, #f4f4f5);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

@media (max-width: 480px) {
  .dl-auth-card { padding: var(--space-5, 1.25rem); }
}

/* ── Auth Header, Icon & Typography ─────────────────────────────────── */
.dl-auth-header {
  margin-bottom: var(--space-6, 1.5rem);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.dl-auth-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-3, 0.75rem);
  color: var(--primary, #2563eb);
}
.dl-auth-icon-wrapper svg { width: var(--icon-xl, 2rem); height: var(--icon-xl, 2rem); }
.dl-auth-icon-wrapper img { max-width: 48px; max-height: 48px; height: auto; object-fit: contain; }
.dl-auth-title {
  font-size: var(--font-size-xl, 1.375rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0 0 var(--space-2, 0.5rem) 0;
  color: var(--foreground, #fafafa);
}
.dl-auth-subtitle {
  font-size: var(--control-font-size, 0.875rem);
  color: var(--muted-foreground, #a1a1aa);
  margin: 0;
  line-height: 1.5;
}

/* ── Auth Alert & Status Banner ─────────────────────────────────────── */
.dl-auth-alert {
  display: flex;
  align-items: center;
  gap: var(--space-2, 0.5rem);
  padding: var(--space-3, 0.75rem);
  margin-bottom: var(--space-4, 1rem);
  background-color: var(--destructive-muted, rgba(239, 68, 68, 0.12));
  border: 1px solid var(--destructive-border, rgba(239, 68, 68, 0.35));
  border-radius: var(--radius-md, calc(var(--radius, 0.75rem) * 0.75));
  color: var(--destructive, #fca5a5);
  font-size: var(--label-font-size, 0.8125rem);
  line-height: 1.4;
}
.dl-auth-alert-icon {
  flex-shrink: 0;
  width: var(--icon-sm, 1rem);
  height: var(--icon-sm, 1rem);
}
`;
