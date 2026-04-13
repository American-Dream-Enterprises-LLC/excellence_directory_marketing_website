# Excellence Directory Marketing Website

Frontend-only Next.js app intended for Vercel deployment.

## What this is

- A landing-page system for `Excellence Directory`
- Grounded in the current local source stack and structured around a canonical
  SEO-layer copy file:
  - `../copy.json`
  - `context/immutable/workspace/2026-03/2026-03-20_EXCELLENCE_LANDING_PAGES.md`
  - 2026-03-13 SEO answers
  - 2026-03-15 and 2026-03-17 branding docx revisions
  - 2026-03-18 and 2026-03-19 landing-page rollout emails
- Structured so future Codex sessions can add new audience pages by editing
  the canonical JSON copy source instead of cloning components

## Current source state

- The canonical landing-page copy file for this workspace is `../copy.json`.
- The canonical article-art manifest for this workspace is `../article_art.json`.
- Canonical slugs are now written as prospect-thought copy rather than short
  category labels. Older short slugs can stay as redirect aliases.
- Mermaid strategy diagrams for discovery and page-answer flow live in
  `../mermaid/`.
- Article-image prompts live in `../design/art/`, and generated PNGs are
  pulled into `public/article-art/` by `npm run sync-copy`.
- The landing-page Google Doc has now been exported locally as Markdown and
  archived under
  `context/immutable/workspace/2026-03/2026-03-20_EXCELLENCE_LANDING_PAGES.md`.
- The site now runs as a five-desk editorial system with 25 long-form article
  routes and machine-readable endpoints for AI and search tooling.

## Run locally

```bash
npm run sync-copy
npm install
npm run dev
```

## Build for Vercel

```bash
npm run sync-copy
npm run build
```

No backend is included. This app is static-content-first and Vercel-friendly by
default.

## How to add a new landing page variant

1. Edit the canonical copy file at `../copy.json`.
2. Add or revise a variant object there. Provide:
   - `slug`
   - `legacySlugs` when preserving older paths
   - `status`
   - `sourceHeading`
   - `statusNote`
   - `thoughtMatch`
   - SEO title/description
   - hero copy
   - proof points
   - value cards
   - fit signals
   - FAQs
   - closing lines
   - CTAs
3. Add or revise the article image entry in `../article_art.json`, then edit or
   add the matching prompt file in `../design/art/{slug}.md`.
4. Run:

```bash
npm run sync-copy
```

5. The route will automatically exist at `/{slug}` because `src/app/[slug]/page.tsx`
   statically generates all variants from that data file.
6. Generate artwork when needed:

```bash
../design/generate_article_art.sh --slug your-canonical-slug
npm run sync-copy
```

7. Keep raw source imports in `context/immutable/` and synthesize editorial
   conclusions in `context/mutable/`.

## Files future sessions will care about most

- `../copy.json`
  Canonical source of truth for landing-page copy, including slugs
- `../article_art.json`
  Canonical source of truth for article-image mapping and logo-derived palette notes
- `../design/art/*.md`
  Prompt files used to generate editorial PNG art per article slug
- `src/content/copy.generated.json`
  Synced copy artifact consumed by the standalone app repo
- `src/content/article-art.generated.json`
  Synced article-art manifest with local asset availability flags
- `src/content/article-art.ts`
  Typed adapter for article art lookups by canonical slug
- `src/content/landing-page-data.ts`
  Typed adapter that turns canonical JSON copy into app data
- `src/components/landing-page.tsx`
  Generic renderer used by every variant page
- `src/app/page.tsx`
  Variant index showing ready routes and draft stubs separately
- `src/app/globals.css`
  Shared visual language
