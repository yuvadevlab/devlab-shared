import React from "react";
import { DatePicker } from "@yuva-devlab/ui";
import {
  BasicDatePickerDemo,
  InlineCalendarDatePickerDemo,
  ClearableDatePickerDemo,
} from "./date-picker-interactive-demos";
import type { ComponentVariant } from "@/components/demo-card";
import type {
  PropDefinition,
  CssClassDefinition,
} from "@/components/api-table";

export const DATE_PICKER_VARIANTS: ComponentVariant[] = [
  {
    id: "basic",
    title: "Basic Date Picker (Popover Flyout)",
    description:
      "Standard date picker with interactive dropdown calendar and timezone-safe date parsing.",
    preview: <BasicDatePickerDemo />,
    codeSnippet: `<DatePicker
  value={date}
  onChange={setDate}
  placeholder="Select date..."
/>`,
  },
  {
    id: "inline-calendar",
    title: "Inline Calendar View",
    description:
      "AntD-inspired full calendar displayed directly in the view for persistent date selection.",
    preview: <InlineCalendarDatePickerDemo />,
    codeSnippet: `import { Calendar } from "@yuva-devlab/ui";

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
/>`,
  },
  {
    id: "clearable",
    title: "Preselected & Clearable",
    description:
      "Controlled value with clear action to reset the chosen date back to empty.",
    preview: <ClearableDatePickerDemo />,
    codeSnippet: `<DatePicker
  value={date}
  onChange={setDate}
  placeholder="Pick a date"
/>
<Button onClick={() => setDate("")}>Clear</Button>`,
  },
  {
    id: "disabled",
    title: "Disabled State",
    description:
      "Disables opening the popover calendar and displays subdued trigger styling.",
    preview: (
      <div className="w-full max-w-xs">
        <DatePicker
          disabled
          value="2026-10-30"
          placeholder="Locked appointment"
        />
      </div>
    ),
    codeSnippet: `<DatePicker disabled value="2026-10-30" />`,
  },
];

export const DATE_PICKER_PROPS: PropDefinition[] = [
  {
    name: "value",
    type: "string",
    default: "undefined",
    description: "Selected date formatted as ISO string (YYYY-MM-DD).",
  },
  {
    name: "onChange",
    type: "(value: string) => void",
    default: "undefined",
    description: "Callback fired when a date is selected or cleared.",
  },
  {
    name: "placeholder",
    type: "string",
    default: '"Pick a date"',
    description: "Placeholder text rendered when no date is selected.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables user interaction with the date picker.",
  },
];

export const DATE_PICKER_CSS: CssClassDefinition[] = [
  {
    name: ".dl-date-picker-trigger",
    description: "Trigger button with calendar icon and input layout.",
  },
  {
    name: ".dl-date-picker-content",
    description: "Popover container wrapping the interactive React DayPicker.",
  },
  {
    name: ".dl-date-picker-icon",
    description: "Positioning and sizing for the leading calendar icon.",
  },
];
