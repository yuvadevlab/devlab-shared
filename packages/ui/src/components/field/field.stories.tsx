import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@/components/input";
import { Field } from "./field";
import { FieldDescription } from "./field-description";
import { FieldError } from "./field-error";
import { FieldLabel } from "./field-label";

const meta: Meta<typeof Field> = {
  title: "Components/Field",
  component: Field,
};

export default meta;
type Story = StoryObj<typeof Field>;

/** Label, control, and supporting text. */
export const Default: Story = {
  render: () => (
    <Field className="dl-story-w-sm">
      <FieldLabel htmlFor="field-email">Email address</FieldLabel>
      <Input id="field-email" type="email" placeholder="name@example.com" />
      <FieldDescription>
        We will only use this for account notices.
      </FieldDescription>
    </Field>
  ),
};

/** Field with validation feedback. */
export const Invalid: Story = {
  render: () => (
    <Field className="dl-story-w-sm">
      <FieldLabel htmlFor="field-required">Workspace name</FieldLabel>
      <Input id="field-required" aria-invalid="true" />
      <FieldError>A workspace name is required.</FieldError>
    </Field>
  ),
};
