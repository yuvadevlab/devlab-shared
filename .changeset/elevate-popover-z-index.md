---
"@yuva-devlab/ui": patch
---

Elevate popover, datepicker, and select z-index to `--z-popover: 70` over modals

- Update `.dl-popover`, `.dl-date-picker-content`, `.dl-select-content`, and `.dl-dropdown-menu-content` to use `z-index: var(--z-popover, 70)`
- Ensure popovers and floating dropdowns stack above modal dialog overlays (`--z-modal: 60`) when rendered as sibling portals
