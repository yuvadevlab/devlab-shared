import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from "./select";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: () => (
    <div className="dl-story-w-xs">
      <Select defaultValue="gemini-2.5-pro">
        <SelectTrigger>
          <SelectValue placeholder="Select model..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Gemini Models</SelectLabel>
            <SelectItem value="gemini-2.5-pro">Gemini 2.5 Pro</SelectItem>
            <SelectItem value="gemini-2.5-flash">Gemini 2.5 Flash</SelectItem>
            <SelectItem value="gemini-1.5-pro">Gemini 1.5 Pro</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Claude Models</SelectLabel>
            <SelectItem value="claude-3-7-sonnet">Claude 3.7 Sonnet</SelectItem>
            <SelectItem value="claude-3-5-haiku">Claude 3.5 Haiku</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="dl-story-w-xs">
      <Select disabled defaultValue="locked">
        <SelectTrigger>
          <SelectValue placeholder="Unavailable" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="locked">Production Locked</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};
