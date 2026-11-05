import { defineConfig } from "tsup";
import fs from "node:fs";
import path from "node:path";

const componentEntries = fs
  .readdirSync("src/components", { withFileTypes: true })
  .filter(
    (entry) =>
      entry.isDirectory() &&
      fs.existsSync(path.join("src/components", entry.name, "index.ts")),
  )
  .map((entry) => path.join("src/components", entry.name, "index.ts"));

const componentStyleDependencies: Record<string, string[]> = {
  checkpoint: ["button"],
  "prompt-input": ["attachment", "button", "input", "textarea"],
  suggestion: ["button"],
  terminal: ["code-block", "trace"],
};

export default defineConfig({
  entry: ["src/index.ts", ...componentEntries],
  format: ["esm", "cjs"],
  dts: {
    entry: "src/index.ts",
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
    fs.copyFileSync("src/styles/base.css", "dist/base.css");
    fs.copyFileSync("src/styles/common.css", "dist/common.css");
    fs.copyFileSync("src/styles/utilities.css", "dist/utilities.css");
    fs.copyFileSync(
      "src/styles/compat-utilities.css",
      "dist/compat-utilities.css",
    );
    fs.copyFileSync("src/styles/compat-layout.css", "dist/compat-layout.css");
    fs.copyFileSync("src/styles/compat-colors.css", "dist/compat-colors.css");
    fs.copyFileSync("src/styles/preset.css", "dist/preset.css");
    fs.cpSync("src/styles/themes", "dist/themes", { recursive: true });
    fs.cpSync("src/components", "dist/components", {
      recursive: true,
      filter: (src) => !src.endsWith(".tsx") && !src.endsWith(".ts"),
    });

    // Bundle all colocated component CSS files into @layer dl-components
    const compDir = path.resolve("src/components");
    const layerOrder =
      "@layer dl-reset, dl-base, dl-tokens, dl-components, dl-layout, dl-utilities, dl-app;";
    const dirs = fs
      .readdirSync(compDir, { withFileTypes: true })
      .filter((d) => d.isDirectory() && d.name !== "layout");
    const cssBlocks: string[] = [];
    const sourceComponentImports: string[] = [];

    for (const d of dirs) {
      const compSubDir = path.join(compDir, d.name);
      const distCompSubDir = path.join("dist/components", d.name);
      const cssFiles = fs
        .readdirSync(compSubDir)
        .filter((f) => f.endsWith(".css"))
        .sort();
      const dependencyImports = (componentStyleDependencies[d.name] ?? [])
        .flatMap((dependency) =>
          fs
            .readdirSync(path.join(compDir, dependency))
            .filter((file) => file.endsWith(".css"))
            .map((file) => `@import "../${dependency}/${file}";`),
        )
        .join("\n");
      for (const cssFile of cssFiles) {
        const cssPath = path.join(compSubDir, cssFile);
        const content = fs.readFileSync(cssPath, "utf8").trim();
        if (content) {
          const alreadyLayered = content.includes("@layer dl-components");
          const layeredContent = alreadyLayered
            ? content
            : `@layer dl-components {\n${content}\n}`;
          cssBlocks.push(`/* ── ${d.name}/${cssFile} ── */\n${layeredContent}`);
          sourceComponentImports.push(
            `@import "../components/${d.name}/${cssFile}"${alreadyLayered ? "" : " layer(dl-components)"};`,
          );
          fs.writeFileSync(
            path.join(distCompSubDir, cssFile),
            `${layerOrder}\n@import "../../base.css";\n@import "../../utilities.css";\n${dependencyImports}\n\n${layeredContent}\n`,
            "utf8",
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

${layerOrder}

${cssBlocks.join("\n\n")}

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

    const sourceComponentCss = `${layerOrder}\n\n${sourceComponentImports.join("\n")}\n`;
    let finalSourceComponentCss = sourceComponentCss;
    try {
      const prettier = await import("prettier");
      const prettierConfig =
        (await prettier.resolveConfig(process.cwd())) || {};
      finalSourceComponentCss = await prettier.format(sourceComponentCss, {
        ...prettierConfig,
        parser: "css",
      });
    } catch {
      // fallback to raw sourceComponentCss if prettier formatting fails
    }
    fs.writeFileSync(
      "src/styles/components.css",
      finalSourceComponentCss,
      "utf8",
    );
    fs.writeFileSync(
      "dist/styles/components.css",
      finalSourceComponentCss,
      "utf8",
    );
  },
});
