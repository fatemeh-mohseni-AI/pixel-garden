# Pixel Garden — Implementation Plan

**Version:** 1.0  
**Last reviewed:** 2026-11-11  
**Status:** Planning only — implementation has not started  
**Repository:** https://github.com/fatemeh-mohseni-AI/pixel-garden  
**Companion document:** [PROJECT_RULES.md](./PROJECT_RULES.md)

> This is the execution checklist for the MVP. Checkboxes indicate completed work, not estimates or promises. Do not treat future phases as authorized implementation.

## 1. Target outcome

Deliver a polished, mobile-friendly pixel-art garden that turns a GitHub user's **public repositories** into up to **nine interactive plants**. The user can inspect each plant and export an image. The application must be deployable as static files to GitHub Pages, with no application server, credentials, or paid services.

**Initial hosting target (once enabled and deployed):** https://fatemeh-mohseni-AI.github.io/pixel-garden/

### MVP user journey

1. Open the site and see an inviting, accessible landing screen.
2. Enter a GitHub username and select **Grow my garden**.
3. The browser fetches the account's public repositories.
4. The app selects up to nine repositories using documented, repeatable rules.
5. Each repository appears as a plant in one cohesive, pixel-art garden.
6. Select a plant to view its name, primary language, star count, last push date, and GitHub link.
7. Save the visible garden as a PNG; optionally share a URL containing the username.

### MVP success criteria

