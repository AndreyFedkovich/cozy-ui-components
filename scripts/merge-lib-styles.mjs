import { readFile, writeFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const MARKER = "/* cozy-ui: Tailwind utilities for ui primitives (Calendar, etc.) */";

const modulesPath = resolve(root, "dist-lib/styles.modules.css");
const tailwindPath = resolve(root, "dist-lib/styles.tailwind.css");
const bundlePath = resolve(root, "dist-lib/styles.css");

const modulesCss = (await readFile(modulesPath, "utf8")).trim();
let tailwindCss = "";

try {
  tailwindCss = (await readFile(tailwindPath, "utf8")).trim();
} catch {
  console.error("Missing dist-lib/styles.tailwind.css — run build:lib:tailwind first.");
  process.exit(1);
}

await writeFile(modulesPath, `${modulesCss}\n`, "utf8");
await writeFile(tailwindPath, `${tailwindCss}\n`, "utf8");
await writeFile(bundlePath, `${modulesCss}\n\n${MARKER}\n${tailwindCss}\n`, "utf8");

console.log("Published dist-lib/styles.modules.css, styles.tailwind.css, and styles.css (full bundle).");
