import React, { ReactNode } from "react";
import cn from "classnames";
import { EmptyIcon } from "../../icons";
import css from "./EmptyComponent.module.scss";

interface EmptyComponentProps {
  svg?: React.ReactNode;
  title?: string;
  /** Secondary line under the title (alias of {@link subtitle}). */
  description?: string;
  subtitle?: string;
  content?: ReactNode;
  className?: string;
}

export const EmptyComponent: React.FC<EmptyComponentProps> = ({
  svg = <EmptyIcon />,
  title = "Нет данных для отображения",
  description,
  subtitle,
  content,
  className,
}) => {
  const secondary = description ?? subtitle;
  return (
    <div className={cn(css.emptyComponent, className)}>
      <div className={css.svgWrapper}>{svg}</div>
      {title && <span className={css.title}>{title}</span>}
      {secondary && <span className={css.subtitle}>{secondary}</span>}
      {content && content}
    </div>
  );
};
