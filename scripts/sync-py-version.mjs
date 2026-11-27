import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const PYTHON_PACKAGES = [
  { dir: "packages/auth-py", pypiName: "devlab-auth" },
  { dir: "packages/agent-py", pypiName: "devlab-agent" },
];

for (const { dir, pypiName } of PYTHON_PACKAGES) {
  const pkgPath = resolve(dir, "package.json");
  const pyprojectPath = resolve(dir, "pyproject.toml");

  const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
  const pyproject = readFileSync(pyprojectPath, "utf8");

  const updated = pyproject.replace(
    /^version\s*=\s*"[^"]+"/m,
    `version = "${pkg.version}"`,
  );
  writeFileSync(pyprojectPath, updated, "utf8");
  console.log(
    `[sync-py-version] Synced ${pypiName} pyproject.toml version to ${pkg.version}`,
  );
}
