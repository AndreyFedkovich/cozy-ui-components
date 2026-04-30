import cn from "classnames";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import css from "./Tabs.module.scss";

interface TabsProps {
  items: { title: string; className?: string; header?: string }[];
  activeTab: number;
  changesIndex?: number;
  /** Arbitrary numeric label for the tab at `changesIndex` (semantics defined by the consumer). */
  badgeValue?: number;
  className?: string;
  tabsClassName?: string;
  sliderClassName?: string;
  onClick?: (activeTab: number) => void;
}

export const Tabs = React.memo(
  ({
    items = [],
    activeTab,
    className,
    tabsClassName,
    changesIndex,
    badgeValue,
    sliderClassName,
    onClick,
  }: TabsProps) => {
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
        if (!!animationFrameRef.current) {
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
    }, [activeTab]);

    return (
      <div className={cn(css.container, className)}>
        <div className={cn(css.tabs, css.tabs_hasAnimatedIndicator, tabsClassName)}>
          {items.map(
            (item, index) =>
              item.title && (
                <div
                  key={index}
                  ref={activeTab === index ? tabRef : undefined}
                  className={cn(css.tabItem, item.className, {
                    [css.active]: activeTab === index,
                  })}
                  onClick={(e) => {
                    e.stopPropagation();
                    onClick?.(index);
                  }}
                >
                  {item.header && <div className={css.header}>{item.header}</div>}
                  {item.title}
                  {changesIndex === index && (
                    <div className={css.notificationChanges}>
                      {badgeValue != null
                        ? badgeValue > 99
                          ? "99+"
                          : String(badgeValue)
                        : null}
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
