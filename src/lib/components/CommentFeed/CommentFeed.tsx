import cn from "classnames";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
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
import { DialogSelect } from "../DialogSelect/DialogSelect";
import { EmptyComponent } from "../EmptyComponent/EmptyComponent";
import { Spinner } from "../Spinner/Spinner";
import {
  ChatIcon,
  CrossIcon,
  DownloadIcon,
  EditIcon,
  EnvelopIcon,
  CancelIcon,
  ArrowDownIcon,
} from "../../icons";
import type { CustomOption } from "../Select/Select";
import css from "./CommentFeed.module.scss";

/* ============================================================
 * Public types
 * ============================================================ */

export type CommentAuthor = {
  id: string;
  name: string;
  avatarUrl?: string;
};

export type CommentAttachment = {
  id: string;
  name: string;
  size: number;
  url?: string;
  mimeType?: string;
};

export type CommentPermissions = {
  canEdit?: boolean;
  canDelete?: boolean;
  canReply?: boolean;
};

export type Comment = {
  id: string;
  parentId: string | null;
  author: CommentAuthor;
  text: string;
  createdAt: string; // ISO
  editedAt?: string;
  attachments?: CommentAttachment[];
  recipients?: CommentAuthor[];
  repliesCount: number;
  deleted?: boolean;
  permissions?: CommentPermissions;
};

export type CommentLoadParams = {
  parentId: string | null;
  skip: number;
  take: number;
};

export type CommentLoadResult = {
  items: Comment[];
  total: number;
};

export type CommentMutationInput = {
  parentId: string | null;
  text: string;
  attachments: CommentAttachment[];
  recipients: CommentAuthor[];
};

export type CommentEditInput = {
  id: string;
  text: string;
  attachments: CommentAttachment[];
  recipients: CommentAuthor[];
};

export interface CommentFeedHandle {
  refresh: (parentId?: string | null) => void;
}

export interface CommentFeedProps {
  loadComments: (p: CommentLoadParams) => Promise<CommentLoadResult>;
  currentUser: CommentAuthor;
  recipientsSource?: (params: {
    search: string;
    page: number;
    pageSize: number;
  }) => Promise<{ options: CustomOption<CommentAuthor, string>[]; total?: number }>;

  onCreate?: (input: CommentMutationInput) => Promise<Comment>;
  onEdit?: (input: CommentEditInput) => Promise<Comment>;
  onDelete?: (id: string) => Promise<void>;

  onUploadAttachment?: (file: File) => Promise<CommentAttachment>;
  onDownloadAttachment?: (a: CommentAttachment) => void;
  onDeleteAttachment?: (a: CommentAttachment) => Promise<void>;

  permissions?: { canCreate?: boolean; canReply?: boolean };
  editWindowMs?: number;
  pageSize?: number;
  title?: string;
  eyebrow?: string;
  className?: string;
}

/* ============================================================
 * Helpers
 * ============================================================ */

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_EDIT_WINDOW_MS = 10 * 60_000;
const ROOT_KEY = "__root__";
const keyOf = (parentId: string | null) => parentId ?? ROOT_KEY;

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? "").join("");
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${String(d.getFullYear()).slice(2)} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function dedupeByIdSorted(items: Comment[]): Comment[] {
  const map = new Map<string, Comment>();
  for (const it of items) map.set(it.id, it);
  return Array.from(map.values()).sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );
}

/* ============================================================
 * Branch state hook
 * ============================================================ */

type BranchState = {
  items: Comment[];
  total: number;
  loadedFrom: number;
  loading: boolean;
  loaded: boolean;
};

