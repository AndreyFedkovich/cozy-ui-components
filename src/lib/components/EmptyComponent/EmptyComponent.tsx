import React, { ReactNode } from "react";
import cn from "classnames";
import { EmptyIcon } from "../../icons";
import css from "./EmptyComponent.module.scss";

interface EmptyComponentProps {
  svg?: React.ReactNode;
  title?: string;
  subtitle?: string;
  content?: ReactNode;
  className?: string;
}

export const EmptyComponent: React.FC<EmptyComponentProps> = ({
  svg = <EmptyIcon />,
  title = "Нет данных для отображения",
  subtitle,
  content,
  className,
}) => (
  <div className={cn(css.emptyComponent, className)}>
    <div className={css.svgWrapper}>{svg}</div>
    {title && <span className={css.title}>{title}</span>}
    {subtitle && <span className={css.subtitle}>{subtitle}</span>}
    {content && content}
  </div>
);
