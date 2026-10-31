import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "./text";

const meta: Meta<typeof Text> = {
  title: "Components/Text",
  component: Text,
  argTypes: {
    as: {
      control: "select",
      options: ["p", "span", "div", "label", "small", "strong", "em", "code"],
      description: "Underlying HTML semantic tag element",
    },
    variant: {
      control: "select",
      options: ["body-lg", "body", "body-sm", "caption", "code", "metric"],
      description: "Visual typographic variant from the token scale",
    },
    color: {
      control: "select",
      options: [
        "default",
        "muted",
        "subtle",
        "primary",
        "destructive",
        "warning",
        "success",
        "info",
      ],
      description: "Semantic color variant",
    },
    align: {
      control: "select",
      options: ["left", "center", "right"],
      description: "Horizontal text alignment",
    },
    truncate: {
      control: "boolean",
      description: "Truncate text with ellipsis on a single line",
    },
    children: {
      control: "text",
      description: "Text content",
    },
  },
  args: {
    children:
      "DevLab standard body text optimized across multi-brand design tokens.",
    variant: "body",
    color: "default",
    align: "left",
    truncate: false,
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div className="dl-story-column">
      <Text variant="body-lg">
        Body Large: High-contrast introductory paragraphs and callouts.
      </Text>
      <Text variant="body">
        Body Default: Standard reading paragraph text with 1.5 line-height.
      </Text>
      <Text variant="body-sm">
        Body Small: Compact UI controls, list items, and card secondary text.
      </Text>
      <Text variant="caption">
        Caption: Footnotes, timestamps, micro-copy, and form helper text.
      </Text>
      <Text variant="code">
        const session = await authenticateToken(request);
      </Text>
      <Text variant="metric">$124,592.50 USD</Text>
    </div>
  ),
};

export const ColorVariants: Story = {
  render: () => (
    <div className="dl-story-column">
      <Text color="default">Default high-contrast foreground text</Text>
      <Text color="muted">Muted secondary text for subtitles and metadata</Text>
      <Text color="subtle">
        Subtle low-emphasis text for non-critical information
      </Text>
      <Text color="primary">Primary brand color text for highlights</Text>
      <Text color="success">
        Success text indicating completed tasks or growth
      </Text>
      <Text color="warning">
        Warning text indicating pending action required
      </Text>
      <Text color="destructive">
        Destructive text indicating error or failure
      </Text>
      <Text color="info">Informational telemetry text</Text>
    </div>
  ),
};

export const Truncated: Story = {
  render: () => (
    <div className="dl-story-column" data-slot="container">
      <Text truncate>
        This is an extremely long line of text designed to demonstrate
        single-line truncation with an ellipsis whenever the bounding box
        becomes too constrained to render the entire sentence.
      </Text>
    </div>
  ),
};
