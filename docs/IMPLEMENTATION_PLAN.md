# Pixel Garden — Implementation Plan

**Version:** 1.2  
**Last reviewed:** 2026-11-11  
**Status:** MVP implemented and verified locally. Owner review, license approval, and Pages release are pending.\
**Repository:** https://github.com/fatemeh-mohseni-AI/pixel-garden  
**Companion documents:** [PROJECT_RULES.md](./PROJECT_RULES.md) · [DESIGN_BRIEF.md](./DESIGN_BRIEF.md)

> This is the execution checklist for the MVP. Checkboxes indicate completed work, not estimates or promises. Do not treat future phases as authorized implementation.

## 1. Target outcome

Deliver a polished, mobile-friendly, **nearly full-viewport pixel-art garden** on a single page. The home screen begins with a clearly marked example garden and a compact **Try Your Own** button that opens a GitHub username/profile-link dialog. **1–10 repositories fit in one default garden scene; from repository 11 onward the same continuous garden grows horizontally**, with simple scrolling or dragging to explore it. Each repository is represented by one plant (up to the MVP API retrieval cap). Visitors can inspect plants. The application must be deployable as static files to GitHub Pages, without a server, login, credentials, or paid services. **Full-garden PNG export is deferred until after MVP.**

**Initial hosting target (once enabled and deployed):** https://fatemeh-mohseni-AI.github.io/pixel-garden/

### MVP user journey

1. Open the site directly into a **full-size example garden** (up to ten clearly labeled sample repositories); the header is compact and does not displace the scene.
2. Select **Try Your Own**; a small accessible dialog accepts a GitHub username or profile URL.
3. The browser requests the account's public repositories (the first 100 at most in MVP).
4. With **0 repositories**, show a welcoming empty garden. With **1–10**, use the fixed default garden footprint.
5. With **11–100**, append contiguous garden sections of up to ten plant slots each, growing the world **horizontally**, without shrinking all plants to fit.
6. Navigate the expanded garden with **native horizontal touch scrolling / scrolling**, optional simple mouse drag, and keyboard-accessible navigation. No zoom or minimap.
7. Select or focus a plant to view repository details and follow its GitHub link; repository labels are not permanently overlaid on every plant.

### MVP success criteria

