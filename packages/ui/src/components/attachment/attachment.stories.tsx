import type { Meta, StoryObj } from "@storybook/react";
import { Attachment } from "./attachment";

const meta: Meta<typeof Attachment> = {
  title: "AI Elements/Attachment",
  component: Attachment,
};

export default meta;
type Story = StoryObj<typeof Attachment>;

/** Default file attachment card. */
export const Default: Story = {
  args: { name: "schema.prisma", size: "2 KB" },
};

/** Attachment with a removable action. */
export const Removable: Story = {
  args: { name: "report.pdf", size: "1.4 MB", onRemove: () => {} },
};
