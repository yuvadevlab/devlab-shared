import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { InputNumber } from "./input-number";

const meta: Meta<typeof InputNumber> = {
  title: "Components/InputNumber",
  component: InputNumber,
  argTypes: {
    min: {
      control: "number",
      description: "Minimum permitted value",
    },
    max: {
      control: "number",
      description: "Maximum permitted value",
    },
    step: {
      control: "number",
      description: "Step increment/decrement value",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input number is disabled",
    },
    controls: {
      control: "boolean",
      description: "Whether to render stepper buttons",
    },
    prefix: {
      control: "text",
      description: "Leading prefix element or symbol",
    },
    suffix: {
      control: "text",
      description: "Trailing suffix element or unit",
    },
  },
  args: {
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    controls: true,
  },
};

export default meta;
type Story = StoryObj<typeof InputNumber>;

export const Default: Story = {
  render: (args) => (
    <div className="dl-story-w-sm">
      <InputNumber defaultValue={10} {...args} />
    </div>
  ),
};

export const WithMinMax: Story = {
  render: () => (
    <div className="dl-story-w-sm">
      <InputNumber min={0} max={10} defaultValue={5} />
    </div>
  ),
};

export const DecimalPrecision: Story = {
  render: () => (
    <div className="dl-story-w-sm">
      <InputNumber step={0.25} precision={2} defaultValue={1.5} />
    </div>
  ),
};

export const WithPrefixAndSuffix: Story = {
  render: () => (
    <div className="dl-story-w-sm dl-flex-col-gap-4">
      <InputNumber prefix="$" defaultValue={99} step={5} />
      <InputNumber suffix="ms" defaultValue={250} step={50} min={0} />
      <InputNumber suffix="px" defaultValue={16} step={4} min={0} max={128} />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="dl-story-w-sm">
      <InputNumber disabled defaultValue={42} suffix="items" />
    </div>
  ),
};
