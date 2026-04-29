import cn from "classnames";
import { FC, memo } from "react";
import { ReactComponent as CrossIcon } from "shared/icons/cross.svg";
import css from "./Tag.module.scss";

interface Props {
  className?: string;
  onClick?: () => void;
  isSubjectEmployee?: boolean;
  isSmall?: boolean;
}

export const Tag: FC<Props> = memo(({ className, children, onClick, isSmall }) => (
  <div className={cn(css.wrapper, className, isSmall && css.wrapper_small)}>
    <span>{children}</span>
    {onClick && (
      <CrossIcon
        className={cn(css.iconCross, { [css.iconCross_small]: isSmall })}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      />
    )}
  </div>
));
