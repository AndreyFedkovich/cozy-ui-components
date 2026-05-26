import {
  Children,
  isValidElement,
  memo,
  useState,
  type FC,
  type ReactNode,
  type MouseEvent,
} from "react";
import cn from "classnames";
import { EmptyComponent } from "../EmptyComponent/EmptyComponent";
import { Spinner } from "../Spinner/Spinner";
import ArrowDownIcon from "../../icons/arrowDown.svg?react";
import css from "./SettingsView.module.scss";

export type SettingsLayout = "card" | "plain";
export type SettingsDensity = "comfortable" | "compact";
export type SettingsVariant = "classic" | "elevated";

export interface SettingsItem {
  id?: string;
  icon?: ReactNode;
  label: ReactNode;
  description?: ReactNode;
  control?: ReactNode;
  badge?: ReactNode;
  hint?: ReactNode;
  href?: string;
  external?: boolean;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
  danger?: boolean;
  hidden?: boolean;
  align?: "center" | "start";
  className?: string;
  render?: (ctx: { label: ReactNode; control: ReactNode }) => ReactNode;
}

export interface SettingsGroup {
  id?: string;
  title?: ReactNode;
  items?: SettingsItem[];
  children?: ReactNode;
  className?: string;
}

export interface SettingsSection {
  id?: string;
  title?: ReactNode;
  description?: ReactNode;
  items?: SettingsItem[];
  groups?: SettingsGroup[];
  children?: ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
  className?: string;
}

export interface SettingsViewProps {
  sections?: SettingsSection[];
  children?: ReactNode;
  layout?: SettingsLayout;
  density?: SettingsDensity;
  variant?: SettingsVariant;
  loading?: boolean;
  emptyState?: ReactNode;
  className?: string;
  id?: string;
}

/* ---------------------------------- Item ---------------------------------- */

const ExternalIcon: FC = () => (
  <svg
    className={css.externalIcon}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M14 3h7v7" />
    <path d="M10 14L21 3" />
    <path d="M21 14v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6" />
  </svg>
);

const ChevronRight: FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <polyline points="9 6 15 12 9 18" />
  </svg>
);

interface ItemComponentProps extends SettingsItem {}

const ItemRow: FC<ItemComponentProps> = ({
  icon,
  label,
  description,
  control,
  badge,
  hint,
  href,
  external,
  onClick,
  disabled,
  danger,
  hidden,
  align,
  className,
  render,
}) => {
  if (hidden) return null;

  const labelNode = (
    <div className={css.body}>
      <div className={css.labelRow}>
        <span className={css.label}>{label}</span>
        {badge && <span className={css.badge}>{badge}</span>}
      </div>
      {description && <div className={css.description}>{description}</div>}
    </div>
  );

  const controlNode = control ? <div className={css.control}>{control}</div> : null;

  if (render) {
    return <>{render({ label: labelNode, control: controlNode })}</>;
  }

  const interactive = !!(href || onClick);
  const showChevron = interactive && !control;

  const classes = cn(
    css.item,
    align === "start" && css.item_align_start,
    interactive && css.item_interactive,
    danger && css.item_danger,
    disabled && css.item_disabled,
    className,
  );

  const innerLeft = icon ? <div className={css.iconBadge}>{icon}</div> : <span className={css.iconSpacer} />;

  const innerRight = (
    <>
      {controlNode}
      {showChevron && <ChevronRight className={css.chevron} />}
      {!showChevron && external && href && <ExternalIcon />}
    </>
  );

  const content = (
    <>
      {innerLeft}
      {labelNode}
      <div className={css.control} style={!control && !showChevron ? { display: "none" } : undefined}>
        {innerRight}
      </div>
      {hint && <div className={css.hint}>{hint}</div>}
    </>
  );

  if (href && !disabled) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        onClick={onClick as unknown as (e: MouseEvent<HTMLAnchorElement>) => void}
        className={classes}
      >
        {content}
      </a>
    );
  }

  if (onClick && !disabled) {
    return (
      <button type="button" onClick={onClick} className={classes}>
        {content}
      </button>
    );
  }

  return <div className={classes}>{content}</div>;
};

