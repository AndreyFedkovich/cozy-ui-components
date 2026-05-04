import { useCallback, useEffect, useRef, useState } from "react";
import cn from "classnames";
import { Button } from "../Button/Button";
import { useMeasureElement } from "../../helpers";
import css from "./RadioGroupButton.module.scss";

export interface RadioGroupButtonOption<T> {
  id: T;
  label: string;
  additionalComponent?: React.ReactNode;
}

interface RadioGroupButtonProps<T> {
  data: RadioGroupButtonOption<T>[];
  activeButton?: string | number;
  defaultActiveButton?: string | number;
  onChange?: (id: T) => void;
}

export const RadioGroupButton = <T extends string | number>({
  data,
  activeButton,
  defaultActiveButton,
  onChange,
}: RadioGroupButtonProps<T>) => {
  const [_activeButton, setActiveButton] = useState(defaultActiveButton || data[0]?.id);
  const [sliderPosition, setSliderPosition] = useState({ transform: "translateX(0)", width: 0 });
  const buttonRefs = useRef<Map<string | number, HTMLDivElement | null>>(new Map());
  const resolvedActiveButton = activeButton || _activeButton;
  const [activeEl, setActiveEl] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    setActiveEl(buttonRefs.current.get(resolvedActiveButton as string) ?? null);
  }, [resolvedActiveButton, data]);

  const { width: activeButtonWidth } = useMeasureElement(activeEl);

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
    const activeButtonIndex = data.findIndex((option) => option.id === resolvedActiveButton);
    if (activeButtonIndex >= 0) {
      const buttonsBeforeActive = data.slice(0, activeButtonIndex);
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
  }, [resolvedActiveButton, activeButtonWidth, data]);

  return (
    <div className={css.container}>
      {data.map((option) => (
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
