import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import cn from "classnames";
import { Button } from "../Button/Button";
import { useMeasureElement } from "../../helpers";
import css from "./RadioGroupButton.module.scss";

export interface RadioGroupButtonOption<T> {
  id: T;
  label: string;
  additionalComponent?: React.ReactNode;
}

export interface RadioGroupButtonChoice<T extends string | number> {
  value: T;
  label: string;
  additionalComponent?: React.ReactNode;
}

interface RadioGroupButtonProps<T extends string | number> {
  /** Preferred API — matches typical form control naming. */
  options?: RadioGroupButtonChoice<T>[];
  value?: T;
  defaultValue?: T;
  /** @deprecated Use {@link options} with `{ value, label }`. */
  data?: RadioGroupButtonOption<T>[];
  /** @deprecated Use {@link value}. */
  activeButton?: T;
  /** @deprecated Use {@link defaultValue}. */
  defaultActiveButton?: T;
  onChange?: (value: T) => void;
}

export const RadioGroupButton = <T extends string | number>({
  options,
  value,
  defaultValue,
  data,
  activeButton,
  defaultActiveButton,
  onChange,
}: RadioGroupButtonProps<T>) => {
  const items = useMemo((): RadioGroupButtonOption<T>[] => {
    if (options?.length) {
      return options.map((o) => ({
        id: o.value,
        label: o.label,
        additionalComponent: o.additionalComponent,
      }));
    }
    return data ?? [];
  }, [options, data]);

  const [_activeButton, setActiveButton] = useState<T | undefined>(() => {
    const initial = defaultValue ?? defaultActiveButton ?? items[0]?.id;
    return initial;
  });
  const [sliderPosition, setSliderPosition] = useState({ transform: "translateX(0)", width: 0 });
  const buttonRefs = useRef<Map<string | number, HTMLDivElement | null>>(new Map());
  const resolvedActiveButton = value ?? activeButton ?? _activeButton;

  const { width: activeButtonWidth } = useMeasureElement(
    buttonRefs.current.get(resolvedActiveButton as string),
  );

  const _onChange = (option: RadioGroupButtonOption<T>) => {
    if (option.id === resolvedActiveButton) {
      return;
    }
    onChange?.(option.id);
    setActiveButton(option.id);
  };

  const callbackRef = useCallback((el: HTMLDivElement | null, id: string | number) => {
    buttonRefs.current.set(id, el);
  }, []);

  useEffect(() => {
    const activeButtonIndex = items.findIndex((option) => option.id === resolvedActiveButton);
    if (activeButtonIndex >= 0) {
      const buttonsBeforeActive = items.slice(0, activeButtonIndex);
      const sliderPosition = buttonsBeforeActive.reduce((acc, button) => {
        const buttonElement = buttonRefs.current.get(button.id);
        if (buttonElement) {
          const buttonWidth = buttonElement.getBoundingClientRect().width;
          acc += buttonWidth;
        }

        return acc;
      }, 0);

      setSliderPosition({ transform: `translateX(${sliderPosition}px)`, width: activeButtonWidth });
    }
  }, [resolvedActiveButton, activeButtonWidth, items]);

  return (
    <div className={css.container}>
      {items.map((option) => (
        <div key={option.id} ref={(el) => callbackRef(el, option.id)}>
          <Button
            size="small"
            onClick={() => _onChange(option)}
            className={cn({ [css.activeButton]: option.id === resolvedActiveButton })}
          >
            {option.label}
            {option.additionalComponent}
          </Button>
        </div>
      ))}
      <div className={css.slider} style={sliderPosition} />
    </div>
  );
};
