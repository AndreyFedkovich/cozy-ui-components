const GAP_PX = 8;

export type TooltipPlacement =
  | "top"
  | "topLeft"
  | "topRight"
  | "bottom"
  | "bottomLeft"
  | "bottomRight"
  | "left"
  | "leftTop"
  | "leftBottom"
  | "right"
  | "rightTop"
  | "rightBottom";

export function getTooltipPosition(
  rect: DOMRect,
  placement: TooltipPlacement = "top",
): { left: number; top: number; transform: string } {
  const { left, right, top, bottom, width, height } = rect;
  const centerX = left + width / 2;
  const centerY = top + height / 2;

  switch (placement) {
    case "top":
      return { left: centerX, top: top - GAP_PX, transform: "translate(-50%, -100%)" };
    case "topLeft":
      return { left, top: top - GAP_PX, transform: "translateY(-100%)" };
    case "topRight":
      return { left: right, top: top - GAP_PX, transform: "translate(-100%, -100%)" };
    case "bottom":
      return { left: centerX, top: bottom + GAP_PX, transform: "translate(-50%, 0)" };
    case "bottomLeft":
      return { left, top: bottom + GAP_PX, transform: "translateY(0)" };
    case "bottomRight":
      return { left: right, top: bottom + GAP_PX, transform: "translate(-100%, 0)" };
    case "left":
      return { left: left - GAP_PX, top: centerY, transform: "translate(-100%, -50%)" };
    case "leftTop":
      return { left: left - GAP_PX, top, transform: "translate(-100%, 0)" };
    case "leftBottom":
      return { left: left - GAP_PX, top: bottom, transform: "translate(-100%, -100%)" };
    case "right":
      return { left: right + GAP_PX, top: centerY, transform: "translate(0, -50%)" };
    case "rightTop":
      return { left: right + GAP_PX, top, transform: "translate(0, 0)" };
    case "rightBottom":
      return { left: right + GAP_PX, top: bottom, transform: "translate(0, -100%)" };
    default:
      return { left: centerX, top: top - GAP_PX, transform: "translate(-50%, -100%)" };
  }
}
