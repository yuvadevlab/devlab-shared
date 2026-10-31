"use client";

import React, { useState } from "react";
import { Calendar, Stack } from "@yuva-devlab/ui";

/**
 * Interactive Client Island for testing date selection on the Calendar component.
 */
export function CalendarInteractiveDemo(): React.JSX.Element {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Stack align="center" gap={3}>
      <div className="dl-demo-box dl-demo-box--sm">
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </div>
      <p className="dl-demo-code">
        Selected: {date ? date.toDateString() : "None"}
      </p>
    </Stack>
  );
}
