---
"@yuva-devlab/ui": patch
"@yuva-devlab/ai-client": patch
---

Resolve DatePicker navigation clickability and update default Gemini model fallback

- Ensure DatePicker previous/next month navigation buttons have proper pointer-events and z-index positioning in calendar.css
- Update default Google AI Studio model fallback in `@yuva-devlab/ai-client` to `gemini-2.5-flash`
