import { memo, useCallback, type ReactNode } from "react";
import cn from "classnames";
import { Button as UiButton } from "@/components/ui/button";
import { CopyIcon } from "../../icons";
import { TooltipDark } from "../TooltipDark/Tooltip";
import css from "./CopyTextTrigger.module.scss";

export interface CopyTextTriggerProps {
  children: ReactNode;
  onClick: () => void;
  copied: boolean;
  tooltipText?: string;
  ariaLabel?: string;
  showIcon?: boolean;
  className?: string;
}

export const CopyTextTrigger = memo(
  ({
    children,
    onClick,
    copied,
    tooltipText = "Скопировано",
    ariaLabel,
    showIcon = true,
    className,
  }: CopyTextTriggerProps) => {
    const handleClick = useCallback(() => {
      onClick();
    }, [onClick]);

    return (
      <span className={css.wrapper}>
        <TooltipDark open={copied} title={tooltipText} placement="top">
          <UiButton
            type="button"
            variant={null}
            size={null}
            className={cn(css.trigger, className)}
            onClick={handleClick}
            aria-label={ariaLabel}
            aria-live="polite"
          >
            {children}
            {showIcon && <CopyIcon className={css.icon} aria-hidden />}
          </UiButton>
        </TooltipDark>
      </span>
    );
  },
);

CopyTextTrigger.displayName = "CopyTextTrigger";
