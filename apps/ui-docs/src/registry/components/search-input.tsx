"use client";

import React, { useState } from "react";
import { SearchInput, Stack } from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
  type PropDefinition,
  type CssClassDefinition,
} from "@/components/component-view";

export default function SearchInputDocPage() {
  const [val1, setVal1] = useState("");
  const [val2, setVal2] = useState("Autonomous Agent");

  const variants: ComponentVariant[] = [
    {
      id: "basic",
      title: "Interactive Search Field",
      description:
        "Input with persistent search icon and an interactive clear action button when text is present.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--sm">
          <SearchInput
            placeholder="Search microservices, users, logs..."
            value={val1}
            onChange={(e) => setVal1(e.target.value)}
            onClear={() => setVal1("")}
          />
        </div>
      ),
      codeSnippet: `const [query, setQuery] = useState("");

<SearchInput
  placeholder="Search microservices..."
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  onClear={() => setQuery("")}
/>`,
    },
    {
      id: "states",
      title: "Loading & Populated States",
      description:
        "Includes asynchronous loading spinner for debounced searches and disabled states.",
      preview: (
        <Stack gap={3} className="dl-demo-frame dl-demo-frame--sm">
          <SearchInput
            value={val2}
            onChange={(e) => setVal2(e.target.value)}
            onClear={() => setVal2("")}
          />
          <SearchInput loading value="Filtering cluster metrics..." readOnly />
          <SearchInput disabled placeholder="Search index offline" />
        </Stack>
      ),
      codeSnippet: `<SearchInput loading value="Filtering cluster metrics..." readOnly />
<SearchInput disabled placeholder="Search index offline" />`,
    },
  ];

  const propsList: PropDefinition[] = [
    {
      name: "onClear",
      type: "() => void",
      default: "—",
      description:
        "Optional callback invoked when the user clicks the clear (✕) button.",
    },
    {
      name: "loading",
      type: "boolean",
      default: "false",
      description:
        "When true, displays an animated spinner in the trailing slot indicating background fetch.",
    },
    {
      name: "startIcon",
      type: "ReactNode",
      default: "<Search />",
      description: "Icon element rendered at the start of the search bar.",
    },
  ];

  const cssClasses: CssClassDefinition[] = [
    {
      name: ".dl-search-input",
      description: "Container styling for search field.",
    },
    {
      name: ".dl-search-clear-btn",
      description: "Interactive clear button for clearing input text.",
    },
  ];

  return (
    <ComponentView
      title="Search Input"
      description="Standardized search input control with integrated search icon, quick clear button, and loading spinner indicator."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
