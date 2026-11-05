import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@/components/input";
import { InputGroup } from "./input-group";
import { InputGroupAddon } from "./input-group-addon";

const meta: Meta<typeof InputGroup> = {
  title: "Components/Input Group",
  component: InputGroup,
};

export default meta;
type Story = StoryObj<typeof InputGroup>;

/** Input with a leading protocol label. */
export const Prefix: Story = {
  render: () => (
    <InputGroup className="dl-story-w-sm">
      <InputGroupAddon>https://</InputGroupAddon>
      <Input aria-label="Website" placeholder="example.com" />
    </InputGroup>
  ),
};
