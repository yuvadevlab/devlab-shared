import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Button visual variant and size configurations using scoped `dl-btn` CSS classes.
 * Compatible with Class Variance Authority (CVA).
 */
const buttonVariants = cva("dl-btn", {
  variants: {
    variant: {
      default: "dl-btn--default",
      destructive: "dl-btn--destructive",
      outline: "dl-btn--outline",
      secondary: "dl-btn--secondary",
      ghost: "dl-btn--ghost",
      link: "dl-btn--link",
    },
    size: {
      default: "dl-btn--md",
      sm: "dl-btn--sm",
      lg: "dl-btn--lg",
      icon: "dl-btn--icon",
    },
  },
  defaultVariants: { variant: "default", size: "default" },
});

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * If true, delegates rendering to the direct child element via Radix Slot.
   * Useful when composing with Next.js Link or custom router anchors.
   * @default false
   */
  asChild?: boolean;
  /**
   * Content to render inside the button.
   */
  children?: React.ReactNode;
}

/**
 * Primary interactive button component for triggering actions, submitting forms, or navigation.
 *
 * @example
 * ```tsx
 * // Default button
 * <Button onClick={handleClick}>Click me</Button>
 *
 * // Destructive action
 * <Button variant="destructive" size="sm">Delete Record</Button>
 *
 * // Composed as a link using Next.js Link
 * <Button asChild variant="outline">
 *   <Link href="/dashboard">Go to Dashboard</Link>
 * </Button>
 * ```
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
