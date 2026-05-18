# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # dev server — starts on :3000 (or :3001 if in use)
npm run build        # production build
npm run type-check   # tsc --noEmit — run before considering any change done
npm run lint         # ESLint on .ts/.tsx
npm run lint:fix     # ESLint with auto-fix
npm run format       # Prettier write
```

No tests exist yet (`jest` is wired in `package.json` but no test files are present).

## Architecture

**Stack:** Next.js 15 App Router · TypeScript · Tailwind CSS 3.4 · `@mdx-js/mdx` · React 19

**Path alias:** `@/` → `src/` (configured in `tsconfig.json`). All source imports use this alias.

### Layout model

The root `app/layout.tsx` is a minimal HTML shell — no sidebar, no wrapper. Each route section owns its full-screen layout:

- `/` — `app/page.tsx` is a `'use client'` component that renders `<Sidebar>` + `<Topbar>` + centered prompt area
- `/auth/login` — `app/auth/layout.tsx` + `app/auth/login/page.tsx`, fullscreen split (form left / CSS gradient animation right), no sidebar
- `/docs/[...slug]` — `app/docs/layout.tsx` wraps all docs pages with `<Sidebar>` + `<Topbar>` + scrollable content area

### MDX content pipeline

Content lives in `content/docs/` at the **project root** (not inside `src/`), in four sections:

```
content/docs/
  index.mdx
  estrategia/   # files 01–08
  marca/        # files 09–13
  comunicacao/  # files 14–17
  identidade/   # files 18–20
```

Required frontmatter for every file: `title`, `description`, `section`, `order`.

**Rendering flow** (`src/lib/mdx.ts` → `app/docs/[[...slug]]/page.tsx`):

1. `getMDXBySlug(slug)` reads the file with `gray-matter` → `{ metadata, source, slug }`
2. `compileMDX(source)` calls `compile()` from `@mdx-js/mdx` with `outputFormat: 'function-body'`
3. `run(compiled, runtime)` executes the result server-side and returns a React component
4. `getAdjacentDocs(slug)` returns prev/next sorted by `order` for bottom navigation

`generateStaticParams` in the docs page scans all `.mdx` files at build time via `getAllDocSlugs()`. **Adding a page only requires a new `.mdx` file + a nav entry** — no other code changes.

### Navigation

`src/config/navigation.config.ts` exports `navigationConfig: NavigationItem[]`. Items without `href` (only `children`) render as section labels; items with `href` render as links. Active state is derived from `usePathname()` inside `Sidebar.tsx` (`'use client'`).

### Scrollbar policy

No visible scrollbars anywhere. Every scrollable container needs:

```tsx
style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
// plus an inline <style> tag: "container::-webkit-scrollbar { display: none; }"
```

Or via Tailwind: `[&::-webkit-scrollbar]:hidden`.

### Design tokens

- Primary color: `#0066FF` — used as literal hex or `blue-600`/`blue-700` (no custom Tailwind token)
- Font: Inter, loaded from Google Fonts in `app/layout.tsx`
- `@tailwindcss/typography` plugin is active; MDX content areas use `prose prose-gray` with explicit overrides
- Gradient animation on the login page is defined via an inline `<style>` tag with `@keyframes gradientLoop`

### Key files

| File | Purpose |
|---|---|
| `src/lib/mdx.ts` | All content I/O: read, parse, compile, adjacent-doc lookup |
| `src/config/navigation.config.ts` | Sidebar structure — update when adding pages |
| `src/types/content.ts` | Shared interfaces: `NavigationItem`, `MDXDocument`, `ContentMetadata` |
| `src/components/layout/Sidebar.tsx` | Logo + nav tree + profile footer |
| `src/components/layout/Topbar.tsx` | 48px bar with Apps button (SVG 3×3 dot grid) |
| `src/app/globals.css` | CSS variables, scroll removal, `gradientLoop` keyframe |

### Pre-existing type errors (do not fix unless explicitly tasked)

`src/components/common/SearchBox.tsx`, `src/config/site.config.ts`, and `src/lib/search.ts` have unused-variable and type errors that predate the current scaffold. They don't affect runtime.

### Planning documents

`docs/` contains the full project planning:
- `briefing.md` — goals, scope, roadmap
- `prd.md` — features with user stories and acceptance criteria
- `spec.md` — technical decisions and implementation sequence
- `ui-plan.md` — color tokens, typography scale, component specs, CSS for gradient and scroll

`Imagens/` contains the three wireframes (`pag login.png`, `pag inicial.png`, `pag diretrizes.png`).

### Phase 2 (not yet implemented)

Supabase (auth + storage) and Vercel deployment. A `middleware.ts` stub is described in `docs/spec.md`.
