import cn from "classnames";
import React, { ReactNode, useCallback, useLayoutEffect, useRef, useState } from "react";
import { CheckIcon } from "../../icons";
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
  labelMaxWidth?: number | string;
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({
  items,
  current,
  onChange,
  showCheckOnCompleted = false,
  labelMaxWidth = 140,
  className,
}) => {
  const isClickable = Boolean(onChange);
  const hasAnyLabels = items.some((item) => Boolean(item.label));
  const lastIndex = items.length - 1;
  const labelsRowRef = useRef<HTMLDivElement | null>(null);
  const labelRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const [safePads, setSafePads] = useState({ left: 0, right: 0 });
  const labelMaxWidthValue =
    typeof labelMaxWidth === "number" ? `${labelMaxWidth}px` : labelMaxWidth;
  const columnsTemplate = items
    .flatMap((_, index) => (index === lastIndex ? ["32px"] : ["32px", "minmax(0, 1fr)"]))
    .join(" ");

  const measureSafePads = useCallback(() => {
    if (!hasAnyLabels) {
      setSafePads({ left: 0, right: 0 });
      return;
    }

    const firstLabel = labelRefs.current.find((label) => label !== null) ?? null;
    const lastLabel =
      [...labelRefs.current].reverse().find((label) => label !== null) ?? null;

    const leftWidth = firstLabel?.getBoundingClientRect().width ?? 0;
    const rightWidth = lastLabel?.getBoundingClientRect().width ?? 0;
    const nextPads = {
      left: Math.max(0, leftWidth / 2 - 16),
      right: Math.max(0, rightWidth / 2 - 16),
    };

    setSafePads((prev) => {
      const changed =
        Math.abs(prev.left - nextPads.left) > 0.5 || Math.abs(prev.right - nextPads.right) > 0.5;

      return changed ? nextPads : prev;
    });
  }, [hasAnyLabels]);

  useLayoutEffect(() => {
    measureSafePads();

    if (!hasAnyLabels || typeof ResizeObserver === "undefined") {
      return undefined;
    }

    const observer = new ResizeObserver(measureSafePads);
    if (labelsRowRef.current) {
      observer.observe(labelsRowRef.current);
    }

    labelRefs.current.forEach((label) => {
      if (label) {
        observer.observe(label);
      }
    });

    return () => observer.disconnect();
  }, [hasAnyLabels, items, labelMaxWidthValue, measureSafePads]);

  return (
    <div
      className={cn(css.wrapper, className, { [css.wrapper_withLabels]: hasAnyLabels })}
      style={
        {
          "--stepper-label-max-width": labelMaxWidthValue,
          "--stepper-safe-pad-left": `${safePads.left}px`,
          "--stepper-safe-pad-right": `${safePads.right}px`,
        } as React.CSSProperties
      }
    >
      <div className={css.track} style={{ gridTemplateColumns: columnsTemplate }} role="list">
      {items.map((item, index) => {
        const isCompleted = index < current;
        const isCurrent = index === current;
        const isActive = index <= current;
        const isLast = index === lastIndex;
        const showCheck = showCheckOnCompleted && isCompleted;

        const stepContent = item.content ?? (showCheck ? <CheckIcon /> : index + 1);

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
            <div className={css.stepWrap} role="listitem">
              {stepNode}
            </div>
            {!isLast ? (
              <span
                className={cn(css.connector, { [css.connector_active]: index < current })}
              />
            ) : null}
          </React.Fragment>
        );
      })}
      </div>
      {hasAnyLabels ? (
        <div
          ref={labelsRowRef}
          className={css.labelsRow}
          style={{ gridTemplateColumns: columnsTemplate }}
          aria-hidden
        >
          {items.map((item, index) => {
            const isActive = index <= current;
            const isLast = index === lastIndex;
            if (!item.label) {
              labelRefs.current[index] = null;
            }

            return (
              <React.Fragment key={`label-${index}`}>
                <div className={css.labelAnchor}>
                  {item.label ? (
                    <span
                      ref={(element) => {
                        labelRefs.current[index] = element;
                      }}
                      className={cn(css.label, { [css.label_active]: isActive })}
                    >
                      {item.label}
                    </span>
                  ) : null}
                </div>
                {!isLast ? <span className={css.labelSpacer} /> : null}
              </React.Fragment>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};
