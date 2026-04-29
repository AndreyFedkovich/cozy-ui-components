import { FC, ReactNode } from "react";
import cn from "classnames";
import css from "./BaseBlock.module.scss";

interface BaseBlockProps {
  id?: string;
  title?: string | ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  className?: string;
}

export const BaseBlock: FC<BaseBlockProps> = ({ id, title, subtitle, children, className }) => (
  <div className={cn(css.block, className)} id={id}>
    {title && typeof title === "string" ? <div className={css.title}>{title}</div> : title}
    {subtitle && <div className={css.subtitle}>{subtitle}</div>}
    {children}
  </div>
);