- The default home view is **mostly garden**, with minimal navigation and a compact **Try Your Own** entry point.
- A clearly identified example garden loads without requiring the visitor to call GitHub's API.
- A real public GitHub username **or profile URL** generates a repeatable garden.
- **1–10 repos:** a complete fixed-size garden with no world expansion. **11 and 50 repos:** an expanded, scrollable garden containing all retrieved plants without overlap or forced shrink-to-fit.
- The horizontal garden remains navigable on mouse, touch, and keyboard without interfering with plant selection.
- A user with zero repositories sees a friendly empty-garden state.
- Missing users, network failures, and GitHub API limits have actionable messages.
- A production build loads correctly at **/pixel-garden/**.
- No server, database, login, private data, client-side secrets, zoom system, minimap, or full-garden export is required.

## 2. Assumptions and explicit decisions

- **Platform:** static React + TypeScript + Vite application, hosted on GitHub Pages.
- **Rendering:** lightweight SVG/CSS pixel-art components first; Canvas/PixiJS only if a measured need appears.
- **Data:** unauthenticated GitHub REST API, public repositories only.
- **Initial API shape:** GET https://api.github.com/users/{username}/repos?type=owner&sort=pushed&direction=desc&per_page=100&page=1
- **Pagination:** the MVP examines at most the first 100 repositories; if a profile exceeds that, disclose the selection limit rather than implying complete coverage.
- **Selection:** show **all retrieved public repositories, up to 100**. Order deterministically by most recent pushed_at, then stars, then repository name. Forks may appear but are never silently hidden. Do not truncate to the first ten: ten is the **initial garden capacity**, not a repository cap.
- **Metadata meanings:** pushed_at is a repository push timestamp, **not** proof that the profile owner made a commit; stars are popularity indicators, **not** code-quality scores.
- **Visual mapping:** stable plant species from primary language; bounded growth levels from stars; gentle decorative cues from push recency. Unknown or null metadata has safe defaults.
- **Layout and navigation:** one page, a near-full-viewport garden, a slim header and **Try Your Own** dialog. Ten stable plant positions form the default scene; additional contiguous segments of up to ten slots extend the terrain **to the right**. Use native overflow-x scrolling/touch and a lightweight optional mouse-drag enhancement; preserve keyboard scrolling and plant focus. No zoom, camera engine, minimap, search, multi-page navigation, or permanently visible per-plant labels.
- **Demo mode:** default demo repositories are clearly presented as samples. Prefer a small local fixture with explicitly fictional example data, so landing does not consume GitHub API requests; never imply placeholder statistics are real.
- **Visual approval rule:** The owner has already approved the macro direction in [DESIGN_BRIEF.md](./DESIGN_BRIEF.md). The agent has authority over small artistic details within the brief and should not repeatedly ask for approval. Ask only about material deviations (e.g. other viewpoint, style, page structure, interaction model, hosting or feature scope). AI-generated concepts are inspiration, not proof of implementation fidelity.
- **Image export:** deferred to P2 because a growing, horizontally scrollable garden makes whole-scene export substantially harder.
- **Persistence:** none required. Optional short-lived browser cache for public responses only.

Changes to these decisions require an explicit note in the companion rules document.

## 3. Work breakdown

Each task must produce a reviewable artifact and pass its acceptance criteria before it can be checked off. **P0** means a prerequisite, **P1** is required for launch, **P2** can be deferred if needed. Effort estimates are relative: S = small, M = moderate, L = larger.

### Phase 0 — Define the product (P0)

- [x] **PG-001 (S):** Record the project plan, guardrails, constraints, and MVP scope in repository documentation. **Done when:** both planning files exist on main.
- [x] **PG-002 (S):** Record the owner's approved macro design: side-view, cozy pixel-inspired cartoon, generic non-cultural setting, cheerful palette, slim header, Try Your Own dialog, ten-slot base and horizontal growth. **Done:** captured in DESIGN_BRIEF.md. Fine details are delegated. **The implementation must still demonstrate actual 10- and 50-repo screenshots during QA.**
- [x] **PG-003 (S):** Define stable repository ordering, plant mapping and slot layout for 0/1/10/11/50/100 repos, including null values. The agent may choose exact plant/flower visual mappings consistent with the approved brief; **Done when:** deterministic examples and tests are documented, without requiring approval for each plant detail.
- [ ] **PG-004 (S):** Select an explicit code/art license and verify third-party asset license compatibility. **Done when:** the owner approves a LICENSE file; public access alone does not grant reuse rights.

**Gate:** the macro visual brief is **approved**. Implementation may begin once Work reads the three docs. The agent owns micro-design decisions inside the brief, but must request permission before **material design/architecture deviations**. Actual 10- and 50-repository browser screenshots are a QA deliverable before launch, not an upfront approval dependency.

### Phase 1 — Bootstrap and foundations (P1)

- [x] **PG-005 (S):** Create Vite + React + TypeScript app with a clean source layout. **Done when:** local dev, production build, and preview all run.
- [x] **PG-006 (S):** Set up linting, formatting, strict TypeScript, and package-lock. **Done when:** quality commands pass on a clean checkout.
- [x] **PG-007 (S):** Implement design tokens **within the approved DESIGN_BRIEF.md**, near-full-viewport side-view garden shell, compact header, and dialog semantics. **Done when:** the responsive shell follows the brief, with visual proof from the rendered app.
- [x] **PG-008 (S):** Add a small unit-test setup and sample test. **Done when:** tests run in one command.
- [x] **PG-009 (S):** Configure Vite's production base path for /pixel-garden/ and asset URL discipline. **Done when:** production preview and subpath smoke checks pass.

**Gate:** the scaffold is stable; no garden feature is counted done until the production build works.

### Phase 2 — GitHub data and domain rules (P1)

- [x] **PG-010 (S):** Validate both GitHub usernames and github.com profile links in the compact Try Your Own dialog; prevent duplicate submits. **Done when:** Enter, Escape, focus return, and useful error messages work.
- [x] **PG-011 (M):** Write a typed GitHub REST client with AbortController and response/error handling. **Done when:** public accounts work; 404, 403/429, and offline cases have typed outcomes.
- [x] **PG-012 (S):** Normalize and consistently order up to the first 100 retrieved repositories **without reducing them to ten**; disclose the one-page API cap. **Done when:** 0/1/10/11/50/100 cases and tie ordering are tested.
- [x] **PG-013 (M):** Implement pure, deterministic repo-to-plant mapping. **Done when:** the same repository metadata produces the same plant with safe defaults.
- [x] **PG-014 (S):** Add loading, empty, unavailable, and rate-limited UI states. **Done when:** no state produces a blank screen or an uncontrolled retry loop.
- [x] **PG-015 (S):** Minimize requests with in-memory caching and optional short TTL browser caching. **Done when:** repeated renders do not refetch and the cache is documented.

**Gate:** mocked tests and at least one real public-account smoke test pass.

### Phase 3 — The actual pixel garden (P1)

- [x] **PG-016 (M):** Build the **approved** cohesive, mostly full-viewport scene with **ten plant slots** and a clearly marked sample garden on landing. **Done when:** the first ten plants fit naturally without separate cards or a dominant hero form.
- [x] **PG-017 (M):** Implement 4–6 reusable **cozy cartoon / pixel-inspired** plant families, with two simple growth tiers. The agent chooses individual silhouettes and colors within DESIGN_BRIEF.md. **Done when:** plants are appealing and distinct without heavy assets or a game engine.
- [x] **PG-018 (S):** Add focusable, clickable plants with a compact details popover and safe external GitHub link. **Done when:** mouse, touch, and keyboard behave consistently; labels are not permanently shown over every plant.
- [x] **PG-019 (M):** Make the terrain extend in contiguous **ten-slot segments** once there are 11+ repositories. Use simple, accessible **horizontal overflow scrolling** (touch natively, optional mouse dragging), with obvious scroll affordance and no unintentional page-wide overflow. **Done when:** 10 fits one scene, 11 expands, 50 plants are reachable, focus can scroll a plant into view, and clicks remain reliable.
- [x] **PG-020 (S):** Add at most a few subtle, owner-approved CSS movements; respect prefers-reduced-motion. **Done when:** turning motion off loses no information and never blocks scrolling or interaction.
- [x] **PG-021 (S):** Polish contrast, loading visuals, empty soil plots, and unknown-language plants. **Done when:** edge-case gardens still look intentional.

**Gate:** visual and accessibility review of a desktop and mobile garden.

### Phase 4 — Minimal user experience and polish (P1)

- [x] **PG-022 (S):** Provide a small local demo-repository fixture (no fake stats presented as real) and a default 1–10-plant garden. **Done when:** the site displays a useful demo without any network access.
- [x] **PG-023 (S):** Complete the **Try Your Own** dialog and optional ?user=USERNAME link. **Done when:** the demo can be replaced with a user's garden and the URL works under /pixel-garden/.
- [x] **PG-024 (S):** Provide tiny, nonintrusive guidance such as **Drag/scroll to explore** only when the garden exceeds ten plants; clarify loading/errors. **Done when:** first-time visitors can discover additional garden sections.
- [x] **PG-025 (S):** Tune for mobile/slow connections; simplify or remove nonessential decorations. **Done when:** the expanded garden is usable on a phone and no expensive animation is required.

**Gate:** complete end-to-end journey works without credentials.

### Phase 5 — Quality, deployment, and launch (P1)

- [x] **PG-026 (M):** Test sorting, plant mapping, layout growth (0/1/10/11/50/100), invalid usernames/URLs, and request failures with fixtures/mocks. **Done when:** core behaviors are covered.
- [x] **PG-027 (M):** Capture **real browser screenshots of 10-repo and 50-repo scenes**, plus the Try Your Own dialog; check desktop/mobile browsers, native scrolling, optional drag, keyboard plant focus, dialog accessibility, reduced-motion, and responsive behavior. **Done when:** visual implementation respects DESIGN_BRIEF.md, all plants are reachable, and launch blockers are fixed.
- [x] **PG-028 (S):** Run a production-build smoke test for base URL, assets, direct refresh, and query-string links. **Done when:** no asset 404s occur at the GitHub Pages path.
- [ ] **PG-029 (M):** Add and validate a GitHub Actions workflow to publish only the built dist/ artifact. **Done when:** a successful deployment reports the actual Pages URL.
- [ ] **PG-030 (S):** Update README with genuine screenshots, local setup, data limitations, live URL, and approved license. Present final result to owner and **obtain explicit permission before production publish or merge**. **Done when:** published claims match the shipped app.

**Review evidence:** [10 repositories](screenshots/example-garden-10.png) · [50 repositories](screenshots/expanded-garden-50.png) · [lookup dialog](screenshots/try-your-own-dialog.png) · [mobile example](screenshots/example-garden-mobile.png). The 50-repository image uses a test fixture. TypeScript, lint, formatting, the production build, unit and Chromium browser tests, and workflow syntax validation passed locally. A live browser lookup of `octocat` returned HTTP 200 and rendered eight public repositories.

**Launch gate:** PG-004, PG-029, and PG-030 remain open. The Pages workflow is present and passes local validation. Owner license approval, approval to merge and publish, and verification of the deployed URL are still required.

## 4. Code layout

- **src/components/** — garden, plants, controls, detail panel, status states.
- **src/lib/github.ts** — typed API requests and error handling.
- **src/domain/** — deterministic repository selection and plant mapping.
- **src/styles/** — global tokens and pixel-art styling.
- **public/** — the original favicon and bundled font license notices. The scene artwork lives in the SVG components.
- **tests/** — browser fixtures and automated checks. Unit tests live beside their source modules.
- **.github/workflows/** — PR checks and manual GitHub Pages deployment.

Keep domain logic framework-independent and independently testable.

## 5. Risk register and mitigation

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Unauthenticated GitHub API limit (60 requests/hour/IP, normally) | Public visitors may be rate-limited | Minimize calls, short cache, clear retry guidance, never loop retries |
| User owns many repositories | Width/performance and possible incomplete input set | Extend 10-slot sections horizontally; limit first API page to 100, disclose cap; test 50+ items |
| Missing language / pushed_at / description | Broken layout or mapping | Typed nullable fields and fallback art |
| No repos / only forks | Empty or sparse garden | Friendly empty state; documented fork fallback |
| Full-garden image export | Large offscreen rendering would complicate MVP | Move full-garden PNG export to post-MVP; keep local assets so it remains feasible later |
| GitHub Pages subpath | Broken JS/CSS or 404 refreshes | Vite base /pixel-garden/; single route + query parameters; smoke test |
| Excessive visual polish / feature creep | Delayed MVP | Fixed acceptance criteria and an explicit post-MVP backlog |
| Third-party pixel art license | Compliance problem | Prefer original artwork, track asset license and attribution |
| Slow mobile devices | Janky scrolling or animation | Keep scene lightweight; native overflow; reduced-motion; avoid complex renderers |
| Dense scene with many projects | Overlap or unreadable labels | Fixed plant slots, bounded sizes, details on interaction rather than permanent text |

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
- **Full-garden PNG export**, including offscreen sections (explicitly postponed).
- Optional zoom, minimap, repository search, and advanced pan/virtualization (only if real usage justifies them).
- Saved galleries or comparisons (would require a separate privacy/hosting decision).
- Authentication and private repository data (requires a new architecture/security review).

## 8. Official references

- GitHub Pages limits: https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
- GitHub Pages Actions: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- Vite deployment guide: https://vite.dev/guide/static-deploy
- Public repository endpoint: https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user
- REST rate limits: https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api
