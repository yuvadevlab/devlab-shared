"use client";

import React, { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
} from "@/components/component-view";

export default function PaginationDocPage() {
  const [page1, setPage1] = useState(2);
  const [page2, setPage2] = useState(3);

  const variants: ComponentVariant[] = [
    {
      id: "basic",
      title: "Basic Continuous Pagination",
      description:
        "AntD-inspired pagination bar with contiguous page links and previous/next arrows.",
      preview: (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage1((p) => Math.max(1, p - 1))}
              />
            </PaginationItem>
            {[1, 2, 3, 4].map((num) => (
              <PaginationItem key={num}>
                <PaginationLink
                  isActive={page1 === num}
                  onClick={() => setPage1(num)}
                >
                  {num}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => setPage1((p) => Math.min(4, p + 1))}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      ),
      codeSnippet: `<Pagination>
  <PaginationContent>
    <PaginationItem><PaginationPrevious onClick={prev} /></PaginationItem>
    <PaginationItem><PaginationLink isActive={page === 1}>1</PaginationLink></PaginationItem>
    <PaginationItem><PaginationLink isActive={page === 2}>2</PaginationLink></PaginationItem>
    <PaginationItem><PaginationNext onClick={next} /></PaginationItem>
  </PaginationContent>
</Pagination>`,
    },
    {
      id: "ellipsis",
      title: "With Ellipsis for Large Datasets",
      description:
        "Truncates high page counts using PaginationEllipsis with jump endpoints.",
      preview: (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage2((p) => Math.max(1, p - 1))}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                isActive={page2 === 1}
                onClick={() => setPage2(1)}
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                isActive={page2 === 2}
                onClick={() => setPage2(2)}
              >
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                isActive={page2 === 3}
                onClick={() => setPage2(3)}
              >
                3
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                isActive={page2 === 50}
                onClick={() => setPage2(50)}
              >
                50
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() => setPage2((p) => Math.min(50, p + 1))}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      ),
      codeSnippet: `<Pagination>
  <PaginationContent>
    <PaginationItem><PaginationLink isActive>1</PaginationLink></PaginationItem>
    <PaginationItem><PaginationLink>2</PaginationLink></PaginationItem>
    <PaginationItem><PaginationEllipsis /></PaginationItem>
    <PaginationItem><PaginationLink>50</PaginationLink></PaginationItem>
  </PaginationContent>
</Pagination>`,
    },
  ];

  const propsList = [
    {
      name: "isActive",
      type: "boolean",
      default: "false",
      description: "Marks link as current active page.",
    },
    {
      name: "PaginationPrevious",
      type: "React.Component",
      default: "—",
      description: "Previous button control with ChevronLeft icon.",
    },
    {
      name: "PaginationNext",
      type: "React.Component",
      default: "—",
      description: "Next button control with ChevronRight icon.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-pagination",
      description: "Root navigation container centered across parent width.",
    },
    {
      name: ".dl-pagination-content",
      description: "Inline flex list container holding pagination items.",
    },
  ];

  return (
    <ComponentView
      title="Pagination"
      description="Accessible page navigation controls for large data tables, search indexes, and multi-step workflows. Showcasing continuous page links and truncated sequences with ellipsis."
      category="Navigation"
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
