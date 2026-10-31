import React from "react";
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children, ...props }) => (
      <h1 className="dl-prose-h1" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 className="dl-prose-h2" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="dl-prose-h3" {...props}>
        {children}
      </h3>
    ),
    p: ({ children, ...props }) => (
      <p className="dl-prose-p" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }) => (
      <ul className="dl-prose-list" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="dl-prose-list" {...props}>
        {children}
      </ol>
    ),
    code: ({ children, ...props }) => (
      <code className="dl-prose-code" {...props}>
        {children}
      </code>
    ),
    pre: ({ children, ...props }) => (
      <pre className="dl-prose-pre" {...props}>
        {children}
      </pre>
    ),
    table: ({ children, ...props }) => (
      <div className="dl-prose-table-wrap">
        <table className="dl-prose-table" {...props}>
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }) => (
      <th className="dl-prose-th" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td className="dl-prose-td" {...props}>
        {children}
      </td>
    ),
    ...components,
  };
}
