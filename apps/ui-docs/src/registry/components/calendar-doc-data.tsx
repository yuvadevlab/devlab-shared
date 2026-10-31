import React from "react";
import { Calendar } from "@yuva-devlab/ui";
import { CalendarInteractiveDemo } from "@/registry/components/calendar-interactive-demo";
import type { ComponentVariant } from "@/components/demo-card";
import type {
  PropDefinition,
  CssClassDefinition,
} from "@/components/api-table";

export const CALENDAR_VARIANTS: ComponentVariant[] = [
  {
    id: "single",
    title: "Interactive Date Picker View",
    description:
      "Full month grid with keyboard accessibility and day selection.",
    preview: <CalendarInteractiveDemo />,
    codeSnippet: `const [date, setDate] = useState<Date | undefined>(new Date());

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
/>`,
  },
  {
    id: "fixed",
    title: "Fixed Today Highlight",
    description:
      "Inline calendar view displaying current date marker and month navigation.",
    preview: (
      <div className="dl-demo-box dl-demo-box--sm">
        <Calendar mode="single" selected={new Date()} />
      </div>
    ),
    codeSnippet: `<Calendar
  mode="single"
  selected={new Date()}
/>`,
  },
];

export const CALENDAR_PROPS: PropDefinition[] = [
  {
    name: "mode",
    type: '"single" | "range" | "multiple"',
    default: '"single"',
    description: "Date selection mode.",
  },
  {
    name: "selected",
    type: "Date | Date[] | DateRange",
    default: "undefined",
    description: "Currently selected date or range.",
  },
  {
    name: "onSelect",
    type: "function",
    default: "undefined",
    description: "Event handler callback triggered upon selecting a date.",
  },
];

export const CALENDAR_CSS: CssClassDefinition[] = [
  {
    name: ".dl-calendar",
    description: "Root grid container for month, day labels, and day cells.",
  },
  {
    name: ".dl-calendar-day_selected",
    description: "Primary theme background highlighting the chosen day.",
  },
];
