import * as React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InputNumberProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange" | "defaultValue" | "prefix"
> {
  /** Numeric value in controlled mode */
  value?: number | null;
  /** Initial numeric value in uncontrolled mode */
  defaultValue?: number;
  /** Callback fired when numeric value changes */
  onChange?: (value: number | null) => void;
  /** Minimum permitted value */
  min?: number;
  /** Maximum permitted value */
  max?: number;
  /** Increment / decrement step size. Defaults to 1 */
  step?: number;
  /** Decimal places precision */
  precision?: number;
  /** Whether the control is non-interactive */
  disabled?: boolean;
  /** Whether to render vertical stepper controls. Defaults to true */
  controls?: boolean;
  /** Optional leading decorative element (e.g. $, #) */
  prefix?: React.ReactNode;
  /** Optional trailing unit label (e.g. px, ms, MB) */
  suffix?: React.ReactNode;
  /** Placeholder hint text */
  placeholder?: string;
  /** Accessible label */
  "aria-label"?: string;
}

/**
 * Precision numeric input control with accessible stepper buttons, min/max guards,
 * and keyboard arrow navigation.
 *
 * @example
 * ```tsx
 * <InputNumber min={1} max={100} step={5} defaultValue={20} suffix="ms" />
 * ```
 */
export const InputNumber = React.forwardRef<HTMLDivElement, InputNumberProps>(
  (
    {
      className,
      value: propValue,
      defaultValue,
      onChange,
      min,
      max,
      step = 1,
      precision,
      disabled = false,
      controls = true,
      prefix,
      suffix,
      placeholder,
      "aria-label": ariaLabel,
      ...props
    },
    ref,
  ) => {
    const isControlled = propValue !== undefined;
    const [internalVal, setInternalVal] = React.useState<number | null>(
      defaultValue ?? null,
    );
    const currentValue = isControlled ? propValue : internalVal;

    const formatNumber = (num: number): number => {
      if (precision !== undefined) {
        return parseFloat(num.toFixed(precision));
      }
      return num;
    };

    const updateValue = (next: number | null) => {
      let resolved = next;
      if (resolved !== null) {
        if (min !== undefined && resolved < min) resolved = min;
        if (max !== undefined && resolved > max) resolved = max;
        resolved = formatNumber(resolved);
      }
      if (!isControlled) {
        setInternalVal(resolved);
      }
      onChange?.(resolved);
    };

    const handleStep = (direction: "up" | "down") => {
      if (disabled) return;
      const base = currentValue ?? (min !== undefined ? min : 0);
      const delta = direction === "up" ? step : -step;
      updateValue(base + delta);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return;
      if (e.key === "ArrowUp") {
        e.preventDefault();
        handleStep("up");
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        handleStep("down");
      }
    };

    const isUpDisabled =
      disabled ||
      (max !== undefined &&
        currentValue !== null &&
        currentValue !== undefined &&
        currentValue >= max);
    const isDownDisabled =
      disabled ||
      (min !== undefined &&
        currentValue !== null &&
        currentValue !== undefined &&
        currentValue <= min);

    return (
      <div
        ref={ref}
        className={cn(
          "dl-input-number",
          disabled && "dl-input-number--disabled",
          className,
        )}
        {...props}
      >
        {prefix && <span className="dl-input-number__prefix">{prefix}</span>}
        <input
          type="text"
          inputMode="decimal"
          role="spinbutton"
          aria-label={ariaLabel}
          aria-valuenow={currentValue ?? undefined}
          aria-valuemin={min}
          aria-valuemax={max}
          disabled={disabled}
          placeholder={placeholder}
          value={
            currentValue !== null && currentValue !== undefined
              ? String(currentValue)
              : ""
          }
          onChange={(e) => {
            const raw = e.target.value.trim();
            if (raw === "") {
              updateValue(null);
              return;
            }
            const parsed = parseFloat(raw);
            if (!Number.isNaN(parsed)) {
              updateValue(parsed);
            }
          }}
          onKeyDown={handleKeyDown}
          className="dl-input-number__input"
        />
        {suffix && <span className="dl-input-number__suffix">{suffix}</span>}
        {controls && (
          <div className="dl-input-number__controls">
            <button
              type="button"
              tabIndex={-1}
              disabled={isUpDisabled}
              onClick={() => handleStep("up")}
              aria-label="Increment value"
              className="dl-input-number__btn dl-input-number__btn--up"
            >
              <ChevronUp className="size-3" />
            </button>
            <button
              type="button"
              tabIndex={-1}
              disabled={isDownDisabled}
              onClick={() => handleStep("down")}
              aria-label="Decrement value"
              className="dl-input-number__btn dl-input-number__btn--down"
            >
              <ChevronDown className="size-3" />
            </button>
          </div>
        )}
      </div>
    );
  },
);

InputNumber.displayName = "InputNumber";
