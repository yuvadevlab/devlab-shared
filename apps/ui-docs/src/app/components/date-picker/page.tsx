"use client";

import React, { useState } from "react";
import { DatePicker, Calendar, Button } from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
} from "../../../components/component-view";

export default function DatePickerDocPage() {
  const [basicDate, setBasicDate] = useState<string>("2026-10-30");
  const [clearableDate, setClearableDate] = useState<string>("2026-12-25");
  const [calendarDate, setCalendarDate] = useState<Date | undefined>(
    new Date("2026-10-30"),
  );

  const variants: ComponentVariant[] = [
    {
      id: "basic",
      title: "Basic Date Picker (Popover Flyout)",
      description:
        "Standard date picker with interactive dropdown calendar and timezone-safe date parsing.",
      preview: (
        <div className="w-full max-w-xs">
          <DatePicker
            value={basicDate}
            onChange={setBasicDate}
            placeholder="Select date..."
          />
        </div>
      ),
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
      preview: (
        <div className="border border-border rounded-xl bg-card shadow-xs p-1">
          <Calendar
            mode="single"
            selected={calendarDate}
            onSelect={setCalendarDate}
          />
        </div>
      ),
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
      preview: (
        <div className="w-full max-w-xs space-y-3">
          <div className="flex items-center justify-between text-xs bg-muted/40 p-2.5 rounded-lg border border-border">
            <span className="text-muted-foreground">Chosen Date:</span>
            <code className="text-primary font-mono font-semibold">
              {clearableDate || "None"}
            </code>
            <Button
              variant="outline"
              size="sm"
              className="h-6 text-xs px-2"
              onClick={() => setClearableDate("")}
            >
              Clear
            </Button>
          </div>
          <DatePicker
            value={clearableDate}
            onChange={setClearableDate}
            placeholder="Pick a date"
          />
        </div>
      ),
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

  const propsList = [
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

  const cssClasses = [
    {
      name: ".dl-date-picker-trigger",
      description: "Trigger button with calendar icon and input layout.",
    },
    {
      name: ".dl-date-picker-content",
      description:
        "Popover container wrapping the interactive React DayPicker.",
    },
    {
      name: ".dl-date-picker-icon",
      description: "Positioning and sizing for the leading calendar icon.",
    },
  ];

  return (
    <ComponentView
      title="Date Picker"
      description="Accessible date selection components supporting popover calendar flyouts, inline persistent calendars, clearable dates, and disabled states."
      category="Data Entry"
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
