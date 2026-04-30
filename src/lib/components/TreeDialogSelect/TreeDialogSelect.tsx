import cn from "classnames";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
import { ArrowDownIcon, CrossIcon, SearchIcon } from "../../icons";
import css from "./TreeDialogSelect.module.scss";

const DEFAULT_DEBOUNCE_MS = 350;
const ROOT_KEY = "__root__" as const;

export type TreeNode<T, S extends string | number> = {
  value: S;
  label: string;
  hasChildren?: boolean;
  meta?: T;
};

export type TreeLoadParams<S extends string | number> = {
  parentId: S | null;
  search: string;
};

export type TreeLoadResult<T, S extends string | number> = {
  nodes: TreeNode<T, S>[];
};

export type TreeSearchResult<T, S extends string | number> = {
  matches: Array<{ node: TreeNode<T, S>; path: TreeNode<T, S>[] }>;
};

export interface TreeDialogSelectProps<T, S extends string | number> {
  value?: TreeNode<T, S> | null;
  placeholder: string;
  loadChildren: (params: TreeLoadParams<S>) => Promise<TreeLoadResult<T, S>>;
  searchNodes?: (search: string) => Promise<TreeSearchResult<T, S>>;
  onChange?: (node: TreeNode<T, S>) => void;
  onClear?: () => void;
  label?: ReactNode;
  title?: ReactNode;
  searchPlaceholder?: string;
  selectButtonText?: string;
  closeButtonText?: string;
  confirmButtonText?: string;
  debounceMs?: number;
  disabled?: boolean;
  error?: string | null;
  className?: string;
  inputClassName?: string;
  selectedOptionRender?: (node: TreeNode<T, S>) => ReactNode;
  nodeRender?: (node: TreeNode<T, S>) => ReactNode;
}

type Key<S extends string | number> = S | typeof ROOT_KEY;

