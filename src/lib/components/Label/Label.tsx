import cn from "classnames";
import type { ReactNode } from "react";
import css from "./Label.module.scss";

export interface LabelProps {
  htmlFor?: string;
  children: ReactNode;
  className?: string;
}

export const Label = ({ htmlFor, children, className }: LabelProps) => (
  <label htmlFor={htmlFor} className={cn(css.label, className)}>
    {typeof children === "string" ? <div className={css.label__text}>{children}</div> : children}
  </label>
);
