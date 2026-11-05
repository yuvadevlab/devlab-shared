import type { Meta, StoryObj } from "@storybook/react";
import { Marker } from "./marker";

const meta: Meta<typeof Marker> = {
  title: "Components/Marker",
  component: Marker,
};

export default meta;
type Story = StoryObj<typeof Marker>;

/** Inline highlighted text. */
export const Default: Story = {
  render: () => (
    <p>
      Review the <Marker>breaking API change</Marker> before merging.
    </p>
  ),
};