- A working public GitHub username generates a consistent garden on desktop and mobile.
- A user with zero repositories sees a friendly empty-garden state.
- Missing users, network failure, and API rate limits show actionable messages rather than a blank screen.
- All plants are usable with keyboard, mouse, and touch.
- The garden image export works without embedding remote images that would taint a canvas.
- A production build loads correctly at the repository subpath **/pixel-garden/**.
- No server, database, login, private data, or client-side API secrets are required.

## 2. Assumptions and explicit decisions

- **Platform:** static React + TypeScript + Vite application, hosted on GitHub Pages.
- **Rendering:** lightweight SVG/CSS pixel-art components first; Canvas/PixiJS only if a measured need appears.
- **Data:** unauthenticated GitHub REST API, public repositories only.
- **Initial API shape:** GET https://api.github.com/users/{username}/repos?type=owner&sort=pushed&direction=desc&per_page=100&page=1
- **Pagination:** the MVP examines at most the first 100 repositories; if a profile exceeds that, disclose the selection limit rather than implying complete coverage.
- **Selection:** prefer non-fork repositories; use forks as a fallback if fewer than nine remain. Sort the candidate set deterministically by most recent pushed_at, then stars, then repository name. Limit to nine.
- **Metadata meanings:** pushed_at is a repository push timestamp, **not** proof that the profile owner made a commit; stars are popularity indicators, **not** code-quality scores.
- **Visual mapping:** stable plant species from primary language; bounded growth levels from stars; gentle decorative cues from push recency. Unknown or null metadata has safe defaults.
- **Navigation:** single-page screen and optional ?user=USERNAME query string; no server-dependent deep routes.
- **Persistence:** none required. Optional short-lived browser cache for public responses only.

Changes to these decisions require an explicit note in the companion rules document.

## 3. Work breakdown

Each task must produce a reviewable artifact and pass its acceptance criteria before it can be checked off. **P0** means a prerequisite, **P1** is required for launch, **P2** can be deferred if needed. Effort estimates are relative: S = small, M = moderate, L = larger.

### Phase 0 — Define the product (P0)

- [x] **PG-001 (S):** Record the project plan, guardrails, constraints, and MVP scope in repository documentation. **Done when:** both planning files exist on main.
- [ ] **PG-002 (S):** Confirm the final visual direction: pixel scale, palette, garden dimensions, and 4–6 initial plant silhouettes. **Done when:** a small visual-spec section or mockup is approved.
- [ ] **PG-003 (S):** Finalize deterministic selection and plant-mapping examples, including null values and large star counts. **Done when:** a data-mapping table and examples are approved.
- [ ] **PG-004 (S):** Select an explicit code/art license and verify third-party asset license compatibility. **Done when:** the owner approves a LICENSE file; public access alone does not grant reuse rights.

**Gate:** no application scaffolding until the visual direction and core mapping rules are settled.

### Phase 1 — Bootstrap and foundations (P1)

- [ ] **PG-005 (S):** Create Vite + React + TypeScript app with a clean source layout. **Done when:** local dev, production build, and preview all run.
- [ ] **PG-006 (S):** Set up linting, formatting, strict TypeScript, and package-lock. **Done when:** quality commands pass on a clean checkout.
- [ ] **PG-007 (S):** Establish design tokens (pixel grid, typography, colors, spacing) and semantic page structure. **Done when:** one responsive shell is visible with no data dependency.
- [ ] **PG-008 (S):** Add a small unit-test setup and sample test. **Done when:** tests run in one command.
- [ ] **PG-009 (S):** Configure Vite's production base path for /pixel-garden/ and asset URL discipline. **Done when:** production preview and subpath smoke checks pass.

**Gate:** the scaffold is stable; no garden feature is counted done until the production build works.

### Phase 2 — GitHub data and domain rules (P1)

- [ ] **PG-010 (S):** Build username input and validation (trim spaces, reject invalid forms, prevent duplicate submits). **Done when:** keyboard submit and clear errors work.
- [ ] **PG-011 (M):** Write a typed GitHub REST client with AbortController and response/error handling. **Done when:** public accounts work; 404, 403/429, and offline cases have typed outcomes.
- [ ] **PG-012 (S):** Normalize API data and select up to nine repositories deterministically. **Done when:** order and fork fallback are covered by tests.
- [ ] **PG-013 (M):** Implement pure, deterministic repo-to-plant mapping. **Done when:** the same repository metadata produces the same plant with safe defaults.
- [ ] **PG-014 (S):** Add loading, empty, unavailable, and rate-limited UI states. **Done when:** no state produces a blank screen or an uncontrolled retry loop.
- [ ] **PG-015 (S):** Minimize requests with in-memory caching and optional short TTL browser caching. **Done when:** repeated renders do not refetch and the cache is documented.

**Gate:** mocked tests and at least one real public-account smoke test pass.

### Phase 3 — The actual pixel garden (P1)

- [ ] **PG-016 (M):** Build one cohesive scene with soil, paths, ambient details, and nine defined plant positions. **Done when:** it feels like a garden rather than nine disconnected cards.
- [ ] **PG-017 (M):** Design 4–6 reusable pixel-art plant species with 2–3 growth variations. **Done when:** small, medium, and large plants are visually distinct without heavy assets.
- [ ] **PG-018 (S):** Add focusable, clickable plants and a detail panel with external GitHub links. **Done when:** mouse, touch, and keyboard access yield equivalent information.
- [ ] **PG-019 (M):** Make the garden responsive and robust to unusually long names. **Done when:** common phone and desktop widths have no horizontal overflow.
- [ ] **PG-020 (S):** Add subtle motion with prefers-reduced-motion support. **Done when:** motion can be reduced and no animation blocks interaction.
- [ ] **PG-021 (S):** Polish contrast, loading visuals, empty soil plots, and unknown-language plants. **Done when:** edge-case gardens still look intentional.

**Gate:** visual and accessibility review of a desktop and mobile garden.

### Phase 4 — Sharing and polish (P1)

- [ ] **PG-022 (M):** Implement client-side PNG export of the garden scene. **Done when:** exported image matches the garden, contains no clipped labels, and has no CORS/canvas errors.
- [ ] **PG-023 (S):** Support an optional ?user=USERNAME link that reconstructs the same garden. **Done when:** a copied link opens correctly under /pixel-garden/.
- [ ] **PG-024 (S):** Add friendly success/error feedback and first-use explanation. **Done when:** a first-time visitor understands the interaction without instructions.
- [ ] **PG-025 (S):** Tune for mobile and slow connections; remove nonessential heavy assets. **Done when:** experience remains useful on a throttled network.

**Gate:** complete end-to-end journey works without credentials.

### Phase 5 — Quality, deployment, and launch (P1)

- [ ] **PG-026 (M):** Test sorting, mappings, missing data, invalid usernames, and request failures with fixtures/mocks. **Done when:** critical logic is covered by automated tests.
- [ ] **PG-027 (M):** Run manual cross-browser, keyboard, reduced-motion, accessibility, and responsive checks. **Done when:** launch-blocking defects are fixed.
- [ ] **PG-028 (S):** Run a production-build smoke test for base URL, assets, direct refresh, and query-string links. **Done when:** no asset 404s occur at the GitHub Pages path.
- [ ] **PG-029 (M):** Add and validate a GitHub Actions workflow to publish only the built dist/ artifact. **Done when:** a successful deployment reports the actual Pages URL.
- [ ] **PG-030 (S):** Update README with genuine screenshots, local setup, data limitations, live URL, and license. **Done when:** published claims match the shipped app.

**Launch gate:** all P1 items complete, license chosen, no secrets in the bundle, and a verified published URL.

## 4. Suggested code layout (planned, not created)

- **src/components/** — garden, plants, controls, detail panel, status states.
- **src/lib/github/** — typed API requests and error handling.
- **src/domain/** — deterministic repository selection and plant mapping.
- **src/styles/** — global tokens and pixel-art styling.
- **src/assets/** — versioned, licensed local art only.
- **src/test/** — test fixtures and automated checks.
- **.github/workflows/** — GitHub Pages build/deploy workflow (added in Phase 5).

Keep domain logic framework-independent and independently testable.

## 5. Risk register and mitigation

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Unauthenticated GitHub API limit (60 requests/hour/IP, normally) | Public visitors may be rate-limited | Minimize calls, short cache, clear retry guidance, never loop retries |
| User owns many repositories | Incomplete input set | Limit first page to 100 and visibly document this in the UI |
| Missing language / pushed_at / description | Broken layout or mapping | Typed nullable fields and fallback art |
| No repos / only forks | Empty or sparse garden | Friendly empty state; documented fork fallback |
| Browser export of external images | Tainted canvas / failed PNG | Prefer locally bundled SVG/CSS art; avoid cross-origin images in export |
| GitHub Pages subpath | Broken JS/CSS or 404 refreshes | Vite base /pixel-garden/; single route + query parameters; smoke test |
| Excessive visual polish / feature creep | Delayed MVP | Fixed acceptance criteria and an explicit post-MVP backlog |
| Third-party pixel art license | Compliance problem | Prefer original artwork, track asset license and attribution |
| Slow mobile devices | Janky animation | Limit animated elements; respect reduced motion; profile before adding libraries |

## 6. Definition of Done for each implementation task

1. Meets the task's acceptance criteria.
2. Runs on a clean checkout with the documented commands.
3. Passes TypeScript, linting, and relevant tests.
4. Handles error/empty/loading states where applicable.
5. Is keyboard-accessible and does not degrade reduced-motion behavior.
6. Adds no tokens, credentials, or unlicensed art.
7. Keeps GitHub Pages constraints intact.
8. Is reviewed before being marked complete. A successful commit alone is not completion.

## 7. Post-MVP backlog (P2; not authorized for the first release)

- Seasons and day/night mode.
- Tiny animals, easter eggs, and rare plants.
- Garden themes and manual plant arrangement.
- More plant species and advanced animation.
- Saved galleries or comparisons (would require a separate privacy/hosting decision).
- Authentication and private repository data (requires a new architecture/security review).

## 8. Official references

- GitHub Pages limits: https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
- GitHub Pages Actions: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- Vite deployment guide: https://vite.dev/guide/static-deploy
- Public repository endpoint: https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user
- REST rate limits: https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api

---

**Documentation only:** this plan does not imply that development, deployment, or the GitHub Pages setup has started.
