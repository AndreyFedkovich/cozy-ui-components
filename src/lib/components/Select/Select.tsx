import ReactDOM from "react-dom";
import { autoUpdate, flip, offset as floatingOffset, size, useFloating } from "@floating-ui/react";
import cn from "classnames";
import React, { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { InputCaption } from "../InputCaption/InputCaption";
import { FieldLabel } from "../FieldLabel/FieldLabel";
import { Spinner } from "../Spinner/Spinner";
import { EmptyComponent } from "../EmptyComponent/EmptyComponent";
import { ArrowDownIcon, SearchIcon, CrossIcon } from "../../icons";
import { Button } from "../Button/Button";
import { Tag } from "../Tag/Tag";
import css from "./Select.module.scss";

const DROPDOWN_MARGIN = 6;

export interface CustomOption<T, S = string> {
  value: S;
  label: string;
  meta?: T;
}

export type SelectColumn<T, S> = {
  key: string;
  title: ReactNode;
  className?: string;
  render: (option: CustomOption<T, S>) => ReactNode;
};

type ModeProps<T, S> =
  | {
      mode: "single";
      value?: CustomOption<T, S> | null;
    }
  | { mode: "multiple"; value: CustomOption<T, S>[] };

type CustomSelectProps<T, S> = {
  onChange?: (option: CustomOption<T, S>) => void;
  options?: CustomOption<T, S>[];
  placeholder: string;
  dropdownRender?: (menu: ReactNode) => ReactNode;
  optionRender?: (option: CustomOption<T, S>) => ReactNode;
  selectedOptionRender?: (option: CustomOption<T, S>) => ReactNode;
  tagRender?: (option: CustomOption<T, S>) => ReactNode;
  emptyComponent?: ReactNode;
  dropdownIcon?: ReactNode;
  dropDownClassName?: string;
  optionClassName?: string;
  inputClassName?: string;
  tagClassName?: string;
  searchClassName?: string;
  searchPlaceholder?: string;
  deleteIconClassName?: string;
  onDelete?: (option: CustomOption<T, S>) => void;
  onClear?: () => void;
  icon?: ReactNode;
  label?: ReactNode;
  /** Подсказка по наведению на иконку «?» справа от подписи */
  tooltipContent?: ReactNode;
  tooltipPopperClassName?: string;
  onSearch?: (value: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
  onClose?: () => void;
  portalTarget?: Element;
  error?: string | null;
  fixedHeight?: boolean;
  template?: "list" | "table";
  columns?: SelectColumn<T, S>[];
  total?: number;
} & ModeProps<T, S>;

const SelectedOptions = <T, S>({
  value,
  selectedOptionRender,
  tagRender,
  onDelete,
}: Pick<
  CustomSelectProps<T, S>,
  "value" | "selectedOptionRender" | "tagRender" | "onDelete"
>): React.ReactElement | null => {
  if (!value) {
    return null;
  }

  if (!Array.isArray(value)) {
    return (
      <span className={css.selectedOption}>
        {selectedOptionRender ? selectedOptionRender(value) : value.label}
      </span>
    );
  }

  return (
    <div className={css.tagContainer}>
      {value.map((item, index) =>
        tagRender ? (
          <React.Fragment key={index}>{tagRender(item)}</React.Fragment>
        ) : (
          <Tag
            isSmall
            key={index}
            {...(onDelete && {
              onClick: () => onDelete?.(item),
            })}
          >
            {item.label}
          </Tag>
        ),
      )}
    </div>
  );
};

interface SearchProps<T, S> extends Pick<
  CustomSelectProps<T, S>,
  "onSearch" | "searchClassName" | "isLoading"
> {
  searchValue: string;
  placeholder?: string;
}

const Search = <T, S>({
  onSearch,
  searchClassName,
  searchValue,
  isLoading,
  placeholder,
}: SearchProps<T, S>) => (
  <div className={cn(css.search, searchClassName)}>
    <SearchIcon className={css.search__icon} />
    <input
      className={css.search__input}
      value={searchValue}
      onChange={(e) => onSearch?.(e.target.value)}
      placeholder={placeholder}
    />
    {isLoading && <Spinner size="extraSmall" className={css.search__spinner} />}
  </div>
);

interface DropdownProps<T, S> extends Pick<
  CustomSelectProps<T, S>,
  | "value"
  | "options"
  | "optionClassName"
  | "optionRender"
  | "onSearch"
  | "searchClassName"
  | "isLoading"
  | "searchPlaceholder"
> {
  onChange: (value: CustomOption<T, S>) => void;
  searchValue: string;
}

const Dropdown = <T, S>({
  value,
  options,
  optionClassName,
  optionRender,
  onChange,
  onSearch,
  searchClassName,
  isLoading,
  searchValue,
  searchPlaceholder,
}: DropdownProps<T, S>): React.ReactElement | null => {
  const checkIsActive = (option: CustomOption<T, S>) =>
    Array.isArray(value)
      ? value.some((item) => item.value === option.value)
      : value?.value === option.value;
  return (
    <>
      {onSearch && (
        <Search
          onSearch={onSearch}
          searchValue={searchValue}
          searchClassName={searchClassName}
          isLoading={isLoading}
          placeholder={searchPlaceholder}
        />
      )}
      {options && !!options.length ? (
        <ul className={cn({ [css.withSearch]: onSearch })}>
          {options.map((option, index) => {
            const isActive = checkIsActive(option);
            const isPrevActive = options[index - 1] && checkIsActive(options[index - 1]);
            const isNextActive = options[index + 1] && checkIsActive(options[index + 1]);

            return (
              <li
                key={`${option.value}${index}`}
                className={cn(
                  css.option,
                  {
                    [css.option_active]: isActive,
                    [css.option_active_prev_active]: isPrevActive,
                    [css.option_active_next_active]: isNextActive,
                  },
                  optionClassName,
                )}
                onClick={() => onChange(option)}
              >
                {optionRender ? optionRender(option) : option.label}
              </li>
            );
          })}
        </ul>
      ) : (
        !isLoading && <EmptyComponent />
      )}
    </>
  );
};

interface TableDropdownProps<T, S> extends Pick<
  CustomSelectProps<T, S>,
  | "value"
  | "options"
  | "onSearch"
  | "searchClassName"
  | "isLoading"
  | "searchPlaceholder"
  | "columns"
  | "total"
  | "onDelete"
> {
  mode: "single" | "multiple";
  onChange: (value: CustomOption<T, S>) => void;
  searchValue: string;
}

const TableDropdown = <T, S>({
  value,
  options,
  onChange,
  onDelete,
  onSearch,
  searchClassName,
  isLoading,
  searchValue,
  searchPlaceholder,
  columns,
  total,
  mode,
}: TableDropdownProps<T, S>): React.ReactElement | null => {
  const checkIsActive = (option: CustomOption<T, S>) =>
    Array.isArray(value)
      ? value.some((item) => item.value === option.value)
      : value?.value === option.value;

  const handleRowToggle = (option: CustomOption<T, S>, isActive: boolean) => {
    if (mode === "multiple" && isActive && onDelete) {
      onDelete(option);
      return;
    }
    onChange(option);
  };

  const totalLabel = total ?? options?.length ?? 0;
  const safeColumns = columns ?? [];

  return (
    <div className={css.tableTemplate}>
      {onSearch && (
        <Search
          onSearch={onSearch}
          searchValue={searchValue}
          searchClassName={searchClassName}
          isLoading={isLoading}
          placeholder={searchPlaceholder}
        />
      )}
      <div className={css.tableContainer}>
        {options && options.length ? (
          <table className={css.table}>
            <thead>
              <tr>
                <th className={css.checkboxCell} aria-label="" />
                {safeColumns.map((column) => (
                  <th key={column.key} className={column.className}>
                    {column.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {options.map((option, index) => {
                const isActive = checkIsActive(option);
                return (
                  <tr
                    key={`${String(option.value)}${index}`}
                    className={cn({ [css.activeRow]: isActive })}
                    onClick={() => handleRowToggle(option, isActive)}
                  >
                    <td className={css.checkboxCell}>
                      <input
                        type="checkbox"
                        className={css.checkbox}
                        checked={isActive}
                        readOnly
                        tabIndex={-1}
                        onClick={(e) => e.stopPropagation()}
                        onChange={() => handleRowToggle(option, isActive)}
                      />
                    </td>
                    {safeColumns.map((column) => (
                      <td key={column.key} className={column.className}>
                        {column.render(option)}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          !isLoading && <EmptyComponent />
        )}
      </div>
      <div className={css.footerTotal}>Всего {totalLabel}</div>
    </div>
  );
};

export const Select = <T, S extends string | number>({
  options,
  value,
  mode,
  placeholder,
  onChange,
  dropdownRender,
  optionRender,
  selectedOptionRender,
  dropdownIcon,
  tagRender,
  dropDownClassName,
  optionClassName,
  inputClassName,
  deleteIconClassName,
  onDelete,
  onClear,
  label,
  tooltipContent,
  tooltipPopperClassName,
  onSearch,
  searchClassName,
  searchPlaceholder,
  isLoading,
  disabled,
  onClose,
  portalTarget,
  error,
  fixedHeight = true,
  template = "list",
  columns,
  total,
}: CustomSelectProps<T, S>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  const [searchValue, setSearchValue] = useState("");
  const resolvedPortalTarget =
    portalTarget ?? (isMounted && typeof document !== "undefined" ? document.body : undefined);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSearch = useCallback(
    (value: string) => {
      setSearchValue(value);
      onSearch?.(value);
    },
    [onSearch],
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        (!dropDownRef.current || !dropDownRef.current.contains(event.target as Node))
      ) {
        handleSearch("");
        setIsOpen(false);
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, [handleSearch, isOpen, onClose]);

  const { refs, floatingStyles, update } = useFloating({
    strategy: "absolute",
    placement: "bottom-start",
    open: isOpen,
    whileElementsMounted: (reference, floating, updatePosition) =>
      autoUpdate(reference, floating, updatePosition, {
        ancestorScroll: false,
        elementResize: true,
        ancestorResize: true,
        layoutShift: true,
      }),
    middleware: [
      floatingOffset(DROPDOWN_MARGIN),
      flip({
        fallbackPlacements: ["top-start", "bottom-start"],
      }),
      size({
        apply({ rects, elements }) {
          const nextWidth = `${Math.round(rects.reference.width)}px`;
          if (elements.floating.style.width !== nextWidth) {
            elements.floating.style.width = nextWidth;
          }
        },
      }),
    ],
  });

  const setReference = useCallback(
    (node: HTMLDivElement | null) => {
      inputRef.current = node;
      refs.setReference(node);
    },
    [refs],
  );

  const setFloating = useCallback(
    (node: HTMLDivElement | null) => {
      dropDownRef.current = node;
      refs.setFloating(node);
    },
    [refs],
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    update();
  }, [isOpen, update]);

  const handleChange = useCallback(
    (newValue: CustomOption<T, S>) => {
      onChange?.(newValue);

      handleSearch("");
      onClose?.();

      if (mode === "single") {
        setIsOpen(false);
      }
    },
    [handleSearch, mode, onChange, onClose],
  );

  const renderDropdown = useCallback(() => {
    const dropdownContent = (
      <div
        ref={setFloating}
        className={cn(css.dropdown, { [css.dropdown_visible]: isOpen }, dropDownClassName)}
        style={floatingStyles}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={css.dropdownContent} style={{ height: fixedHeight ? "300px" : "none" }}>
          {(() => {
            const menu =
              template === "table" ? (
                <TableDropdown
                  value={value}
                  options={options}
                  onChange={handleChange}
                  onDelete={onDelete}
                  {...(onSearch && { onSearch: handleSearch })}
                  searchClassName={searchClassName}
                  isLoading={isLoading}
                  searchValue={searchValue}
                  searchPlaceholder={searchPlaceholder}
                  columns={columns}
                  total={total}
                  mode={mode}
                />
              ) : (
                <Dropdown
                  value={value}
                  options={options}
                  optionClassName={optionClassName}
                  optionRender={optionRender}
                  onChange={handleChange}
                  {...(onSearch && { onSearch: handleSearch })}
                  searchClassName={searchClassName}
                  isLoading={isLoading}
                  searchValue={searchValue}
                  searchPlaceholder={searchPlaceholder}
                />
              );
            return dropdownRender ? dropdownRender(menu) : menu;
          })()}
        </div>
      </div>
    );

    if (resolvedPortalTarget) {
      return ReactDOM.createPortal(dropdownContent, resolvedPortalTarget);
    }

    return dropdownContent;
  }, [
    dropDownClassName,
    dropdownRender,
    fixedHeight,
    floatingStyles,
    handleChange,
    handleSearch,
    isLoading,
    isOpen,
    onSearch,
    optionClassName,
    optionRender,
    options,
    resolvedPortalTarget,
    template,
    columns,
    total,
    mode,
    onDelete,
    searchClassName,
    searchPlaceholder,
    searchValue,
    setFloating,
    value,
  ]);

  const dropdown = useMemo(
    () => (isMounted ? renderDropdown() : null),
    [isMounted, renderDropdown],
  );

  const hasValue = Array.isArray(value) ? !!value.length : !!value;

  return (
    <div className={css.wrapper}>
      {label && (
        <FieldLabel
          htmlFor="CustomSelectInput"
          tooltipContent={tooltipContent}
          tooltipPopperClassName={tooltipPopperClassName}
        >
          {label}
        </FieldLabel>
      )}

      <div className={css.container} ref={containerRef}>
        <div
          role="button"
          id="CustomSelectInput"
          tabIndex={0}
          ref={setReference}
          className={cn(
            css.input,
            { [css.input_fixedHeight]: mode === "single", [css.disabled]: disabled },
            error && css.error,
            inputClassName,
          )}
          onClick={() => {
            if (value) {
              handleSearch("");
              onClose?.();
            }
            setIsOpen((value) => !value);
          }}
        >
          <div className={css.selectedOptionContainer}>
            {hasValue ? (
              <SelectedOptions
                value={value}
                selectedOptionRender={selectedOptionRender}
                tagRender={tagRender}
                onDelete={onDelete}
              />
            ) : (
              <span className={css.placeHolder}>{placeholder}</span>
            )}
          </div>
          <div className={css.iconContainer}>
            {onClear && hasValue && (
              <>
                <Button
                  variant="text"
                  className={cn(css.deleteIcon, deleteIconClassName)}
                  onClick={(e) => {
                    e.stopPropagation();
                    onClear();
                  }}
                >
                  <span>
                    <CrossIcon />
                  </span>
                </Button>
                <div className={css.divider}>
                  <div />
                </div>
              </>
            )}

            {dropdownIcon || (
              <Button
                variant="text"
                className={cn(css.arrowIcon, {
                  [css.arrowIconExpanded]: isOpen,
                })}
              >
                <ArrowDownIcon />
              </Button>
            )}
          </div>
        </div>
        {dropdown}
      </div>
      {error && <InputCaption>{error}</InputCaption>}
    </div>
  );
};
