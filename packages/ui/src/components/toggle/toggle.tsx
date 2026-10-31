import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const toggleVariants = cva("dl-toggle", {
  variants: {
    variant: {
      default: "dl-toggle--variant-default",
      outline: "dl-toggle--variant-outline",
    },
    size: {
      default: "dl-toggle--size-default",
      sm: "dl-toggle--size-sm",
      lg: "dl-toggle--size-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export type ToggleProps = React.ComponentPropsWithoutRef<
  typeof TogglePrimitive.Root
> &
  VariantProps<typeof toggleVariants>;

/**
 * A two-state button that can be either on or off.
 *
 * @example
 * ```tsx
 * <Toggle aria-label="Toggle italic">
 *   <Italic />
 * </Toggle>
 * ```
 */
const Toggle = React.forwardRef<
  React.ComponentRef<typeof TogglePrimitive.Root>,
  ToggleProps
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
