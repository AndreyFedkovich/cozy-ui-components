import { FC, memo, useMemo } from "react";
import cn from "classnames";
import css from "./Card.module.scss";

interface CardProps {
  text: string;
  width?: number;
  height?: number;
  className?: string;
  backgroundColor?: string;
  imageUrl?: string;
  textColor?: string;
  link?: string;
}

export const Card: FC<CardProps> = memo(
  ({ text, width, height, className, backgroundColor, imageUrl, textColor, link }) => {
    const containerClassname = cn(css.card, { [css.link]: link }, className);

    const containerStyle = useMemo(
      () => ({
        backgroundColor,
        ...(textColor && { color: textColor }),
        ...(width && { width }),
        ...(height && { height: `${height}px` }),
        ...(imageUrl && { backgroundImage: `url(${imageUrl})` }),
      }),
      [backgroundColor, height, imageUrl, textColor, width],
    );

    return link ? (
      <a className={containerClassname} style={containerStyle} href={link}>
        <span>{text}</span>
      </a>
    ) : (
      <div className={containerClassname} style={containerStyle}>
        <span>{text}</span>
      </div>
    );
  },
);

export const MainBlueCard: FC<Omit<CardProps, "backgroundColor" | "textColor">> = ({
  className,
  ...rest
}) => (
  <Card className={cn(css.mainBlue, { [css.mainBlue__link]: rest.link }, className)} {...rest} />
);

export const LightBlueCard: FC<Omit<CardProps, "backgroundColor" | "textColor">> = ({
  className,
  ...rest
}) => (
  <Card className={cn(css.lightBlue, { [css.lightBlue__link]: rest.link }, className)} {...rest} />
);

export const DarkBlueCard: FC<Omit<CardProps, "backgroundColor" | "textColor">> = ({
  className,
  ...rest
}) => (
  <Card className={cn(css.darkBlue, { [css.darkBlue__link]: rest.link }, className)} {...rest} />
);
