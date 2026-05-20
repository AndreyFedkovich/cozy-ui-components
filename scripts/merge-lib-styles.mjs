import { readFile, writeFile, unlink } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const outPath = resolve(root, "dist-lib/styles.css");
const scssPath = resolve(root, "dist-lib/styles.css");
const tailwindPath = resolve(root, "dist-lib/tailwind.chunk.css");

const scssCss = await readFile(scssPath, "utf8");
let tailwindCss = "";

try {
  tailwindCss = await readFile(tailwindPath, "utf8");
} catch {
  console.error("Missing dist-lib/tailwind.chunk.css — run build:lib:tailwind first.");
  process.exit(1);
}

const merged = `${scssCss.trim()}\n\n/* cozy-ui: Tailwind utilities for ui primitives (Calendar, etc.) */\n${tailwindCss.trim()}\n`;

await writeFile(outPath, merged, "utf8");
await unlink(tailwindPath).catch(() => {});

console.log("Merged SCSS + Tailwind into dist-lib/styles.css");
