# Portfolio Minimal Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give the personal portfolio a restrained, professional visual hierarchy for prospective clients and hiring teams while keeping sample content visibly identified.

**Architecture:** Retain the current server-rendered pages, data access, routes, and components. Refine the public site's shared color/type/layout tokens and page compositions; add a compact global demo-content notice because the current seeded profile and work are placeholders.

**Tech Stack:** Next.js 16.4.5 App Router, React 19, Tailwind CSS 4, existing `lucide-react` and `motion` components.

**Spec:** `docs/superpowers/specs/2026-11-09-portfolio-redesign-design.md`

## Global Constraints

- Serve prospective clients and hiring teams equally.
- Do not present seeded claims as verified evidence or invent credentials, results, or endorsements.
- Keep project and writing content manageable through the existing admin workflow.
- Preserve responsive layout, accessibility, existing routes, theme switching, and reduced-motion support.
- Use the installed Next.js 16 documentation and project conventions.

## Review Focus

- At narrow widths, the hero and project grid must not overflow or hide contact/work links; inspect at 390px.
- With no projects or posts, existing empty states must retain clear spacing and hierarchy; preserve their current conditional rendering.
- With long profile headlines and project titles, headings must wrap without colliding with metadata; inspect representative long seeded text.
- With dark theme enabled, all updated surfaces, borders, and the demo notice must remain legible; inspect both themes.
- With reduced motion enabled, all page content must remain visible; keep motion optional and avoid adding entrance-only visibility.

---

### Task 1: Restyle the public portfolio and identify demo content

**Files:**
- Modify: `src/app/globals.css` — public design tokens, typography, surface treatments, motion and responsive rules; retain admin and article utilities.
- Modify: `src/app/(site)/page.tsx` — homepage hierarchy and section spacing.
- Modify: `src/app/(site)/projects/page.tsx` and `src/app/(site)/blog/page.tsx` — align archive pages to the homepage system.
- Modify: `src/app/(site)/projects/[slug]/page.tsx` and `src/app/(site)/blog/[slug]/page.tsx` — align detail page headers and media framing.
- Modify: `src/components/site-header.tsx`, `src/components/site-footer.tsx`, `src/components/project-card.tsx`, `src/components/post-row.tsx`, and `src/components/section-heading.tsx` — shared public UI.
- Modify: `src/components/page-header.tsx` — consistent archive page hierarchy.
- Create: `src/components/demo-content-notice.tsx` — a clear, compact note that the currently seeded profile and work are examples to replace before publication.
- Modify: `src/app/(site)/layout.tsx` — render the demo notice at the top of public pages.

**Interfaces:**
- Consumes existing `Profile`, `Project`, `Post`, query functions, and route structure unchanged.
- Produces a consistent public visual system and a reusable `DemoContentNotice` with no props.

- [ ] Refine warm-neutral light/dark tokens, hierarchy, spacing, and focus states in `src/app/globals.css`; remove unused public-only marquee/grid/grain styling without deleting admin/article styles.
- [ ] Simplify the home page so the headline and contact action lead, followed by selected work, writing, and about information; remove marquee and decorative grid from the composition.
- [ ] Update shared cards, rows, navigation, archive/detail headers, and footer to use quieter borders, simpler metadata, deliberate whitespace, and restrained accent use.
- [ ] Add a readable global sample-content notice, preserving the existing user content and admin-editing path.
- [ ] Inspect the running public site at desktop and 390px mobile widths in light and dark themes; check long titles, empty states, focus visibility, and reduced-motion behavior.
- [ ] Run the Impeccable detector once over the changed web UI targets and fix any mechanical findings.
- [ ] Run `npm run typecheck`; expected result is exit code 0.
