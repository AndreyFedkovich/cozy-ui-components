import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { defineConfig as defineViteConfig, type ConfigEnv, type LibraryFormats } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

const SVG_REACT_SHIM = `declare module "*.svg?react" {
  import type { FC, SVGProps } from "react";
  const ReactComponent: FC<SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
`;

async function patchLibDeclarationBundle() {
  const shimPath = resolve(__dirname, "dist-lib/svg-react-shim.d.ts");
  const indexPath = resolve(__dirname, "dist-lib/index.d.ts");
  await writeFile(shimPath, SVG_REACT_SHIM, "utf8");
  const index = await readFile(indexPath, "utf8");
  const ref = `/// <reference path="./svg-react-shim.d.ts" />\n`;
  if (!index.startsWith(ref)) {
    await writeFile(indexPath, ref + index, "utf8");
  }
}

export default async function config(env: ConfigEnv) {
  if (env.mode === "library") {
    const dts = (await import("vite-plugin-dts")).default;

    return defineViteConfig({
      plugins: [
        react(),
        svgr(),
        dts({
          include: [resolve(__dirname, "src/lib/**/*")],
          exclude: ["**/*.test.*", "**/*.spec.*", "node_modules/**"],
          outDir: resolve(__dirname, "dist-lib"),
          entryRoot: resolve(__dirname, "src/lib"),
          rollupTypes: true,
          insertTypesEntry: true,
          tsconfigPath: resolve(__dirname, "tsconfig.json"),
          async afterBuild() {
            await patchLibDeclarationBundle();
          },
        }),
      ],
      build: {
        lib: {
          entry: resolve(__dirname, "src/lib/index.ts"),
          name: "UiLibrary",
          fileName: (format: string) => `ui-library.${format}.js`,
          formats: ["es", "cjs"] as LibraryFormats[],
        },
        outDir: "dist-lib",
        rollupOptions: {
          external: ["react", "react-dom", "react/jsx-runtime"],
          output: {
            globals: {
              react: "React",
              "react-dom": "ReactDOM",
              "react/jsx-runtime": "ReactJSXRuntime",
            },
            assetFileNames: "styles.modules.[ext]",
          },
        },
        sourcemap: true,
        emptyOutDir: true,
        cssCodeSplit: false,
      },
      resolve: {
        alias: {
          "@": resolve(__dirname, "./src"),
        },
      },
    });
  }

  const tailwindcss = (await import("@tailwindcss/vite")).default;
  const tsconfigPaths = (await import("vite-tsconfig-paths")).default;
  const { tanstackRouter } = await import("@tanstack/router-plugin/vite");

  const spaConfig = defineViteConfig({
    plugins: [
      tsconfigPaths(),
      tanstackRouter({ target: "react", autoCodeSplitting: true }),
      react(),
      svgr(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
  });

  // SPA build for Vercel / static hosting (no SSR, no Cloudflare worker).
  if (env.command === "build") {
    return defineViteConfig({
      ...spaConfig,
      build: {
        outDir: "dist",
        emptyOutDir: true,
        sourcemap: false,
      },
    });
  }

  return spaConfig;
}
