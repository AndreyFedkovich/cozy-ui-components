import cn from "classnames";
import * as React from "react";
import css from "./TabsRounded.module.scss";

interface Props {
  className?: string;
  tabsClassName?: string;
  items: { title: string; className?: string; needNotification?: boolean; header?: string }[];
  activeTab: number;
  onClick?: (activeTab: number) => void;
}

export const TabsRounded: React.FC<Props> = React.memo(
  ({ className, items = [], activeTab, onClick, tabsClassName }) => (
    <div className={cn(css.wrapper, className)}>
      <div className={cn(css.tabs, tabsClassName)}>
        {items.map(
          (item, index) =>
            item.title && (
              <div
                key={index}
                className={cn(css.tabItem, item.className, {
                  [css.active]: activeTab === index,
                })}
                style={{
                  zIndex:
                    activeTab === index ? items.length : index === 0 ? 0 : items.length - index,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onClick?.(index);
                }}
              >
                {item.title}
              </div>
            ),
        )}
      </div>
    </div>
  ),
);
