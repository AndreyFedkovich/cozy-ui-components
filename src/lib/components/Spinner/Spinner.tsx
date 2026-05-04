import cn from "classnames";
import { useMemo } from "react";
import * as React from "react";
import css from "./Spinner.module.scss";

interface Props {
  marginTop?: React.CSSProperties["marginTop"];
  marginBottom?: React.CSSProperties["marginBottom"];
  marginLeft?: React.CSSProperties["marginLeft"];
  size?: "big" | "small" | "extraSmall";
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

  return (
    <div className={(css.cssloadContainer, className)} style={styles}>
      <div
        className={cn(css.cssloadSpeedingWheel, {
          [css.bigSize]: size === "big",
          [css.smallSize]: size === "small",
          [css.extraSmallSize]: size === "extraSmall",
        })}
      />
    </div>
  );
};
