import cn from "classnames";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
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
import { FieldErrorCaption } from "../../helpers/field/FieldErrorCaption";
import { useFieldPresentation } from "../../helpers/field/useFieldPresentation";
import {
  resolveValueChangeHandler,
  type FieldValidationProps,
  type ValueFieldCallbacks,
} from "../../helpers/validation";
import { FieldLabel } from "../FieldLabel/FieldLabel";
import { Spinner } from "../Spinner/Spinner";
import { ArrowDownIcon, CrossIcon, SearchIcon } from "../../icons";
import css from "./TreeDialogSelect.module.scss";

const DEFAULT_DEBOUNCE_MS = 350;
const ROOT_KEY = "__root__" as const;
const SCROLL_VISIBILITY_TIMEOUT_MS = 500;
const SCROLL_VISIBILITY_THRESHOLD = 0.9;

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

type TreeLoader<T, S extends string | number> = (
  params: TreeLoadParams<S>,
) => Promise<TreeLoadResult<T, S>>;

type Key<S extends string | number> = S | typeof ROOT_KEY;

type TreeStateFromMatches<T, S extends string | number> = {
  searchMatches: Set<S>;
  ancestorsToExpand: Set<S>;
  inferredChildren: Map<Key<S>, Map<S, TreeNode<T, S>>>;
  resolvedNode: TreeNode<T, S> | null;
};

function buildTreeStateFromMatches<T, S extends string | number>(
  matches: TreeSearchResult<T, S>["matches"],
): TreeStateFromMatches<T, S> {
  const searchMatches = new Set<S>();
  const ancestorsToExpand = new Set<S>();
  const inferredChildren = new Map<Key<S>, Map<S, TreeNode<T, S>>>();

  for (const item of matches) {
    searchMatches.add(item.node.value);

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
    if (fullPath.length > 0) {
      const root = fullPath[0];
      if (!inferredChildren.has(ROOT_KEY)) {
        inferredChildren.set(ROOT_KEY, new Map());
      }
      inferredChildren.get(ROOT_KEY)!.set(root.value, root);
    }
  }

  return {
    searchMatches,
    ancestorsToExpand,
    inferredChildren,
    resolvedNode: matches[0]?.node ?? null,
  };
}

function mergeInferredChildrenIntoCache<T, S extends string | number>(
  prev: Map<Key<S>, TreeNode<T, S>[]>,
  inferredChildren: Map<Key<S>, Map<S, TreeNode<T, S>>>,
): Map<Key<S>, TreeNode<T, S>[]> {
  const next = new Map(prev);
  inferredChildren.forEach((map, key) => {
    const existing = next.get(key) ?? [];
    const merged = new Map<S, TreeNode<T, S>>();
    existing.forEach((n) => merged.set(n.value, n));
    map.forEach((n, k) => merged.set(k, n));
    next.set(key, Array.from(merged.values()));
  });
  return next;
}

function mergeNodesAtKey<T, S extends string | number>(
  cache: Map<Key<S>, TreeNode<T, S>[]>,
  key: Key<S>,
  nodes: TreeNode<T, S>[],
): Map<Key<S>, TreeNode<T, S>[]> {
  const next = new Map(cache);
  const existing = next.get(key) ?? [];
  const merged = new Map<S, TreeNode<T, S>>();
  existing.forEach((n) => merged.set(n.value, n));
  nodes.forEach((n) => merged.set(n.value, n));
  next.set(key, Array.from(merged.values()));
  return next;
}

function collectParentIdsForSiblingPreload<T, S extends string | number>(
  matches: TreeSearchResult<T, S>["matches"],
  ancestorsToExpand: Set<S>,
): Array<S | null> {
  if (matches.length === 0) return [];

  const ids = new Set<S | null>();
  ids.add(null);
  ancestorsToExpand.forEach((id) => ids.add(id));

  const path = matches[0]?.path ?? [];
  if (path.length > 0) {
    ids.add(path[path.length - 1]!.value);
  }

  return Array.from(ids);
}

interface TreeDialogSelectShared<T, S extends string | number>
  extends ValueFieldCallbacks<TreeNode<T, S>>,
    FieldValidationProps {
  value?: TreeNode<T, S> | null;
  placeholder: string;
  searchNodes?: (search: string) => Promise<TreeSearchResult<T, S>>;
  /** Resolves the path to the currently selected value when the dialog opens. */
  resolveSelectedPath?: (value: S) => Promise<TreeSearchResult<T, S>>;
  onClear?: () => void;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
  onFocus?: React.FocusEventHandler<HTMLDivElement>;
  label?: ReactNode;
  /** Подсказка по наведению на иконку «?» справа от подписи */
  tooltipContent?: ReactNode;
  tooltipPopperClassName?: string;
  title?: ReactNode;
  searchPlaceholder?: string;
  selectButtonText?: string;
  closeButtonText?: string;
  confirmButtonText?: string;
  debounceMs?: number;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  selectedOptionRender?: (node: TreeNode<T, S>) => ReactNode;
  nodeRender?: (node: TreeNode<T, S>) => ReactNode;
  /**
   * When true, the dialog confirm button stays disabled until a node is selected and
   * {@link TreeNode.hasChildren} is not strictly `true` (confirm leaf nodes only).
   */
  leafConfirmOnly?: boolean;
}

