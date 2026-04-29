import cn from "classnames";
import * as React from "react";
import { ReactNode, useState } from "react";
import { InfoIcon } from "../../icons";
import { Collapse, type CollapseProps } from "../Collapse/Collapse";
import { TooltipLight } from "../TooltipLight/TooltipLight";
import css from "./CollapsableBlock.module.scss";

interface Props extends CollapseProps {
  infoTooltipContent?: ReactNode;
}

const CollapsableBlock: React.FC<Props> = React.memo((props) => {
  const { id, header, content, className, infoTooltipContent, ...rest } = props;

  const [tooltipOpen, toggleTooltip] = useState(false);
  const toggle = () => toggleTooltip(!tooltipOpen);

  return (
    <Collapse
      id={id}
      className={cn(css.collapsableBlock, className)}
      header={
        infoTooltipContent ? (
          <div className={css.headerWithInfoTooltip}>
            <span>{header}</span>
            <InfoIcon className={css.infoIcon} id="CollapsableBlockNewInfoTooltipIcon" />
            <TooltipLight
              autohide={false}
              delay={{ show: 0, hide: 500 }}
              isOpen={tooltipOpen}
              placement="left-start"
              target="CollapsableBlockNewInfoTooltipIcon"
              toggle={toggle}
            >
              {infoTooltipContent}
            </TooltipLight>
          </div>
        ) : (
          header
        )
      }
      content={content}
      headerClassName={css.header}
      {...rest}
    />
  );
});

export { CollapsableBlock };
