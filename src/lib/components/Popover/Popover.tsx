import { ReactNode, RefObject, useCallback, useEffect, useMemo, useRef, useState } from "react";
import cn from "classnames";
import {
  Popover as UiPopover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  const openRef = useRef(open);
  openRef.current = open;

  const updateRect = useCallback(() => {
    const next = target.current?.getBoundingClientRect() ?? null;
    setRect((prev) => {
      if (prev === next) return prev;
      if (
        prev &&
        next &&
        prev.left === next.left &&
        prev.top === next.top &&
        prev.width === next.width &&
        prev.height === next.height
      ) {
        return prev;
      }
      return next;
    });
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
      setOpen(!openRef.current);
      toggle?.();
    };
    targetElement.addEventListener("click", handleClick);
    return () => {
      targetElement.removeEventListener("click", handleClick);
    };
  }, [setOpen, target, toggle, updateRect]);

  useEffect(() => {
    if (!open) return;
    window.addEventListener("scroll", updateRect, true);
    window.addEventListener("resize", updateRect);
    return () => {
      window.removeEventListener("scroll", updateRect, true);
      window.removeEventListener("resize", updateRect);
    };
  }, [open, updateRect]);

  return (
    <UiPopover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <span
          className={css.anchor}
          style={rect ? { left: rect.left, top: rect.top, width: rect.width, height: rect.height } : undefined}
        />
      </PopoverTrigger>
      <PopoverContent side={side} align={align} className={cn(css.popover, className)}>
        {children}
      </PopoverContent>
    </UiPopover>
  );
};
