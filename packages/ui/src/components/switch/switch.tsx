import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

export type SwitchProps = React.ComponentPropsWithoutRef<
  typeof SwitchPrimitives.Root
>;

/**
 * Interactive toggle control that allows users to switch between on and off states.
 * Powered by Radix UI Switch primitive with scoped CSS transitions and token styling.
 *
 * @example
 * ```tsx
 * // Basic toggle switch
 * <div className="flex items-center justify-between">
 *   <Label htmlFor="airplane-mode">Airplane Mode</Label>
 *   <Switch id="airplane-mode" checked={enabled} onCheckedChange={setEnabled} />
 * </div>
 *
 * // Disabled state
 * <Switch disabled checked={false} />
 * ```
 */
const Switch = React.forwardRef<
  React.ComponentRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn("dl-switch", className)}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb className="dl-switch__thumb" />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
