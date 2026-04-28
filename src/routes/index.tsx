import { createFileRoute } from "@tanstack/react-router";
import { UiLibraryPlaceholder } from "../lib";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "UI Library Starter" },
      {
        name: "description",
        content: "npm-ready React UI component library starter with a placeholder component.",
      },
      { property: "og:title", content: "UI Library Starter" },
      {
        property: "og:description",
        content: "A prepared starter package for publishing React UI components to npm.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto grid min-h-screen w-full max-w-6xl items-center gap-10 px-6 py-12 md:grid-cols-[1fr_0.9fr] md:px-10">
        <div className="space-y-8">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-normal text-muted-foreground">
              npm-ready React package
            </p>
            <h1 className="max-w-3xl text-4xl font-bold tracking-normal text-foreground md:text-6xl">
              UI Library Starter
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              Заготовка библиотеки UI-компонентов с настроенной npm-сборкой, экспортами,
              типами TypeScript и CSS-файлом для подключения в приложениях.
            </p>
          </div>

          <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
            <div className="border-l border-border pl-4">
              <p className="font-semibold text-foreground">ESM + CJS</p>
              <p>Готовые entry points для разных окружений.</p>
            </div>
            <div className="border-l border-border pl-4">
              <p className="font-semibold text-foreground">TypeScript</p>
              <p>Генерация деклараций в `dist`.</p>
            </div>
            <div className="border-l border-border pl-4">
              <p className="font-semibold text-foreground">Styles export</p>
              <p>Отдельный импорт CSS из пакета.</p>
            </div>
          </div>

          <pre className="overflow-x-auto rounded-lg border border-border bg-muted p-4 text-sm text-foreground">
            <code>{`npm install @andreyfedkovich/ui-library-placeholder

import { UiLibraryPlaceholder } from "@andreyfedkovich/ui-library-placeholder";
import "@andreyfedkovich/ui-library-placeholder/styles.css";`}</code>
          </pre>
        </div>

        <div className="flex justify-center md:justify-end">
          <UiLibraryPlaceholder
            title="Placeholder component"
            description="Этот компонент уже экспортируется из будущего npm-пакета и подтверждает, что библиотечная сборка работает."
            actionLabel="Build with bun run build:lib"
          />
        </div>
      </section>
    </main>
  );
}
