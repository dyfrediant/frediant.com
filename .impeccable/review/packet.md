# Review packet — portfolio redesign

## Request and confirmed answers

- Original request: audit the newly built portfolio page and redesign it with Impeccable to feel more minimalist and professional.
- Audience: prospective clients and hiring teams equally.
- Seeded profile details, project stories, and links: placeholders.
- Approved brief: retain the existing portfolio structure; use editorial minimalism; simplify the visual system; keep the portfolio work, writing, profile, contact, theme control, and admin workflow; identify seeded material as sample content.

## Direction contract

- First viewport: a readable, responsive profile headline and intro, with availability, location, email, and clear links to work and writing.
- Visitor path: selected projects first, then writing, profile context, and a direct contact close.
- Visual system: warm neutral light theme, deep ink text, restrained forest-green accent, dark counterpart, Instrument Serif display typography, sans-serif body text, smaller quiet labels, hairline dividers, and moderate whitespace.
- Reduce decorative motion and texture. No animated marquee, background grid, grain overlay, or per-section reveal effect on the public surface.
- Preserve responsive behavior, keyboard-visible focus, reduced-motion behavior, theme switching, and all existing routes.
- Do not present seeded claims as verified proof. Keep a clear portfolio-preview notice until placeholder content is replaced.

## Evidence

- Main screenshot pair: `desktop.png` and `mobile.png` (light theme; 1440px and 390px widths).
- Theme captures: `desktop-dark.png` and `mobile-dark.png`.
- Additional light captures: `desktop-light.png` and `mobile-light.png`.
- Desktop and mobile screenshots are full-page captures from the document top. Lazy project images were brought into view before the final mobile capture.
- Mobile navigation was opened and inspected at 390px. Project archive, writing archive, project detail, and article detail routes were visually inspected.
- Impeccable detector ran once on all changed public UI files and returned `[]`.
- `npm run typecheck` and `npm run lint` both exited successfully. Automated tests were not added or run under workspace instructions.

## Quality bar

- A first-time visitor can tell who the portfolio is for, understand what the work covers, and find a contact path within seconds.
- Typography, spacing, and imagery create hierarchy without decorative treatments competing with the work.
- Light and dark themes remain readable; at mobile widths, long profile headlines, cards, and routes do not overflow.
- Sample material is explicit, keyboard focus remains visible, and all meaningful content is visible without entrance animation.

## Build context

- Build path: code-led; no approved image comp exists for this redesign.
- The project began this task on `main` with the generated Next.js portfolio already uncommitted; review only the redesign listed in the approved plan, not the entire generated scaffold.
- A Next.js development indicator is visible in screenshots because captures came from the local development server; it is not part of the product UI.
