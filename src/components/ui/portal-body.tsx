"use client";

import type { ReactNode } from "react";
import { createPortal } from "react-dom";

/** Renders children into `document.body` so `position: fixed` matches viewport coordinates from `getBoundingClientRect()`. */
export function portalBody(children: ReactNode): ReactNode {
  if (typeof document === "undefined") {
    return null;
  }
  return createPortal(children, document.body);
}
