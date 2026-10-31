import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type CheckboxProps = React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
>;

/**
 * Accessible binary selection control built upon Radix UI Checkbox.
 * Supports checked, unchecked, and indeterminate states with smooth micro-animations.
 *
 * @example
 * ```tsx
 * // Basic checkbox with associated label
 * <Flex align="center" gap="2">
 *   <Checkbox id="terms" checked={agreed} onCheckedChange={setAgreed} />
 *   <Label htmlFor="terms">Accept terms and conditions</Label>
 * </Flex>
 *
 * // Disabled checkbox
 * <Checkbox disabled checked />
 * ```
 */
const Checkbox = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn("dl-checkbox", className)}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="dl-checkbox-indicator">
      <Check className="dl-checkbox-icon" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
