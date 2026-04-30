import cn from "classnames";
import React, { ReactNode } from "react";
import { DoneIcon } from "../../icons";
import css from "./Stepper.module.scss";

export type StepperItem = {
  label?: ReactNode;
  content?: ReactNode;
};

export interface StepperProps {
  items: StepperItem[];
  current: number;
  onChange?: (index: number) => void;
  showCheckOnCompleted?: boolean;
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({
  items,
  current,
  onChange,
  showCheckOnCompleted = false,
  className,
}) => {
  const isClickable = Boolean(onChange);

  return (
    <div className={cn(css.wrapper, className)} role="list">
      {items.map((item, index) => {
        const isCompleted = index < current;
        const isCurrent = index === current;
        const isActive = index <= current;
        const isLast = index === items.length - 1;
        const showCheck = showCheckOnCompleted && isCompleted;

        const stepContent = item.content ?? (showCheck ? <DoneIcon /> : index + 1);

        const stepNode = (
          <button
            type="button"
            className={cn(css.step, {
              [css.step_inactive]: !isActive,
              [css.step_current]: isCurrent,
              [css.clickable]: isClickable,
            })}
            disabled={!isClickable}
            onClick={() => onChange?.(index)}
            aria-current={isCurrent ? "step" : undefined}
            aria-label={typeof item.label === "string" ? item.label : `Шаг ${index + 1}`}
          >
            {stepContent}
          </button>
        );

        return (
          <React.Fragment key={index}>
            {item.label ? (
              <div className={css.itemBlock} role="listitem">
                {stepNode}
                <span className={cn(css.label, { [css.label_active]: isActive })}>
                  {item.label}
                </span>
              </div>
            ) : (
              <div role="listitem">{stepNode}</div>
            )}
            {!isLast && (
              <span
                className={cn(css.connector, { [css.connector_active]: index < current })}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
