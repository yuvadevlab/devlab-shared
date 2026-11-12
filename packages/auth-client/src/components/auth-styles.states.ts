/**
 * @file packages/auth-client/src/components/auth-styles.states.ts
 * @description View state styles, success confirmations, and developer debug callouts.
 * @module @yuva-devlab/auth-client
 */

export const AUTH_STATE_STYLES = `
/* ── Success State Confirmation ─────────────────────────────────────── */
.dl-auth-success-view {
  text-align: center;
  padding: var(--space-4, 1rem) 0;
}
.dl-auth-success-icon-badge {
  width: calc(var(--icon-xl, 1.5rem) * 2);
  height: calc(var(--icon-xl, 1.5rem) * 2);
  border-radius: 50%;
  background-color: var(--success-muted, rgba(34, 197, 94, 0.15));
  color: var(--success, #4ade80);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--space-4, 1rem) auto;
}
.dl-auth-success-icon-badge svg {
  width: var(--icon-lg, 1.5rem);
  height: var(--icon-lg, 1.5rem);
}
.dl-auth-success-text {
  font-size: var(--control-font-size, 0.875rem);
  color: var(--foreground, #e4e4e7);
  margin: 0;
  line-height: 1.5;
}

/* ── Developer Mode Callout ─────────────────────────────────────────── */
.dl-auth-dev-callout {
  margin-top: var(--space-4, 1rem);
  padding: var(--space-3, 0.75rem);
  border-radius: var(--radius-md, calc(var(--radius, 0.75rem) * 0.75));
  background-color: var(--muted-bg, rgba(255, 255, 255, 0.05));
  border: 1px solid var(--border, rgba(255, 255, 255, 0.1));
  text-align: left;
}
.dl-auth-dev-title {
  font-size: var(--label-font-size, 0.8125rem);
  color: var(--primary, #93c5fd);
  font-weight: 600;
  margin: 0 0 var(--space-1-5, 0.375rem) 0;
}
.dl-auth-dev-link {
  font-size: var(--label-font-size, 0.8125rem);
  font-family: var(--font-mono, monospace);
  word-break: break-all;
}
`;
