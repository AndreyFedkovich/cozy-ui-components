import { useState } from "react";
import { Button, Carousel, Stepper, Tabs, TabsRounded } from "../../lib";
import { CategoryHeader, DemoSection } from "./shared";

const tabsItems = [{ title: "Обзор" }, { title: "Данные" }, { title: "Настройки" }];
const tabContent = [
  "Сводка по проекту: ключевые показатели и активность за последние 7 дней.",
  "Таблицы и графики с агрегированными данными по выбранным фильтрам.",
  "Управление параметрами рабочего пространства и интеграциями.",
];

export default function NavigationSection() {
  const [tab, setTab] = useState(0);
  const [roundedTab, setRoundedTab] = useState(0);
  const [stepperStep, setStepperStep] = useState(2);
  const [namedStep, setNamedStep] = useState(1);

  return (
    <section>
      <CategoryHeader
        eyebrow="03 — Navigation"
        title="Navigation & flow"
        description="Табы, шаги мастера и карусели для перехода между состояниями."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <DemoSection title="Tabs" description="Классические табы с подчёркиванием активного.">
          <Tabs
            items={tabsItems}
            activeTab={tab}
            changesIndex={2}
            badgeValue={3}
            onClick={setTab}
          />
          <p className="mt-4 text-base text-muted-foreground">{tabContent[tab]}</p>
        </DemoSection>

        <DemoSection title="TabsRounded" description="Скруглённый стиль табов.">
          <TabsRounded items={tabsItems} activeTab={roundedTab} onClick={setRoundedTab} />
          <p className="mt-4 text-base text-muted-foreground">{tabContent[roundedTab]}</p>
        </DemoSection>

        <DemoSection
          title="Stepper"
          description="Прогресс пошагового процесса с возможностью переключения."
          className="lg:col-span-2"
        >
          <div className="flex flex-col gap-8">
            <Stepper
              items={[{}, {}, {}, {}, {}, {}]}
              current={stepperStep}
              onChange={setStepperStep}
            />
            <div>
              <Stepper
                items={[
                  { label: "Контакты" },
                  { label: "Документы" },
                  { label: "Подтверждение" },
                  { label: "Готово" },
                ]}
                current={namedStep}
                onChange={setNamedStep}
                showCheckOnCompleted
              />
              <div className="mt-5 flex gap-3">
                <Button
                  variant="secondary"
                  onClick={() => setNamedStep((s) => Math.max(0, s - 1))}
                >
                  Назад
                </Button>
                <Button
                  variant="primary"
                  onClick={() => setNamedStep((s) => Math.min(3, s + 1))}
                >
                  Далее
                </Button>
              </div>
            </div>
          </div>
        </DemoSection>

        <DemoSection
          title="Carousel"
          description="Слайдер с произвольной разметкой каждого слайда."
          className="lg:col-span-2"
        >
          <Carousel
            items={[
              {
                id: 1,
                title: "Дизайн-система",
                subtitle: "Единая палитра, типографика, отступы",
                gradient: "from-[#4573d9] to-[#001a3d]",
              },
              {
                id: 2,
                title: "Form controls",
                subtitle: "Селекты, чекбоксы, инпуты",
                gradient: "from-[#00a582] to-[#001a3d]",
              },
              {
                id: 3,
                title: "Feedback",
                subtitle: "Tooltip, Popover, Spinner",
                gradient: "from-[#ff6b2c] to-[#d72d40]",
              },
            ]}
            renderItem={(item) => (
              <div
                className={`flex h-56 w-full flex-col justify-end rounded-xl bg-gradient-to-br ${item.gradient} p-6 text-white`}
              >
                <div className="text-2xl font-semibold">{item.title}</div>
                <div className="text-base opacity-90">{item.subtitle}</div>
              </div>
            )}
          />
        </DemoSection>
      </div>
    </section>
  );
}