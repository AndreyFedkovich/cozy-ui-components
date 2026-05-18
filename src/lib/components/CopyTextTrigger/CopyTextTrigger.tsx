import { memo, useCallback, type ReactNode } from "react";
import cn from "classnames";
import { Button as UiButton } from "@/components/ui/button";
import { CopyIcon } from "../../icons";
import { TooltipDark } from "../TooltipDark/Tooltip";
import css from "./CopyTextTrigger.module.scss";

export interface CopyTextTriggerProps {
  children?: ReactNode;
  onClick: () => void;
  copied: boolean;
  tooltipText?: string;
  ariaLabel?: string;
  showIcon?: boolean;
  /** Только иконка копирования, без оборачивания children в кнопку. */
  iconOnly?: boolean;
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
    iconOnly = false,
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
            className={cn(css.trigger, iconOnly && css.trigger_iconOnly, className)}
            onClick={handleClick}
            aria-label={ariaLabel}
            aria-live="polite"
          >
            {!iconOnly && children}
            {showIcon && <CopyIcon className={css.icon} aria-hidden />}
          </UiButton>
        </TooltipDark>
      </span>
    );
  },
);

CopyTextTrigger.displayName = "CopyTextTrigger";
