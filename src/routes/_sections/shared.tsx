import type { ReactNode } from "react";

export function CategoryHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6 flex flex-col gap-2 border-b border-border/60 pb-4">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
        {eyebrow}
      </span>
      <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">{title}</h2>
      {description && (
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

export function DemoSection({
  title,
  description,
  className,
  stageClassName,
  children,
}: {
  title: string;
  description?: string;
  className?: string;
  stageClassName?: string;
  children: ReactNode;
}) {
  return (
    <section
      className={
        "rounded-2xl border border-border/60 bg-card/80 p-7 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_32px_-18px_rgba(69,115,217,0.25)] backdrop-blur " +
        (className ?? "")
      }
    >
      <header className="mb-5">
        <h3 className="text-2xl font-semibold tracking-tight text-card-foreground">{title}</h3>
        {description && (
          <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">{description}</p>
        )}
      </header>
      <div
        className={
          "rounded-xl border border-dashed border-border/70 bg-gradient-to-b from-slate-50/80 to-white p-6 " +
          (stageClassName ?? "")
        }
      >
        {children}
      </div>
    </section>
  );
}

export function SectionFallback({ minHeight = 320 }: { minHeight?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-2xl border border-dashed border-border/40 bg-card/40"
      style={{ minHeight }}
    >
      <span className="text-sm text-muted-foreground">Загрузка секции…</span>
    </div>
  );
}