# Pixel Garden — Approved Design Brief

**Version:** 1.0  
**Date:** 2026-11-11  
**Decision status:** The **high-level visual direction is approved by the project owner**. Small design details are **delegated to the implementation agent**.  
**Related:** [Implementation Plan](./IMPLEMENTATION_PLAN.md) · [Project Rules](./PROJECT_RULES.md)

> This brief is a **design contract** for a practical GitHub Pages MVP, not a pixel-perfect promise to reproduce an AI-generated illustration.

## 1. Product promise

A visitor opens one page and immediately sees a **beautiful, near-full-viewport cartoon garden** created from sample GitHub projects. The garden is the experience, not a decorative background around an analytics dashboard. A compact **Try Your Own** control lets anyone replace the sample with a garden generated from their own public GitHub repositories.

The garden remains cohesive and attractive whether there are one, ten, or fifty public repositories. **One repository is one plant** within the MVP's first-100-repositories API limit.

## 2. Owner-approved design decisions (do not reinterpret)

1. **View angle:** friendly **side-view / slightly layered 2D** cartoon garden; not a top-down map and not a real 3D/isometric game engine. Simple foreground/background layers are fine.
2. **Art direction:** **cozy, cute, pixel-inspired cartoon** with simplified silhouettes, pleasantly crisp details, and original reusable SVG/CSS artwork. No photographic or realistic imagery.
3. **Setting:** **generic, fictional fantasy garden with no Iranian elements, no recognizable country-specific cultural motifs, and no heritage architecture**. Avoid architecture and props that imply an identifiable region. Include one small fantasy cottage, a cat, and two birds as scenery in the first section.
4. **Color:** **bright, soft, cheerful palette** — friendly greens, sky blues, warm path/soil colors, and restrained colorful flower accents. No cyberpunk neon, aggressively dark palette, or hyperrealistic rendering.
5. **Page structure:** **one main page**, **tiny/slim header**, and a **large garden occupying most of the viewport**. A large headline/hero panel must not compete with the garden.
6. **Primary action:** a small **Try Your Own** header button opens an accessible **modal/dialog** for a GitHub username or profile URL. No permanently expanded input panel.
7. **Initial view:** a **visibly labeled sample/default garden** of up to ten locally defined example repositories, usable without calling the GitHub API.
8. **Repository capacity:** **1–10 repositories use the default garden footprint**. Starting at **11 repositories**, add seamlessly connected garden terrain **horizontally** in groups of up to ten plants; do **not** shrink all plants to force them onto one screen.
9. **Movement:** extremely simple **native horizontal scrolling** on expanded gardens, with touch and keyboard support. Optionally a small drag-to-pan enhancement if it remains reliable. **No zoom, minimap, camera/game engine, or multiple pages.**
10. **Repository identity:** the **plant is the primary visual**; don't show a permanent label above each plant. Show repo name, language, stars, last update/push, and a safe GitHub link in a small popover/panel on click/tap/focus.
11. **Variety:** **Five bounded star tiers** progress from sprouts to bushes, flowering bushes, large trees, and rare flowering trees. Languages influence the foliage and flower palette. Subtle recency decoration may be included.
12. **Motion:** **very restrained** plant sway or gentle environmental motion, using light CSS/SVG animation and respecting prefers-reduced-motion. No physics or complex gameplay.

## 3. Layout blueprint

### Desktop (~1280px wide)

- Slim, unobtrusive header (approximately 48–64 CSS px, adaptable for accessibility) with small Pixel Garden branding and one **Try Your Own** action; at most one minimal secondary link.
- Main stage occupies **the remaining viewport height**, where the garden scenery is the dominant content.
- A shallow visual cue only when more garden exists offscreen (e.g., a subtle right-side continuation and optional small 'Scroll to explore' hint).
- A compact selected-plant information panel that does not obscure the whole garden.
- **Avoid:** full-height sidebars, large content cards, a giant signup form, permanent metric widgets, or a row of 50 readable labels.

### Mobile

- Same one-page concept: slim header, full available garden stage.
- Plants have touch-friendly interaction targets; the stage scrolls horizontally naturally when expanded.
- Details can appear in a small sheet or popover that remains dismissible and accessible.
- No fake desktop canvas squeezed so small that plants become untappable.

### Dialog

- Title such as **Grow your garden**.
- Single field for GitHub username or `github.com/<username>` profile URL.
- One primary action to generate/load; clear validation, loading and error states; close/Escape support and focus management.
- Do not require authentication, tokens, an email address, or any additional form fields.

## 4. Garden growth rules

