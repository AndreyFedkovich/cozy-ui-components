import {
  Children,
  isValidElement,
  memo,
  useCallback,
  useState,
  type FC,
  type ReactNode,
  type CSSProperties,
} from "react";
import cn from "classnames";
import { CopyTextTrigger } from "../CopyTextTrigger/CopyTextTrigger";
import { EmptyComponent } from "../EmptyComponent/EmptyComponent";
import { Spinner } from "../Spinner/Spinner";
import css from "./DetailView.module.scss";

export type DetailFieldRenderer = (ctx: {
  label: ReactNode;
  value: ReactNode;
}) => ReactNode;

export interface DetailField {
  /** Подпись поля (левая колонка). */
  label: ReactNode;
  /** Значение (правая колонка). Если не задано — используется children у `<DetailView.Field>`. */
  value?: ReactNode;
  /** Доп. подсказка под значением. */
  hint?: ReactNode;
  /** Показать кнопку копирования рядом со значением. По умолчанию копируется строковое представление value. */
  copyable?: boolean;
  /** Текст для копирования. Если не задан и copyable=true — берётся `String(value)`. */
  copyText?: string;
  /** Полный кастомный рендер строки. */
  render?: DetailFieldRenderer;
  /** Скрыть поле (удобно для условного рендера в массиве). */
  hidden?: boolean;
  /** В двухколоночной сетке — занять обе колонки. */
  span?: 1 | 2;
  /** Заглушка, если value пустое. По умолчанию — «—». */
  emptyPlaceholder?: ReactNode;
}

export interface DetailSection {
  id?: string;
  title?: ReactNode;
  description?: ReactNode;
  fields?: DetailField[];
  children?: ReactNode;
  /** Раскладка полей внутри секции. */
  columns?: 1 | 2;
  className?: string;
}

export interface DetailViewProps {
  sections?: DetailSection[];
  /** Composition-first секции (`DetailView.Section`). Если заданы и `sections`, и `children`, конфиг рендерится первым. */
  children?: ReactNode;
  /** `card` — обёртка с фоном и паддингом (как BaseBlock); `plain` — без неё. */
  variant?: "card" | "plain";
  /** Ширина колонки лейблов. Число → px. */
  labelWidth?: number | string;
  size?: "md" | "lg";
  loading?: boolean;
  /** Что показать, если нет ни секций, ни children. */
  emptyState?: ReactNode;
  className?: string;
  id?: string;
}

const isEmptyValue = (v: ReactNode | undefined): boolean =>
  v === undefined || v === null || v === "" || (typeof v === "number" && Number.isNaN(v));

const toCopyString = (value: ReactNode): string => {
  if (value == null) return "";
  if (typeof value === "string" || typeof value === "number") return String(value);
  return "";
};

/* ---------------------------------- Field ---------------------------------- */

interface FieldComponentProps extends Omit<DetailField, "value"> {
  value?: ReactNode;
  children?: ReactNode;
  className?: string;
}

const FieldRow: FC<FieldComponentProps> = ({
  label,
  value,
  children,
  hint,
  copyable,
  copyText,
  render,
  hidden,
  span,
  emptyPlaceholder = "—",
  className,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    const text = copyText ?? toCopyString(children ?? value);
    if (!text || typeof navigator === "undefined" || !navigator.clipboard) return;
    void navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    });
  }, [copyText, value, children]);

  if (hidden) return null;

  const resolvedValue = children ?? value;
  const displayValue = isEmptyValue(resolvedValue) ? (
    <span className={css.empty}>{emptyPlaceholder}</span>
  ) : (
    resolvedValue
  );

  if (render) {
    return <>{render({ label, value: displayValue })}</>;
  }

  return (
    <div
      className={cn(
        css.field,
        span === 2 && css.field_span2,
        copyable && css.field_interactive,
        className,
      )}
    >
      <div className={css.label}>{label}</div>
      <div className={css.value}>
        <div className={css.valueRow}>
          {copyable ? (
            <>
              <span className={css.copyableValue}>{displayValue}</span>
              <span className={css.copyTrigger}>
                <CopyTextTrigger
                  iconOnly
                  copied={copied}
                  onClick={handleCopy}
                  ariaLabel="Скопировать значение"
                />
              </span>
            </>
          ) : (
            displayValue
          )}
        </div>
        {hint && <div className={css.hint}>{hint}</div>}
      </div>
    </div>
  );
};

/* --------------------------------- Section --------------------------------- */

interface SectionComponentProps extends Omit<DetailSection, "fields"> {
  fields?: DetailField[];
  children?: ReactNode;
}

const SectionBlock: FC<SectionComponentProps> = ({
  id,
  title,
  description,
  fields,
  children,
  columns = 1,
  className,
}) => {
  const visibleFields = (fields ?? []).filter((f) => !f.hidden);
  return (
    <section id={id} className={cn(css.section, className)}>
      {(title || description) && (
        <div className={css.sectionHeader}>
          {title && <div className={css.sectionTitle}>{title}</div>}
          {description && <div className={css.sectionDescription}>{description}</div>}
        </div>
      )}
      {(visibleFields.length > 0 || children) && (
        <div className={cn(css.fields, columns === 2 && css.fields_2col)}>
          {visibleFields.map((field, idx) => (
            <FieldRow
              key={(typeof field.label === "string" ? field.label : null) ?? `field-${idx}`}
              {...field}
            />
          ))}
          {children}
        </div>
      )}
    </section>
  );
};

const DividerEl: FC<{ className?: string }> = ({ className }) => (
  <hr className={cn(css.divider, className)} />
);

/* -------------------------------- DetailView ------------------------------- */

const DetailViewBase: FC<DetailViewProps> = ({
  sections,
  children,
  variant = "card",
  labelWidth = "14rem",
  size = "md",
  loading,
  emptyState,
  className,
  id,
}) => {
  const labelWidthValue = typeof labelWidth === "number" ? `${labelWidth}px` : labelWidth;

  const containerClass = cn(
    css.root,
    variant === "card" && css.card,
    size === "lg" && css.size_lg,
    className,
  );

  const containerStyle = {
    ["--cozy-detail-label-width" as string]: labelWidthValue,
  } as CSSProperties;

  if (loading) {
    return (
      <div className={containerClass} style={containerStyle} id={id}>
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
      <div className={containerClass} style={containerStyle} id={id}>
        {emptyState ?? <EmptyComponent />}
      </div>
    );
  }

  return (
    <div className={containerClass} style={containerStyle} id={id}>
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

type DetailViewComponent = FC<DetailViewProps> & {
  Section: typeof SectionBlock;
  Field: typeof FieldRow;
  Divider: typeof DividerEl;
};

export const DetailView = memo(DetailViewBase) as unknown as DetailViewComponent;
DetailView.Section = SectionBlock;
DetailView.Field = FieldRow;
DetailView.Divider = DividerEl;
(DetailView as unknown as { displayName: string }).displayName = "DetailView";