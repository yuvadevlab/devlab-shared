import React from "react";
import type {
  PropDefinition,
  CssClassDefinition,
} from "../types/component-doc";

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
    <section className="space-y-8 pt-4 border-t border-border">
      {/* API Reference Table */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold tracking-tight text-foreground">
          API Reference
        </h3>
        <div className="border border-border rounded-lg overflow-x-auto bg-card">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
              <tr>
                <th className="py-2.5 px-4">Property</th>
                <th className="py-2.5 px-4">Type</th>
                <th className="py-2.5 px-4">Default</th>
                <th className="py-2.5 px-4">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {propsList.map((p) => (
                <tr key={p.name} className="hover:bg-muted/20">
                  <td className="py-3 px-4 font-mono font-semibold text-primary">
                    {p.name}
                  </td>
                  <td className="py-3 px-4 font-mono text-muted-foreground">
                    {p.type}
                  </td>
                  <td className="py-3 px-4 font-mono text-foreground">
                    {p.default ?? "—"}
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    {p.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Scoped CSS Classes */}
      {cssClasses && cssClasses.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold tracking-tight text-foreground">
            Scoped CSS Classes
          </h3>
          <div className="border border-border rounded-lg overflow-x-auto bg-card">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
                <tr>
                  <th className="py-2.5 px-4">CSS Selector</th>
                  <th className="py-2.5 px-4">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {cssClasses.map((c) => (
                  <tr key={c.name} className="hover:bg-muted/20">
                    <td className="py-3 px-4 font-mono font-semibold text-foreground">
                      {c.name}
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      {c.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
