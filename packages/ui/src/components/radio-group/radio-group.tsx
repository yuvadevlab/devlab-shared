import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export type RadioGroupProps = React.ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Root
>;

/**
 * RadioGroup container component managing a set of mutually exclusive radio options.
 * Built upon Radix UI RadioGroup with pure scoped CSS.
 *
 * @example
 * ```tsx
 * <RadioGroup defaultValue="monthly" onValueChange={setBillingCycle}>
 *   <Flex align="center" gap="2">
 *     <RadioGroupItem value="monthly" id="r1" />
 *     <Label htmlFor="r1">Monthly Billing</Label>
 *   </Flex>
 *   <Flex align="center" gap="2">
 *     <RadioGroupItem value="annual" id="r2" />
 *     <Label htmlFor="r2">Annual Billing (Save 20%)</Label>
 *   </Flex>
 * </RadioGroup>
 * ```
 */
const RadioGroup = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("dl-radio-group", className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

export type RadioGroupItemProps = React.ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Item
>;

/**
 * Individual radio option item within a RadioGroup.
 */
const RadioGroupItem = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn("dl-radio-item", className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="dl-radio-item__indicator">
        <Circle aria-hidden="true" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
