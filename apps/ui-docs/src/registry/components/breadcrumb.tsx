"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@yuva-devlab/ui";
import { ComponentView, ComponentVariant } from "@/components/component-view";

/**
 * Documentation page for Breadcrumb component with collapsed ellipsis and custom separators.
 */
export default function BreadcrumbDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "ellipsis",
      title: "Collapsible Trail with Ellipsis",
      description:
        "Handles deeply nested hierarchies by condensing intermediate segments into an ellipsis.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md dl-demo-box">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/components/button">
                  Components
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbEllipsis />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      ),
      codeSnippet: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/components">Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbEllipsis />
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
    },
    {
      id: "slash",
      title: "Custom Slash Separator",
      description:
        "Breadcrumbs styled with explicit slash separators for clean Unix-style path representations.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md dl-demo-box">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">root</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="/packages">packages</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="/packages/ui">ui</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>breadcrumb.tsx</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      ),
      codeSnippet: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">root</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator>/</BreadcrumbSeparator>
    <BreadcrumbItem>
      <BreadcrumbLink href="/packages">packages</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator>/</BreadcrumbSeparator>
    <BreadcrumbItem>
      <BreadcrumbPage>breadcrumb.tsx</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
    },
  ];

  const propsList = [
    {
      name: "Breadcrumb",
      type: "React.Component",
      default: "—",
      description: "Accessible nav element with aria-label='breadcrumb'.",
    },
    {
      name: "BreadcrumbLink",
      type: "React.Component",
      default: "—",
      description:
        "Interactive anchor element for intermediate ancestry links.",
    },
    {
      name: "BreadcrumbPage",
      type: "React.Component",
      default: "—",
      description:
        "Current active page marker rendering with aria-current='page'.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-breadcrumb-list",
      description: "Ordered flex list holding breadcrumb trail segments.",
    },
    {
      name: ".dl-breadcrumb-separator",
      description: "Decorative delimiter between path items.",
    },
  ];

  return (
    <ComponentView
      title="Breadcrumb"
      description="Displays the current location within a hierarchy and allows navigation back to parent levels, inspired by Ant Design's Breadcrumb."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
