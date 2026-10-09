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
import { Tag } from "../Tag/Tag";
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

/** Stable empty list — never allocate `[]` per render (breaks effect deps in single mode). */
const EMPTY_TREE_NODES: TreeNode<never, never>[] = [];

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

  for (const match of matches) {
    const path = match.path ?? [];
    if (path.length > 0) {
      ids.add(path[path.length - 1]!.value);
    }
  }

  return Array.from(ids);
}

function nodesToMap<T, S extends string | number>(
  nodes: TreeNode<T, S>[],
): Map<S, TreeNode<T, S>> {
  return new Map(nodes.map((node) => [node.value, node]));
}

function hasUnconfirmableInPending<T, S extends string | number>(
  pending: Map<S, TreeNode<T, S>>,
  canConfirmNode: (node: TreeNode<T, S>) => boolean,
): boolean {
  for (const node of pending.values()) {
    if (!canConfirmNode(node)) return true;
  }
  return false;
}

type TreeDialogSelectModeProps<T, S extends string | number> =
  | {
      mode?: "single";
      value?: TreeNode<T, S> | null;
      resolveSelectedPath?: (value: S) => Promise<TreeSearchResult<T, S>>;
      onDelete?: never;
      tagRender?: never;
    }
  | {
      mode: "multiple";
      value?: TreeNode<T, S>[];
      resolveSelectedPath?: (value: S) => Promise<TreeSearchResult<T, S>>;
      onDelete?: (node: TreeNode<T, S>) => void;
      tagRender?: (node: TreeNode<T, S>) => ReactNode;
    };

interface TreeDialogSelectShared<T, S extends string | number>
  extends ValueFieldCallbacks<TreeNode<T, S>>,
    FieldValidationProps {
  placeholder: string;
  searchNodes?: (search: string) => Promise<TreeSearchResult<T, S>>;
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
  /** Label for the manual-add action (footer + empty state). Default: `"Добавить вручную"`. */
  manualButtonText?: string;
  /**
   * When provided, shows a manual-add action in the dialog footer and (when search
   * has no results) in the empty state. Receives the trimmed search string.
   * The dialog closes after the callback runs.
   */
  onManualAdd?: (search: string) => void;
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
  /**
   * When provided, nodes for which this returns `false` cannot be selected
   * (or confirmed). Composed with {@link leafConfirmOnly}.
   */
  isNodeSelectable?: (node: TreeNode<T, S>) => boolean;
}

/** Pass either {@link loadNodes} or {@link loadChildren} (deprecated alias). */
export type TreeDialogSelectProps<T, S extends string | number> = TreeDialogSelectShared<T, S> &
  TreeDialogSelectModeProps<T, S> &
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

