import { defineConfig } from "tsup";
import fs from "node:fs";

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
  treeshake: true,
  splitting: false,
  minify: false,
  target: "es2022",
  outDir: "dist",
  async onSuccess() {
    if (fs.existsSync("styles")) {
      fs.cpSync("styles", "dist", { recursive: true });
    }
  },
});
