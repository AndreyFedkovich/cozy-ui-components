import cn from "classnames";
import React, { ReactNode, useLayoutEffect, useRef, useState } from "react";
import { DoneIcon } from "../../icons";
import css from "./Stepper.module.scss";

const STEP_SIZE = 32;
const STEP_RADIUS = STEP_SIZE / 2;

type ConnectorGeometry = {
  left: number;
  width: number;
};

const buildConnectorGeometry = (centers: number[]): ConnectorGeometry[] =>
  centers.slice(0, -1).map((center, index) => {
    const left = center + STEP_RADIUS;
    const right = centers[index + 1] - STEP_RADIUS;

    return {
      left,
      width: Math.max(0, right - left),
    };
  });

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
  const hasAnyLabels = items.some((item) => Boolean(item.label));
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const stepRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [connectorGeometry, setConnectorGeometry] = useState<ConnectorGeometry[]>([]);

  useLayoutEffect(() => {
    if (!hasAnyLabels || items.length < 2) {
      setConnectorGeometry([]);
      return undefined;
    }

    const measureConnectors = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) {
        return;
      }

      const wrapperRect = wrapper.getBoundingClientRect();
      const centers: number[] = [];

      for (const step of stepRefs.current.slice(0, items.length)) {
        if (!step) {
          return;
        }

        const rect = step.getBoundingClientRect();
        centers.push(rect.left - wrapperRect.left + rect.width / 2);
      }

      setConnectorGeometry(buildConnectorGeometry(centers));
    };

    measureConnectors();

    if (typeof ResizeObserver === "undefined") {
      return undefined;
    }

    const observer = new ResizeObserver(measureConnectors);

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    stepRefs.current.forEach((step) => {
      if (step) {
        observer.observe(step);
      }
    });

    return () => observer.disconnect();
  }, [hasAnyLabels, items.length]);

  const renderConnector = (index: number, isActive: boolean) => (
    <>
      <span
        className={cn(css.connector, {
          [css.connector_active]: isActive,
          [css.connector_placeholder]: hasAnyLabels,
        })}
      />
      {hasAnyLabels ? (
        <span
          className={cn(css.connectorFloating, { [css.connector_active]: isActive })}
          style={{
            left: `${connectorGeometry[index]?.left ?? 0}px`,
            width: `${connectorGeometry[index]?.width ?? 0}px`,
          }}
        />
      ) : null}
    </>
  );

  return (
    <div
      ref={wrapperRef}
      className={cn(css.wrapper, className, { [css.wrapper_withLabels]: hasAnyLabels })}
      role="list"
    >
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
            ref={(element) => {
              stepRefs.current[index] = element;
            }}
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
            <div className={css.column} role="listitem">
              {stepNode}
              {item.label ? (
                <div className={css.labelWrap}>
                  <span className={cn(css.label, { [css.label_active]: isActive })}>
                    {item.label}
                  </span>
                </div>
              ) : null}
            </div>
            {!isLast && renderConnector(index, index < current)}
          </React.Fragment>
        );
      })}
    </div>
  );
};
