/** Complete source for the interactive popover date picker. */
export const datePickerBasicExample = `"use client";

import { useState } from "react";
import { DatePicker } from "@yuva-devlab/ui";

export default function Example() {
  const [date, setDate] = useState("2026-10-30");

  return (
    <div className="dl-demo-frame dl-demo-frame--xs">
      <DatePicker
        value={date}
        onChange={setDate}
        placeholder="Select date..."
      />
    </div>
  );
}`;

/** Complete source for the interactive inline Calendar picker. */
export const datePickerInlineCalendarExample = `"use client";

import { useState } from "react";
import { Calendar } from "@yuva-devlab/ui";

export default function Example() {
  const [date, setDate] = useState<Date | undefined>(
    new Date("2026-10-30"),
  );

  return (
    <div className="dl-demo-box dl-demo-box--sm">
      <Calendar mode="single" selected={date} onSelect={setDate} />
    </div>
  );
}`;

/** Complete source for the clearable preselected date picker. */
export const datePickerClearableExample = `"use client";

import { useState } from "react";
import { Button, DatePicker, Flex, Stack } from "@yuva-devlab/ui";

export default function Example() {
  const [date, setDate] = useState("2026-12-25");

  return (
    <Stack gap={3} className="dl-demo-frame dl-demo-frame--xs">
      <Flex align="center" justify="between" className="dl-demo-box--code">
        <span className="dl-demo-caption">Chosen Date:</span>
        <code className="dl-demo-code">{date || "None"}</code>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setDate("")}
        >
          Clear
        </Button>
      </Flex>
      <DatePicker
        value={date}
        onChange={setDate}
        placeholder="Pick a date"
      />
    </Stack>
  );
}`;

/** Complete source for the disabled date picker example. */
export const datePickerDisabledExample = `"use client";

import { DatePicker } from "@yuva-devlab/ui";

export default function Example() {
  return (
    <div className="dl-demo-frame dl-demo-frame--xs">
      <DatePicker
        disabled
        value="2026-10-30"
        placeholder="Locked appointment"
      />
    </div>
  );
}`;
