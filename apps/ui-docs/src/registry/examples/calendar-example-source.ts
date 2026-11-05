/** Complete source for the interactive Calendar example. */
export const calendarInteractiveExample = `"use client";

import { useState } from "react";
import { Calendar, Stack } from "@yuva-devlab/ui";

export default function Example() {
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
}`;

/** Complete source for the fixed-selected-date Calendar example. */
export const calendarFixedExample = `"use client";

import { Calendar } from "@yuva-devlab/ui";

export default function Example() {
  const selectedDate = new Date();

  return (
    <div className="dl-demo-box dl-demo-box--sm">
      <Calendar mode="single" selected={selectedDate} />
    </div>
  );
}`;
