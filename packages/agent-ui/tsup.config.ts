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
  external: [
    "react",
    "react-dom",
    "@yuva-devlab/ui",
    "@yuva-devlab/agent-protocol",
  ],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
  },
  async onSuccess() {
    const stylesDir = path.resolve("src/styles");
    const cssFiles = fs
      .readdirSync(stylesDir)
      .filter((file) => file.endsWith(".css"))
      .sort();
    const blocks = cssFiles.map((file) =>
      fs.readFileSync(path.join(stylesDir, file), "utf8").trim(),
    );
    fs.writeFileSync("dist/styles.css", `${blocks.join("\n\n")}\n`, "utf8");
  },
});
