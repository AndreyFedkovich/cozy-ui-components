import ReactDOM from "react-dom";
import cn from "classnames";
import React, { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { InputCaption } from "../InputCaption/InputCaption";
import { Label } from "../Label/Label";
import { Spinner } from "../Spinner/Spinner";
import { EmptyComponent } from "../EmptyComponent/EmptyComponent";
import { ArrowDownIcon, SearchIcon, CrossIcon } from "../../icons";
import { Button } from "../Button/Button";
import { useDropdownPosition, useMeasureElement } from "../../helpers";
import { Tag } from "../Tag/Tag";
import css from "./Select.module.scss";

const DROPDOWN_MARGIN = 6;

export interface CustomOption<T, S = string> {
  value: S;
  label: string;
  meta?: T;
}

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
  onSearch?: (value: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
  onClose?: () => void;
  portalTarget?: Element;
  error?: string | null;
  fixedHeight?: boolean;
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
  onSearch,
  searchClassName,
  searchPlaceholder,
  isLoading,
  disabled,
  onClose,
  portalTarget,
  error,
  fixedHeight = true,
}: CustomSelectProps<T, S>) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  const [searchValue, setSearchValue] = useState("");
  const resolvedPortalTarget =
    portalTarget ?? (typeof document !== "undefined" ? document.body : undefined);

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

  const { height: dropdownHeight } = useMeasureElement(dropDownRef.current);
  const { height: inputHeight } = useMeasureElement(inputRef.current);

  const position = useDropdownPosition({
    triggerRef: inputRef,
    dropdownHeight,
    offset: DROPDOWN_MARGIN,
  });

  const getDropdownPosition = useCallback(() => {
    if (!inputRef.current) {
      return {};
    }

    const rect = inputRef.current.getBoundingClientRect();
    const top =
      position === "top"
        ? rect.top - dropdownHeight - DROPDOWN_MARGIN
        : rect.bottom + DROPDOWN_MARGIN;

    return {
      position: "fixed" as const,
      top: `${top}px`,
      left: `${rect.left}px`,
      width: `${rect.width}px`,
    };
  }, [dropdownHeight, position]);

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
        ref={dropDownRef}
        className={cn(css.dropdown, { [css.dropdown_visible]: isOpen }, dropDownClassName)}
        style={
          resolvedPortalTarget
            ? getDropdownPosition()
            : {
                top: `calc(${inputHeight}px + ${DROPDOWN_MARGIN}px)`,
                ...(position === "top" && {
                  transform: `translateY(calc(-${dropdownHeight}px - ${inputHeight}px - ${
                    DROPDOWN_MARGIN + DROPDOWN_MARGIN
                  }px))`,
                }),
              }
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div className={css.dropdownContent} style={{ height: fixedHeight ? "300px" : "none" }}>
          {dropdownRender ? (
            dropdownRender(
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
              />,
            )
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
          )}
        </div>
      </div>
    );

    if (resolvedPortalTarget) {
      return ReactDOM.createPortal(dropdownContent, resolvedPortalTarget);
    }

    return dropdownContent;
  }, [
    dropDownClassName,
    dropdownHeight,
    dropdownRender,
    fixedHeight,
    getDropdownPosition,
    handleChange,
    handleSearch,
    inputHeight,
    isLoading,
    isOpen,
    onSearch,
    optionClassName,
    optionRender,
    options,
    position,
    resolvedPortalTarget,
    searchClassName,
    searchPlaceholder,
    searchValue,
    value,
  ]);

  const dropdown = useMemo(() => renderDropdown(), [renderDropdown]);

  const hasValue = Array.isArray(value) ? !!value.length : !!value;

  return (
    <div className={css.wrapper}>
      {label && <Label htmlFor="CustomSelectInput">{label}</Label>}
      <div className={css.container} ref={containerRef}>
        <div
          role="button"
          id="CustomSelectInput"
          tabIndex={0}
          ref={inputRef}
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
