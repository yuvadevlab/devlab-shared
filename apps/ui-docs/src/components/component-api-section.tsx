import React from "react";
import { Stack } from "@yuva-devlab/ui";
import type { PropDefinition, CssClassDefinition } from "@/types/component-doc";

export interface ComponentApiSectionProps {
  propsList: PropDefinition[];
  cssClasses?: CssClassDefinition[];
}

/**
 * Server component rendering the API Reference and Scoped CSS Classes tables.
 * Emits static semantic HTML directly to the browser with zero client hydration overhead.
 */
export function ComponentApiSection({
  propsList,
  cssClasses,
}: ComponentApiSectionProps) {
  return (
    <section className="dl-docs-api-section">
      <Stack gap={8}>
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
                    <td className="dl-docs-table__default">
                      {p.default ?? "—"}
                    </td>
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
    </section>
  );
}
