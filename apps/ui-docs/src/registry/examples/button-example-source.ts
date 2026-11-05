/** Complete source for the Button visual variants example. */
export const buttonStylesExample = `"use client";

import { Button, Flex } from "@yuva-devlab/ui";

export default function Example() {
  return (
    <Flex wrap="wrap" align="center" justify="center" gap={3}>
      <Button variant="default">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link Style</Button>
    </Flex>
  );
}`;

/** Complete source for the Button size variants example. */
export const buttonSizesExample = `"use client";

import { Button, Flex } from "@yuva-devlab/ui";
import { Sparkles } from "lucide-react";

export default function Example() {
  return (
    <Flex wrap="wrap" align="center" justify="center" gap={3}>
      <Button size="sm">Small (sm)</Button>
      <Button size="default">Default (md)</Button>
      <Button size="lg">Large (lg)</Button>
      <Button size="icon" variant="outline" aria-label="Sparkles Action">
        <Sparkles className="dl-demo-icon dl-demo-icon--sm" />
      </Button>
    </Flex>
  );
}`;

/** Complete source for Button icons and actions. */
export const buttonIconsExample = `"use client";

import { Button, Flex } from "@yuva-devlab/ui";
import { ArrowRight, Send, Sparkles, Trash2 } from "lucide-react";

export default function Example() {
  return (
    <Flex wrap="wrap" align="center" justify="center" gap={3}>
      <Button>
        <Sparkles className="dl-demo-icon dl-demo-icon--sm" />
        <span>Generate with AI</span>
      </Button>
      <Button variant="secondary">
        <span>Continue</span>
        <ArrowRight className="dl-demo-icon dl-demo-icon--sm" />
      </Button>
      <Button variant="outline">
        <Send className="dl-demo-icon dl-demo-icon--sm" />
        <span>Send Email</span>
      </Button>
      <Button variant="destructive">
        <Trash2 className="dl-demo-icon dl-demo-icon--sm" />
        <span>Delete</span>
      </Button>
    </Flex>
  );
}`;

/** Complete source for the disabled Button states example. */
export const buttonDisabledExample = `"use client";

import { Button, Flex } from "@yuva-devlab/ui";
import { Sparkles } from "lucide-react";

export default function Example() {
  return (
    <Flex wrap="wrap" align="center" justify="center" gap={3}>
      <Button disabled variant="default">
        Disabled Primary
      </Button>
      <Button disabled variant="secondary">
        Disabled Secondary
      </Button>
      <Button disabled variant="outline">
        Disabled Outline
      </Button>
      <Button disabled size="icon" variant="outline">
        <Sparkles className="dl-demo-icon dl-demo-icon--sm" />
      </Button>
    </Flex>
  );
}`;
