import { Tooltip, TooltipProps } from "reactstrap";
import { FC } from "react";
import cn from "classnames";
import css from "./TooltipLight.module.scss";

export const TooltipLight: FC<TooltipProps> = ({ children, popperClassName, ...props }) => (
  <Tooltip popperClassName={cn(css.tooltip, popperClassName)} {...props}>
    {children}
  </Tooltip>
);
