"use client";

import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@yuva-devlab/ui";
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
        <div className="flex items-center gap-4">
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
        </div>
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
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarFallback className="bg-primary text-primary-foreground font-bold">
              AI
            </AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback className="bg-secondary text-secondary-foreground font-semibold">
              YP
            </AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback className="bg-muted text-muted-foreground font-semibold">
              DL
            </AvatarFallback>
          </Avatar>
        </div>
      ),
      codeSnippet: `<Avatar>
  <AvatarFallback className="bg-primary text-primary-foreground font-bold">
    AI
  </AvatarFallback>
</Avatar>`,
    },
    {
      id: "group",
      title: "Avatar Group / Team Stack",
      description:
        "AntD Avatar.Group pattern featuring negative margins and border rings.",
      preview: (
        <div className="flex items-center -space-x-3 overflow-hidden p-2">
          <Avatar className="ring-2 ring-background">
            <AvatarFallback className="bg-primary text-primary-foreground font-bold">
              SC
            </AvatarFallback>
          </Avatar>
          <Avatar className="ring-2 ring-background">
            <AvatarFallback className="bg-secondary text-secondary-foreground font-bold">
              AR
            </AvatarFallback>
          </Avatar>
          <Avatar className="ring-2 ring-background">
            <AvatarFallback className="bg-accent text-accent-foreground font-bold">
              YP
            </AvatarFallback>
          </Avatar>
          <div className="flex items-center justify-center size-10 rounded-full bg-muted text-muted-foreground text-xs font-semibold ring-2 ring-background">
            +5
          </div>
        </div>
      ),
      codeSnippet: `<div className="flex items-center -space-x-3">
  <Avatar className="ring-2 ring-background"><AvatarFallback>SC</AvatarFallback></Avatar>
  <Avatar className="ring-2 ring-background"><AvatarFallback>AR</AvatarFallback></Avatar>
  <div className="size-10 rounded-full bg-muted text-xs font-semibold flex items-center justify-center ring-2 ring-background">+5</div>
</div>`,
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
