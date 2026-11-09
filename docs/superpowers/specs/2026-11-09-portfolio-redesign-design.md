# Portfolio redesign design

## Intent

Make the existing personal portfolio feel more minimalist and professional for prospective clients and hiring teams, while retaining the project, writing, profile, contact, and admin capabilities.

## Goals

- Give the headline, selected work, and contact path a clear hierarchy.
- Reduce decorative effects and repeated visual treatments.
- Keep the layout responsive, accessible, and compatible with the existing theme and content system.
- Make it clear that seeded projects and profile details are demo placeholders until replaced with verified information.

## Non-goals

- Replacing the existing portfolio with a résumé or removing writing and case studies.
- Inventing client names, outcomes, testimonials, or credentials.
- Changing database structure or admin workflows.

## Approaches

1. **Editorial minimalism (recommended; inferred from the request):** retain the existing content architecture, but simplify the palette, typography, spacing, section transitions, and motion so project work carries the page. Keep demo content visibly identified as sample material. This best fits the request while preserving the new site's useful structure.
2. **Light cleanup:** remove a few decorative details while keeping the current composition largely intact. Lower effort, but leaves much of the visual density the user asked to reduce.
3. **Résumé-first replacement:** make the homepage a compact experience-and-contact page. Clear and efficient for hiring, but gives less room to serve both audiences and diminishes the project and writing content already supported by the site.

## Direction

Proceed with editorial minimalism unless the user corrects this brief. Keep the warm neutral identity as a starting point, use restrained accent color, simplify type hierarchy, remove the animated marquee and ambient grid/grain decoration, and favor quiet rules and generous whitespace. Preserve functional navigation, theme switching, reduced-motion support, and existing routes. Treat the current look as an anti-reference where it conflicts with the minimalist direction.

## Constraints and open content decisions

- Next.js 16 conventions and existing server-rendered data access apply.
- At the time this brief was approved, seeded profile and project information had not been confirmed. The user later provided their real location, domain, and email and asked to migrate the published portfolio content.
- No verified case-study narratives, project years, profile image, or replacement project imagery are supplied by the source. Keep those fields empty until the user adds them.

## Follow-up content migration

On 2026-11-09 the user confirmed Jakarta, frediant.com, and hi@frediant.com, and asked to replicate dyfrediant.github.io and add projects. The implementation imports all 19 public project listings, their published scope/tool tags, public links, and source status notes; it removes the seeded sample essays and fake case studies. The portfolio has no writing links while no articles are published. New projects remain manageable in `/admin/projects`.

The source project thumbnails redirect to frediant.com, so the imported entries do not depend on those unresolved image URLs. Upload local project art through the admin studio when available. Do not invent detailed case studies, years, or outcomes.

## Approval gate

This is a proposed design. Do not modify the visual implementation until the user approves it or corrects the direction.
