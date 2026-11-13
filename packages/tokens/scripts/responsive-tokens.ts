/**
 * @file scripts/responsive-tokens.ts
 * @description 3-screen responsive CSS custom property overrides for
 * control dimensions, form primitives, typography, and component sizing.
 * Inlined into root.css by the token generator.
 *
 * Screen 1 (Mobile <768px) — MOBILE_COMPONENT_TOKENS inlined in :root.
 * Screen 2 (Tablet 768–1023px) — TABLET_OVERRIDES @media block.
 * Screen 3 (Desktop 1024px+) — DESKTOP_OVERRIDES @media block.
 */

/**
 * Mobile (default) component sizing tokens.
 * Injected directly into the :root block in root.css.
 */
export const MOBILE_COMPONENT_TOKENS = `
    /* Form Controls — Checkbox / Radio / Switch (Mobile) */
    --checkbox-size: 1rem;
    --radio-size: 1rem;
    --switch-width: 2.25rem;
    --switch-height: 1.25rem;
    --switch-thumb-size: 1rem;
    --switch-thumb-translate: 1rem;

    /* Badge */
    --badge-font-size: 0.6875rem;
    --badge-py: 0.125rem;
    --badge-px: 0.5rem;

    /* Tabs */
    --tabs-trigger-px: 0.625rem;
    --tabs-trigger-font-size: var(--text-body-sm, 0.8125rem);

    /* Calendar / DatePicker */
    --calendar-cell-size: 1.875rem;
    --calendar-font-size: var(--text-body-sm, 0.8125rem);

    /* Command palette */
    --command-input-height: var(--control-height-lg, 2.5rem);
    --command-item-font-size: var(--text-body-sm, 0.8125rem);

    /* Slider */
    --slider-track-height: 0.3125rem;
    --slider-thumb-size: 1.125rem;

    /* Multi-select */
    --multi-select-trigger-font-size: var(--text-body-sm, 0.8125rem);
    --multi-select-chip-font-size: 0.6875rem;
    --multi-select-search-height: var(--input-height-sm, 1.875rem);

    /* Searchable-select */
    --searchable-select-item-font-size: var(--text-body-sm, 0.8125rem);
    --searchable-select-list-font-size: var(--text-body-sm, 0.8125rem);
    --searchable-select-group-header-font-size: 0.5625rem;`;

/** Tablet overrides — all component sizing tokens at 768px+ */
export const TABLET_OVERRIDES = `
  /* ── Screen 2: Tablet (768px - 1023px) ─────────────────────────────────── */
  @media (min-width: 768px) {
    :root {
      /* Controls */
      --control-height-xs: 1.75rem;
      --control-height-sm: 2rem;
      --control-height-md: 2.125rem;
      --control-height-lg: 2.5rem;
      --control-height-xl: 3rem;
      --control-px: 0.6875rem;
      --control-py: 0.25rem;
      /* Inputs */
      --input-height-sm: 1.875rem;
      --input-height-md: 2.125rem;
      --input-height-lg: 2.5rem;
      --input-px: 0.6875rem;
      --input-py: 0.25rem;
      --input-font-size: var(--text-body-sm, 0.8125rem);
      --input-icon-offset: 0.6875rem;
      --input-icon-padding: 2.125rem;
      /* Checkbox / Radio / Switch */
      --checkbox-size: 1.0625rem;
      --radio-size: 1.0625rem;
      --switch-width: 2.5rem;
      --switch-height: 1.375rem;
      --switch-thumb-size: 1.125rem;
      --switch-thumb-translate: 1.125rem;
      /* Badge */
      --badge-font-size: 0.6875rem;
      --badge-px: 0.5625rem;
      /* Tabs */
      --tabs-trigger-px: 0.75rem;
      --tabs-trigger-font-size: var(--text-body-sm, 0.875rem);
      /* Calendar */
      --calendar-cell-size: 2rem;
      --calendar-font-size: var(--text-body-sm, 0.875rem);
      /* Command */
      --command-item-font-size: var(--text-body-sm, 0.875rem);
      /* Slider */
      --slider-track-height: 0.375rem;
      --slider-thumb-size: 1.25rem;
      /* Multi-select */
      --multi-select-trigger-font-size: var(--text-body-sm, 0.875rem);
      --multi-select-chip-font-size: 0.6875rem;
      --multi-select-search-height: var(--input-height-sm, 2rem);
      /* Searchable-select */
      --searchable-select-item-font-size: var(--text-body-sm, 0.875rem);
      --searchable-select-list-font-size: var(--text-body-sm, 0.875rem);
      --searchable-select-group-header-font-size: 0.625rem;
    }
  }`;

/** Desktop overrides — all component sizing tokens at 1024px+ */
export const DESKTOP_OVERRIDES = `
  /* ── Screen 3: Desktop (1024px+) ───────────────────────────────────────── */
  @media (min-width: 1024px) {
    :root {
      /* Controls */
      --control-height-xs: 1.75rem;
      --control-height-sm: 2rem;
      --control-height-md: 2.125rem;
      --control-height-lg: 2.5rem;
      --control-height-xl: 3.25rem;
      --control-px: 0.75rem;
      --control-py: 0.25rem;
      /* Inputs */
      --input-height-sm: 1.875rem;
      --input-height-md: 2.125rem;
      --input-height-lg: 2.5rem;
      --input-px: 0.75rem;
      --input-py: 0.25rem;
      --input-font-size: var(--text-body-sm, 0.8125rem);
      --input-icon-offset: 0.75rem;
      --input-icon-padding: 2.25rem;
      /* Checkbox / Radio / Switch */
      --checkbox-size: 1.125rem;
      --radio-size: 1.125rem;
      --switch-width: 2.75rem;
      --switch-height: 1.5rem;
      --switch-thumb-size: 1.25rem;
      --switch-thumb-translate: 1.25rem;
      /* Badge */
      --badge-font-size: 0.75rem;
      --badge-px: 0.625rem;
      /* Tabs */
      --tabs-trigger-px: 0.875rem;
      --tabs-trigger-font-size: var(--text-body-sm, 0.875rem);
      /* Calendar */
      --calendar-cell-size: 2.125rem;
      --calendar-font-size: var(--text-body-sm, 0.875rem);
      /* Command */
      --command-item-font-size: var(--text-body-sm, 0.875rem);
      /* Slider */
      --slider-track-height: 0.375rem;
      --slider-thumb-size: 1.25rem;
      /* Multi-select */
      --multi-select-trigger-font-size: var(--text-body-sm, 0.875rem);
      --multi-select-chip-font-size: 0.75rem;
      --multi-select-search-height: var(--input-height-sm, 2rem);
      /* Searchable-select */
      --searchable-select-item-font-size: var(--text-body-sm, 0.875rem);
      --searchable-select-list-font-size: var(--text-body-sm, 0.875rem);
      --searchable-select-group-header-font-size: 0.625rem;
    }
  }`;
