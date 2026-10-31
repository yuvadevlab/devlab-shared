import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { Label } from "@/components/label/label";
import { Stack } from "@/components/layout/stack";
import { Flex } from "@/components/layout/flex";

const meta: Meta<typeof RadioGroup> = {
  title: "Components/RadioGroup",
  component: RadioGroup,
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="gemini">
      <Stack gap={2}>
        <Flex align="center" gap={2}>
          <RadioGroupItem value="gemini" id="r1" />
          <Label htmlFor="r1">Gemini 2.5 Flash</Label>
        </Flex>
        <Flex align="center" gap={2}>
          <RadioGroupItem value="claude" id="r2" />
          <Label htmlFor="r2">Claude 3.7 Sonnet</Label>
        </Flex>
      </Stack>
    </RadioGroup>
  ),
};