export const TreeDialogSelect = <T, S extends string | number>({
  value,
  placeholder,
  loadChildren,
  searchNodes,
  onChange,
  onClear,
  label,
  title = "Выбор элемента",
  searchPlaceholder = "Введите запрос",
  selectButtonText = "Выбрать",
  closeButtonText = "Закрыть",
  confirmButtonText = "Выбрать",
  debounceMs = DEFAULT_DEBOUNCE_MS,
  disabled,
  error,
  className,
  inputClassName,
  selectedOptionRender,
  nodeRender,
}: TreeDialogSelectProps<T, S>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [childrenCache, setChildrenCache] = useState<Map<Key<S>, TreeNode<T, S>[]>>(
    () => new Map(),
  );
  const [loadingNodes, setLoadingNodes] = useState<Set<Key<S>>>(() => new Set());
  const [expanded, setExpanded] = useState<Set<S>>(() => new Set());
  const [forcedExpanded, setForcedExpanded] = useState<Set<S>>(() => new Set());
  const [searchMatches, setSearchMatches] = useState<Set<S>>(() => new Set());
  const [isSearching, setIsSearching] = useState(false);
  const [pendingSelection, setPendingSelection] = useState<TreeNode<T, S> | null>(null);

  const rootRequestIdRef = useRef(0);
  const searchRequestIdRef = useRef(0);

  // Загрузка корня при открытии
  useEffect(() => {
    if (!isOpen) return;
    if (childrenCache.has(ROOT_KEY)) return;

    const requestId = rootRequestIdRef.current + 1;
    rootRequestIdRef.current = requestId;

    setLoadingNodes((prev) => {
      const next = new Set(prev);
      next.add(ROOT_KEY);
      return next;
    });

    loadChildren({ parentId: null, search: "" })
      .then((result) => {
        if (rootRequestIdRef.current !== requestId) return;
        setChildrenCache((prev) => {
          const next = new Map(prev);
          next.set(ROOT_KEY, result.nodes);
          return next;
        });
      })
      .finally(() => {
        if (rootRequestIdRef.current !== requestId) return;
        setLoadingNodes((prev) => {
          const next = new Set(prev);
          next.delete(ROOT_KEY);
          return next;
        });
      });
  }, [isOpen, loadChildren, childrenCache]);

  // debounce поиска
  useEffect(() => {
    const id = window.setTimeout(() => setDebouncedSearch(search.trim()), debounceMs);
    return () => window.clearTimeout(id);
  }, [search, debounceMs]);

  // Серверный поиск
  useEffect(() => {
    if (!isOpen) return;
    if (!searchNodes) return;
    if (!debouncedSearch) {
      setSearchMatches(new Set());
      setForcedExpanded(new Set());
      return;
    }

    const requestId = searchRequestIdRef.current + 1;
    searchRequestIdRef.current = requestId;
    setIsSearching(true);

    searchNodes(debouncedSearch)
      .then((result) => {
        if (searchRequestIdRef.current !== requestId) return;

        const matches = new Set<S>();
        const ancestorsToExpand = new Set<S>();
        // Кэшируем path-узлы как «дети» для авто-раскрытия
        const inferredChildren = new Map<Key<S>, Map<S, TreeNode<T, S>>>();

        for (const item of result.matches) {
          matches.add(item.node.value);

          const fullPath = [...item.path, item.node];
          for (let i = 0; i < fullPath.length - 1; i++) {
            const parent = fullPath[i];
            const child = fullPath[i + 1];
            ancestorsToExpand.add(parent.value);

            const parentKey: Key<S> = parent.value;
            if (!inferredChildren.has(parentKey)) {
              inferredChildren.set(parentKey, new Map());
            }
            inferredChildren.get(parentKey)!.set(child.value, child);
          }
          // корневые узлы пути
          if (fullPath.length > 0) {
            const root = fullPath[0];
            if (!inferredChildren.has(ROOT_KEY)) {
              inferredChildren.set(ROOT_KEY, new Map());
            }
            inferredChildren.get(ROOT_KEY)!.set(root.value, root);
          }
        }

        setSearchMatches(matches);
        setForcedExpanded(ancestorsToExpand);
        setChildrenCache((prev) => {
          const next = new Map(prev);
          inferredChildren.forEach((map, key) => {
            const existing = next.get(key) ?? [];
            const merged = new Map<S, TreeNode<T, S>>();
            existing.forEach((n) => merged.set(n.value, n));
            map.forEach((n, k) => merged.set(k, n));
            next.set(key, Array.from(merged.values()));
          });
          return next;
        });
      })
      .finally(() => {
        if (searchRequestIdRef.current === requestId) setIsSearching(false);
      });
  }, [debouncedSearch, isOpen, searchNodes]);

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setSearch("");
      setDebouncedSearch("");
      setPendingSelection(null);
      setSearchMatches(new Set());
      setForcedExpanded(new Set());
    }
  }, []);

  const ensureChildrenLoaded = useCallback(
    (parent: TreeNode<T, S>) => {
      const key: Key<S> = parent.value;
      if (childrenCache.has(key)) return;
      if (loadingNodes.has(key)) return;

      setLoadingNodes((prev) => {
        const next = new Set(prev);
        next.add(key);
        return next;
      });

      loadChildren({ parentId: parent.value, search: "" })
        .then((result) => {
          setChildrenCache((prev) => {
            const next = new Map(prev);
            const existing = next.get(key) ?? [];
            const merged = new Map<S, TreeNode<T, S>>();
            existing.forEach((n) => merged.set(n.value, n));
            result.nodes.forEach((n) => merged.set(n.value, n));
            next.set(key, Array.from(merged.values()));
            return next;
          });
        })
        .finally(() => {
          setLoadingNodes((prev) => {
            const next = new Set(prev);
            next.delete(key);
            return next;
          });
        });
    },
    [childrenCache, loadChildren, loadingNodes],
  );

  const toggleExpand = useCallback(
    (node: TreeNode<T, S>) => {
      setExpanded((prev) => {
        const next = new Set(prev);
        if (next.has(node.value)) {
          next.delete(node.value);
        } else {
          next.add(node.value);
          ensureChildrenLoaded(node);
        }
        return next;
      });
    },
    [ensureChildrenLoaded],
  );

  const handleSelectNode = useCallback((node: TreeNode<T, S>) => {
    setPendingSelection(node);
  }, []);

  const handleConfirm = useCallback(() => {
    if (pendingSelection) {
      onChange?.(pendingSelection);
    }
    handleOpenChange(false);
  }, [handleOpenChange, onChange, pendingSelection]);

  const isExpanded = useCallback(
    (nodeValue: S) => expanded.has(nodeValue) || forcedExpanded.has(nodeValue),
    [expanded, forcedExpanded],
  );

  // Клиентская фильтрация (когда нет searchNodes)
  const clientFilter = useCallback(
    (nodes: TreeNode<T, S>[]): TreeNode<T, S>[] => {
      if (!debouncedSearch || searchNodes) return nodes;
      const q = debouncedSearch.toLowerCase();
      return nodes.filter((n) => n.label.toLowerCase().includes(q));
    },
    [debouncedSearch, searchNodes],
  );

  const renderNode = (node: TreeNode<T, S>, level: number): ReactNode => {
    const key: Key<S> = node.value;
    const children = childrenCache.get(key);
    const isNodeExpanded = isExpanded(node.value);
    const isNodeLoading = loadingNodes.has(key);
    const isPending = pendingSelection?.value === node.value;
    const isCurrent = value?.value === node.value;
    const isMatch = searchMatches.has(node.value);

    const showChildren = isNodeExpanded && children && children.length > 0;
    const visibleChildren = showChildren ? clientFilter(children!) : [];

    return (
      <React.Fragment key={String(node.value)}>
        <div
          className={cn(css.row, {
            [css.row_active]: isPending || isCurrent,
            [css.row_match]: isMatch,
          })}
          style={{ paddingLeft: 16 + level * 20 }}
          onClick={() => handleSelectNode(node)}
        >
          {node.hasChildren ? (
            <button
              type="button"
              className={cn(css.chevron, { [css.chevronExpanded]: isNodeExpanded })}
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand(node);
              }}
              aria-label={isNodeExpanded ? "Свернуть" : "Раскрыть"}
            >
              <ArrowDownIcon />
            </button>
          ) : (
            <span className={css.chevronPlaceholder} />
          )}
          <span className={css.nodeLabel}>{nodeRender ? nodeRender(node) : node.label}</span>
          {isNodeLoading && <Spinner size="extraSmall" className={css.nodeSpinner} />}
        </div>
        {showChildren &&
          visibleChildren.map((child) => renderNode(child, level + 1))}
      </React.Fragment>
    );
  };

  const rootNodes = childrenCache.get(ROOT_KEY) ?? [];
  const visibleRoots = clientFilter(rootNodes);
  const isRootLoading = loadingNodes.has(ROOT_KEY);

  const selectedContent = value
    ? selectedOptionRender
      ? selectedOptionRender(value)
      : value.label
    : placeholder;

  const showEmpty = !isRootLoading && !isSearching && visibleRoots.length === 0;

  const showSearchSpinner = useMemo(
    () => isSearching || (isRootLoading && Boolean(debouncedSearch)),
    [isSearching, isRootLoading, debouncedSearch],
  );

  return (
    <div className={cn(css.wrapper, className)}>
      {label && <Label htmlFor="TreeDialogSelectInput">{label}</Label>}
      <div
        id="TreeDialogSelectInput"
        role="button"
        tabIndex={disabled ? -1 : 0}
        className={cn(
          css.input,
          "rounded-sm",
          { [css.disabled]: disabled, [css.error]: error },
          inputClassName,
        )}
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
            {showSearchSpinner && (
              <Spinner size="extraSmall" className={css.searchSpinner} />
            )}
          </div>

          <div className={css.treeContainer}>
            {isRootLoading && rootNodes.length === 0 ? (
              <div className={css.loadingState}>
                <Spinner size="small" />
              </div>
            ) : showEmpty ? (
              <div className={css.emptyState}>
                <EmptyComponent
                  title="Ничего не найдено"
                  subtitle="Попробуйте изменить поисковый запрос"
                />
              </div>
            ) : (
              visibleRoots.map((node) => renderNode(node, 0))
            )}
          </div>

          <DialogFooter className={css.dialogFooter}>
            <Button variant="secondary" onClick={() => handleOpenChange(false)}>
              {closeButtonText}
            </Button>
            <Button variant="primary" disabled={!pendingSelection} onClick={handleConfirm}>
              {confirmButtonText}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {error && <InputCaption>{error}</InputCaption>}
    </div>
  );
};