/* --------------------------------- Group --------------------------------- */

const GroupBlock: FC<SettingsGroup> = ({ title, items, children, className }) => {
  const visible = (items ?? []).filter((i) => !i.hidden);
  return (
    <div className={cn(css.group, className)}>
      {title && <div className={css.groupTitle}>{title}</div>}
      {visible.map((item, idx) => (
        <ItemRow key={item.id ?? `item-${idx}`} {...item} />
      ))}
      {children}
    </div>
  );
};

/* -------------------------------- Section -------------------------------- */

const SectionBlock: FC<SettingsSection> = ({
  id,
  title,
  description,
  items,
  groups,
  children,
  collapsible,
  defaultOpen = true,
  className,
}) => {
  const [open, setOpen] = useState<boolean>(defaultOpen);
  const visibleItems = (items ?? []).filter((i) => !i.hidden);

  const header = (title || description) && (
    <>
      <div className={css.sectionTitleWrap}>
        {title && <div className={css.sectionTitle}>{title}</div>}
        {description && <div className={css.sectionDescription}>{description}</div>}
      </div>
      {collapsible && (
        <ArrowDownIcon
          className={cn(css.sectionChevron, open && css.sectionChevron_open)}
        />
      )}
    </>
  );

  return (
    <section id={id} className={cn(css.section, className)}>
      {header && collapsible ? (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={cn(css.sectionHeader, css.sectionHeader_button)}
          aria-expanded={open}
        >
          {header}
        </button>
      ) : header ? (
        <div className={css.sectionHeader}>{header}</div>
      ) : null}

      <div className={cn(css.sectionBody, collapsible && !open && css.sectionBody_collapsed)}>
        {visibleItems.map((item, idx) => (
          <ItemRow key={item.id ?? `item-${idx}`} {...item} />
        ))}
        {(groups ?? []).map((g, idx) => (
          <GroupBlock key={g.id ?? `group-${idx}`} {...g} />
        ))}
        {children}
      </div>
    </section>
  );
};

const DividerEl: FC<{ className?: string }> = ({ className }) => (
  <hr className={cn(css.divider, className)} />
);

/* ------------------------------ SettingsView ------------------------------ */

const SettingsViewBase: FC<SettingsViewProps> = ({
  sections,
  children,
  layout = "card",
  density = "comfortable",
  variant = "classic",
  loading,
  emptyState,
  className,
  id,
}) => {
  const containerClass = cn(
    css.root,
    layout === "card" && variant === "classic" && css.layout_card,
    layout === "plain" && css.layout_plain,
    variant === "elevated" && css.variant_elevated,
    density === "compact" && css.density_compact,
    className,
  );

  if (loading) {
    return (
      <div className={containerClass} id={id}>
        <div className={css.loading}>
          <Spinner />
        </div>
      </div>
    );
  }

  const hasSections = sections && sections.length > 0;
  const hasChildren = Children.count(children) > 0;

  if (!hasSections && !hasChildren) {
    return (
      <div className={containerClass} id={id}>
        {emptyState ?? <EmptyComponent />}
      </div>
    );
  }

  return (
    <div className={containerClass} id={id}>
      {hasSections &&
        sections!.map((section, idx) => (
          <SectionBlock key={section.id ?? `section-${idx}`} {...section} />
        ))}
      {hasChildren &&
        Children.map(children, (child) => {
          if (!isValidElement(child)) return child;
          return child;
        })}
    </div>
  );
};

type SettingsViewComponent = FC<SettingsViewProps> & {
  Section: typeof SectionBlock;
  Group: typeof GroupBlock;
  Item: typeof ItemRow;
  Divider: typeof DividerEl;
};

export const SettingsView = memo(SettingsViewBase) as unknown as SettingsViewComponent;
SettingsView.Section = SectionBlock;
SettingsView.Group = GroupBlock;
SettingsView.Item = ItemRow;
SettingsView.Divider = DividerEl;
(SettingsView as unknown as { displayName: string }).displayName = "SettingsView";