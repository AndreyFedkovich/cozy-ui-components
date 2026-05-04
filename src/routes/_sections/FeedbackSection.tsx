import { useRef, useState } from "react";
import {
  Button,
  CopyTextTrigger,
  Popover,
  Spinner,
  Tag,
  TooltipDark,
  TooltipLight,
} from "../../lib";
import { CategoryHeader, DemoSection } from "./shared";

export default function FeedbackSection() {
  const [copied, setCopied] = useState(false);
  const popoverTarget = useRef<HTMLButtonElement>(null);
  const tooltipTargetId = "tooltip-light-demo-target";

  const handleCopy = () => {
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <section>
      <CategoryHeader
        eyebrow="04 — Feedback"
        title="Feedback & overlays"
        description="Кнопки, теги, тултипы, поповеры, спиннеры и копирование."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <DemoSection
          title="Button"
          description="Все варианты кнопок и состояние загрузки."
          className="lg:col-span-2"
        >
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="default">Default</Button>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="text">Text</Button>
            <Button loading>Loading</Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </div>
        </DemoSection>

        <DemoSection title="Tag" description="Статусные метки разных размеров.">
          <div className="flex flex-wrap gap-3">
            <Tag>Readonly</Tag>
            <Tag isSmall onClick={() => undefined}>
              Closable
            </Tag>
            <Tag>Active</Tag>
            <Tag isSmall onClick={() => undefined}>
              Filter: 2026
            </Tag>
          </div>
        </DemoSection>

        <DemoSection
          title="CopyTextTrigger + TooltipDark"
          description="Копирование строки и тёмная подсказка."
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4 rounded-lg bg-[#0f172a] px-4 py-3 font-mono text-sm text-white">
              <span className="truncate">npm install @company/ui-kit</span>
              <CopyTextTrigger
                copied={copied}
                onClick={handleCopy}
                ariaLabel="Скопировать команду"
                className="!text-white"
              >
                Copy
              </CopyTextTrigger>
            </div>
            <div>
              <TooltipDark title="Тёмный tooltip с подсказкой" trigger="hover" placement="top">
                <Button variant="secondary">Hover me</Button>
              </TooltipDark>
            </div>
          </div>
        </DemoSection>

        <DemoSection
          title="TooltipLight + Popover"
          description="Светлая подсказка и поповер для расширенного контента."
          className="lg:col-span-2"
        >
          <div className="flex flex-wrap items-center gap-4 rounded-lg border border-border/50 bg-white p-4">
            <Button id={tooltipTargetId} variant="secondary">
              Light tooltip
            </Button>
            <TooltipLight placement="top" target={tooltipTargetId}>
              Светлый tooltip
            </TooltipLight>
            <Button ref={popoverTarget} variant="primary">
              Open popover
            </Button>
            <Popover target={popoverTarget} placement="bottom">
              Контент popover-компонента.
            </Popover>
            <span className="ml-auto text-sm text-muted-foreground">
              Используется как тулбар: подсказки + действия.
            </span>
          </div>
        </DemoSection>

        <DemoSection
          title="Spinner"
          description="Три размера индикатора загрузки в реалистичных карточках."
          className="lg:col-span-2"
        >
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { size: "big" as const, label: "Loading data…", min: 180 },
              { size: "small" as const, label: "Saving…", min: 140 },
              { size: "extraSmall" as const, label: "Synchronizing…", min: 100 },
            ].map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border/50 bg-white"
                style={{ minHeight: s.min }}
              >
                <div className="flex items-center justify-center">
                  <Spinner size={s.size} />
                </div>
                <div className="pb-4 text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </DemoSection>
      </div>
    </section>
  );
}