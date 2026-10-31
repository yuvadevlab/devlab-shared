import { defineConfig } from "tsup";
import fs from "node:fs";
import path from "node:path";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: {
    compilerOptions: {
      ignoreDeprecations: "6.0",
    },
  },
  clean: true,
  sourcemap: true,
  external: ["react", "react-dom"],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
  },
  async onSuccess() {
    fs.cpSync("src/styles", "dist/styles", { recursive: true });
    fs.copyFileSync("src/styles/styles.css", "dist/styles.css");
    fs.copyFileSync("src/styles/root.css", "dist/root.css");
    fs.copyFileSync("src/styles/common.css", "dist/common.css");
    fs.copyFileSync("src/styles/utilities.css", "dist/utilities.css");
    fs.copyFileSync("src/styles/preset.css", "dist/preset.css");
    fs.cpSync("src/styles/themes", "dist/themes", { recursive: true });
    fs.cpSync("src/components", "dist/components", {
      recursive: true,
      filter: (src) => !src.endsWith(".tsx") && !src.endsWith(".ts"),
    });

    // Bundle all colocated component CSS files into @layer dl-components
    const compDir = path.resolve("src/components");
    const dirs = fs
      .readdirSync(compDir, { withFileTypes: true })
      .filter((d) => d.isDirectory() && d.name !== "layout");
    const cssBlocks: string[] = [];

    for (const d of dirs) {
      const compSubDir = path.join(compDir, d.name);
      const cssFiles = fs
        .readdirSync(compSubDir)
        .filter((f) => f.endsWith(".css"))
        .sort();
      for (const cssFile of cssFiles) {
        const cssPath = path.join(compSubDir, cssFile);
        const content = fs.readFileSync(cssPath, "utf8").trim();
        if (content) {
          cssBlocks.push(
            `  /* ── ${d.name}/${cssFile} ── */\n  ${content.replace(/\n/g, "\n  ")}`,
          );
        }
      }
    }

    const layoutCssPath = path.join(compDir, "layout", "layout.css");
    const layoutContent = fs.existsSync(layoutCssPath)
      ? fs.readFileSync(layoutCssPath, "utf8").trim()
      : "";

    const bundledCss = `/**
 * @file components.css
 * @description Bundled modular dl-* component and layout styles with native Cascade Layers (@layer).
 */

@layer dl-reset, dl-tokens, dl-components, dl-layout, dl-utilities, dl-app;

@layer dl-components {
${cssBlocks.join("\n\n")}
}

${layoutContent}
`;

    let finalCss = bundledCss;
    try {
      const prettier = await import("prettier");
      const prettierConfig =
        (await prettier.resolveConfig(process.cwd())) || {};
      finalCss = await prettier.format(bundledCss, {
        ...prettierConfig,
        parser: "css",
      });
    } catch {
      // fallback to raw bundledCss if prettier formatting fails
    }

    fs.writeFileSync("dist/components.css", finalCss, "utf8");
    fs.writeFileSync("src/styles/components.css", finalCss, "utf8");
  },
});
