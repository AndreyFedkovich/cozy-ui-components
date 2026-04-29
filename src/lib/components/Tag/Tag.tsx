import cn from "classnames";
import { FC, MouseEvent, PropsWithChildren, memo } from "react";
import { CrossIcon } from "../../icons";
import css from "./Tag.module.scss";

interface Props {
  className?: string;
  onClick?: () => void;
  isSubjectEmployee?: boolean;
  isSmall?: boolean;
}

export const Tag: FC<PropsWithChildren<Props>> = memo(({ className, children, onClick, isSmall }) => (
  <div className={cn(css.wrapper, className, isSmall && css.wrapper_small)}>
    <span>{children}</span>
    {onClick && (
      <CrossIcon
        className={cn(css.iconCross, { [css.iconCross_small]: isSmall })}
        onClick={(e: MouseEvent<SVGSVGElement>) => {
          e.stopPropagation();
          onClick();
        }}
      />
    )}
  </div>
));
