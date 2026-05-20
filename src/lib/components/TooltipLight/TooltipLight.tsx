import { FC, RefObject, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import cn from "classnames";
import { portalBody } from "@/components/ui/portal-body";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import css from "./TooltipLight.module.scss";

type TooltipTarget = string | HTMLElement | RefObject<HTMLElement | null>;
type TooltipPlacement = "top" | "bottom" | "left" | "right" | `${"top" | "bottom" | "left" | "right"}-${"start" | "end"}`;

interface TooltipLightProps {
  children?: ReactNode;
  target: TooltipTarget;
  placement?: TooltipPlacement;
  popperClassName?: string;
  isOpen?: boolean;
  toggle?: () => void;
  delay?: number | { show?: number; hide?: number };
  autohide?: boolean;
}

const getTargetElement = (target: TooltipTarget) => {
  if (typeof target === "string") {
    return document.getElementById(target);
  }

  if ("current" in target) {
    return target.current;
  }

  return target;
};

const getPlacement = (placement: TooltipPlacement = "top") => {
  const [side, align] = placement.split("-") as ["top" | "bottom" | "left" | "right", "start" | "end" | undefined];
  return { side, align: (align ?? "center") as "start" | "center" | "end" };
};

const getDelay = (delay: TooltipLightProps["delay"], key: "show" | "hide") =>
  typeof delay === "number" ? delay : delay?.[key] ?? 0;

export const TooltipLight: FC<TooltipLightProps> = ({
  children,
  target,
  placement = "top",
  popperClassName,
  isOpen,
  toggle,
  delay,
  autohide = true,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const open = isOpen ?? internalOpen;
  const { side, align } = useMemo(() => getPlacement(placement), [placement]);

  const updateRect = useCallback(() => {
    const element = getTargetElement(target);
    setRect(element?.getBoundingClientRect() ?? null);
  }, [target]);

  const setOpen = useCallback(
    (value: boolean) => {
      if (isOpen === undefined) {
        setInternalOpen(value);
      }
      toggle?.();
    },
    [isOpen, toggle],
  );

  useEffect(() => {
    let element: HTMLElement | null = null;
    let rafId: number | null = null;
    let showTimer: ReturnType<typeof setTimeout> | null = null;
    let hideTimer: ReturnType<typeof setTimeout> | null = null;

    const clearTimers = () => {
      if (showTimer) clearTimeout(showTimer);
      if (hideTimer) clearTimeout(hideTimer);
      showTimer = null;
      hideTimer = null;
    };

    const show = () => {
      clearTimers();
      updateRect();
      showTimer = setTimeout(() => setOpen(true), getDelay(delay, "show"));
    };

    const hide = () => {
      if (!autohide) return;
      clearTimers();
      hideTimer = setTimeout(() => setOpen(false), getDelay(delay, "hide"));
    };

    const detach = () => {
      if (!element) return;
      element.removeEventListener("mouseenter", show);
      element.removeEventListener("mouseleave", hide);
      element.removeEventListener("focus", show);
      element.removeEventListener("blur", hide);
      window.removeEventListener("scroll", updateRect, true);
      window.removeEventListener("resize", updateRect);
      element = null;
    };

    const attach = (el: HTMLElement) => {
      element = el;
      updateRect();
      el.addEventListener("mouseenter", show);
      el.addEventListener("mouseleave", hide);
      el.addEventListener("focus", show);
      el.addEventListener("blur", hide);
      window.addEventListener("scroll", updateRect, true);
      window.addEventListener("resize", updateRect);
    };

    let attempts = 0;
    const maxAttempts = 60;

    const tryAttach = () => {
      const el = getTargetElement(target);
      if (el) {
        attach(el);
        return;
      }
      if (attempts >= maxAttempts) {
        return;
      }
      attempts += 1;
      rafId = requestAnimationFrame(tryAttach);
    };

    tryAttach();

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      clearTimers();
      detach();
    };
  }, [autohide, delay, setOpen, target, updateRect]);

  if (!rect) {
    return null;
  }

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip open={open} onOpenChange={setOpen}>
        {portalBody(
          <TooltipTrigger asChild>
            <span
              className={css.anchor}
              style={{ left: rect.left, top: rect.top, width: rect.width, height: rect.height }}
            />
          </TooltipTrigger>,
        )}
        <TooltipContent side={side} align={align} className={cn(css.tooltip, popperClassName)}>
          {children}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
