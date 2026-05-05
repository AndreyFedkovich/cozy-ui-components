import { ReactNode, RefObject, useCallback, useEffect, useMemo, useState } from "react";
import cn from "classnames";
import { portalBody } from "@/components/ui/portal-body";
import { Popover as UiPopover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import css from "./Popover.module.scss";

type PopoverPlacement = "top" | "bottom" | "left" | "right" | `${"top" | "bottom" | "left" | "right"}-${"start" | "end"}`;

interface PopoverProps {
  children?: ReactNode;
  target: RefObject<HTMLElement | null>;
  placement?: PopoverPlacement;
  className?: string;
  isOpen?: boolean;
  toggle?: () => void;
  onOpenChange?: (isOpen: boolean) => void;
}

const getPlacement = (placement: PopoverPlacement = "bottom") => {
  const [side, align] = placement.split("-") as ["top" | "bottom" | "left" | "right", "start" | "end" | undefined];
  return { side, align: (align ?? "center") as "start" | "center" | "end" };
};

export const Popover = ({
  children,
  placement = "bottom",
  target,
  className,
  isOpen,
  toggle,
  onOpenChange,
}: PopoverProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const open = isOpen ?? internalOpen;
  const { side, align } = useMemo(() => getPlacement(placement), [placement]);

  const updateRect = useCallback(() => {
    setRect(target.current?.getBoundingClientRect() ?? null);
  }, [target]);

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
    const targetElement = target.current;
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
  }, [isOpen, onOpenChange, target, toggle, updateRect]);

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
      <PopoverContent side={side} align={align} className={cn(css.popover, className)}>
        {children}
      </PopoverContent>
    </UiPopover>
  );
};
