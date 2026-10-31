"use client";

import * as React from "react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker";

import { cn } from "../../lib/utils";
import { Button, buttonVariants } from "../button";

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
      className={cn("dl-calendar group/calendar", className)}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("dl-calendar w-fit", defaultClassNames.root),
        months: cn(
          "relative flex flex-col gap-4 md:flex-row",
          defaultClassNames.months,
        ),
        month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          defaultClassNames.nav,
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant, size: "icon" }),
          "select-none p-0 aria-disabled:opacity-50",
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant, size: "icon" }),
          "select-none p-0 aria-disabled:opacity-50",
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          "flex w-full items-center justify-center",
          defaultClassNames.month_caption,
        ),
        dropdowns: cn(
          "flex w-full items-center justify-center gap-1.5 text-sm font-medium",
          defaultClassNames.dropdowns,
        ),
        dropdown_root: cn(
          "relative rounded-md border border-input shadow-xs",
          defaultClassNames.dropdown_root,
        ),
        dropdown: cn(
          "bg-popover absolute inset-0 opacity-0",
          defaultClassNames.dropdown,
        ),
        caption_label: cn(
          "select-none font-medium text-sm",
          captionLayout === "label"
            ? "text-sm"
            : "flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm",
          defaultClassNames.caption_label,
        ),
        table: cn("w-full border-collapse", defaultClassNames.month_grid),
        month_grid: cn("w-full border-collapse", defaultClassNames.month_grid),
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
          if (orientation === "left") {
            return (
              <ChevronLeftIcon
                className={cn("size-4", chevronClassName)}
                {...chevronProps}
              />
            );
          }
          if (orientation === "right") {
            return (
              <ChevronRightIcon
                className={cn("size-4", chevronClassName)}
                {...chevronProps}
              />
            );
          }
          return (
            <ChevronDownIcon
              className={cn("size-4", chevronClassName)}
              {...chevronProps}
            />
          );
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...weekProps }) => (
          <td {...weekProps}>
            <div className="flex size-(--cell-size) items-center justify-center text-center">
              {children}
            </div>
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
        "dl-calendar__day-button flex aspect-square items-center justify-center font-normal leading-none",
        defaultClassNames.day_button,
        className,
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
