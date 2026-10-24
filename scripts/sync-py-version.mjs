import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const pkgPath = resolve("packages/auth-py/package.json");
const pyprojectPath = resolve("packages/auth-py/pyproject.toml");

const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
const pyproject = readFileSync(pyprojectPath, "utf8");

const updated = pyproject.replace(
  /^version\s*=\s*"[^"]+"/m,
  `version = "${pkg.version}"`,
);
writeFileSync(pyprojectPath, updated, "utf8");
console.log(
  `[sync-py-version] Synced devlab-auth pyproject.toml version to ${pkg.version}`,
);
