import cn from "classnames";
import * as React from "react";
import css from "./InputCaption.module.scss";

interface InputCaptionProps {
  isFullWidth?: boolean;
}

export const InputCaption: React.FC<InputCaptionProps> = ({ children, isFullWidth }) => (
  <p className={cn(css.errorCaption, { [css.fullWidth]: isFullWidth })}>{children}</p>
);
