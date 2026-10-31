"use client";

import * as React from "react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
};

/**
 * Calendar component built on top of react-day-picker, supporting single,
 * multiple, and date-range selection modes.
 * Pure CSS with scoped `.dl-calendar` design tokens.
 *
 * @example
 * ```tsx
 * const [date, setDate] = React.useState<Date | undefined>(new Date());
 *
 * <Calendar
 *   mode="single"
 *   selected={date}
 *   onSelect={setDate}
 * />
 * ```
 */
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: CalendarProps) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("dl-calendar", className)}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("dl-calendar", defaultClassNames.root),
        months: cn("dl-calendar__months", defaultClassNames.months),
        month: cn("dl-calendar__month", defaultClassNames.month),
        nav: cn("dl-calendar__nav", defaultClassNames.nav),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant, size: "icon" }),
          "dl-calendar__nav-button",
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant, size: "icon" }),
          "dl-calendar__nav-button",
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          "dl-calendar__month-caption",
          defaultClassNames.month_caption,
        ),
        dropdowns: cn("dl-calendar__dropdowns", defaultClassNames.dropdowns),
        dropdown_root: cn(
          "dl-calendar__dropdown-root",
          defaultClassNames.dropdown_root,
        ),
        dropdown: cn("dl-calendar__dropdown", defaultClassNames.dropdown),
        caption_label: cn(
          "dl-calendar__caption-label",
          captionLayout !== "label" &&
            "dl-calendar__caption-label--interactive",
          defaultClassNames.caption_label,
        ),
        table: cn("dl-calendar__table", defaultClassNames.month_grid),
        month_grid: cn("dl-calendar__table", defaultClassNames.month_grid),
        weekdays: defaultClassNames.weekdays,
        weekday: defaultClassNames.weekday,
        week: defaultClassNames.week,
        day: defaultClassNames.day,
        range_start: defaultClassNames.range_start,
        range_middle: defaultClassNames.range_middle,
        range_end: defaultClassNames.range_end,
        today: defaultClassNames.today,
        outside: defaultClassNames.outside,
        disabled: defaultClassNames.disabled,
        hidden: defaultClassNames.hidden,
        ...classNames,
      }}
      components={{
        Root: ({ className: rootClassName, rootRef, ...rootProps }) => (
          <div
            data-slot="calendar"
            ref={rootRef}
            className={cn("dl-calendar", rootClassName)}
            {...rootProps}
          />
        ),
        Chevron: ({
          className: chevronClassName,
          orientation,
          ...chevronProps
        }) => {
          const chevronClass = cn("dl-calendar__chevron", chevronClassName);
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={chevronClass} {...chevronProps} />
            );
          }
          if (orientation === "right") {
            return (
              <ChevronRightIcon className={chevronClass} {...chevronProps} />
            );
          }
          return <ChevronDownIcon className={chevronClass} {...chevronProps} />;
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...weekProps }) => (
          <td {...weekProps}>
            <div className="dl-calendar__week-number">{children}</div>
          </td>
        ),
        ...components,
      }}
      {...props}
    />
  );
}

/**
 * Custom day button for Calendar, properly forwarding DayButton props
 * with theme-compliant border radius and active states.
 */
function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers["focused"]) ref.current?.focus();
  }, [modifiers]);

  return (
    <Button
      ref={ref}
      variant={modifiers["selected"] ? "default" : "ghost"}
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected={modifiers["selected"] ? "true" : undefined}
      data-selected-single={
        modifiers["selected"] &&
        !modifiers["range_start"] &&
        !modifiers["range_end"] &&
        !modifiers["range_middle"]
      }
      data-range-start={modifiers["range_start"]}
      data-range-end={modifiers["range_end"]}
      data-range-middle={modifiers["range_middle"]}
      className={cn(
        "dl-calendar__day-button",
        defaultClassNames.day_button,
        className,
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
