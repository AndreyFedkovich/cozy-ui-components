import cn from "classnames";
import React, { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../Button/Button";
import { EmptyComponent } from "../EmptyComponent/EmptyComponent";
import { InputCaption } from "../InputCaption/InputCaption";
import { Label } from "../Label/Label";
import { Spinner } from "../Spinner/Spinner";
import { CrossIcon, SearchIcon } from "../../icons";
import type { CustomOption } from "../Select/Select";
import css from "./DialogSelect.module.scss";

const DEFAULT_PAGE_SIZE = 8;
const DEFAULT_DEBOUNCE_MS = 350;

type LoadOptionsParams = {
  search: string;
  page: number;
  pageSize: number;
};

type LoadOptionsResult<T, S extends string | number> = {
  options: CustomOption<T, S>[];
  total?: number;
  hasNextPage?: boolean;
};

export type DialogSelectColumn<T, S extends string | number> = {
  key: string;
  title: ReactNode;
  className?: string;
  render: (option: CustomOption<T, S>) => ReactNode;
};

export interface DialogSelectProps<T, S extends string | number> {
  value?: CustomOption<T, S> | null;
  placeholder: string;
  loadOptions: (params: LoadOptionsParams) => Promise<LoadOptionsResult<T, S>>;
  onChange?: (option: CustomOption<T, S>) => void;
  onClear?: () => void;
  columns?: DialogSelectColumn<T, S>[];
  label?: ReactNode;
  title?: ReactNode;
  searchPlaceholder?: string;
  selectButtonText?: string;
  closeButtonText?: string;
  manualButtonText?: string;
  onManualAdd?: () => void;
  pageSize?: number;
  debounceMs?: number;
  disabled?: boolean;
  error?: string | null;
  className?: string;
  inputClassName?: string;
  selectedOptionRender?: (option: CustomOption<T, S>) => ReactNode;
}

export const DialogSelect = <T, S extends string | number>({
  value,
  placeholder,
  loadOptions,
  onChange,
  onClear,
  columns,
  label,
  title = "Поиск сотрудника",
  searchPlaceholder = "Введите запрос",
  selectButtonText = "Выбрать",
  closeButtonText = "Закрыть",
  manualButtonText = "Добавить вручную",
  onManualAdd,
  pageSize = DEFAULT_PAGE_SIZE,
  debounceMs = DEFAULT_DEBOUNCE_MS,
  disabled,
  error,
  className,
  inputClassName,
  selectedOptionRender,
}: DialogSelectProps<T, S>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [options, setOptions] = useState<CustomOption<T, S>[]>([]);
  const [total, setTotal] = useState<number | undefined>();
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const requestIdRef = useRef(0);

  const tableColumns = useMemo<DialogSelectColumn<T, S>[]>(
    () =>
      columns ?? [
        {
          key: "label",
          title: "ФИО сотрудника",
          render: (option) => option.label,
        },
        {
          key: "birthDate",
          title: "День рождения",
          render: (option) => {
            const meta = option.meta as { birthDate?: ReactNode } | undefined;
            return meta?.birthDate ?? "—";
          },
        },
      ],
    [columns],
  );

  const totalPages = total ? Math.max(1, Math.ceil(total / pageSize)) : undefined;
  const canGoPrevious = page > 1;
  const canGoNext = totalPages ? page < totalPages : hasNextPage;

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
    }, debounceMs);

    return () => window.clearTimeout(timeoutId);
  }, [debounceMs, search]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    setIsLoading(true);

    loadOptions({ search: debouncedSearch, page, pageSize })
      .then((result) => {
        if (requestIdRef.current !== requestId) {
          return;
        }

        setOptions(result.options);
        setTotal(result.total);
        setHasNextPage(result.hasNextPage ?? false);
      })
      .finally(() => {
        if (requestIdRef.current === requestId) {
          setIsLoading(false);
        }
      });
  }, [debouncedSearch, isOpen, loadOptions, page, pageSize]);

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);

    if (!open) {
      setSearch("");
      setDebouncedSearch("");
      setPage(1);
    }
  }, []);

  const handleSelect = useCallback(
    (option: CustomOption<T, S>) => {
      onChange?.(option);
      handleOpenChange(false);
    },
    [handleOpenChange, onChange],
  );

  const selectedContent = value
    ? selectedOptionRender
      ? selectedOptionRender(value)
      : value.label
    : placeholder;

  return (
    <div className={cn(css.wrapper, className)}>
      {label && <Label htmlFor="DialogSelectInput">{label}</Label>}
      <div
        id="DialogSelectInput"
        role="button"
        tabIndex={disabled ? -1 : 0}
        className={cn(css.input, { [css.disabled]: disabled, [css.error]: error }, inputClassName)}
        onClick={() => !disabled && handleOpenChange(true)}
        onKeyDown={(event) => {
          if (!disabled && (event.key === "Enter" || event.key === " ")) {
            event.preventDefault();
            handleOpenChange(true);
          }
        }}
      >
        <span className={cn(css.selectedOption, { [css.placeholder]: !value })}>
          {selectedContent}
        </span>
        <span className={css.actions}>
          {onClear && value && (
            <Button
              variant="text"
              className={css.clearButton}
              aria-label="Очистить выбранное значение"
              onClick={(event) => {
                event.stopPropagation();
                onClear();
              }}
            >
              <CrossIcon />
            </Button>
          )}
          <Button
            variant="link"
            className={css.selectButton}
            disabled={disabled}
            onClick={(event) => {
              event.stopPropagation();
              handleOpenChange(true);
            }}
          >
            {selectButtonText}
          </Button>
        </span>
      </div>

      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className={css.dialogContent}>
          <DialogHeader className={css.dialogHeader}>
            <DialogTitle className={css.dialogTitle}>{title}</DialogTitle>
          </DialogHeader>

          <div className={css.search}>
            <SearchIcon className={css.searchIcon} />
            <input
              className={css.searchInput}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={searchPlaceholder}
              autoFocus
            />
            {isLoading && <Spinner size="extraSmall" className={css.searchSpinner} />}
          </div>

          <div className={css.tableContainer}>
            <table className={css.table}>
              <thead>
                <tr>
                  {tableColumns.map((column) => (
                    <th key={column.key} className={column.className}>
                      {column.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {options.map((option) => {
                  const isActive = value?.value === option.value;

                  return (
                    <tr
                      key={String(option.value)}
                      className={cn({ [css.activeRow]: isActive })}
                      onClick={() => handleSelect(option)}
                    >
                      {tableColumns.map((column) => (
                        <td key={column.key} className={column.className}>
                          {column.render(option)}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {!isLoading && !options.length && (
              <div className={css.emptyState}>
                <EmptyComponent
                  title="Ничего не найдено"
                  subtitle="Попробуйте изменить поисковый запрос"
                />
              </div>
            )}
          </div>

          <DialogFooter className={css.dialogFooter}>
            <div className={css.pagination}>
              <Button
                variant="secondary"
                size="small"
                disabled={!canGoPrevious || isLoading}
                onClick={() => setPage((currentPage) => Math.max(1, currentPage - 1))}
              >
                Назад
              </Button>
              <span className={css.pageInfo}>
                Страница {page}
                {totalPages ? ` из ${totalPages}` : ""}
              </span>
              <Button
                variant="secondary"
                size="small"
                disabled={!canGoNext || isLoading}
                onClick={() => setPage((currentPage) => currentPage + 1)}
              >
                Вперёд
              </Button>
            </div>
            <div className={css.footerActions}>
              {onManualAdd && (
                <Button variant="primary" onClick={onManualAdd}>
                  {manualButtonText}
                </Button>
              )}
              <Button variant="secondary" onClick={() => handleOpenChange(false)}>
                {closeButtonText}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {error && <InputCaption>{error}</InputCaption>}
    </div>
  );
};
