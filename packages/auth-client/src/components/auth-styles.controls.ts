/**
 * @file packages/auth-client/src/components/auth-styles.controls.ts
 * @description Form controls, buttons, icons, and interactive elements for auth views.
 * @module @yuva-devlab/auth-client
 */

export const AUTH_CONTROL_STYLES = `
/* ── Form Layout ────────────────────────────────────────────────────── */
.dl-auth-form {
  display: flex;
  flex-direction: column;
  gap: var(--form-field-gap, var(--space-4, 1rem));
}

/* ── Input Control & Icons ──────────────────────────────────────────── */
.dl-auth-input-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-1-5, 0.375rem);
}
.dl-auth-label {
  font-size: var(--label-font-size, 0.8125rem);
  font-weight: 500;
  color: var(--foreground, #d4d4d8);
  line-height: 1.25;
}
.dl-auth-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}
.dl-auth-input-icon {
  position: absolute;
  left: var(--space-3, 0.75rem);
  top: 50%;
  transform: translateY(-50%);
  color: var(--muted-foreground, #71717a);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 1;
}
.dl-auth-input-icon svg { width: var(--icon-sm, 1rem); height: var(--icon-sm, 1rem); flex-shrink: 0; }
.dl-auth-eye-btn {
  position: absolute;
  right: var(--space-3, 0.75rem);
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: var(--muted-foreground, #71717a);
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.15s ease;
}
.dl-auth-eye-btn:hover { color: var(--foreground, #fafafa); }
.dl-auth-eye-btn:focus-visible {
  outline: 2px solid var(--ring, var(--primary));
  outline-offset: 2px;
  border-radius: 2px;
}
.dl-auth-eye-btn svg { width: var(--icon-sm, 1rem); height: var(--icon-sm, 1rem); flex-shrink: 0; }
.dl-auth-input {
  width: 100%;
  height: var(--control-height-md, 2.375rem);
  padding-block: 0;
  padding-inline: var(--space-3, 0.75rem);
  background-color: var(--input, var(--card, #18181b));
  border: 1px solid var(--border, #3f3f46);
  border-radius: var(--radius-md, calc(var(--radius, 0.75rem) * 0.75));
  color: var(--foreground, #fafafa);
  font-size: var(--control-font-size, 0.875rem);
  font-family: inherit;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
.dl-auth-input--has-icon { padding-inline-start: calc(var(--icon-sm, 1rem) + var(--space-4, 1rem)); }
.dl-auth-input--has-eye { padding-inline-end: calc(var(--icon-sm, 1rem) + var(--space-4, 1rem)); }
.dl-auth-input::placeholder { color: var(--muted-foreground, #71717a); opacity: 0.8; }
.dl-auth-input:focus, .dl-auth-input:focus-visible {
  outline: none;
  border-color: var(--ring, var(--primary, #2563eb));
  box-shadow: 0 0 0 2px color-mix(in oklab, var(--ring, var(--primary, #2563eb)) 30%, transparent),
    var(--glow-primary, 0 0 0 0 transparent);
}
.dl-auth-input:disabled { opacity: 0.5; cursor: not-allowed; }

/* ── Primary Action Button ──────────────────────────────────────────── */
.dl-auth-submit-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2, 0.5rem);
  width: 100%;
  height: var(--control-height-lg, 2.75rem);
  margin-top: var(--space-2, 0.5rem);
  padding-inline: var(--space-4, 1rem);
  background-color: var(--primary, #2563eb);
  color: var(--primary-foreground, #ffffff);
  font-weight: 600;
  font-size: var(--control-font-size, 0.875rem);
  font-family: inherit;
  border: 1px solid transparent;
  border-radius: var(--radius-md, calc(var(--radius, 0.75rem) * 0.75));
  cursor: pointer;
  box-shadow: var(--glow-primary, 0 1px 2px rgb(0 0 0 / 0.08));
  box-sizing: border-box;
  transition: background-color 0.15s ease, opacity 0.15s ease, box-shadow 0.15s ease;
}
.dl-auth-submit-btn:hover:not(:disabled) {
  background-color: color-mix(in oklab, var(--primary, #2563eb) 88%, black);
}
.dl-auth-submit-btn:focus-visible {
  outline: 2px solid var(--ring, var(--primary, #2563eb));
  outline-offset: 2px;
}
.dl-auth-submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }
.dl-auth-submit-btn svg { width: var(--icon-sm, 1rem); height: var(--icon-sm, 1rem); flex-shrink: 0; }

/* ── Links & Footer ─────────────────────────────────────────────────── */
.dl-auth-link {
  color: var(--primary, #60a5fa);
  text-decoration: none;
  font-weight: 500;
  font-size: var(--link-font-size, 0.8125rem);
  transition: color 0.15s ease, text-decoration 0.15s ease;
}
.dl-auth-link:hover {
  text-decoration: underline;
  color: color-mix(in oklab, var(--primary, #60a5fa) 85%, white);
}
.dl-auth-link:focus-visible {
  outline: 2px solid var(--ring, var(--primary));
  outline-offset: 2px;
  border-radius: calc(var(--radius, 0.75rem) * 0.25);
}
.dl-auth-link--back {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1-5, 0.375rem);
}
.dl-auth-password-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--space-1, 0.25rem);
}
.dl-auth-forgot-wrapper {
  display: flex;
  justify-content: flex-end;
}
.dl-auth-footer {
  margin-top: var(--space-6, 1.5rem);
  text-align: center;
  font-size: var(--link-font-size, 0.8125rem);
  color: var(--muted-foreground, #a1a1aa);
}
.dl-auth-footer-text {
  color: var(--muted-foreground, #71717a);
  font-size: var(--label-font-size, 0.8125rem);
}
`;
