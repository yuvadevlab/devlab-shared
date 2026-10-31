"use client";

import React, { useState } from "react";
import { Search, Mail, Eye, EyeOff } from "lucide-react";
import {
  Input,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  Button,
  Stack,
} from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
} from "@/components/component-view";

export default function InputDocPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [otpVal, setOtpVal] = useState("482910");

  const variants: ComponentVariant[] = [
    {
      id: "basic",
      title: "Basic Text Input",
      description:
        "Standard text input field with placeholder and focus states.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--sm">
          <Input placeholder="Enter username or email address..." />
        </div>
      ),
      codeSnippet: `<Input placeholder="Enter username or email address..." />`,
    },
    {
      id: "icons",
      title: "Prefix & Suffix Icons",
      description:
        "AntD-inspired startIcon and endIcon slots for inline indicators and quick actions.",
      preview: (
        <Stack gap={3} className="dl-demo-frame dl-demo-frame--sm">
          <Input
            startIcon={<Search className="dl-demo-icon dl-demo-icon--sm" />}
            placeholder="Search agents, workspaces..."
          />
          <Input
            startIcon={<Mail className="dl-demo-icon dl-demo-icon--sm" />}
            placeholder="user@devlab.io"
            defaultValue="alex@devlab.io"
          />
        </Stack>
      ),
      codeSnippet: `<Input
  startIcon={<Search />}
  placeholder="Search agents..."
/>
<Input
  startIcon={<Mail />}
  placeholder="user@devlab.io"
/>`,
    },
    {
      id: "password",
      title: "Password with Visibility Toggle",
      description:
        "End-icon action allowing users to toggle secret password visibility safely.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--sm">
          <Input
            type={showPassword ? "text" : "password"}
            defaultValue="devlab_secret_token_#9284"
            placeholder="Enter password..."
            endIcon={
              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <EyeOff className="dl-demo-icon dl-demo-icon--xs" />
                ) : (
                  <Eye className="dl-demo-icon dl-demo-icon--xs" />
                )}
              </Button>
            }
          />
        </div>
      ),
      codeSnippet: `<Input
  type={showPassword ? "text" : "password"}
  placeholder="Enter password..."
  endIcon={
    <Button variant="ghost" size="icon" onClick={() => setShowPassword(!showPassword)}>
      {showPassword ? <EyeOff /> : <Eye />}
    </Button>
  }
/>`,
    },
    {
      id: "otp",
      title: "One-Time Password (OTP) Input",
      description:
        "Segmented OTP digit slots for two-factor authentication and SMS verification.",
      preview: (
        <Stack align="center" gap={2}>
          <InputOTP maxLength={6} value={otpVal} onChange={setOtpVal}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </Stack>
      ),
      codeSnippet: `import { InputOTP, InputOTPGroup, InputOTPSlot } from "@yuva-devlab/ui";

<InputOTP maxLength={6} value={otp} onChange={setOtp}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`,
    },
    {
      id: "disabled",
      title: "Disabled State",
      description:
        "Input in read-only disabled state with subdued background and not-allowed cursor.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--sm">
          <Input
            disabled
            defaultValue="api_key_live_permanent_locked"
            placeholder="Disabled input"
          />
        </div>
      ),
      codeSnippet: `<Input disabled defaultValue="api_key_live_permanent_locked" />`,
    },
  ];

  const propsList = [
    {
      name: "startIcon",
      type: "React.ReactNode",
      default: "undefined",
      description: "Leading decorative or interactive icon.",
    },
    {
      name: "endIcon",
      type: "React.ReactNode",
      default: "undefined",
      description: "Trailing interactive action or icon element.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Disables user input and renders with reduced opacity.",
    },
    {
      name: "type",
      type: "string",
      default: '"text"',
      description: "HTML input type (text, password, email, search).",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-input",
      description: "Base input control establishing height, border, and focus.",
    },
    {
      name: ".dl-input-wrapper",
      description: "Relative wrapper container for positioning icons.",
    },
    {
      name: ".dl-input-icon--start",
      description: "Left-aligned absolute icon container.",
    },
    {
      name: ".dl-input-icon--end",
      description: "Right-aligned absolute icon container.",
    },
  ];

  return (
    <ComponentView
      title="Input"
      description="Textual form input control styled with design system tokens and scoped CSS. Showcasing basic inputs, prefix/suffix icons, password toggle, OTP verification, and disabled states."
      category="Data Entry"
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
