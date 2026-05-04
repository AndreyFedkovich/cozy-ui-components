import { useEffect, useMemo, useRef, useState } from "react";

export const useMeasureElement = (element?: HTMLElement | null) => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const rafRef = useRef<number | null>(null);

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
            setHeight((prev) =>
              prev === borderBoxSize.blockSize ? prev : borderBoxSize.blockSize,
            );
            setWidth((prev) =>
              prev === borderBoxSize.inlineSize ? prev : borderBoxSize.inlineSize,
            );
          } else {
            setHeight((prev) =>
              prev === entry.contentRect.height ? prev : entry.contentRect.height,
            );
            setWidth((prev) =>
              prev === entry.contentRect.width ? prev : entry.contentRect.width,
            );
          }
        }
      });
    });

    resizeObserver.observe(element);

    const initialHeight = element.getBoundingClientRect().height;
    setHeight((prev) => (prev === initialHeight ? prev : initialHeight));

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
