"use client";

import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
  Button,
} from "@yuva-devlab/ui";
import { ComponentView, ComponentVariant } from "@/components/component-view";

/**
 * Documentation page for InputOTP component showcasing 6-digit split and 4-digit PIN inputs.
 */
export default function InputOTPDocPage() {
  const [val6, setVal6] = useState("492");
  const [val4, setVal4] = useState("80");

  const variants: ComponentVariant[] = [
    {
      id: "six-digit",
      title: "6-Digit Verification with Separator",
      description:
        "Two 3-digit groups separated by a dash delimiter, typical for SMS or authenticator 2FA.",
      preview: (
        <div className="flex flex-col items-center gap-4">
          <InputOTP maxLength={6} value={val6} onChange={setVal6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground font-mono">
              Entered:{" "}
              <strong className="text-primary">{val6 || "None"}</strong>
            </span>
            <Button
              size="sm"
              variant="outline"
              className="h-7 text-xs"
              onClick={() => setVal6("")}
            >
              Reset
            </Button>
          </div>
        </div>
      ),
      codeSnippet: `<InputOTP maxLength={6} value={value} onChange={setValue}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`,
    },
    {
      id: "four-digit",
      title: "4-Digit Security PIN",
      description:
        "Compact 4-digit code entry suitable for transaction authorizations and quick passcodes.",
      preview: (
        <div className="flex flex-col items-center gap-4">
          <InputOTP maxLength={4} value={val4} onChange={setVal4}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>

          <span className="text-xs text-muted-foreground font-mono">
            PIN: <strong className="text-primary">{val4 || "None"}</strong>
          </span>
        </div>
      ),
      codeSnippet: `<InputOTP maxLength={4} value={pin} onChange={setPin}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
  </InputOTPGroup>
</InputOTP>`,
    },
  ];

  const propsList = [
    {
      name: "maxLength",
      type: "number",
      default: "6",
      description:
        "Total character capacity of the one-time passcode sequence.",
    },
    {
      name: "value",
      type: "string",
      default: "undefined",
      description: "Controlled string value.",
    },
    {
      name: "onChange",
      type: "(value: string) => void",
      default: "undefined",
      description: "Callback dispatched as digits are typed or pasted.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-input-otp",
      description: "Root flex container aligning digits and separators.",
    },
    {
      name: ".dl-input-otp-slot",
      description:
        "Individual single-character input box with active focus ring.",
    },
  ];

  return (
    <ComponentView
      title="Input OTP"
      description="Accessible one-time password component with copy-paste handling, keyboard navigation, and separators, inspired by Ant Design's Input.OTP."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
