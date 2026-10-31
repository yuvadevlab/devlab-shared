"use client";

import React, { useState } from "react";
import { DatePicker, Calendar, Button, Flex, Stack } from "@yuva-devlab/ui";

/**
 * Interactive Client Island for basic flyout popover date picking.
 */
export function BasicDatePickerDemo(): React.JSX.Element {
  const [basicDate, setBasicDate] = useState<string>("2026-10-30");

  return (
    <div className="dl-demo-frame dl-demo-frame--xs">
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
    <div className="dl-demo-box dl-demo-box--sm">
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
    <Stack gap={3} className="dl-demo-frame dl-demo-frame--xs">
      <Flex align="center" justify="between" className="dl-demo-box--code">
        <span className="dl-demo-caption">Chosen Date:</span>
        <code className="dl-demo-code">{clearableDate || "None"}</code>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setClearableDate("")}
        >
          Clear
        </Button>
      </Flex>
      <DatePicker
        value={clearableDate}
        onChange={setClearableDate}
        placeholder="Pick a date"
      />
    </Stack>
  );
}
