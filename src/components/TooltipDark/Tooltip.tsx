import { createPortal } from "react-dom";
import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import cn from "classnames";
import { getTooltipPosition, type TooltipPlacement } from "./getTooltipPosition";
import css from "./Tooltip.module.scss";

export type { TooltipPlacement } from "./getTooltipPosition";

export type TooltipTrigger = "hover" | "click";

function getArrowDirection(placement: TooltipPlacement): "top" | "bottom" | "left" | "right" {
  if (placement.startsWith("top")) {
    return "bottom";
  }
  if (placement.startsWith("bottom")) {
    return "top";
  }
  if (placement.startsWith("left")) {
    return "right";
  }
  if (placement.startsWith("right")) {
    return "left";
  }
  return "top";
}

export interface TooltipProps {
  title: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  trigger?: TooltipTrigger | TooltipTrigger[];
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  onOpenChange?: (open: boolean) => void;
  placement?: TooltipPlacement;
  arrow?: boolean;
  children: ReactNode;
  overlayClassName?: string;
  getPopupContainer?: () => HTMLElement;
}

export const TooltipDark = memo(
  ({
    title,
    open: openProp,
    defaultOpen = false,
    trigger = "hover",
    mouseEnterDelay = 100,
    mouseLeaveDelay = 100,
    onOpenChange,
    placement = "top",
    arrow = true,
    children,
    overlayClassName,
    getPopupContainer = () => document.body,
  }: TooltipProps) => {
    const isControlled = openProp !== undefined;
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const open = isControlled ? openProp : internalOpen;

    const setOpen = useCallback(
      (value: boolean) => {
        if (!isControlled) {
          setInternalOpen(value);
        }
        onOpenChange?.(value);
      },
      [isControlled, onOpenChange],
    );

    const triggerRef = useRef<HTMLSpanElement>(null);
    const [style, setStyle] = useState<{
      left: number;
      top: number;
      transform: string;
    } | null>(null);
    const enterTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const triggers = Array.isArray(trigger) ? trigger : [trigger];
    const hasHover = triggers.includes("hover");
    const hasClick = triggers.includes("click");

    const clearEnterTimer = useCallback(() => {
      if (enterTimerRef.current) {
        clearTimeout(enterTimerRef.current);
        enterTimerRef.current = null;
      }
    }, []);

    const clearLeaveTimer = useCallback(() => {
      if (leaveTimerRef.current) {
        clearTimeout(leaveTimerRef.current);
        leaveTimerRef.current = null;
      }
    }, []);

    const handleMouseEnter = useCallback(() => {
      if (!hasHover) {
        return;
      }
      clearLeaveTimer();
      enterTimerRef.current = setTimeout(() => setOpen(true), mouseEnterDelay);
    }, [hasHover, mouseEnterDelay, setOpen, clearLeaveTimer]);

    const handleMouseLeave = useCallback(() => {
      if (!hasHover) {
        return;
      }
      clearEnterTimer();
      leaveTimerRef.current = setTimeout(() => setOpen(false), mouseLeaveDelay);
    }, [hasHover, mouseLeaveDelay, setOpen, clearEnterTimer]);

    const handleClick = useCallback(
      (e: React.MouseEvent) => {
        if (!hasClick) {
          return;
        }
        e.preventDefault();
        setOpen(!open);
      },
      [hasClick, open, setOpen],
    );

    useEffect(() => {
      if (!hasClick || !open || isControlled) {
        return;
      }
      const onDocClick = (e: MouseEvent) => {
        const el = triggerRef.current;
        if (el && !el.contains(e.target as Node)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", onDocClick);
      return () => document.removeEventListener("mousedown", onDocClick);
    }, [hasClick, open, isControlled, setOpen]);

    useLayoutEffect(() => {
      if (!open || !triggerRef.current) {
        setStyle(null);
        return;
      }
      const rect = triggerRef.current.getBoundingClientRect();
      setStyle(getTooltipPosition(rect, placement));
    }, [open, placement]);

    useEffect(
      () => () => {
        clearEnterTimer();
        clearLeaveTimer();
      },
      [clearEnterTimer, clearLeaveTimer],
    );

    const container = typeof document !== "undefined" ? getPopupContainer() : null;
    const arrowDirection = getArrowDirection(placement);

    const overlay =
      open &&
      // eslint-disable-next-line eqeqeq
      title != null &&
      title !== "" &&
      style &&
      container &&
      createPortal(
        <span
          className={cn(css.overlay, overlayClassName)}
          style={{
            left: style.left,
            top: style.top,
            transform: style.transform,
          }}
          role="tooltip"
        >
          {title}
          {arrow && <span className={cn(css.arrow, css[arrowDirection])} />}
        </span>,
        container,
      );

    const triggerProps =
      !isControlled && (hasHover || hasClick)
        ? {
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave,
            onClick: hasClick ? handleClick : undefined,
          }
        : {};

    return (
      <>
        <span ref={triggerRef} {...triggerProps}>
          {children}
        </span>
        {overlay}
      </>
    );
  },
);

TooltipDark.displayName = "TooltipDark";
