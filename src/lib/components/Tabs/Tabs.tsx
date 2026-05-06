import cn from "classnames";
import * as React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import css from "./Tabs.module.scss";

type TabItemLegacy = { title: string; className?: string; header?: string };
export type TabItem =
  | TabItemLegacy
  | { value: string | number; label: string; className?: string; header?: string };

interface TabsProps {
  items: TabItem[];
  /** Preferred: controlled tab id (matches `items[].value`). */
  value?: string | number;
  onValueChange?: (value: string | number) => void;
  /** Legacy: controlled tab index */
  activeTab?: number;
  /** Legacy */
  onClick?: (activeTabIndex: number) => void;
  changesIndex?: number;
  /** Arbitrary numeric label for the tab at `changesIndex` (semantics defined by the consumer). */
  badgeValue?: number;
  className?: string;
  tabsClassName?: string;
  sliderClassName?: string;
}

function normalizeItems(items: TabItem[]) {
  return items.map((item, index) => {
    if ("value" in item && "label" in item) {
      return {
        key: item.value,
        label: item.label,
        className: item.className,
        header: item.header,
      };
    }
    const legacy = item as TabItemLegacy;
    return {
      key: index,
      label: legacy.title,
      className: legacy.className,
      header: legacy.header,
    };
  });
}

export const Tabs = React.memo(
  ({
    items = [],
    value,
    onValueChange,
    activeTab,
    className,
    tabsClassName,
    changesIndex,
    badgeValue,
    sliderClassName,
    onClick,
  }: TabsProps) => {
    const normalized = useMemo(() => normalizeItems(items), [items]);

    const activeIndex = useMemo(() => {
      if (value !== undefined) {
        const idx = normalized.findIndex((t) => t.key === value);
        return idx >= 0 ? idx : 0;
      }
      if (activeTab !== undefined) {
        return activeTab;
      }
      return 0;
    }, [value, activeTab, normalized]);

    const tabRef = useRef<HTMLDivElement>(null);
    const animationFrameRef = useRef<number | null>(null);
    const [line, setLine] = useState({ left: 0, width: 0 });

    useEffect(() => {
      const node = tabRef.current;

      if (!node) {
        return;
      }

      const updateLine = () => {
        const nextLine = {
          left: node.offsetLeft || 0,
          width: node.clientWidth || 0,
        };

        setLine((prevLine) =>
          prevLine.left === nextLine.left && prevLine.width === nextLine.width
            ? prevLine
            : nextLine,
        );
      };

      const scheduleLineUpdate = () => {
        if (animationFrameRef.current !== null) {
          cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
          animationFrameRef.current = null;
          updateLine();
        });
      };

      scheduleLineUpdate();

      const resizeObserver = new ResizeObserver(() => {
        scheduleLineUpdate();
      });
      resizeObserver.observe(node);

      return () => {
        resizeObserver.disconnect();

        if (animationFrameRef.current !== null) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
      };
    }, [activeIndex]);

    return (
      <div className={cn(css.container, className)}>
        <div className={cn(css.tabs, css.tabs_hasAnimatedIndicator, tabsClassName)}>
          {normalized.map(
            (item, index) =>
              item.label && (
                <div
                  key={index}
                  ref={activeIndex === index ? tabRef : undefined}
                  className={cn(css.tabItem, item.className, {
                    [css.active]: activeIndex === index,
                  })}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onValueChange) {
                      onValueChange(item.key);
                    } else {
                      onClick?.(index);
                    }
                  }}
                >
                  {item.header && <div className={css.header}>{item.header}</div>}
                  {item.label}
                  {changesIndex === index && (
                    <div className={css.notificationChanges}>
                      {badgeValue != null ? (badgeValue > 99 ? "99+" : String(badgeValue)) : null}
                    </div>
                  )}
                </div>
              ),
          )}
          <div
            className={cn(css.line, sliderClassName)}
            style={{
              left: line.left,
              width: line.width,
            }}
          />
        </div>
      </div>
    );
  },
);
