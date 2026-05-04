import { createFileRoute } from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { LazySection } from "./_sections/LazySection";
import { SectionFallback } from "./_sections/shared";

const LayoutSection = lazy(() => import("./_sections/LayoutSection"));
const InputsSection = lazy(() => import("./_sections/InputsSection"));
const NavigationSection = lazy(() => import("./_sections/NavigationSection"));
const FeedbackSection = lazy(() => import("./_sections/FeedbackSection"));
const WorkflowSection = lazy(() => import("./_sections/WorkflowSection"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cozy UI — Premium React Component Library" },
      {
        name: "description",
        content:
          "Cozy UI — премиальная React-библиотека компонентов. Живое демо, API и дизайн-токены пакета @andreyfedkovich/cozy-ui.",
      },
      { property: "og:title", content: "Cozy UI — Premium React Component Library" },
      {
        property: "og:description",
        content:
          "Типизированные, SSR-safe, tree-shakeable React-компоненты с продуманной дизайн-системой. Попробуйте живое демо.",
      },
      { property: "og:url", content: "https://cozy-ui-components.vercel.app" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Hero() {
  return (
    <header className="space-y-6">
      <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white/60 px-4 py-1.5 text-sm font-medium text-foreground backdrop-blur">
        <span className="inline-block h-2 w-2 rounded-full bg-[#00a582]" />
        v0.1 · @andreyfedkovich/cozy-ui
      </div>
      <h1 className="bg-gradient-to-r from-[#001a3d] via-[#1f3a8a] to-[#4573d9] bg-clip-text text-5xl font-bold leading-tight tracking-tight text-transparent md:text-6xl">
        Cozy UI
      </h1>
      <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
        Премиальная, типизированная React-библиотека компонентов с продуманной дизайн-системой.
        Установите через{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-base">@andreyfedkovich/cozy-ui</code> —
        SSR-safe, tree-shakeable, ESM + CJS.
      </p>

      <div className="grid grid-cols-2 gap-3 pt-2 md:grid-cols-4">
        {[
          { label: "Компонентов", value: "20+" },
          { label: "TypeScript", value: "100%" },
          { label: "Дерево-шейкинг", value: "Yes" },
          { label: "Стили", value: "SCSS modules" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-border/60 bg-white/70 px-4 py-3 backdrop-blur"
          >
            <div className="text-2xl font-semibold text-foreground">{s.value}</div>
            <div className="text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
    </header>
  );
}

function Index() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#f4f7fa] via-white to-[#eef3fb] px-6 py-16 text-foreground md:px-10">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full bg-[#4573d9]/15 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 right-0 h-[420px] w-[420px] rounded-full bg-[#d3e8fa]/60 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl space-y-16">
        <Hero />

        {/* Layout — рендерится eagerly после hero для быстрого первого экрана */}
        <Suspense fallback={<SectionFallback />}>
          <LayoutSection />
        </Suspense>

        <LazySection fallback={<SectionFallback />}>
          <Suspense fallback={<SectionFallback />}>
            <InputsSection />
          </Suspense>
        </LazySection>

        <LazySection fallback={<SectionFallback />}>
          <Suspense fallback={<SectionFallback />}>
            <NavigationSection />
          </Suspense>
        </LazySection>

        <LazySection fallback={<SectionFallback />}>
          <Suspense fallback={<SectionFallback />}>
            <FeedbackSection />
          </Suspense>
        </LazySection>

        <LazySection fallback={<SectionFallback />}>
          <Suspense fallback={<SectionFallback />}>
            <WorkflowSection />
          </Suspense>
        </LazySection>

        <footer className="flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-8 md:flex-row md:items-center">
          <div className="text-base text-muted-foreground">© 2026 · UI Library</div>
          <nav className="flex items-center gap-6 text-base">
            <a className="text-muted-foreground transition-colors hover:text-foreground" href="#">
              GitHub
            </a>
            <a className="text-muted-foreground transition-colors hover:text-foreground" href="#">
              npm
            </a>
            <a className="text-muted-foreground transition-colors hover:text-foreground" href="#">
              Docs
            </a>
          </nav>
        </footer>
      </div>
    </main>
  );
}