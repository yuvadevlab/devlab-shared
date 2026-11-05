import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/button";
import { ButtonGroup } from "./button-group";

const meta: Meta<typeof ButtonGroup> = {
  title: "Components/Button Group",
  component: ButtonGroup,
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

/** Adjacent horizontal actions. */
export const Horizontal: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Previous</Button>
      <Button variant="outline">Next</Button>
    </ButtonGroup>
  ),
};

/** Stacked vertical actions. */
export const Vertical: Story = {
  render: () => (
    <ButtonGroup orientation="vertical">
      <Button variant="outline">Top</Button>
      <Button variant="outline">Bottom</Button>
    </ButtonGroup>
  ),
};
