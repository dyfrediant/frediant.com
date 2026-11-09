---
name: Frediant Portfolio
description: Editorial minimalism for a fullstack developer and CRO specialist portfolio.
colors:
  paper: "#f7f7f4"
  paper-raised: "#fbfbf8"
  ink: "#20231f"
  secondary-surface: "#eceee9"
  muted-surface: "#eeefeb"
  muted-ink: "#656b64"
  forest: "#42654c"
  hairline: "#dedfda"
  dark-paper: "#141714"
  dark-raised: "#191d19"
  dark-ink: "#eff1ec"
  dark-muted-ink: "#a2aa9f"
  dark-forest: "#a4c3a5"
  dark-hairline: "#303730"
typography:
  display:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(3rem, 6.2vw, 5.5rem)"
    fontWeight: 400
    lineHeight: 0.99
    letterSpacing: "-0.045em"
  heading:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(2.25rem, 4.6vw, 4rem)"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(1.9rem, 3.4vw, 3rem)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Instrument Sans, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.625rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.12em"
rounded:
  sm: "0.3rem"
  md: "0.5rem"
spacing:
  shell-gutter: "clamp(1.25rem, 4vw, 2.75rem)"
  section-mobile: "5rem"
  section-desktop: "7rem"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
    height: "2.25rem"
    padding: "0 0.875rem"
  button-outline:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    height: "2.5rem"
    padding: "0 1rem"
  project-card:
    backgroundColor: "{colors.muted-surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
---

# Design System: Frediant Portfolio

## Overview

**Creative North Star: "The Quiet Portfolio"**

This portfolio uses an editorial frame that lets project work provide the visual interest. Warm, near-neutral surfaces, thin dividers, and a restrained forest accent keep the interface composed while serif headlines add a human voice. The public site has matching light and dark palettes; its tokens are scoped to `.site-theme` so the separate admin interface can keep its own system.

The layout gives the introduction, selected work, profile, and contact room to breathe. Navigation and contact remain easy to find, while restrained motion supports links and optional imagery without turning the page into a sequence of effects. Imported projects are text-led because the source thumbnails redirect to the new domain; project images can be added in the admin studio.

**Key Characteristics:**
- Editorial serif display paired with a practical sans body face.
- Warm-neutral surfaces and a single muted green accent.
- Hairline borders and generous section spacing instead of ornament.
- Public-site color tokens isolated from admin tokens.

## Colors

The light palette pairs soft neutral paper and charcoal ink with muted forest; dark mode reverses the surfaces and lifts the accent for contrast.

### Primary
- **Muted Forest** (#42654c): Public-site links and emphasis in light mode.
- **Pale Forest** (#a4c3a5): Equivalent public-site accent in dark mode.

### Neutral
- **Paper** (#f7f7f4): Light public-site background.
- **Raised Paper** (#fbfbf8): Cards and popovers.
- **Ink** (#20231f): Primary text and controls.
- **Secondary Surface** (#eceee9): Secondary fills.
- **Muted Surface** (#eeefeb): Quiet surfaces and image placeholders.
- **Muted Ink** (#656b64): Supporting text.
- **Hairline** (#dedfda): Dividers and borders.
- **Dark Paper** (#141714): Dark public-site background.
- **Dark Raised** (#191d19): Dark cards and popovers.
- **Dark Ink** (#eff1ec): Dark-mode primary text.
- **Dark Muted Ink** (#a2aa9f): Dark-mode supporting text.
- **Dark Hairline** (#303730): Dark-mode dividers and borders.

**The Scoped Public Palette Rule.** Apply portfolio palette tokens inside `.site-theme`; admin colors are a separate concern.

## Typography

**Display Font:** Instrument Serif (Georgia, serif)  
**Body Font:** Instrument Sans (Arial, sans-serif)  
**Label/Mono Font:** JetBrains Mono (ui-monospace, monospace)

**Character:** The serif brings an editorial cadence to large headings, while the sans face keeps paragraphs and navigation direct. Mono is reserved for compact metadata and uppercase labels.

### Hierarchy
- **Display** (400, clamp(3rem, 6.2vw, 5.5rem), 0.99): Main page headlines.
- **Heading** (400, clamp(2.25rem, 4.6vw, 4rem), 1.04): Major section headings.
- **Title** (400, clamp(1.9rem, 3.4vw, 3rem), 1.05): Article and project titles.
- **Body** (400, 1rem, 1.6): Reading and descriptive copy; narrower supporting copy uses max-width constraints.
- **Label** (400, 0.625rem, 0.12em, uppercase): Quiet metadata and compact navigation actions.

## Layout

The public site uses a centered 78rem maximum-width shell with horizontal gutters of `clamp(1.25rem, 4vw, 2.75rem)`. Reading pages use a narrower 46rem shell. Sections have generous vertical padding (5rem on small screens, 7rem at medium widths and up). Project cards shift from a single column to two columns at the medium breakpoint; the featured project spans the content width. Hero type scales with the viewport rather than relying on fixed desktop sizing.

## Elevation & Depth

Public surfaces are flat at rest. Depth comes from background tone changes, borders, and image composition; there is no public-site shadow vocabulary. The fixed header uses a translucent background and backdrop blur to remain legible over scrolling content.

## Shapes

Public controls and project imagery use small, restrained corners (`0.3rem`) with thin neutral borders. Full-width images establish the main visual blocks. Dividers are one-pixel hairlines; avoid pills and heavy outlined containers unless a functional control requires them.

## Components

### Buttons
- **Shape:** Small corner radius (0.3rem).
- **Primary:** Ink fill, paper text, compact 2.25rem header action; homepage actions are 2.5rem tall.
- **Secondary:** Transparent/paper fill with a hairline border; hover moves toward the muted surface.
- **Hover / Focus:** Subtle color change; keyboard focus uses a 2px accent outline with 3px offset.

### Cards / Containers
- **Corner Style:** 0.3rem for public project media.
- **Background:** Muted surface behind media, paper behind content.
- **Shadow Strategy:** Flat; borders and tonal surfaces define the edge.
- **Border:** One-pixel hairline around project imagery.
- **Behavior:** The whole project card links to its detail page. Uploaded images receive subtle zoom, and image-free listings use a simple top rule and text hierarchy. Reduced-motion preferences are respected.

### Navigation
The fixed header uses a solid, lightly translucent background with backdrop blur and a bottom divider. Desktop navigation is plain sans text with a fine underline on hover or active route. On small screens, it collapses to an accessible menu; the theme control and contact action stay available.

### Section Headings
Large serif titles sit below a hairline divider; a concise sans description aligns beside the title at wider widths. Archive actions sit at the right edge of the divider row.

## Do's and Don'ts

### Do:
- **Do** let verified project details carry visual emphasis; use imagery when it is available.
- **Do** add project case-study details only when they are supplied and verified.
- **Do** keep focus states visible and honor reduced-motion preferences.
- **Do** use the dark public palette as the tonal counterpart to the light palette.

### Don't:
- **Don't** add decorative section numbering or eyebrow kickers to public pages.
- **Don't** invent project years, outcomes, testimonials, or detailed case-study claims.
- **Don't** reintroduce the removed grid, grain, marquee, or reveal treatment to public pages.
