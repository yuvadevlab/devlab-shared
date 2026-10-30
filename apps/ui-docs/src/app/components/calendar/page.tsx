"use client";

import React, { useState } from "react";
import { Calendar } from "@yuva-devlab/ui";
import {
  ComponentView,
  ComponentVariant,
} from "../../../components/component-view";

/**
 * Documentation page for Calendar component showcasing interactive single and preselected views.
 */
export default function CalendarDocPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const variants: ComponentVariant[] = [
    {
      id: "single",
      title: "Interactive Date Picker View",
      description:
        "Full month grid with keyboard accessibility and day selection.",
      preview: (
        <div className="flex flex-col items-center gap-3">
          <div className="border border-border rounded-xl bg-card shadow-xs p-1">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-lg"
            />
          </div>
          <p className="text-xs text-muted-foreground font-mono">
            Selected: {date ? date.toDateString() : "None"}
          </p>
        </div>
      ),
      codeSnippet: `const [date, setDate] = useState<Date | undefined>(new Date());

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-lg border"
/>`,
    },
    {
      id: "fixed",
      title: "Fixed Today Highlight",
      description:
        "Inline calendar view displaying current date marker and month navigation.",
      preview: (
        <div className="border border-border rounded-xl bg-card shadow-xs p-1">
          <Calendar
            mode="single"
            selected={new Date()}
            className="rounded-lg"
          />
        </div>
      ),
      codeSnippet: `<Calendar
  mode="single"
  selected={new Date()}
  className="rounded-lg border"
/>`,
    },
  ];

  const propsList = [
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

  const cssClasses = [
    {
      name: ".dl-calendar",
      description: "Root grid container for month, day labels, and day cells.",
    },
    {
      name: ".dl-calendar-day_selected",
      description: "Primary theme background highlighting the chosen day.",
    },
  ];

  return (
    <ComponentView
      title="Calendar"
      description="A clean, accessible date field and calendar component for selecting dates and date ranges, inspired by Ant Design's Calendar."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
