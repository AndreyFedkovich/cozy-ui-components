import cn from "classnames";
import { CircleHelp } from "lucide-react";
import { useRef, type ReactNode } from "react";
import { Label } from "../Label/Label";
import labelCss from "../Label/Label.module.scss";
import { TooltipLight } from "../TooltipLight/TooltipLight";
import css from "./FieldLabel.module.scss";

export interface FieldLabelProps {
  htmlFor?: string;
  children: ReactNode;
  required?: boolean;
  tooltipContent?: ReactNode;
  tooltipPopperClassName?: string;
  className?: string;
  labelClassName?: string;
}

export const FieldLabel = ({
  htmlFor,
  children,
  required,
  tooltipContent,
  tooltipPopperClassName,
  className,
  labelClassName,
}: FieldLabelProps) => {
  const tooltipTargetRef = useRef<HTMLButtonElement>(null);
  const content =
    typeof children === "string" && required ? `${children} *` : children;

  if (tooltipContent) {
    return (
      <div className={cn(css.labelRow, className)}>
        <Label
          className={cn(labelCss.label_inline, labelClassName)}
          htmlFor={htmlFor}
        >
          {content}
        </Label>
        <button
          ref={tooltipTargetRef}
          type="button"
          className={css.helpIcon}
          aria-label="Справка по полю"
        >
          <CircleHelp className={css.helpIconSvg} aria-hidden />
        </button>
        <TooltipLight
          target={tooltipTargetRef}
          popperClassName={tooltipPopperClassName}
        >
          {tooltipContent}
        </TooltipLight>
      </div>
    );
  }

  return (
    <Label htmlFor={htmlFor} className={className}>
      {content}
    </Label>
  );
};
