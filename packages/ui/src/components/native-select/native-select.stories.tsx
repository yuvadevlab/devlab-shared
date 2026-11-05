import type { Meta, StoryObj } from "@storybook/react";
import { NativeSelect } from "./native-select";

const meta: Meta<typeof NativeSelect> = {
  title: "Components/Native Select",
  component: NativeSelect,
};

export default meta;
type Story = StoryObj<typeof NativeSelect>;

/** Native select with several options. */
export const Default: Story = {
  render: () => (
    <NativeSelect defaultValue="staging">
      <option value="development">Development</option>
      <option value="staging">Staging</option>
      <option value="production">Production</option>
    </NativeSelect>
  ),
};
