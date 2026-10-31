"use client";

import React from "react";
import { Avatar, AvatarImage, AvatarFallback, Flex } from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
} from "@/components/component-view";

export default function AvatarDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "image",
      title: "Image with Graceful Fallback",
      description:
        "AntD-inspired circular profile image falling back to user initials on error.",
      preview: (
        <Flex align="center" gap={4}>
          <Avatar>
            <AvatarImage
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
              alt="Sarah Connor"
            />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
              alt="Alex Rivers"
            />
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
        </Flex>
      ),
      codeSnippet: `<Avatar>
  <AvatarImage src="/user-avatar.png" alt="Sarah Connor" />
  <AvatarFallback>SC</AvatarFallback>
</Avatar>`,
    },
    {
      id: "initials",
      title: "Initials Monogram & Agent Badges",
      description:
        "Fallback typography monogram with primary theme colors for AI agents.",
      preview: (
        <Flex align="center" gap={4}>
          <Avatar>
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>YP</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>DL</AvatarFallback>
          </Avatar>
        </Flex>
      ),
      codeSnippet: `<Avatar>
  <AvatarFallback>AI</AvatarFallback>
</Avatar>`,
    },
    {
      id: "group",
      title: "Avatar Group / Team Stack",
      description:
        "AntD Avatar.Group pattern displaying multiple agent profiles.",
      preview: (
        <Flex align="center" gap={2}>
          <Avatar>
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>YP</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>+5</AvatarFallback>
          </Avatar>
        </Flex>
      ),
      codeSnippet: `<Flex align="center" gap="2">
  <Avatar><AvatarFallback>SC</AvatarFallback></Avatar>
  <Avatar><AvatarFallback>AR</AvatarFallback></Avatar>
  <Avatar><AvatarFallback>+5</AvatarFallback></Avatar>
</Flex>`,
    },
  ];

  const propsList = [
    {
      name: "Avatar",
      type: "React.Component",
      default: "—",
      description:
        "Root avatar container with circular clipping and overflow hidden.",
    },
    {
      name: "AvatarImage",
      type: "React.Component",
      default: "—",
      description: "Image element loaded inside the avatar.",
    },
    {
      name: "AvatarFallback",
      type: "React.Component",
      default: "—",
      description: "Fallback initials rendered when image is unavailable.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-avatar",
      description: "Circular avatar frame with overflow hidden and border.",
    },
    {
      name: ".dl-avatar__img",
      description: "Aspect-ratio 1:1 image element filling container.",
    },
    {
      name: ".dl-avatar__fallback",
      description: "Centered fallback container with muted background.",
    },
  ];

  return (
    <ComponentView
      title="Avatar"
      description="Visual avatar element displaying user profiles, agents, or fallback initials. Showcasing remote profile images, initials monograms, and overlapping team stacks."
      category="Data Display"
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