- **0 repos:** cozy empty patch of soil and a friendly message; no artificial plant claimed to represent a real repo.
- **1–10 repos:** use the same base stage footprint; fill only the needed slots. Decorative terrain can occupy empty areas.
- **11 repos:** a second, visually connected horizontal section begins; first section remains unchanged.
- **50 repos:** five contiguous ten-slot sections, all plants reachable through the same simple scrollable landscape; no mini-map or separate pagination.
- **Up to 100 repos:** the same pattern; the implementation only promises the **first page** of 100 public repo records. Inform users when additional repositories might exist.
- Stable plant layout: use deterministic slot placement with bounded sizes and avoid overlap/collision.
- Scroll using a single accessible horizontal overflow container; no costly per-frame camera loop.

## 5. Rendering and feasibility contract

Prefer:
- **React + TypeScript + Vite**;
- CSS (plus Tailwind if useful), reusable **inline SVG** or small local original sprites/illustrations;
- native scrolling; lightweight CSS animations;
- direct GitHub public REST API requests from the browser;
- static deployment to GitHub Pages at `/pixel-garden/`.

**Do not pretend the original AI-generated mockup can be recreated exactly**. Make a clean, visually cohesive and feasible 2D implementation using a modest set of reusable plants and background pieces. Do not add Three.js, PixiJS, a physics engine, heavy video backgrounds, or image-generation services for the MVP.

## 6. Visual design freedom delegated to the agent

**No additional approval needed** for small decisions **inside this brief**, including:
- exact shapes of leaves, petals, and clouds;
- selecting up to six plant families;
- spacing, small stones, bushes, natural paths, and simple decorative props;
- exact harmonious colors within the approved palette;
- modest detail-panel styling, small icons, typography, and responsive spacing;
- restrained micro-animations;
- technical asset composition and SVG implementation details.

Use these freedoms to ship a coherent design rather than interrupting the owner for each icon or flower.

### Approval is still required for material deviations

Ask the owner **before** changing any of these:
- side-view into top-down, fully isometric, or 3D;
- cozy cartoon into realistic, dark/neon, or culturally localized;
- one page into multiple pages or a giant dashboard layout;
- ten-slot base rule, horizontal extension, or simple navigation;
- changing the source/meaning of repository data;
- introducing auth, paid tools, a server, a database, commercial APIs, or significant asset-license obligations;
- adding major features outside the MVP.

If an artistic choice is technically impossible, explain a realistic substitute rather than silently rewriting the direction.

## 7. MVP acceptance checklist

- [ ] Immediate sample garden is visible and labeled as an example; no API required to see it.
- [ ] Garden visually dominates the page; header and input interaction are minimal.
- [ ] General impression is side-view, cozy, cute, cartoon and pixel-inspired; **no Iranian or other identifiable cultural motifs**.
- [ ] First ten repositories fit the default landscape.
- [ ] 11 repositories extend the world; 50 repositories remain discoverable via uncomplicated horizontal scrolling.
- [ ] No plant overlaps essential controls, no endless empty scenery, no permanent 50-label clutter.
- [ ] Plant info is accessible on mouse, touch and keyboard.
- [ ] Loading, zero repos, missing GitHub user, rate-limit and network error states look intentional.
- [ ] Reduced motion works; mobile remains usable.
- [ ] Assets are locally bundled or permissively licensed; no secret tokens.
- [ ] Static Vite build works on GitHub Pages at `/pixel-garden/`.

**Post-MVP backlog:** full-world PNG export, seasons, more species, custom themes, zoom, minimap, search, accounts, and multiplayer.

### Approved interactive magic update

- Add a compact day/night toggle and a themed palette across the continuous garden. Keep the warm cottage, small moon, stars, and fireflies part of the same pixel-art scene.
- Add brief, decorative watering and legendary tree reactions in the existing plant slots.
- Make the first section's cat, birds, and cottage door tappable and keyboard-accessible. The cottage can guide the visitor to a loaded repository through the existing horizontal scroll.
- Keep all reactions optional and provide static feedback with reduced motion. Preserve the five star thresholds, existing repository data source, and one-page layout.

## 8. Delivery and review protocol for Work

1. Read this brief, the project rules, and implementation plan before editing code.
2. Treat the **macro visual direction as already approved**. Do **not** demand further approval for small artistic or UI choices listed in §6.
3. Implement with reviewable commits/PRs, run tests/build, and capture actual browser screenshots rather than relying on mockups alone.
4. Owner review is for **material deviations and pre-release acceptance**, not every decorative choice.
5. Do not mark tasks complete without working proof. Do not claim a deployed site is live until checked.
6. No automatic merge or production publish without the owner's explicit approval.

---

*The look is approved at a directional level; visual details are intentionally entrusted to the agent within these constraints.*
