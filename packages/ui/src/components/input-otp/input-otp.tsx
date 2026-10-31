import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Minus } from "lucide-react";

import { cn } from "@/lib/utils";

export type InputOTPProps = React.ComponentPropsWithoutRef<typeof OTPInput>;

/**
 * Accessible One-Time Password (OTP) input component with pin slots and fake carets.
 * Built upon the `input-otp` primitive with scoped token styling.
 *
 * @example
 * ```tsx
 * <InputOTP maxLength={6} value={value} onChange={setValue}>
 *   <InputOTPGroup>
 *     <InputOTPSlot index={0} />
 *     <InputOTPSlot index={1} />
 *     <InputOTPSlot index={2} />
 *   </InputOTPGroup>
 *   <InputOTPSeparator />
 *   <InputOTPGroup>
 *     <InputOTPSlot index={3} />
 *     <InputOTPSlot index={4} />
 *     <InputOTPSlot index={5} />
 *   </InputOTPGroup>
 * </InputOTP>
 * ```
 */
const InputOTP = React.forwardRef<
  React.ComponentRef<typeof OTPInput>,
  InputOTPProps
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn("dl-input-otp-container", containerClassName)}
    className={cn("dl-input-otp", className)}
    {...props}
  />
));
InputOTP.displayName = "InputOTP";

/** Group container for bundling adjacent OTP slots. */
const InputOTPGroup = React.forwardRef<
  React.ComponentRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("dl-input-otp-group", className)} {...props} />
));
InputOTPGroup.displayName = "InputOTPGroup";

export interface InputOTPSlotProps extends React.ComponentPropsWithoutRef<"div"> {
  /** The zero-indexed position of this character slot. */
  index: number;
}

/** Individual digit/character slot displaying user input or an animated caret. */
const InputOTPSlot = React.forwardRef<
  React.ComponentRef<"div">,
  InputOTPSlotProps
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index] ?? {
    char: null,
    hasFakeCaret: false,
    isActive: false,
  };

  return (
    <div
      ref={ref}
      className={cn(
        "dl-input-otp-slot",
        isActive && "dl-input-otp-slot--active",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="dl-input-otp-caret">
          <div className="dl-input-otp-caret__line" />
        </div>
      )}
    </div>
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

/** Divider component between OTP groups. */
const InputOTPSeparator = React.forwardRef<
  React.ComponentRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Minus />
  </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
