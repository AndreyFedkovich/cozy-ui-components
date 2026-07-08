Translate all Russian user-facing strings on the demo page (`src/routes/index.tsx`) to English. Scope is limited to that single file — no component API, styles, or logic changes.

## What changes

- Section titles, descriptions, item labels, descriptions, hints, badges, button captions, tab labels, tooltip texts, placeholder strings, and any inline copy currently in Russian → natural English equivalents.
- Preserve tone (short, product-y), keep terminology consistent (e.g. "Settings", "General", "Preferences", "Layout", "Danger zone", "Delete account", "Editor Settings", "Keyboard Shortcuts", "Import Settings", "Window Layout", "Conversation Density", "Status Bar", "Auto-hide editor", "Detailed" / "Compact", "Agent" / "Editor", "Open").
- Toggle labels for the demo controls (variant classic/elevated, density comfortable/compact) → English.
- Any comments in the file that are user-visible strings get translated; pure code comments stay as-is.

## Out of scope

- No changes to `SettingsView`, `Switch`, `ImageSegmented`, `SideNav`, or any other component.
- No changes to `.lovable/plan.md`, `README.md`, or other docs.
- No changes to the `ValidationDemo` file unless it is rendered on `/` — if it is, its visible Russian strings get translated too; otherwise it is left untouched.

## Files

- `src/routes/index.tsx` — translate visible strings.
- (conditionally) `src/routes/-ValidationDemo.tsx` — only if imported by `index.tsx`.
