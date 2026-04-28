import "./styles.css";

export interface UiLibraryPlaceholderProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  className?: string;
}

export function UiLibraryPlaceholder({
  title = "UI Library Starter",
  description = "A minimal React component exported from an npm-ready UI component library.",
  actionLabel = "Ready for npm",
  className,
}: UiLibraryPlaceholderProps) {
  const rootClassName = ["ui-library-placeholder", className].filter(Boolean).join(" ");

  return (
    <section className={rootClassName} aria-label={title}>
      <span className="ui-library-placeholder__badge">React UI package</span>
      <h2 className="ui-library-placeholder__title">{title}</h2>
      <p className="ui-library-placeholder__description">{description}</p>
      <span className="ui-library-placeholder__action">{actionLabel}</span>
    </section>
  );
}
