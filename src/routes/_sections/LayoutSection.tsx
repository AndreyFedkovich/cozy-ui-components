import cardCoverUrl from "@/assets/demo/card-cover.png";
import {
  BaseBlock,
  Button,
  Card,
  Collapse,
  CollapsableBlock,
  EmptyComponent,
  Tag,
} from "../../lib";
import { CategoryHeader, DemoSection } from "./shared";

export default function LayoutSection() {
  return (
    <section>
      <CategoryHeader
        eyebrow="01 — Layout"
        title="Layout & containers"
        description="Базовые контейнеры для группировки и презентации контента."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <DemoSection
          title="BaseBlock"
          description="Универсальный контейнер с заголовком и подзаголовком."
          className="lg:col-span-2"
        >
          <BaseBlock title="UI Library v1.0" subtitle="@company/ui-kit · MIT License">
            <div className="mt-4 grid grid-cols-3 gap-4">
              {[
                { v: "20+", l: "компонентов" },
                { v: "60+", l: "иконок" },
                { v: "≈ 38 KB", l: "gzip" },
              ].map((m) => (
                <div key={m.l} className="rounded-lg bg-[#f4f7fa] px-4 py-3">
                  <div className="text-xl font-semibold text-foreground">{m.v}</div>
                  <div className="text-sm text-muted-foreground">{m.l}</div>
                </div>
              ))}
            </div>
            <div className="mt-5 flex gap-3">
              <Button variant="primary">View on npm</Button>
              <Button variant="text">Документация →</Button>
            </div>
          </BaseBlock>
        </DemoSection>

        <DemoSection
          title="Card"
          description="Простые карточки с фоном, цветом или изображением."
          className="lg:col-span-2"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="min-w-0">
              <Card
                text="Cover image"
                height={160}
                imageUrl={cardCoverUrl}
                textColor="#fff"
                className="w-full drop-shadow-sm"
              />
            </div>
            <div className="min-w-0">
              <Card
                text="Brand card"
                height={160}
                backgroundColor="#4573d9"
                textColor="#ffffff"
                className="w-full"
              />
            </div>
            <div className="min-w-0">
              <Card
                text="Light surface"
                height={160}
                backgroundColor="#eef6ff"
                textColor="#0f172a"
                className="w-full"
              />
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Поддерживают `link`, `imageUrl`, кастомные размеры и цвета.
          </p>
        </DemoSection>

        <DemoSection
          title="CollapsableBlock"
          description="Блок с заголовком, подсказкой и раскрывающимся контентом."
        >
          <CollapsableBlock
            header="Список изменений · v1.0.0"
            defaultOpen
            infoTooltipContent="Дата релиза: 30 апреля 2026"
            content={
              <div className="flex flex-col gap-3 pt-1">
                <div className="flex items-center gap-3">
                  <Tag>Feature</Tag>
                  <span className="text-base">Новый компонент Stepper</span>
                </div>
                <div className="flex items-center gap-3">
                  <Tag>Feature</Tag>
                  <span className="text-base">TreeDialogSelect c lazy-загрузкой</span>
                </div>
                <div className="flex items-center gap-3">
                  <Tag>Fix</Tag>
                  <span className="text-base">Согласованный border-radius у всех Select</span>
                </div>
                <div className="flex items-center gap-3">
                  <Tag>Fix</Tag>
                  <span className="text-base">Увеличены контролы внутри Select</span>
                </div>
              </div>
            }
          />
        </DemoSection>

        <DemoSection
          title="Collapse · FAQ"
          description="Несколько Collapse подряд формируют классический FAQ."
        >
          <div className="divide-y divide-border/60">
            <div className="py-2">
              <Collapse
                header="Как установить пакет?"
                defaultOpen
                content={
                  <code className="mt-2 block rounded-md bg-[#0f172a] px-3 py-2 text-sm text-white">
                    npm install @company/ui-kit
                  </code>
                }
              />
            </div>
            <div className="py-2">
              <Collapse
                header="Поддерживает ли библиотека SSR?"
                content="Да. Все компоненты совместимы с TanStack Start и Next.js."
              />
            </div>
            <div className="py-2">
              <Collapse
                header="Как кастомизировать темы?"
                content="Переопределите CSS-переменные палитры в собственном scss-файле и подключите его после стилей библиотеки."
              />
            </div>
          </div>
        </DemoSection>

        <DemoSection
          title="EmptyComponent"
          description="Состояние «нет данных» с CTA-кнопкой."
          className="lg:col-span-2"
        >
          <div className="rounded-xl border border-border/50 bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-lg font-semibold">Список задач</h4>
              <Button variant="text">+ Создать</Button>
            </div>
            <EmptyComponent
              title="Задач пока нет"
              subtitle="Создайте первую задачу — она появится здесь."
            />
          </div>
        </DemoSection>
      </div>
    </section>
  );
}