type TreeDialogSelectComponentProps<T, S extends string | number> = TreeDialogSelectProps<T, S> & {
  mode?: "single" | "multiple";
};

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
  onDelete,
  label,
  tooltipContent,
  tooltipPopperClassName,
  title = "Выбор элемента",
  searchPlaceholder = "Введите запрос",
  selectButtonText = "Выбрать",
  closeButtonText = "Закрыть",
  confirmButtonText = "Выбрать",
  manualButtonText = "Добавить вручную",
  onManualAdd,
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
  tagRender,
  leafConfirmOnly = false,
  isNodeSelectable,
  mode = "single",
}: TreeDialogSelectComponentProps<T, S>) => {
  const isMultiple = mode === "multiple";
  const multipleValue = (
    isMultiple
      ? ((value as TreeNode<T, S>[] | undefined) ?? EMPTY_TREE_NODES)
      : EMPTY_TREE_NODES
  ) as TreeNode<T, S>[];
  const singleValue = !isMultiple ? (value as TreeNode<T, S> | null | undefined) : null;
  /** Primitive key so resolve effect does not re-run on value object identity churn. */
  const selectedIdKey = isMultiple
    ? multipleValue
        .map((node) => String(node.value))
        .sort()
        .join("\0")
    : singleValue == null
      ? ""
      : String(singleValue.value);

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

  const canConfirmNode = useCallback(
    (node: TreeNode<T, S>) => {
      if (leafConfirmOnly && node.hasChildren === true) return false;
      if (isNodeSelectable && !isNodeSelectable(node)) return false;
      return true;
    },
    [isNodeSelectable, leafConfirmOnly],
  );

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
  const [pendingSingle, setPendingSingle] = useState<TreeNode<T, S> | null>(null);
  const [pendingMultiple, setPendingMultiple] = useState<Map<S, TreeNode<T, S>>>(() => new Map());
  const [scrollTarget, setScrollTarget] = useState<S | null>(null);

  const rootRequestIdRef = useRef(0);
  const searchRequestIdRef = useRef(0);
  const resolveRequestIdRef = useRef(0);
  const treeContainerRef = useRef<HTMLDivElement>(null);
  const childrenCacheRef = useRef(childrenCache);
  const loadChildrenRef = useRef(loadChildren);
  const searchNodesRef = useRef(searchNodes);
  const resolveSelectedPathRef = useRef(resolveSelectedPath);
  const valueRef = useRef(value);
  const isOpenRef = useRef(isOpen);
  const pendingSingleRef = useRef(pendingSingle);
  const pendingMultipleRef = useRef(pendingMultiple);

  childrenCacheRef.current = childrenCache;
  loadChildrenRef.current = loadChildren;
  searchNodesRef.current = searchNodes;
  resolveSelectedPathRef.current = resolveSelectedPath;
  valueRef.current = value;
  isOpenRef.current = isOpen;
  pendingSingleRef.current = pendingSingle;
  pendingMultipleRef.current = pendingMultiple;

  const loadingCount = loadingNodes.size;

  const committedValueSet = useMemo(
    () => new Set(multipleValue.map((node) => node.value)),
    [multipleValue],
  );

  const hasSelectedValue = isMultiple ? multipleValue.length > 0 : Boolean(singleValue);

  const isResolveRequestActive = (requestId: number) =>
    isOpenRef.current && resolveRequestIdRef.current === requestId;

  // Загрузка корня при открытии
  useEffect(() => {
    if (!isOpen) return;
    if (childrenCacheRef.current.has(ROOT_KEY)) return;

    const requestId = rootRequestIdRef.current + 1;
    rootRequestIdRef.current = requestId;

    setLoadingNodes((prev) => {
      const next = new Set(prev);
      next.add(ROOT_KEY);
      return next;
    });

    loadChildrenRef.current({ parentId: null, search: "" })
      .then((result) => {
        if (rootRequestIdRef.current !== requestId || !isOpenRef.current) return;
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
  }, [isOpen]);

  // debounce поиска
  useEffect(() => {
    const id = window.setTimeout(() => setDebouncedSearch(search.trim()), debounceMs);
    return () => window.clearTimeout(id);
  }, [search, debounceMs]);

  // Серверный поиск
  useEffect(() => {
    if (!isOpen) return;
    const searchFn = searchNodesRef.current;
    if (!searchFn) return;
    if (!debouncedSearch) {
      setSearchMatches(new Set());
      // Do not clear forcedExpanded — resolveSelectedPath may have set it for the selected path.
      return;
    }

    const requestId = searchRequestIdRef.current + 1;
    searchRequestIdRef.current = requestId;
    setIsSearching(true);

    searchFn(debouncedSearch)
      .then((result) => {
        if (searchRequestIdRef.current !== requestId || !isOpenRef.current) return;

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
  }, [debouncedSearch, isOpen]);

  // Раскрытие дерева до выбранного значения при открытии
  useEffect(() => {
    if (!isOpen) return;
    const resolveFn = resolveSelectedPathRef.current;
    if (!resolveFn) return;
    if (debouncedSearch) return;
    if (!selectedIdKey) return;

    const currentValue = valueRef.current;
    const selectedNodes = isMultiple
      ? ((currentValue as TreeNode<T, S>[] | undefined) ?? (EMPTY_TREE_NODES as TreeNode<T, S>[]))
      : currentValue
        ? [currentValue as TreeNode<T, S>]
        : [];

    if (selectedNodes.length === 0) return;

    const requestId = resolveRequestIdRef.current + 1;
    resolveRequestIdRef.current = requestId;

    const applyOrphanFallback = () => {
      if (!isResolveRequestActive(requestId)) return;
      if (isMultiple) {
        setPendingMultiple(nodesToMap(selectedNodes));
      } else {
        const orphan = selectedNodes[0] ?? null;
        if (orphan) setPendingSingle(orphan);
      }
      // Do not scroll — orphan ids are not in the tree DOM.
      setScrollTarget(null);
    };

    Promise.all(
      selectedNodes.map((node) =>
        Promise.resolve(resolveFn(node.value)).catch(
          (): TreeSearchResult<T, S> => ({ matches: [] }),
        ),
      ),
    ).then(async (results) => {
      if (!isResolveRequestActive(requestId)) return;

      const allMatches = results.flatMap((result) => result.matches);
      if (allMatches.length === 0) {
        applyOrphanFallback();
        return;
      }

      const { searchMatches, ancestorsToExpand, inferredChildren, resolvedNode } =
        buildTreeStateFromMatches(allMatches);

      setSearchMatches(searchMatches);
      setForcedExpanded(ancestorsToExpand);
      setChildrenCache((prev) => mergeInferredChildrenIntoCache(prev, inferredChildren));

      const parentIds = collectParentIdsForSiblingPreload(allMatches, ancestorsToExpand);

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
              const loadResult = await loadChildrenRef.current({ parentId, search: "" });
              return {
                key: (parentId ?? ROOT_KEY) as Key<S>,
                nodes: loadResult.nodes,
              };
            }),
          );

          if (!isResolveRequestActive(requestId)) return;

          setChildrenCache((prev) => {
            let next = prev;
            for (const { key, nodes } of loads) {
              next = mergeNodesAtKey(next, key, nodes);
            }
            return next;
          });
        } finally {
          setLoadingNodes((prev) => {
            const next = new Set(prev);
            keys.forEach((key) => next.delete(key));
            return next;
          });
        }
      }

      if (!isResolveRequestActive(requestId)) return;

      if (isMultiple) {
        setPendingMultiple(nodesToMap(selectedNodes));
        setScrollTarget(selectedNodes[0]?.value ?? null);
      } else if (resolvedNode) {
        setPendingSingle(resolvedNode);
        setScrollTarget(resolvedNode.value);
      } else {
        applyOrphanFallback();
      }
    });
  }, [isOpen, isMultiple, selectedIdKey, debouncedSearch]);

  useLayoutEffect(() => {
    if (!isOpen || scrollTarget == null) return;

    const isScrollTargetPending = isMultiple
      ? pendingMultipleRef.current.has(scrollTarget)
      : pendingSingleRef.current?.value === scrollTarget;

    if (!isScrollTargetPending) return;
    if (loadingCount > 0) return;

    const container = treeContainerRef.current;
    if (!container) return;

    const row = container.querySelector(`[data-tree-node-value="${String(scrollTarget)}"]`);
    if (!row) return;

    row.scrollIntoView({ block: "nearest" });

    let timeoutId = 0;
    let attempts = 0;
    const maxAttempts = 5;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= SCROLL_VISIBILITY_THRESHOLD) {
          setScrollTarget(null);
          observer.disconnect();
          clearTimeout(timeoutId);
          return;
        }

        attempts += 1;
        if (attempts >= maxAttempts) {
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
  }, [isOpen, isMultiple, scrollTarget, loadingCount]);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      setIsOpen(open);
      if (open && isMultiple) {
        setPendingMultiple(nodesToMap(multipleValue));
      }
      // Single: do not setPendingSingle(value) on open — races resolveSelectedPath /
      // scroll-into-view and can freeze the UI. Highlight uses isCurrent until click.
      if (!open) {
        rootRequestIdRef.current += 1;
        searchRequestIdRef.current += 1;
        resolveRequestIdRef.current += 1;
        setSearch("");
        setDebouncedSearch("");
        setPendingSingle(null);
        setPendingMultiple(new Map());
        setSearchMatches(new Set());
        setForcedExpanded(new Set());
        setScrollTarget(null);
        setLoadingNodes(new Set());
        setIsSearching(false);
      }
    },
    [isMultiple, multipleValue],
  );

  const ensureChildrenLoaded = useCallback((parent: TreeNode<T, S>) => {
    const key: Key<S> = parent.value;
    if (childrenCacheRef.current.has(key)) return;

    setLoadingNodes((prev) => {
      if (prev.has(key)) return prev;
      const next = new Set(prev);
      next.add(key);
      return next;
    });

    loadChildrenRef.current({ parentId: parent.value, search: "" })
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
  }, []);

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
    setPendingSingle(node);
  }, []);

  const handleToggleNode = useCallback(
    (node: TreeNode<T, S>) => {
      if (!canConfirmNode(node)) return;

      setPendingMultiple((prev) => {
        const next = new Map(prev);
        if (next.has(node.value)) {
          next.delete(node.value);
        } else {
          next.set(node.value, node);
        }
        return next;
      });
    },
    [canConfirmNode],
  );

  const handleConfirm = useCallback(() => {
    if (isMultiple) {
      if (hasUnconfirmableInPending(pendingMultiple, canConfirmNode)) {
        return;
      }

      const committedMap = nodesToMap(multipleValue);

      pendingMultiple.forEach((node, nodeValue) => {
        if (!committedMap.has(nodeValue)) {
          handleValueChange?.(node);
        }
      });

      committedMap.forEach((node, nodeValue) => {
        if (!pendingMultiple.has(nodeValue)) {
          onDelete?.(node);
        }
      });

      handleOpenChange(false);
      return;
    }

    if (!pendingSingle || !canConfirmNode(pendingSingle)) {
      return;
    }
    handleValueChange?.(pendingSingle);
    handleOpenChange(false);
  }, [
    canConfirmNode,
    handleOpenChange,
    handleValueChange,
    isMultiple,
    multipleValue,
    onDelete,
    pendingMultiple,
    pendingSingle,
  ]);

  const isExpanded = useCallback(
    (nodeValue: S) => expanded.has(nodeValue) || forcedExpanded.has(nodeValue),
    [expanded, forcedExpanded],
  );

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
    const isMatch = searchMatches.has(node.value);
    const isCheckboxDisabled = !canConfirmNode(node);

    const isPending = isMultiple
      ? pendingMultiple.has(node.value)
      : pendingSingle?.value === node.value;
    const isCurrent = isMultiple
      ? committedValueSet.has(node.value)
      : singleValue?.value === node.value;

    const showChildren = isNodeExpanded && children && children.length > 0;
    const visibleChildren = showChildren ? clientFilter(children!) : [];

    const handleRowClick = () => {
      if (isMultiple) {
        handleToggleNode(node);
        return;
      }
      handleSelectNode(node);
    };

    return (
      <React.Fragment key={String(node.value)}>
        <div
          className={cn(css.row, {
            [css.row_active]: isMultiple
              ? isPending || isCurrent
              : pendingSingle
                ? isPending
                : isCurrent,
            [css.row_match]: isMatch,
            [css.row_disabled]: isCheckboxDisabled,
          })}
          style={{ paddingLeft: 16 + level * 20 }}
          data-tree-node-value={String(node.value)}
          onClick={handleRowClick}
        >
          {isMultiple && (
            <span className={css.checkboxCell}>
              <input
                type="checkbox"
                className={css.checkbox}
                checked={isPending}
                disabled={isCheckboxDisabled}
                readOnly
                tabIndex={-1}
                aria-label={node.label}
              />
            </span>
          )}
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

  const selectedContent = isMultiple ? (
    multipleValue.length > 0 ? (
      <div className={css.tagContainer}>
        {multipleValue.map((item) =>
          tagRender ? (
            <React.Fragment key={String(item.value)}>{tagRender(item)}</React.Fragment>
          ) : (
            <Tag
              isSmall
              key={String(item.value)}
              {...(onDelete && {
                onClick: () => onDelete(item),
              })}
            >
              {selectedOptionRender ? selectedOptionRender(item) : item.label}
            </Tag>
          ),
        )}
      </div>
    ) : (
      placeholder
    )
  ) : singleValue ? (
    selectedOptionRender ? (
      selectedOptionRender(singleValue)
    ) : (
      singleValue.label
    )
  ) : (
    placeholder
  );

  const showEmpty = !isRootLoading && !isSearching && visibleRoots.length === 0;

  const showSearchSpinner = useMemo(
    () => isSearching || (isRootLoading && Boolean(debouncedSearch)),
    [isSearching, isRootLoading, debouncedSearch],
  );

  const isConfirmDisabled = isMultiple
    ? hasUnconfirmableInPending(pendingMultiple, canConfirmNode)
    : !pendingSingle || !canConfirmNode(pendingSingle);

  const handleManualAdd = useCallback(() => {
    if (!onManualAdd) return;
    onManualAdd(search.trim());
    handleOpenChange(false);
  }, [onManualAdd, search, handleOpenChange]);

  const trimmedSearch = search.trim();
  const showEmptyManualAdd = Boolean(onManualAdd && trimmedSearch);

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
        <span
          className={cn(css.selectedOption, {
            [css.placeholder]: !hasSelectedValue,
            [css.selectedOptionMultiple]: isMultiple && multipleValue.length > 0,
          })}
        >
          {selectedContent}
        </span>
        <span className={css.actions}>
          {onClear && hasSelectedValue && (
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
                  content={
                    showEmptyManualAdd ? (
                      <Button variant="link" onClick={handleManualAdd}>
                        {manualButtonText}
                      </Button>
                    ) : undefined
                  }
                />
              </div>
            ) : (
              visibleRoots.map((node) => renderNode(node, 0))
            )}
          </div>

          <DialogFooter className={css.dialogFooter}>
            <div className={css.footerActions}>
              {onManualAdd && (
                <Button variant="primary" disabled={!trimmedSearch} onClick={handleManualAdd}>
                  {manualButtonText}
                </Button>
              )}
              <Button variant="secondary" onClick={() => handleOpenChange(false)}>
                {closeButtonText}
              </Button>
              <Button variant="primary" disabled={isConfirmDisabled} onClick={handleConfirm}>
                {confirmButtonText}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <FieldErrorCaption id={field.errorId} message={field.errorMessage} />
    </div>
  );
};
