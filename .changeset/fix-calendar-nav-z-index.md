---
"@yuva-devlab/ui": patch
---

Fix Calendar month navigation buttons clickability and DatePicker initial month

- Add `pointer-events: none` to `.dl-calendar__month-caption` container and `pointer-events: auto` to caption labels and buttons so the caption container cannot block clicks to the previous/next month navigation buttons.
- Set `z-index: 10` and `position: relative` on `.dl-calendar__nav-button` and navigation container.
- Pass `defaultMonth={date}` in `DatePicker` to ensure the calendar views the selected month when opened.