/** Pass either {@link loadNodes} or {@link loadChildren} (deprecated alias). */
export type TreeDialogSelectProps<T, S extends string | number> = TreeDialogSelectShared<T, S> &
  (
    | {
        /** Loads nodes for a tree level (`parentId` null = roots). */ loadNodes: TreeLoader<T, S>;
        loadChildren?: TreeLoader<T, S>;
      }
    | {
        /** @deprecated Use {@link loadNodes} */ loadChildren: TreeLoader<T, S>;
        loadNodes?: TreeLoader<T, S>;
      }
  );

export const TreeDialogSelect = <T, S extends string | number>({
  value,
  placeholder,
  loadChildren: loadChildrenProp,
  loadNodes,
  searchNodes,
  resolveSelectedPath,
  onValueChange,
  onChange,
  onBlur,
  onFocus,
  onClear,
  label,
  tooltipContent,
  tooltipPopperClassName,
  title = "Выбор элемента",
  searchPlaceholder = "Введите запрос",
  selectButtonText = "Выбрать",
  closeButtonText = "Закрыть",
  confirmButtonText = "Выбрать",
  debounceMs = DEFAULT_DEBOUNCE_MS,
  disabled,
  error,
  suppressError,
  fieldMeta,
  showErrorPolicy,
  className,
  inputClassName,
  selectedOptionRender,
  nodeRender,
  leafConfirmOnly = false,
}: TreeDialogSelectProps<T, S>) => {
  const field = useFieldPresentation({
    error,
    suppressError,
    fieldMeta,
    showErrorPolicy,
    idPrefix: "tree-dialog-select",
  });
  const handleValueChange = resolveValueChangeHandler<TreeNode<T, S>>({
    onValueChange,
    onChange,
  });

  const loadChildren: TreeLoader<T, S> = (loadNodes ?? loadChildrenProp) as TreeLoader<T, S>;
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
  const [scrollTarget, setScrollTarget] = useState<S | null>(null);

  const rootRequestIdRef = useRef(0);
  const searchRequestIdRef = useRef(0);
  const resolveRequestIdRef = useRef(0);
  const treeContainerRef = useRef<HTMLDivElement>(null);

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

        const { searchMatches, ancestorsToExpand, inferredChildren } = buildTreeStateFromMatches(
          result.matches,
        );

        setSearchMatches(searchMatches);
        setForcedExpanded(ancestorsToExpand);
        setChildrenCache((prev) => mergeInferredChildrenIntoCache(prev, inferredChildren));
      })
      .finally(() => {
        if (searchRequestIdRef.current === requestId) setIsSearching(false);
      });
  }, [debouncedSearch, isOpen, searchNodes]);

  // Раскрытие дерева до выбранного значения при открытии
  useEffect(() => {
    if (!isOpen) return;
    if (!value) return;
    if (!resolveSelectedPath) return;
    if (debouncedSearch) return;

    const requestId = resolveRequestIdRef.current + 1;
    resolveRequestIdRef.current = requestId;

    resolveSelectedPath(value.value).then(async (result) => {
      if (resolveRequestIdRef.current !== requestId) return;

      const { searchMatches, ancestorsToExpand, inferredChildren, resolvedNode } =
        buildTreeStateFromMatches(result.matches);

      setSearchMatches(searchMatches);
      setForcedExpanded(ancestorsToExpand);
      setChildrenCache((prev) => mergeInferredChildrenIntoCache(prev, inferredChildren));

      const parentIds = collectParentIdsForSiblingPreload(result.matches, ancestorsToExpand);

      if (parentIds.length > 0) {
        const keys = parentIds.map((parentId) => (parentId ?? ROOT_KEY) as Key<S>);

        setLoadingNodes((prev) => {
          const next = new Set(prev);
          keys.forEach((key) => next.add(key));
          return next;
        });

        try {
          const loads = await Promise.all(
            parentIds.map(async (parentId) => {
              const loadResult = await loadChildren({ parentId, search: "" });
              return {
                key: (parentId ?? ROOT_KEY) as Key<S>,
                nodes: loadResult.nodes,
              };
            }),
          );

          if (resolveRequestIdRef.current !== requestId) return;

          setChildrenCache((prev) => {
            let next = prev;
            for (const { key, nodes } of loads) {
              next = mergeNodesAtKey(next, key, nodes);
            }
            return next;
          });
        } finally {
          if (resolveRequestIdRef.current === requestId) {
            setLoadingNodes((prev) => {
              const next = new Set(prev);
              keys.forEach((key) => next.delete(key));
              return next;
            });
          }
        }
      }

      if (resolveRequestIdRef.current !== requestId) return;

      if (resolvedNode) {
        setPendingSelection(resolvedNode);
        setScrollTarget(resolvedNode.value);
      }
    });
  }, [isOpen, value, resolveSelectedPath, debouncedSearch, loadChildren]);

  useLayoutEffect(() => {
    if (!isOpen || scrollTarget == null) return;
    if (pendingSelection?.value !== scrollTarget) return;
    if (loadingNodes.size > 0) return;

    const container = treeContainerRef.current;
    if (!container) return;

    const row = container.querySelector(`[data-tree-node-value="${String(scrollTarget)}"]`);
    if (!row) return;

    row.scrollIntoView({ block: "nearest" });

    let timeoutId = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= SCROLL_VISIBILITY_THRESHOLD) {
          setScrollTarget(null);
          observer.disconnect();
          clearTimeout(timeoutId);
          return;
        }

        row.scrollIntoView({ block: "nearest" });
      },
      { root: container, threshold: [0, SCROLL_VISIBILITY_THRESHOLD, 1] },
    );

    observer.observe(row);

    timeoutId = window.setTimeout(() => {
      observer.disconnect();
      setScrollTarget(null);
    }, SCROLL_VISIBILITY_TIMEOUT_MS);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [isOpen, scrollTarget, pendingSelection, childrenCache, loadingNodes]);

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setSearch("");
      setDebouncedSearch("");
      setPendingSelection(null);
      setSearchMatches(new Set());
      setForcedExpanded(new Set());
      setScrollTarget(null);
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
          setChildrenCache((prev) => mergeNodesAtKey(prev, key, result.nodes));
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
    if (
      leafConfirmOnly &&
      (!pendingSelection || pendingSelection.hasChildren === true)
    ) {
      return;
    }
    if (pendingSelection) {
      handleValueChange?.(pendingSelection);
    }
    handleOpenChange(false);
  }, [handleOpenChange, handleValueChange, leafConfirmOnly, pendingSelection]);

  const isExpanded = useCallback(
    (nodeValue: S) => expanded.has(nodeValue) || forcedExpanded.has(nodeValue),
    [expanded, forcedExpanded],
  );

  // Фильтрация отображаемых узлов:
  // - если задан searchNodes и активен поиск — показываем только совпадения и их предков
  // - иначе — фильтруем по label (локально)
  const clientFilter = useCallback(
    (nodes: TreeNode<T, S>[]): TreeNode<T, S>[] => {
      if (!debouncedSearch) return nodes;

      if (searchNodes) {
        return nodes.filter(
          (n) => searchMatches.has(n.value) || forcedExpanded.has(n.value),
        );
      }
      const q = debouncedSearch.toLowerCase();
      return nodes.filter((n) => n.label.toLowerCase().includes(q));
    },
    [debouncedSearch, forcedExpanded, searchMatches, searchNodes],
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
          data-tree-node-value={String(node.value)}
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
        {showChildren && visibleChildren.map((child) => renderNode(child, level + 1))}
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

  const isConfirmDisabled =
    !pendingSelection ||
    (leafConfirmOnly && pendingSelection.hasChildren === true);

  return (
    <div className={cn(css.wrapper, className)}>
      {label && (
        <FieldLabel
          htmlFor={field.controlId}
          tooltipContent={tooltipContent}
          tooltipPopperClassName={tooltipPopperClassName}
        >
          {label}
        </FieldLabel>
      )}

      <div
        id={field.controlId}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-invalid={field.ariaInvalid}
        aria-describedby={field.ariaDescribedBy}
        className={cn(
          css.input,
          { [css.disabled]: disabled, [css.error]: field.showError },
          inputClassName,
        )}
        onBlur={onBlur}
        onFocus={onFocus}
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
            {showSearchSpinner && <Spinner size="extraSmall" className={css.searchSpinner} />}
          </div>

          <div ref={treeContainerRef} className={css.treeContainer}>
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
            <Button variant="primary" disabled={isConfirmDisabled} onClick={handleConfirm}>
              {confirmButtonText}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <FieldErrorCaption id={field.errorId} message={field.errorMessage} />
    </div>
  );
};
