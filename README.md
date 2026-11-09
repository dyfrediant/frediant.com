# frediant

A quiet, editorial portfolio for Fred, a fullstack developer and CRO specialist based in Jakarta, with a project archive and a small admin studio.

Built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, **shadcn/ui**, **Motion**, and **SQLite + Drizzle ORM**. Articles are written in Markdown and highlighted with Shiki.

## What's inside

- **Homepage** — editorial hero, selected projects, about, and contact.
- **Projects** — an archive and full case-study pages with cover art, tech stack, and links.
- **Blog** — article pages are available when writing is added through the admin studio.
- **Admin studio** at `/admin` — create, edit, publish, and delete posts and projects; upload cover images; edit the site profile.
- **Details** — dark/light themes, grain texture, responsive layouts, reduced-motion support, sitemap, robots, and RSS.
- **Content** — stored in SQLite (`data/portfolio.db`); uploads go to `public/uploads`.

## Quick start

```bash
npm install
cp .env.example .env.local   # skip if you already have one
```

Set two values in `.env.local`:

```dotenv
ADMIN_PASSWORD=your-password
SESSION_SECRET=generate-with-openssl-rand-hex-32
```

Then:

```bash
npm run db:setup
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The admin studio lives at [http://localhost:3000/admin](http://localhost:3000/admin).

> This workspace already has a `.env.local` with the local password `frediant`. Change it before putting the site online.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build with Next.js Webpack bundling |
| `npm run start` | Serve the production build |
| `npm run typecheck` | TypeScript check |
| `npm run lint` | ESLint |
| `npm run db:push` | Create/update SQLite tables from the Drizzle schema |
| `npm run db:seed` | Reset content to the imported project listings and profile |
| `npm run db:setup` | `db:push` + `db:seed` |

`db:seed` **deletes and replaces** posts, projects, and the profile. Use it only to restore the imported starter content, not after adding production content in the admin studio.

## Content model

Three tables live in `src/lib/db/schema.ts`:

- `posts` — title, slug, excerpt, Markdown content, cover image, tags, published state, dates. The original portfolio has no articles, so this table starts empty.
- `projects` — title, slug, summary, Markdown case study, cover, tech stack, year, role, links, featured/published flags, sort order.
- `profile` — name, brand, role, headline, bio, location, email, socials, availability.

The project and profile seed data is in `scripts/seed.ts`. Imported listings start without artwork because the original thumbnail URLs redirect to the new domain; project images can be uploaded from the admin studio.

## Architecture

```
src/
  app/
    (site)/          public site: home, blog, projects, layout, transitions
    admin/           login, protected (panel) routes, server actions
    api/admin/       authenticated image upload endpoint
  components/
    admin/           studio shell, forms, editor, upload, dialogs
    motion/          hero + reveal wrappers
    ui/              shadcn/base-ui primitives
  lib/
    db/              Drizzle schema, client, queries
    auth.ts          session cookie helpers
    session.ts       HMAC token + password verification
    markdown.ts      async Markdown → highlighted HTML pipeline
    content.ts       slugs, dates, reading time, headings
  proxy.ts           route protection for /admin and /api/admin
```

Public pages are dynamic (`force-dynamic`) so admin changes appear immediately. `revalidatePath` is still called after mutations for any cached segments.

## Admin security

- Single password (`ADMIN_PASSWORD`), compared with a timing-safe hash.
- Signed, HTTP-only session cookie (7 days) using `SESSION_SECRET`.
- Login attempts are rate-limited in memory (6 attempts / 10 minutes).
- `/admin/*` and `/api/admin/*` are protected by `proxy.ts`; every server action also re-checks the session.
- Uploads are restricted to JPG, PNG, WebP, AVIF, and GIF up to 5MB.

Set a strong password and a random secret in production. If `ADMIN_PASSWORD` is missing, admin login is disabled (fail closed).

## Deployment notes

This project is designed for a **persistent Node host** (a VPS, Docker, or a platform with a volume). SQLite and local uploads need a filesystem that survives deploys.

- **Self-hosted / VPS / Docker:** run `npm run build && npm run start`, keep `data/` and `public/uploads/` on a persistent volume.
- **Vercel / serverless:** SQLite and local uploads will not persist. Swap the database for Turso, Neon, or Postgres (Drizzle supports all three) and uploads for S3, R2, or UploadThing before deploying.

Set `NEXT_PUBLIC_SITE_URL` to the public origin so metadata, the sitemap, and RSS use the right URLs.

## Design notes

- **Type:** Instrument Serif for display, Instrument Sans for body, JetBrains Mono for labels and metadata.
- **Palette:** warm paper and ink, with a single vermilion accent. Every token lives in `src/app/globals.css` and flips under `.dark`.
- **Motion:** CSS page/hero/scroll reveals, plus Motion for the mobile menu and reading progress. All non-essential motion is removed under `prefers-reduced-motion`.
- **Texture:** a fixed SVG grain overlay and a hairline grid in the hero keep the page from feeling flat.

Profile and project listings are migrated from the existing public portfolio. Add or update projects from `/admin/projects`; detailed case-study copy and project years can be filled in as available.
