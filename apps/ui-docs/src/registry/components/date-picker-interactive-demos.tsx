"use client";

import React, { useState } from "react";
import { DatePicker, Calendar, Button } from "@yuva-devlab/ui";

/**
 * Interactive Client Island for basic flyout popover date picking.
 */
export function BasicDatePickerDemo(): React.JSX.Element {
  const [basicDate, setBasicDate] = useState<string>("2026-10-30");

  return (
    <div className="w-full max-w-xs">
      <DatePicker
        value={basicDate}
        onChange={setBasicDate}
        placeholder="Select date..."
      />
    </div>
  );
}

/**
 * Interactive Client Island for persistent inline calendar date selection.
 */
export function InlineCalendarDatePickerDemo(): React.JSX.Element {
  const [calendarDate, setCalendarDate] = useState<Date | undefined>(
    new Date("2026-10-30"),
  );

  return (
    <div className="border border-border rounded-xl bg-card shadow-xs p-1">
      <Calendar
        mode="single"
        selected={calendarDate}
        onSelect={setCalendarDate}
      />
    </div>
  );
}

/**
 * Interactive Client Island for clearable date picker demo.
 */
export function ClearableDatePickerDemo(): React.JSX.Element {
  const [clearableDate, setClearableDate] = useState<string>("2026-12-25");

  return (
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
  );
}
