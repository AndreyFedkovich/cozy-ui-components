import cn from "classnames";
import { useMemo } from "react";
import * as React from "react";
import css from "./Spinner.module.scss";

export type SpinnerSize = "big" | "small" | "extraSmall" | "medium" | "large";

function resolveSpinnerSize(size: SpinnerSize): "big" | "small" | "extraSmall" {
  if (size === "medium") {
    return "small";
  }
  if (size === "large") {
    return "big";
  }
  return size;
}

interface Props {
  marginTop?: React.CSSProperties["marginTop"];
  marginBottom?: React.CSSProperties["marginBottom"];
  marginLeft?: React.CSSProperties["marginLeft"];
  /** `medium` → small wheel, `large` → big wheel; legacy names `big` \| `small` \| `extraSmall` unchanged. */
  size?: SpinnerSize;
  className?: string;
}

export const Spinner: React.FC<Props> = ({
  marginTop,
  marginBottom,
  marginLeft,
  className,
  size = "big",
}) => {
  const styles: React.CSSProperties = useMemo(
    () => ({
      marginTop,
      marginBottom,
      marginLeft,
    }),
    [marginBottom, marginLeft, marginTop],
  );

  const resolved = resolveSpinnerSize(size);

  return (
    <div className={(css.cssloadContainer, className)} style={styles}>
      <div
        className={cn(css.cssloadSpeedingWheel, {
          [css.bigSize]: resolved === "big",
          [css.smallSize]: resolved === "small",
          [css.extraSmallSize]: resolved === "extraSmall",
        })}
      />
    </div>
  );
};
