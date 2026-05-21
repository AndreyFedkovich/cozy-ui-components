import {
  Children,
  createContext,
  isValidElement,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type FC,
  type MouseEvent,
  type ReactNode,
} from "react";
import cn from "classnames";
import { TooltipDark } from "../TooltipDark/Tooltip";
import ArrowDownIcon from "../../icons/arrowDown.svg?react";
import css from "./SideNav.module.scss";

export type SideNavVariant = "classic" | "aurora";

export interface SideNavUser {
  name: string;
  role?: ReactNode;
  avatarUrl?: string;
  initials?: string;
  badge?: ReactNode;
  onClick?: () => void;
}

export interface SideNavItem {
  id: string;
  label: ReactNode;
  icon?: ReactNode;
  href?: string;
  active?: boolean;
  badge?: ReactNode;
  disabled?: boolean;
  onClick?: (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  children?: SideNavItem[];
}

export interface SideNavSection {
  id?: string;
  title?: ReactNode;
  items?: SideNavItem[];
  children?: ReactNode;
  className?: string;
}

export interface SideNavProps {
  user?: SideNavUser;
  userSlot?: ReactNode;
  sections?: SideNavSection[];
  children?: ReactNode;
  variant?: SideNavVariant;
  activeId?: string;
  defaultActiveId?: string;
  onActiveChange?: (id: string) => void;
  collapsible?: boolean;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (v: boolean) => void;
  footer?: ReactNode;
  width?: number | string;
  collapsedWidth?: number | string;
  className?: string;
}

/* -------- ctx -------- */

interface Ctx {
  variant: SideNavVariant;
  collapsed: boolean;
  activeId: string | undefined;
  setActive: (id: string) => void;
}

const NavCtx = createContext<Ctx>({
  variant: "classic",
  collapsed: false,
  activeId: undefined,
  setActive: () => {},
});

const useNavCtx = () => useContext(NavCtx);

/* -------- helpers -------- */

const toCssSize = (v: number | string | undefined, fallback: string): string =>
  v == null ? fallback : typeof v === "number" ? `${v}px` : v;

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? "").join("");
};

/* -------- Item -------- */

interface ItemProps extends SideNavItem {
  level?: number;
}

