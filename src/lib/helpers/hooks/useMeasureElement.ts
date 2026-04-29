import { useEffect, useMemo, useRef, useState } from "react";

export const useMeasureElement = (element?: HTMLElement | null) => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const rafRef = useRef<number>();

  useEffect(() => {
    if (!element) {
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        for (const entry of entries) {
          if (entry.borderBoxSize) {
            const borderBoxSize = Array.isArray(entry.borderBoxSize)
              ? entry.borderBoxSize[0]
              : entry.borderBoxSize;
            setHeight(borderBoxSize.blockSize);
            setWidth(borderBoxSize.inlineSize);
          } else {
            setHeight(entry.contentRect.height);
            setWidth(entry.contentRect.width);
          }
        }
      });
    });

    resizeObserver.observe(element);

    const initialHeight = element.getBoundingClientRect().height;
    setHeight(initialHeight);

    return () => {
      resizeObserver.disconnect();
    };
  }, [element, setHeight]);

  const params = useMemo(
    () => ({
      height,
      width,
    }),
    [height, width],
  );

  return params;
};
