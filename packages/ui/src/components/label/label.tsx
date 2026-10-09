import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const labelVariants = cva("dl-label");

export interface LabelProps
  extends
    React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {
  /**
   * If true, displays a red required asterisk indicator next to the label.
   * By default, required is false and no asterisk is rendered.
   * @default false
   */
  required?: boolean;
}

/**
 * Accessible label component associated with input controls, checkboxes, or form fields.
 * Built upon Radix UI Label primitive with design token typography and disabled styling.
 * Zero Tailwind runtime dependencies.
 *
 * @example
 * ```tsx
 * // Associated with an Input via htmlFor
 * <div className="grid gap-1.5">
 *   <Label htmlFor="email">Email address</Label>
 *   <Input id="email" type="email" placeholder="name@company.com" />
 * </div>
 * ```
 */
const Label = React.forwardRef<
  React.ComponentRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, children, required = false, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  >
    {children}
    {required && (
      <span className="dl-label-required text-destructive ml-0.5">*</span>
    )}
  </LabelPrimitive.Root>
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label, labelVariants };
