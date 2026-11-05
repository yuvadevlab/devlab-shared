import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./spinner";

const meta: Meta<typeof Spinner> = {
  title: "Components/Spinner",
  component: Spinner,
};

export default meta;
type Story = StoryObj<typeof Spinner>;

/** Default accessible loading indicator. */
export const Default: Story = {};
