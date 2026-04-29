import { useEffect, useRef, useState } from "react";
import {
  PopoverBody,
  PopoverProps as ReactstrapPopoverProps,
  Popover as ReactstrapPopover,
} from "reactstrap";
import cn from "classnames";
import css from "./Popover.module.scss";

interface PopoverProps extends Omit<ReactstrapPopoverProps, "target"> {
  target: React.RefObject<HTMLElement | null>;
  onOpenChange?: (isOpen: boolean) => void;
}

export const Popover = ({
  children,
  placement,
  target,
  className,
  onOpenChange,
  ...props
}: PopoverProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        target.current &&
        !target.current.contains(event.target as Node)
      ) {
        setIsPopoverOpen(false);
        onOpenChange?.(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onOpenChange, target]);

  useEffect(() => {
    const targetElement = target.current;
    if (!targetElement) {
      return;
    }

    const handleClick = () => {
      setIsPopoverOpen(!isPopoverOpen);
      onOpenChange?.(!isPopoverOpen);
    };
    targetElement.addEventListener("click", handleClick);

    return () => {
      targetElement.removeEventListener("click", handleClick);
    };
  }, [isPopoverOpen, onOpenChange, target]);

  return (
    <ReactstrapPopover
      placement={placement}
      target={target}
      isOpen={isPopoverOpen}
      toggle={() => setIsPopoverOpen((value) => !value)}
      popperClassName={cn(css.popover, className)}
      {...props}
    >
      <div ref={popoverRef}>
        <PopoverBody>{children}</PopoverBody>
      </div>
    </ReactstrapPopover>
  );
};
