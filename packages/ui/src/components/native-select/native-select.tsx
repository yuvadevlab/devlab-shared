import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Native select control with design-system affordances.
 */
export const NativeSelect = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <div className="dl-native-select" data-slot="native-select">
    <select
      ref={ref}
      className={cn("dl-native-select__control", className)}
      {...props}
    >
      {children}
    </select>
    <ChevronDown
      aria-hidden="true"
      className="dl-native-select__icon"
      focusable="false"
    />
  </div>
));
NativeSelect.displayName = "NativeSelect";
