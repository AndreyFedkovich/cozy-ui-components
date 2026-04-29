import { useState, useEffect, useCallback, useRef } from "react";

type DropdownPosition = "top" | "bottom";

interface UseDropdownPositionProps {
  triggerRef: React.RefObject<HTMLElement | null>;
  dropdownHeight: number;
  offset?: number;
}

export const useDropdownPosition = ({
  triggerRef,
  dropdownHeight,
  offset = 8,
}: UseDropdownPositionProps) => {
  const [position, setPosition] = useState<DropdownPosition>("bottom");
  const rafRef = useRef<number>();

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current) {
      return "bottom";
    }

    const selectRect = triggerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const spaceAbove = selectRect.top - offset;
    const spaceBelow = viewportHeight - selectRect.bottom - offset;

    if (spaceBelow >= dropdownHeight) {
      return "bottom";
    }
    if (spaceAbove >= dropdownHeight) {
      return "top";
    }

    return "bottom";
  }, [triggerRef, dropdownHeight, offset]);

  const updatePosition = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      setPosition(calculatePosition());
    });
  }, [calculatePosition]);

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) {
      return;
    }

    updatePosition();

    const resizeObserver = new ResizeObserver(() => {
      updatePosition();
    });

    resizeObserver.observe(trigger);

    const mutationObserver = new MutationObserver(() => {
      updatePosition();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style", "class"],
    });

    const scrollableParents: HTMLElement[] = [];
    let parent = trigger.parentElement;

    while (parent) {
      const style = window.getComputedStyle(parent);
      const overflow = style.overflow + style.overflowY + style.overflowX;

      if (/(auto|scroll)/.test(overflow)) {
        scrollableParents.push(parent);
        parent.addEventListener("scroll", updatePosition);
      }
      parent = parent.parentElement;
    }

    window.addEventListener("resize", updatePosition);
    window.addEventListener("transitionend", updatePosition);
    window.addEventListener("animationend", updatePosition);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      resizeObserver.disconnect();
      mutationObserver.disconnect();

      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("transitionend", updatePosition);
      window.removeEventListener("animationend", updatePosition);

      scrollableParents.forEach((parent) => {
        parent.removeEventListener("scroll", updatePosition);
      });
    };
  }, [triggerRef, updatePosition]);

  return position;
};