function useBranches(pageSize: number, loadComments: CommentFeedProps["loadComments"]) {
  const [branches, setBranches] = useState<Record<string, BranchState>>({});
  const reqIds = useRef<Record<string, number>>({});

  const setBranch = useCallback(
    (parentId: string | null, updater: (b: BranchState) => BranchState) => {
      const k = keyOf(parentId);
      setBranches((prev) => {
        const current = prev[k] ?? {
          items: [],
          total: 0,
          loadedFrom: 0,
          loading: false,
          loaded: false,
        };
        return { ...prev, [k]: updater(current) };
      });
    },
    [],
  );

  const loadInitial = useCallback(
    async (parentId: string | null) => {
      const k = keyOf(parentId);
      const reqId = (reqIds.current[k] ?? 0) + 1;
      reqIds.current[k] = reqId;

      setBranch(parentId, (b) => ({ ...b, loading: true }));

      // 1. probe to get total + the first chunk (used as fallback if branch is small)
      const first = await loadComments({ parentId, skip: 0, take: pageSize });
      if (reqIds.current[k] !== reqId) return;

      if (first.total <= pageSize) {
        setBranch(parentId, () => ({
          items: dedupeByIdSorted(first.items),
          total: first.total,
          loadedFrom: 0,
          loading: false,
          loaded: true,
        }));
        return;
      }

      // 2. load the actual last page so newest are visible first
      const lastSkip = first.total - pageSize;
      const last = await loadComments({ parentId, skip: lastSkip, take: pageSize });
      if (reqIds.current[k] !== reqId) return;

      setBranch(parentId, () => ({
        items: dedupeByIdSorted(last.items),
        total: last.total,
        loadedFrom: lastSkip,
        loading: false,
        loaded: true,
      }));
    },
    [loadComments, pageSize, setBranch],
  );

  const loadOlder = useCallback(
    async (parentId: string | null) => {
      const k = keyOf(parentId);
      const current = branches[k];
      if (!current || current.loading || current.loadedFrom <= 0) return;

      const take = Math.min(pageSize, current.loadedFrom);
      const skip = current.loadedFrom - take;

      const reqId = (reqIds.current[k] ?? 0) + 1;
      reqIds.current[k] = reqId;

      setBranch(parentId, (b) => ({ ...b, loading: true }));

      const res = await loadComments({ parentId, skip, take });
      if (reqIds.current[k] !== reqId) return;

      setBranch(parentId, (b) => ({
        ...b,
        items: dedupeByIdSorted([...res.items, ...b.items]),
        total: res.total,
        loadedFrom: skip,
        loading: false,
      }));
    },
    [branches, loadComments, pageSize, setBranch],
  );

  const appendLocal = useCallback(
    (parentId: string | null, comment: Comment) => {
      setBranch(parentId, (b) => {
        const items = dedupeByIdSorted([...b.items, comment]);
        return {
          ...b,
          items,
          total: b.total + 1,
          loaded: true,
        };
      });
    },
    [setBranch],
  );

  const replaceLocal = useCallback(
    (parentId: string | null, id: string, updater: (c: Comment) => Comment) => {
      setBranch(parentId, (b) => ({
        ...b,
        items: b.items.map((it) => (it.id === id ? updater(it) : it)),
      }));
    },
    [setBranch],
  );

  const removeLocal = useCallback(
    (parentId: string | null, id: string) => {
      setBranch(parentId, (b) => ({
        ...b,
        items: b.items.filter((it) => it.id !== id),
        total: Math.max(0, b.total - 1),
      }));
    },
    [setBranch],
  );

  const resetBranch = useCallback((parentId: string | null) => {
    const k = keyOf(parentId);
    reqIds.current[k] = (reqIds.current[k] ?? 0) + 1;
    setBranches((prev) => {
      const next = { ...prev };
      delete next[k];
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    reqIds.current = {};
    setBranches({});
  }, []);

  return {
    branches,
    loadInitial,
    loadOlder,
    appendLocal,
    replaceLocal,
    removeLocal,
    resetBranch,
    resetAll,
  };
}

/* ============================================================
 * Confirm dialog
 * ============================================================ */

function ConfirmDialog({
  open,
  title,
  message,
  confirmText = "Удалить",
  cancelText = "Отмена",
  danger = true,
  onConfirm,
  onClose,
}: {
  open: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:rounded-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className={css.dialogContent}>{message}</div>
        <DialogFooter className={css.dialogActions}>
          <Button variant="secondary" onClick={onClose}>
            {cancelText}
          </Button>
          <Button variant={danger ? "danger" : "primary"} onClick={onConfirm}>
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ============================================================
 * Comment form (create / reply / edit)
 * ============================================================ */

type FormMode = "root" | "reply" | "edit";

function CommentForm({
  mode,
  initialText = "",
  initialAttachments = [],
  initialRecipients = [],
  placeholder,
  submitLabel,
  recipientsSource,
  onUploadAttachment,
  onDeleteAttachment,
  onSubmit,
  onCancel,
  submitting,
}: {
  mode: FormMode;
  initialText?: string;
  initialAttachments?: CommentAttachment[];
  initialRecipients?: CommentAuthor[];
  placeholder?: string;
  submitLabel?: string;
  recipientsSource?: CommentFeedProps["recipientsSource"];
  onUploadAttachment?: CommentFeedProps["onUploadAttachment"];
  onDeleteAttachment?: CommentFeedProps["onDeleteAttachment"];
  onSubmit: (input: {
    text: string;
    attachments: CommentAttachment[];
    recipients: CommentAuthor[];
  }) => Promise<void> | void;
  onCancel?: () => void;
  submitting?: boolean;
}) {
  const [text, setText] = useState(initialText);
  const [attachments, setAttachments] = useState<CommentAttachment[]>(initialAttachments);
  const [recipients, setRecipients] = useState<CommentAuthor[]>(initialRecipients);
  const [uploading, setUploading] = useState(false);
  const [attachmentToRemove, setAttachmentToRemove] = useState<CommentAttachment | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || !onUploadAttachment) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const att = await onUploadAttachment(file);
        setAttachments((prev) => [...prev, att]);
      }
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const confirmRemoveAttachment = async () => {
    if (!attachmentToRemove) return;
    const att = attachmentToRemove;
    setAttachmentToRemove(null);
    if (onDeleteAttachment) {
      try {
        await onDeleteAttachment(att);
      } catch {
        /* ignore — backend may already be in sync */
      }
    }
    setAttachments((prev) => prev.filter((a) => a.id !== att.id));
  };

  const handleSubmit = async () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    await onSubmit({ text: trimmed, attachments, recipients });
    if (mode !== "edit") {
      setText("");
      setAttachments([]);
      setRecipients([]);
    }
  };

  return (
    <div
      className={cn(css.form, {
        [css.form_root]: mode === "root",
        [css.form_inline]: mode !== "root",
      })}
    >
      <textarea
        className={css.textarea}
        placeholder={placeholder ?? "Напишите комментарий..."}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {recipients.length > 0 && (
        <div className={css.recipientsChips}>
          {recipients.map((r) => (
            <span key={r.id} className={css.chip}>
              {r.name}
              <button
                type="button"
                aria-label="Удалить получателя"
                onClick={() => setRecipients((prev) => prev.filter((p) => p.id !== r.id))}
              >
                <CrossIcon />
              </button>
            </span>
          ))}
        </div>
      )}

      {attachments.length > 0 && (
        <div className={css.attachments}>
          {attachments.map((att) => (
            <span key={att.id} className={css.attachment}>
              <span className={css.attachmentName}>{att.name}</span>
              <span className={css.attachmentSize}>{formatBytes(att.size)}</span>
              <button
                type="button"
                className={css.attachmentRemove}
                aria-label="Удалить вложение"
                onClick={() => setAttachmentToRemove(att)}
              >
                <CrossIcon />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className={css.formRow}>
        <div className={css.formTools}>
          {onUploadAttachment && (
            <>
              <button
                type="button"
                className={css.toolBtn}
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
              >
                <DownloadIcon style={{ transform: "rotate(180deg)" }} />
                {uploading ? "Загрузка..." : "Прикрепить файл"}
              </button>
              <input
                ref={fileRef}
                type="file"
                multiple
                className={css.hiddenInput}
                onChange={(e) => handleFiles(e.target.files)}
              />
            </>
          )}

          {recipientsSource && (
            <DialogSelect<CommentAuthor, string>
              value={null}
              placeholder=""
              title="Добавить ознакомителя"
              searchPlaceholder="Поиск сотрудника"
              loadOptions={recipientsSource}
              onChange={(opt) => {
                const meta = opt.meta;
                const author: CommentAuthor = meta
                  ? meta
                  : { id: String(opt.value), name: String(opt.label) };
                setRecipients((prev) =>
                  prev.some((p) => p.id === author.id) ? prev : [...prev, author],
                );
              }}
              selectedOptionRender={() => (
                <span className={css.toolBtn}>
                  <EnvelopIcon /> Ознакомители
                </span>
              )}
              className={css.recipientsPickerWrap}
            />
          )}
        </div>

        <div className={css.formActions}>
          {onCancel && (
            <Button variant="secondary" size="small" onClick={onCancel}>
              Отмена
            </Button>
          )}
          <Button
            variant="primary"
            size="small"
            onClick={handleSubmit}
            loading={submitting}
            disabled={!text.trim() || submitting}
          >
            {submitLabel ?? (mode === "edit" ? "Сохранить" : "Отправить")}
          </Button>
        </div>
      </div>

      <ConfirmDialog
        open={!!attachmentToRemove}
        title="Удалить вложение?"
        message={`«${attachmentToRemove?.name ?? ""}» будет удалено без возможности восстановления.`}
        onConfirm={confirmRemoveAttachment}
        onClose={() => setAttachmentToRemove(null)}
      />
    </div>
  );
}

/* ============================================================
 * Comment item (recursive)
 * ============================================================ */

type ItemContext = {
  currentUser: CommentAuthor;
  permissions: { canCreate?: boolean; canReply?: boolean };
  editWindowMs: number;
  recipientsSource?: CommentFeedProps["recipientsSource"];
  onUploadAttachment?: CommentFeedProps["onUploadAttachment"];
  onDeleteAttachment?: CommentFeedProps["onDeleteAttachment"];
  onDownloadAttachment?: CommentFeedProps["onDownloadAttachment"];
  branches: Record<string, BranchState>;
  loadInitial: (parentId: string | null) => Promise<void>;
  loadOlder: (parentId: string | null) => Promise<void>;
  createReply: (parentId: string | null, input: CommentMutationInput) => Promise<void>;
  editComment: (comment: Comment, input: CommentEditInput) => Promise<void>;
  deleteComment: (comment: Comment) => Promise<void>;
  // tick to re-render edit window expiry
  nowTick: number;
};

function CommentItem({ comment, ctx }: { comment: Comment; ctx: ItemContext }) {
  const [expanded, setExpanded] = useState(false);
  const [replyOpen, setReplyOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const childKey = keyOf(comment.id);
  const childBranch = ctx.branches[childKey];

  const isMine = comment.author.id === ctx.currentUser.id;
  const createdAtMs = new Date(comment.createdAt).getTime();
  const withinEditWindow = !Number.isNaN(createdAtMs)
    ? Date.now() - createdAtMs < ctx.editWindowMs
    : false;

  // referenced to subscribe to tick — keeps lint quiet without changing logic
  void ctx.nowTick;

  const canEdit =
    !comment.deleted &&
    (comment.permissions?.canEdit ?? (isMine && withinEditWindow));
  const canDelete =
    !comment.deleted && (comment.permissions?.canDelete ?? isMine);
  const canReply =
    !comment.deleted && (comment.permissions?.canReply ?? ctx.permissions.canReply ?? true);

  const toggleExpand = async () => {
    const next = !expanded;
    setExpanded(next);
    if (next && !childBranch?.loaded) {
      await ctx.loadInitial(comment.id);
    }
  };

  const handleReply = async (input: {
    text: string;
    attachments: CommentAttachment[];
    recipients: CommentAuthor[];
  }) => {
    setSubmitting(true);
    try {
      // ensure replies branch exists so the new reply lands in it
      if (!childBranch?.loaded) {
        // open empty branch silently — appendLocal handles state
        // (no network needed — we just append + mark loaded)
      }
      await ctx.createReply(comment.id, {
        parentId: comment.id,
        text: input.text,
        attachments: input.attachments,
        recipients: input.recipients,
      });
      setExpanded(true);
      setReplyOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = async (input: {
    text: string;
    attachments: CommentAttachment[];
    recipients: CommentAuthor[];
  }) => {
    setSubmitting(true);
    try {
      await ctx.editComment(comment, {
        id: comment.id,
        text: input.text,
        attachments: input.attachments,
        recipients: input.recipients,
      });
      setEditOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={css.item}>
      <div className={css.avatar} aria-hidden>
        {comment.author.avatarUrl ? (
          <img
            src={comment.author.avatarUrl}
            alt=""
            style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }}
          />
        ) : (
          initials(comment.author.name)
        )}
      </div>

      <div className={css.body}>
        {editOpen ? (
          <CommentForm
            mode="edit"
            initialText={comment.text}
            initialAttachments={comment.attachments ?? []}
            initialRecipients={comment.recipients ?? []}
            recipientsSource={ctx.recipientsSource}
            onUploadAttachment={ctx.onUploadAttachment}
            onDeleteAttachment={ctx.onDeleteAttachment}
            onSubmit={handleEdit}
            onCancel={() => setEditOpen(false)}
            submitting={submitting}
          />
        ) : (
          <div className={cn(css.bubble, { [css.bubble_deleted]: comment.deleted })}>
            <div className={css.meta}>
              <span className={css.author}>{comment.author.name}</span>
              <span className={css.date}>{formatDate(comment.createdAt)}</span>
              {comment.editedAt && !comment.deleted && (
                <span className={css.editedTag}>(изм. {formatDate(comment.editedAt)})</span>
              )}
            </div>

            <div className={css.text}>
              {comment.deleted ? "Комментарий удалён" : comment.text}
            </div>

            {!comment.deleted && comment.attachments && comment.attachments.length > 0 && (
              <div className={css.attachments}>
                {comment.attachments.map((att) => (
                  <span key={att.id} className={css.attachment}>
                    <span
                      className={css.attachmentName}
                      onClick={() => ctx.onDownloadAttachment?.(att)}
                      title={att.name}
                    >
                      {att.name}
                    </span>
                    <span className={css.attachmentSize}>{formatBytes(att.size)}</span>
                  </span>
                ))}
              </div>
            )}

            {!comment.deleted && comment.recipients && comment.recipients.length > 0 && (
              <div className={css.recipients} title={comment.recipients.map((r) => r.name).join(", ")}>
                <EnvelopIcon />
                Уведомлены: {comment.recipients.map((r) => r.name).join(", ")}
              </div>
            )}

            {!comment.deleted && (
              <div className={css.actions}>
                {canReply && (
                  <button
                    type="button"
                    className={css.iconButton}
                    onClick={() => setReplyOpen((v) => !v)}
                    title="Ответить"
                    aria-label="Ответить"
                  >
                    <ChatIcon />
                  </button>
                )}
                {canEdit && (
                  <button
                    type="button"
                    className={css.iconButton}
                    onClick={() => setEditOpen(true)}
                    title="Редактировать"
                    aria-label="Редактировать"
                  >
                    <EditIcon />
                  </button>
                )}
                {canDelete && (
                  <button
                    type="button"
                    className={cn(css.iconButton, css.iconButton_danger)}
                    onClick={() => setConfirmDelete(true)}
                    title="Удалить"
                    aria-label="Удалить"
                  >
                    <CancelIcon />
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Toggle replies */}
        {comment.repliesCount > 0 && (
          <button type="button" className={css.expandBtn} onClick={toggleExpand}>
            <ArrowDownIcon
              style={{
                width: 12,
                height: 12,
                transform: expanded ? "rotate(180deg)" : "rotate(0)",
                transition: "transform 0.15s ease",
              }}
            />
            {expanded ? "Скрыть ответы" : `Показать ответы (${comment.repliesCount})`}
            {childBranch?.loading && (
              <span className={css.branchSpinner}>
                <Spinner size="extraSmall" />
              </span>
            )}
          </button>
        )}

        {replyOpen && (
          <CommentForm
            mode="reply"
            placeholder={`Ответить ${comment.author.name}…`}
            recipientsSource={ctx.recipientsSource}
            onUploadAttachment={ctx.onUploadAttachment}
            onDeleteAttachment={ctx.onDeleteAttachment}
            onSubmit={handleReply}
            onCancel={() => setReplyOpen(false)}
            submitting={submitting}
          />
        )}

        {expanded && childBranch && (
          <div className={css.children}>
            {childBranch.loadedFrom > 0 && (
              <button
                type="button"
                className={css.loadOlderBtn}
                onClick={() => ctx.loadOlder(comment.id)}
                disabled={childBranch.loading}
              >
                {childBranch.loading ? (
                  <Spinner size="extraSmall" />
                ) : (
                  <ArrowDownIcon style={{ transform: "rotate(180deg)", width: 12, height: 12 }} />
                )}
                Показать предыдущие ({childBranch.loadedFrom})
              </button>
            )}
            {childBranch.items.map((child) => (
              <CommentItem key={child.id} comment={child} ctx={ctx} />
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        open={confirmDelete}
        title="Удалить комментарий?"
        message="Это действие нельзя отменить."
        onConfirm={async () => {
          setConfirmDelete(false);
          await ctx.deleteComment(comment);
        }}
        onClose={() => setConfirmDelete(false)}
      />
    </div>
  );
}

/* ============================================================
 * Root CommentFeed
 * ============================================================ */

export const CommentFeed = forwardRef<CommentFeedHandle, CommentFeedProps>(function CommentFeed(
  {
    loadComments,
    currentUser,
    recipientsSource,
    onCreate,
    onEdit,
    onDelete,
    onUploadAttachment,
    onDownloadAttachment,
    onDeleteAttachment,
    permissions = { canCreate: true, canReply: true },
    editWindowMs = DEFAULT_EDIT_WINDOW_MS,
    pageSize = DEFAULT_PAGE_SIZE,
    title = "Комментарии",
    eyebrow = "Discussion",
    className,
  },
  ref,
) {
  const {
    branches,
    loadInitial,
    loadOlder,
    appendLocal,
    replaceLocal,
    removeLocal,
    resetBranch,
    resetAll,
  } = useBranches(pageSize, loadComments);

  const [rootSubmitting, setRootSubmitting] = useState(false);
  const [nowTick, setNowTick] = useState(0);

  // re-render every 30s so the edit window button hides when it expires
  useEffect(() => {
    const id = window.setInterval(() => setNowTick((n) => n + 1), 30_000);
    return () => window.clearInterval(id);
  }, []);

  // initial root load
  useEffect(() => {
    if (!branches[ROOT_KEY]) {
      void loadInitial(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      refresh: (parentId) => {
        if (parentId === undefined) {
          resetAll();
          void loadInitial(null);
        } else {
          resetBranch(parentId);
          void loadInitial(parentId);
        }
      },
    }),
    [loadInitial, resetAll, resetBranch],
  );

  const createReply = useCallback(
    async (parentId: string | null, input: CommentMutationInput) => {
      if (!onCreate) return;
      const created = await onCreate(input);
      appendLocal(parentId, created);
      if (parentId !== null) {
        // bump repliesCount on parent comment (find parent's branch)
        // we don't know parent's parent, so scan all branches
        for (const key of Object.keys(branches)) {
          const b = branches[key];
          if (b.items.some((c) => c.id === parentId)) {
            replaceLocal(key === ROOT_KEY ? null : key, parentId, (c) => ({
              ...c,
              repliesCount: c.repliesCount + 1,
            }));
            break;
          }
        }
      }
    },
    [appendLocal, branches, onCreate, replaceLocal],
  );

  const editComment = useCallback(
    async (comment: Comment, input: CommentEditInput) => {
      if (!onEdit) return;
      const updated = await onEdit(input);
      replaceLocal(comment.parentId, comment.id, () => updated);
    },
    [onEdit, replaceLocal],
  );

  const deleteComment = useCallback(
    async (comment: Comment) => {
      if (!onDelete) return;
      await onDelete(comment.id);
      if (comment.repliesCount > 0) {
        // preserve thread structure
        replaceLocal(comment.parentId, comment.id, (c) => ({
          ...c,
          deleted: true,
          text: "",
          attachments: [],
          recipients: [],
        }));
      } else {
        removeLocal(comment.parentId, comment.id);
        if (comment.parentId !== null) {
          for (const key of Object.keys(branches)) {
            const b = branches[key];
            if (b.items.some((c) => c.id === comment.parentId)) {
              replaceLocal(key === ROOT_KEY ? null : key, comment.parentId, (c) => ({
                ...c,
                repliesCount: Math.max(0, c.repliesCount - 1),
              }));
              break;
            }
          }
        }
      }
    },
    [branches, onDelete, removeLocal, replaceLocal],
  );

  const root = branches[ROOT_KEY];

  const ctx = useMemo<ItemContext>(
    () => ({
      currentUser,
      permissions,
      editWindowMs,
      recipientsSource,
      onUploadAttachment,
      onDeleteAttachment,
      onDownloadAttachment,
      branches,
      loadInitial,
      loadOlder,
      createReply,
      editComment,
      deleteComment,
      nowTick,
    }),
    [
      branches,
      createReply,
      currentUser,
      deleteComment,
      editComment,
      editWindowMs,
      loadInitial,
      loadOlder,
      nowTick,
      onDeleteAttachment,
      onDownloadAttachment,
      onUploadAttachment,
      permissions,
      recipientsSource,
    ],
  );

  const handleRootSubmit = async (input: {
    text: string;
    attachments: CommentAttachment[];
    recipients: CommentAuthor[];
  }) => {
    setRootSubmitting(true);
    try {
      await createReply(null, {
        parentId: null,
        text: input.text,
        attachments: input.attachments,
        recipients: input.recipients,
      });
    } finally {
      setRootSubmitting(false);
    }
  };

  const canCreate = permissions.canCreate ?? true;

  return (
    <div className={cn(css.root, className)}>
      <div className={css.header}>
        <div className={css.headerText}>
          <span className={css.eyebrow}>{eyebrow}</span>
          <span className={css.title}>{title}</span>
        </div>
        {root && <span className={css.counter}>{root.total}</span>}
      </div>

      {canCreate && onCreate && (
        <CommentForm
          mode="root"
          placeholder="Поделитесь мнением или задайте вопрос..."
          submitLabel="Опубликовать"
          recipientsSource={recipientsSource}
          onUploadAttachment={onUploadAttachment}
          onDeleteAttachment={onDeleteAttachment}
          onSubmit={handleRootSubmit}
          submitting={rootSubmitting}
        />
      )}

      {!root && (
        <div className={css.skeleton}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div className={css.skeletonLine} style={{ width: "30%" }} />
              <div className={css.skeletonLine} style={{ width: "85%" }} />
              <div className={css.skeletonLine} style={{ width: "60%" }} />
            </div>
          ))}
        </div>
      )}

      {root && root.loadedFrom > 0 && (
        <button
          type="button"
          className={css.loadOlderBtn}
          onClick={() => loadOlder(null)}
          disabled={root.loading}
        >
          {root.loading ? (
            <Spinner size="extraSmall" />
          ) : (
            <ArrowDownIcon style={{ transform: "rotate(180deg)", width: 12, height: 12 }} />
          )}
          Показать предыдущие ({root.loadedFrom})
        </button>
      )}

      {root && root.items.length === 0 && !root.loading && (
        <div className={css.empty}>
          <EmptyComponent title="Пока нет комментариев" subtitle="Будьте первым, кто напишет." />
        </div>
      )}

      {root && root.items.length > 0 && (
        <div className={css.list}>
          {root.items.map((c) => (
            <CommentItem key={c.id} comment={c} ctx={ctx} />
          ))}
        </div>
      )}
    </div>
  );
});

export default CommentFeed;