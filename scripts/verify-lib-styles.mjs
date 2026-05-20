import { readFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const css = await readFile(resolve(root, "dist-lib/styles.css"), "utf8");

const required = [
  "flex",
  "bg-primary",
  "bg-background",
  "text-muted",
  "animate-in",
  "--primary:",
  ".ui-library-placeholder",
];

const missing = required.filter((token) => !css.includes(token));

if (missing.length > 0) {
  console.error("dist-lib/styles.css is missing:", missing.join(", "));
  process.exit(1);
}

console.log("dist-lib/styles.css includes SCSS + Tailwind utilities for Calendar.");
