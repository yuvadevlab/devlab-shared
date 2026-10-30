"use client";

import React, { useState } from "react";
import { Calendar } from "@yuva-devlab/ui";

/**
 * Interactive Client Island for testing date selection on the Calendar component.
 */
export function CalendarInteractiveDemo(): React.JSX.Element {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
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
  );
}
