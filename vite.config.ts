import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { defineConfig as defineLovableConfig } from "@lovable.dev/vite-tanstack-config";
import react from "@vitejs/plugin-react";
import { defineConfig as defineViteConfig, type ConfigEnv, type LibraryFormats } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default async function config(env: ConfigEnv) {
  if (env.mode === "library") {
    const dts = (await import("vite-plugin-dts")).default;

    return defineViteConfig({
      plugins: [
        react(),
        dts({
          include: [resolve(__dirname, "src/lib/**/*")],
          exclude: ["**/*.test.*", "**/*.spec.*", "node_modules/**"],
          outDir: "dist",
          rollupTypes: true,
          tsconfigPath: resolve(__dirname, "tsconfig.json"),
        }),
      ],
      build: {
        lib: {
          entry: resolve(__dirname, "src/lib/index.ts"),
          name: "UiLibrary",
          fileName: (format: string) => `ui-library.${format}.js`,
          formats: ["es", "cjs"] as LibraryFormats[],
        },
        rollupOptions: {
          external: ["react", "react-dom", "react/jsx-runtime"],
          output: {
            globals: {
              react: "React",
              "react-dom": "ReactDOM",
              "react/jsx-runtime": "ReactJSXRuntime",
            },
            assetFileNames: "styles.[ext]",
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

  return defineLovableConfig()(env);
}
