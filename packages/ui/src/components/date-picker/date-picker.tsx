import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "../../lib/utils";
import { Button } from "../button";
import { Calendar } from "../calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";

export interface DatePickerProps {
  /**
   * The selected date formatted as an ISO string (`YYYY-MM-DD`).
   */
  value?: string;
  /**
   * Callback fired when a date is selected or cleared.
   * @param value - The new date string in `YYYY-MM-DD` format, or empty string if cleared.
   */
  onChange?: (value: string) => void;
  /**
   * Placeholder label rendered when no date is selected.
   * @default "Pick a date"
   */
  placeholder?: string;
  /**
   * Optional custom CSS class name for the trigger button.
   */
  className?: string;
  /**
   * Disables user interaction with the date picker.
   */
  disabled?: boolean;
}

/**
 * Accessible date picker component featuring an interactive popover calendar.
 * Formats dates safely in local timezone to prevent UTC day-shifting.
 * Pure CSS with zero runtime Tailwind dependencies.
 *
 * @example
 * ```tsx
 * const [date, setDate] = useState("2026-09-25");
 *
 * <DatePicker
 *   value={date}
 *   onChange={setDate}
 *   placeholder="Select appointment date"
 * />
 * ```
 */
export function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  className,
  disabled,
}: DatePickerProps) {
  // Parse date safely in local timezone to avoid UTC shifting
  const date = React.useMemo(() => {
    if (!value) return undefined;
    const parts = value.split("-");
    if (parts.length !== 3) {
      const d = new Date(value);
      return isNaN(d.getTime()) ? undefined : d;
    }
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // 0-based month
    const day = parseInt(parts[2], 10);
    return new Date(year, month, day, 12, 0, 0); // Local noon
  }, [value]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          type="button"
          disabled={disabled}
          className={cn(
            "dl-date-picker-trigger",
            !value && "dl-date-picker-trigger--placeholder",
            className,
          )}
        >
          <CalendarIcon className="dl-date-picker-icon" />
          {date && !isNaN(date.getTime()) ? (
            format(date, "PPP")
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="dl-date-picker-content" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) =>
            onChange?.(selectedDate ? format(selectedDate, "yyyy-MM-dd") : "")
          }
          autoFocus
        />
      </PopoverContent>
    </Popover>
  );
}
