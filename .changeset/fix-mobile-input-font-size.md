---
"@yuva-devlab/tokens": patch
"@yuva-devlab/ui": patch
---

fix(tokens): remove pointer:coarse font-size override causing mobile input zoom

Remove the `@media (pointer: coarse)` rule that forced `font-size: 1rem` on
form inputs, which caused iOS Safari to zoom on focus and inputs to render
larger than intended in mobile DevTools emulation.

Add `-webkit-text-size-adjust: 100%` to the root to prevent iOS Safari
automatic text resizing on orientation change.

Affected packages:

- `@yuva-devlab/tokens` — root.ts, root-generator.ts cleanup
- `@yuva-devlab/ui` — input, select, textarea, button, and all form component
  CSS updated for correct mobile sizing without the coarse-pointer override
