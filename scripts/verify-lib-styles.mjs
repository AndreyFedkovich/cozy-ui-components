import { readFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const MARKER = "/* cozy-ui: Tailwind utilities for ui primitives (Calendar, etc.) */";

const modulesPath = resolve(root, "dist-lib/styles.modules.css");
const tailwindPath = resolve(root, "dist-lib/styles.tailwind.css");
const bundlePath = resolve(root, "dist-lib/styles.css");

const modulesCss = await readFile(modulesPath, "utf8");
const tailwindCss = await readFile(tailwindPath, "utf8");
const bundleCss = await readFile(bundlePath, "utf8");

const errors = [];

const modulesRequired = [".ui-library-placeholder", "--cozy-font-family"];
const modulesForbidden = ["@layer base", "@layer properties"];

for (const token of modulesRequired) {
  if (!modulesCss.includes(token)) {
    errors.push(`styles.modules.css is missing: ${token}`);
  }
}

for (const token of modulesForbidden) {
  if (modulesCss.includes(token)) {
    errors.push(`styles.modules.css must not include: ${token}`);
  }
}

const tailwindRequired = ["flex", "bg-primary", "bg-background", "text-muted", "animate-in", "--primary:"];
const tailwindLayerMarkers = ["@layer base", "@layer properties", "@property"];

for (const token of tailwindRequired) {
  if (!tailwindCss.includes(token)) {
    errors.push(`styles.tailwind.css is missing: ${token}`);
  }
}

if (!tailwindLayerMarkers.some((token) => tailwindCss.includes(token))) {
  errors.push("styles.tailwind.css is missing Tailwind v4 layer markers (@layer or @property)");
}

const bundleRequired = [...modulesRequired, ...tailwindRequired];
for (const token of bundleRequired) {
  if (!bundleCss.includes(token)) {
    errors.push(`styles.css is missing: ${token}`);
  }
}

const expectedBundle = `${modulesCss.trim()}\n\n${MARKER}\n${tailwindCss.trim()}\n`;
if (bundleCss !== expectedBundle) {
  errors.push("styles.css does not equal styles.modules.css + MARKER + styles.tailwind.css");
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Verified styles.modules.css, styles.tailwind.css, and styles.css (full bundle).");
