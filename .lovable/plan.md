## Goal

Replace `src/assets/demo/card-cover.png` (797×272) with a premium image that fits the library's brand and reads well as a "Cover image" Card with white "Cover image" text overlaid.

## Brand context

- Primary blue palette: `#4573d9` (brand), `#001a3d` (deep navy), `#d3e8fa` (light blue), `#001a3d → #4573d9` gradient feel
- Style of the demo page: clean, premium, gradient hero, soft shadows, modern UI library showcase
- The image sits next to a solid `#4573d9` "Brand card" and a `#eef6ff` "Light surface" card — should harmonize, not clash
- White overlay text "Cover image" must remain readable → image needs darker / lower-contrast left side

## Approach

Generate a new image via Lovable AI Gateway (`google/gemini-3-pro-image-preview` for highest quality) and save it as `src/assets/demo/card-cover.png` with the same dimensions (797×272), overwriting the old one. No code changes needed — `index.tsx` already imports it.

### Image prompt direction

Premium abstract composition aligned with the brand:
- Deep navy → royal blue gradient background (`#001a3d` → `#4573d9`) with subtle light-blue (`#d3e8fa`) highlights
- Soft glassmorphism / aurora light streaks, faint geometric grid or flowing lines suggesting a design system
- Slight darker gradient on the left third so white "Cover image" text stays legible
- No text, no logos, no people — purely abstract premium tech aesthetic
- Cinematic, high-end SaaS landing-page feel; matches Apple/Linear/Vercel polish

### Steps

1. Run a short Node script that calls `https://ai.gateway.lovable.dev/v1/chat/completions` with `google/gemini-3-pro-image-preview`, `modalities: ["image","text"]`, and the prompt above
2. Decode the returned base64 PNG, resize/crop to exactly 797×272 with `sharp` is unavailable in worker but fine here (we run via `code--exec` with Python PIL which is preinstalled)
3. Write to `src/assets/demo/card-cover.png` (overwrite)
4. QA: open the saved image, verify dimensions and that the left side is dark enough for white text; if not, regenerate with adjusted prompt
5. Confirm `index.tsx` import still resolves (no edits needed)

### Technical notes

- Use `LOVABLE_API_KEY` from env (verify via `compgen -e` first)
- Save the base64 to a temp file, then PIL `Image.open(...).convert("RGB").resize((797,272), Image.LANCZOS)` and save as PNG
- If Gemini returns a non-matching aspect ratio, do a center-crop to 797×272 ratio (≈2.93:1) before resize
- Keep file under ~50KB if possible (current is 28KB) — PIL `optimize=True`