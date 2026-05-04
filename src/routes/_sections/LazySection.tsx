import { ReactNode, useEffect, useRef, useState } from "react";

interface LazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  minHeight?: number;
}

/** Largest px margin from a rootMargin string (e.g. "400px" or "0px 0px 400px 0px"). */
function parseRootMarginPx(rootMargin: string): number {
  let max = 0;
  for (const part of rootMargin.trim().split(/\s+/)) {
    const m = /^(\d+(?:\.\d+)?)px$/.exec(part);
    if (m) max = Math.max(max, Number(m[1]));
  }
  return max;
}

/** Mirrors IntersectionObserver with implicit root and symmetric rootMargin (px). */
function isWithinExpandedViewport(el: Element, marginPx: number): boolean {
  const r = el.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  return (
    r.bottom >= -marginPx &&
    r.top <= vh + marginPx &&
    r.right >= -marginPx &&
    r.left <= vw + marginPx
  );
}

const IO_FALLBACK_MS = 3000;

export function LazySection({
  children,
  fallback,
  rootMargin = "400px",
  minHeight = 320,
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return;
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const marginPx = parseRootMarginPx(rootMargin);
    if (isWithinExpandedViewport(node, marginPx)) {
      setVisible(true);
      return;
    }

    let io: IntersectionObserver | undefined;
    let rafCancelled = false;
    const fallbackTimer = window.setTimeout(() => {
      rafCancelled = true;
      setVisible(true);
      io?.disconnect();
    }, IO_FALLBACK_MS);

    const raf = window.requestAnimationFrame(() => {
      if (rafCancelled) return;
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              window.clearTimeout(fallbackTimer);
              setVisible(true);
              io?.disconnect();
              break;
            }
          }
        },
        { rootMargin },
      );
      io.observe(node);
    });

    return () => {
      rafCancelled = true;
      window.cancelAnimationFrame(raf);
      window.clearTimeout(fallbackTimer);
      io?.disconnect();
    };
  }, [rootMargin, visible]);

  return (
    <div ref={ref} style={visible ? undefined : { minHeight }}>
      {visible ? children : (fallback ?? null)}
    </div>
  );
}
