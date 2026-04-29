import cn from "classnames";
import { FC, MouseEventHandler, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { ArrowDownIcon } from "../../icons";
import css from "./Collapse.module.scss";

export interface CollapseProps {
  header: ReactNode;
  content: ReactNode;
  onToggle?: () => void;
  isOpen?: boolean;
  defaultOpen?: boolean;
  className?: string;
  id?: string;
  headerClassName?: string;
  contentClassName?: string;
  iconClassName?: string;
}

export const Collapse: FC<CollapseProps> = ({
  header,
  className,
  content,
  onToggle,
  isOpen,
  defaultOpen = false,
  id,
  headerClassName,
  contentClassName,
  iconClassName,
}) => {
  const [_isOpen, set_IsOpen] = useState(defaultOpen);
  const isMounted = useRef(false);

  const resolvedOpen = typeof isOpen === "boolean" ? isOpen : _isOpen;
  const ref = useRef<HTMLDivElement>(null);

  const _header =
    typeof header === "string" ? (
      <div className={css.header_text}>
        <span>{header}</span>
      </div>
    ) : (
      header
    );

  const _content =
    typeof content === "string" ? <span className={css.content_text}>{content}</span> : content;

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }

    if (!isMounted.current) {
      el.style.height = defaultOpen ? "auto" : "0px";
      isMounted.current = true;
      return;
    }

    if (resolvedOpen) {
      el.style.height = `${el.scrollHeight}px`;

      const onEnd = () => {
        el.style.height = "auto";
      };

      el.addEventListener("transitionend", onEnd, { once: true });
    } else {
      el.style.height = `${el.scrollHeight}px`;

      requestAnimationFrame(() => {
        el.style.height = "0px";
      });
    }
  }, [resolvedOpen, defaultOpen]);

  const handleToggle: MouseEventHandler = useCallback(
    (e) => {
      e.stopPropagation();
      onToggle ? onToggle() : set_IsOpen((open) => !open);
    },
    [onToggle],
  );

  return (
    <div className={cn(css.container, className)} id={id}>
      <div className={cn(css.header, headerClassName)}>
        {_header}
        <div className={cn(css.header_icon, iconClassName)} onClick={handleToggle}>
          <ArrowDownIcon
            className={cn(css.iconArrow, css.iconTransition, { [css.rotateIcon]: resolvedOpen })}
          />
        </div>
      </div>
      <div className={cn(css.content, contentClassName, { [css.padding]: resolvedOpen })} ref={ref}>
        {_content}
      </div>
    </div>
  );
};
