"use client";

import React from "react";
import { Stack } from "@yuva-devlab/ui";

export interface PropDefinition {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface CssClassDefinition {
  name: string;
  description: string;
}

interface ApiTableProps {
  propsList: PropDefinition[];
  cssClasses?: CssClassDefinition[];
}

export function ApiTable({ propsList, cssClasses }: ApiTableProps) {
  return (
    <Stack gap={8} className="dl-docs-api-section">
      {/* API Reference Table */}
      <Stack gap={4}>
        <h3 className="dl-docs-api-title">API Reference</h3>
        <div className="dl-docs-table-card">
          <table className="dl-docs-table">
            <thead>
              <tr>
                <th>Property</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {propsList.map((p) => (
                <tr key={p.name}>
                  <td className="dl-docs-table__prop">{p.name}</td>
                  <td className="dl-docs-table__type">{p.type}</td>
                  <td className="dl-docs-table__default">{p.default ?? "—"}</td>
                  <td className="dl-docs-table__desc">{p.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Stack>

      {/* Scoped CSS Classes */}
      {cssClasses && cssClasses.length > 0 && (
        <Stack gap={4}>
          <h3 className="dl-docs-api-title">Scoped CSS Classes</h3>
          <div className="dl-docs-table-card">
            <table className="dl-docs-table">
              <thead>
                <tr>
                  <th>CSS Selector</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {cssClasses.map((c) => (
                  <tr key={c.name}>
                    <td className="dl-docs-table__selector">{c.name}</td>
                    <td className="dl-docs-table__desc">{c.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Stack>
      )}
    </Stack>
  );
}
