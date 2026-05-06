import { ReactNode, RefObject, useCallback, useEffect, useMemo, useState } from "react";
import cn from "classnames";
import { portalBody } from "@/components/ui/portal-body";
import { Popover as UiPopover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import css from "./Popover.module.scss";

type PopoverPlacement =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | `${"top" | "bottom" | "left" | "right"}-${"start" | "end"}`;

interface PopoverSharedProps {
  children?: ReactNode;
  placement?: PopoverPlacement;
  className?: string;
  isOpen?: boolean;
  toggle?: () => void;
  onOpenChange?: (isOpen: boolean) => void;
}

export type PopoverProps = PopoverSharedProps &
  (
    | { /** Preferred when you can pass the anchor inline. */ trigger: ReactNode; target?: never }
    | { /** Legacy: ref to an existing element that toggles the popover. */ target: RefObject<HTMLElement | null>; trigger?: never }
  );

const getPlacement = (placement: PopoverPlacement = "bottom") => {
  const [side, align] = placement.split("-") as [
    "top" | "bottom" | "left" | "right",
    "start" | "end" | undefined,
  ];
  return { side, align: (align ?? "center") as "start" | "center" | "end" };
};

export const Popover = (props: PopoverProps) => {
  const triggerMode = "trigger" in props && props.trigger !== undefined;
  const {
    children,
    placement = "bottom",
    className,
    isOpen,
    toggle,
    onOpenChange,
  } = props;

  const [internalOpen, setInternalOpen] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const open = isOpen ?? internalOpen;
  const { side, align } = useMemo(() => getPlacement(placement), [placement]);

  const updateRect = useCallback(() => {
    if (triggerMode) {
      return;
    }
    const target = props.target?.current;
    setRect(target?.getBoundingClientRect() ?? null);
  }, [props.target, triggerMode]);

  const setOpen = useCallback(
    (value: boolean) => {
      if (isOpen === undefined) {
        setInternalOpen(value);
      }
      onOpenChange?.(value);
    },
    [isOpen, onOpenChange],
  );

  useEffect(() => {
    if (triggerMode) {
      return;
    }

    const targetElement = props.target?.current;
    if (!targetElement) {
      return;
    }

    const handleClick = () => {
      updateRect();
      if (isOpen === undefined) {
        setInternalOpen((prev) => {
          const next = !prev;
          onOpenChange?.(next);
          return next;
        });
      } else {
        onOpenChange?.(!isOpen);
      }
      toggle?.();
    };

    targetElement.addEventListener("click", handleClick);
    window.addEventListener("scroll", updateRect, true);
    window.addEventListener("resize", updateRect);

    return () => {
      targetElement.removeEventListener("click", handleClick);
      window.removeEventListener("scroll", updateRect, true);
      window.removeEventListener("resize", updateRect);
    };
  }, [isOpen, onOpenChange, props.target, toggle, triggerMode, updateRect]);

  const content = (
    <PopoverContent side={side} align={align} className={cn(css.popover, className)}>
      {children}
    </PopoverContent>
  );

  if (triggerMode) {
    return (
      <UiPopover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <span className={css.triggerWrap}>{props.trigger}</span>
        </PopoverTrigger>
        {content}
      </UiPopover>
    );
  }

  return (
    <UiPopover open={open} onOpenChange={setOpen}>
      {portalBody(
        <PopoverTrigger asChild>
          <span
            className={css.anchor}
            style={
              rect
                ? { left: rect.left, top: rect.top, width: rect.width, height: rect.height }
                : { left: 0, top: 0, width: 0, height: 0 }
            }
            aria-hidden
          />
        </PopoverTrigger>,
      )}
      {content}
    </UiPopover>
  );
};
