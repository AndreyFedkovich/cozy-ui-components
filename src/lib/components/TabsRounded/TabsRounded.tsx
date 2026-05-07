import cn from "classnames";
import * as React from "react";
import { useMemo } from "react";
import css from "./TabsRounded.module.scss";

type TabItemLegacy = {
  title: string;
  className?: string;
  needNotification?: boolean;
  header?: string;
};

export type TabItemRounded = TabItemLegacy | {
  value: string | number;
  label: string;
  className?: string;
  needNotification?: boolean;
  header?: string;
};

interface Props {
  className?: string;
  tabsClassName?: string;
  items: TabItemRounded[];
  children?: React.ReactNode;
  value?: string | number;
  onValueChange?: (value: string | number) => void;
  /** Legacy */
  activeTab?: number;
  onClick?: (activeTabIndex: number) => void;
}

function normalizeItems(items: TabItemRounded[]) {
  return items.map((item, index) => {
    if ("value" in item && "label" in item) {
      return {
        key: item.value,
        label: item.label,
        className: item.className,
        needNotification: item.needNotification,
        header: item.header,
      };
    }
    const legacy = item as TabItemLegacy;
    return {
      key: index,
      label: legacy.title,
      className: legacy.className,
      needNotification: legacy.needNotification,
      header: legacy.header,
    };
  });
}

export const TabsRounded: React.FC<Props> = React.memo(
  ({ className, items = [], children, value, onValueChange, activeTab, onClick, tabsClassName }) => {
    const normalized = useMemo(() => normalizeItems(items), [items]);

    const activeIndex = useMemo(() => {
      if (value !== undefined) {
        const idx = normalized.findIndex((t) => t.key === value);
        return idx >= 0 ? idx : 0;
      }
      return activeTab ?? 0;
    }, [value, activeTab, normalized]);

    return (
      <div className={cn(css.wrapper, className)}>
        <div className={cn(css.tabs, tabsClassName)}>
          {normalized.map(
            (item, index) =>
              item.label && (
                <div
                  key={index}
                  className={cn(css.tabItem, item.className, {
                    [css.active]: activeIndex === index,
                    [css.first]: index === 0,
                    [css.last]: index === normalized.length - 1,
                  })}
                  style={{
                    zIndex:
                      activeIndex === index ? normalized.length : index === 0 ? 0 : normalized.length - index,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onValueChange) {
                      onValueChange(item.key);
                    } else {
                      onClick?.(index);
                    }
                  }}
                >
                  {activeIndex === index && index !== 0 && <span className={css.before} />}
                  {item.label}
                  {activeIndex === index && index !== normalized.length - 1 && <span className={css.after} />}
                </div>
              ),
          )}
        </div>
        <div className={css.panel}>{children}</div>
      </div>
    );
  },
);