const SideNavItemEl: FC<ItemProps> = ({
  id,
  label,
  icon,
  href,
  active,
  badge,
  disabled,
  onClick,
  children,
  level = 0,
}) => {
  const ctx = useNavCtx();
  const isActive = active ?? ctx.activeId === id;
  const hasChildren = !!(children && children.length > 0);
  const [open, setOpen] = useState<boolean>(
    hasChildren && !!children?.some((c) => c.id === ctx.activeId),
  );

  const handleClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
      if (disabled) {
        e.preventDefault();
        return;
      }
      if (hasChildren) {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      ctx.setActive(id);
      onClick?.(e);
    },
    [ctx, disabled, hasChildren, id, onClick],
  );

  const labelNode = !ctx.collapsed && <span className={css.label}>{label}</span>;
  const iconNode = icon ? <span className={css.icon}>{icon}</span> : <span className={css.iconStub} />;

  const inner = (
    <>
      {iconNode}
      {labelNode}
      {!ctx.collapsed && badge != null && <span className={css.badge}>{badge}</span>}
      {!ctx.collapsed && hasChildren && (
        <span className={cn(css.chev, open && css.chev_open)} aria-hidden>
          <ArrowDownIcon width={12} height={12} />
        </span>
      )}
    </>
  );

  const commonProps = {
    className: cn(
      css.item,
      isActive && css.item_active,
      disabled && css.item_disabled,
      level > 0 && css.item_nested,
    ),
    "aria-current": isActive ? ("page" as const) : undefined,
    "aria-expanded": hasChildren ? open : undefined,
    "data-id": id,
    onClick: handleClick,
  };

  const trigger = href && !hasChildren && !disabled ? (
    <a href={href} {...commonProps}>
      {inner}
    </a>
  ) : (
    <button type="button" disabled={disabled} {...commonProps}>
      {inner}
    </button>
  );

  const wrapped = ctx.collapsed ? (
    <TooltipDark title={label} placement="right">
      {trigger}
    </TooltipDark>
  ) : (
    trigger
  );

  return (
    <li className={css.itemWrap}>
      {wrapped}
      {hasChildren && (
        <div className={cn(css.sub, open && !ctx.collapsed && css.sub_open)} aria-hidden={!open}>
          <ul className={css.subList}>
            {children!.map((c) => (
              <SideNavItemEl key={c.id} {...c} level={level + 1} />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

/* -------- Section -------- */

interface SectionProps extends SideNavSection {}

const SideNavSectionEl: FC<SectionProps> = ({ id, title, items, children, className }) => {
  const ctx = useNavCtx();
  return (
    <div id={id} className={cn(css.section, className)}>
      {title && !ctx.collapsed && <div className={css.sectionTitle}>{title}</div>}
      {ctx.collapsed && title && <div className={css.sectionDot} aria-hidden />}
      <ul className={css.list}>
        {items?.map((it) => (
          <SideNavItemEl key={it.id} {...it} />
        ))}
        {children}
      </ul>
    </div>
  );
};

const DividerEl: FC<{ className?: string }> = ({ className }) => (
  <div className={cn(css.divider, className)} role="separator" />
);

const CustomEl: FC<{ children?: ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn(css.custom, className)}>{children}</div>
);

/* -------- Root -------- */

const SideNavBase: FC<SideNavProps> = ({
  user,
  userSlot,
  sections,
  children,
  variant = "classic",
  activeId,
  defaultActiveId,
  onActiveChange,
  collapsible = false,
  collapsed: collapsedProp,
  defaultCollapsed = false,
  onCollapsedChange,
  footer,
  width,
  collapsedWidth,
  className,
}) => {
  const [internalActive, setInternalActive] = useState<string | undefined>(defaultActiveId);
  const isActiveControlled = activeId !== undefined;
  const currentActive = isActiveControlled ? activeId : internalActive;

  const setActive = useCallback(
    (id: string) => {
      if (!isActiveControlled) setInternalActive(id);
      onActiveChange?.(id);
    },
    [isActiveControlled, onActiveChange],
  );

  const [internalCollapsed, setInternalCollapsed] = useState<boolean>(defaultCollapsed);
  const isCollapsedControlled = collapsedProp !== undefined;
  const collapsed = isCollapsedControlled ? !!collapsedProp : internalCollapsed;

  useEffect(() => {
    if (isCollapsedControlled) return;
    setInternalCollapsed(defaultCollapsed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleCollapsed = useCallback(() => {
    const next = !collapsed;
    if (!isCollapsedControlled) setInternalCollapsed(next);
    onCollapsedChange?.(next);
  }, [collapsed, isCollapsedControlled, onCollapsedChange]);

  const ctxValue = useMemo<Ctx>(
    () => ({ variant, collapsed, activeId: currentActive, setActive }),
    [variant, collapsed, currentActive, setActive],
  );

  const style = {
    ["--cozy-sidenav-w" as string]: toCssSize(width, "280px"),
    ["--cozy-sidenav-w-collapsed" as string]: toCssSize(collapsedWidth, "76px"),
  } as CSSProperties;

  const hasSections = sections && sections.length > 0;
  const hasChildren = Children.count(children) > 0;

  const renderUser = () => {
    if (userSlot) return <div className={css.userSlot}>{userSlot}</div>;
    if (!user) return null;
    const initials = user.initials ?? getInitials(user.name);
    const Tag = user.onClick ? "button" : "div";
    return (
      <Tag
        className={cn(css.user, user.onClick && css.user_clickable)}
        onClick={user.onClick}
        type={user.onClick ? "button" : undefined}
      >
        <span className={css.avatar}>
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt="" />
          ) : (
            <span className={css.avatarInitials}>{initials || "?"}</span>
          )}
          {user.badge != null && <span className={css.avatarBadge}>{user.badge}</span>}
        </span>
        {!collapsed && (
          <span className={css.userText}>
            <span className={css.userName}>{user.name}</span>
            {user.role && <span className={css.userRole}>{user.role}</span>}
          </span>
        )}
      </Tag>
    );
  };

  return (
    <NavCtx.Provider value={ctxValue}>
      <nav
        className={cn(css.root, css[`variant_${variant}`], collapsed && css.collapsed, className)}
        style={style}
        data-variant={variant}
      >
        {variant === "aurora" && (
          <>
            <span className={cn(css.blob, css.blob_a)} aria-hidden />
            <span className={cn(css.blob, css.blob_b)} aria-hidden />
          </>
        )}

        <div className={css.header}>
          {renderUser()}
          {collapsible && (
            <button
              type="button"
              className={css.collapseBtn}
              onClick={toggleCollapsed}
              aria-label={collapsed ? "Развернуть" : "Свернуть"}
              title={collapsed ? "Развернуть" : "Свернуть"}
            >
              <span className={cn(css.collapseIcon, collapsed && css.collapseIcon_rot)} aria-hidden>
                <ArrowDownIcon width={12} height={12} />
              </span>
            </button>
          )}
        </div>

        <div className={css.body}>
          {hasSections &&
            sections!.map((s, i) => (
              <SideNavSectionEl key={s.id ?? `s-${i}`} {...s} />
            ))}
          {hasChildren &&
            Children.map(children, (child) => {
              if (!isValidElement(child)) return child;
              return child;
            })}
        </div>

        {footer && <div className={css.footer}>{footer}</div>}
      </nav>
    </NavCtx.Provider>
  );
};

type SideNavComponent = FC<SideNavProps> & {
  Section: typeof SideNavSectionEl;
  Item: typeof SideNavItemEl;
  Divider: typeof DividerEl;
  Custom: typeof CustomEl;
};

export const SideNav = memo(SideNavBase) as unknown as SideNavComponent;
SideNav.Section = SideNavSectionEl;
SideNav.Item = SideNavItemEl;
SideNav.Divider = DividerEl;
SideNav.Custom = CustomEl;
(SideNav as unknown as { displayName: string }).displayName = "SideNav";