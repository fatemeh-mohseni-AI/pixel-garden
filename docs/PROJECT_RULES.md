# Pixel Garden — Project Charter & Engineering Rules

**Version:** 1.1  
**Last reviewed:** 2026-11-11  
**Status:** Approved constraints for planning; implementation not started  
**Implementation checklist:** [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md)

> **North star:** Show an expansive, mostly full-viewport pixel-art garden from public GitHub repositories on **one page**. Up to ten plants fit the default garden; beyond ten, the world extends horizontally with the simplest possible navigation. It must work on a phone and GitHub Pages without operating a server.

## 1. Product principles

1. **Garden first, metrics second.** It must look like one coherent pixel-art scene, not a dashboard of repository cards.
2. **Simple enough to finish.** The MVP is demo garden → compact Try Your Own dialog → public repositories → one plant per repo (within the first 100 fetched) → inspect; 11+ plants extend the same garden horizontally.
3. **Deterministic and explainable.** Same input data must create the same plant identity, layout, and growth stage.
4. **Accessible by default.** Keyboard and touch interactions are first-class; motion is optional.
5. **Private by design.** Do not ask users for secrets or silently collect personal information.
6. **Free to host and operate at MVP scale.** No required VPS, database, commercial AI API, or always-on backend.
7. **Accurate representation.** Stars, language, and push recency are visual cues, not evaluations of developer skill.
8. **Approval before aesthetics.** Before selecting or implementing any visual treatment, present a realistic target/mockup to the owner and obtain explicit approval. This covers plant silhouettes, pixel art, colors, terrain, typography, component placement, and animation. No unilateral visual choices.

## 2. Explicit MVP boundaries

### MUST include

- **One page with a near-full-viewport garden**; a slim header and a compact **Try Your Own** button that opens a small, accessible username/profile URL dialog.
- A default **sample garden** of up to ten projects, visibly labeled as a demo; do not invent data and present it as real.
- Public GitHub REST API data, safely normalized, with one plant per retrieved repository (up to the first 100).
- **1–10 repositories:** one fixed default-size garden. **11–100:** extend the same cohesive scene to the right using additional groups of up to ten slots.
- **Simple horizontal exploration:** native overflow scrolling (especially touch and keyboard); a lightweight mouse-drag enhancement is optional and must not break clicks or focus.
- Plant details shown on interaction, not dozens of permanent text labels.
- Loading, empty, error, and rate-limit states.
- A static build deployable to GitHub Pages.
- Clear documentation and repeatable local/CI quality checks.

### MUST NOT include in v1

- A backend server, VPS, serverless function, database, or required user account.
- GitHub OAuth, private repository access, or asking visitors to paste Personal Access Tokens.
- A paid LLM, image generation API, or external commercial runtime dependency.
- User tracking, analytics cookies, advertising, or background data harvesting.
- Real-time syncing, webhooks, push notifications, multiplayer, leaderboards, or social accounts.
- A 3D engine, large pixel-art framework, or complex game-state system unless later justified.
- Automatic changes to visitors' repositories, creation of Issues, or other write operations.
- More than one primary page/route in the MVP.
- Zoom controls, minimap, advanced camera movement, world map, pathfinding, virtualization, or repository search.
- Continuous real-time data refresh, many independent API calls per repository, complex shaders, or a 3D/Pixi game engine.
- Full-garden PNG export or complex offscreen screenshot stitching (post-MVP).
- A large image-based mockup whose detailed assets cannot realistically be recreated with the approved stack.
- Large permanently visible repository-name labels across the garden.

Anything outside this scope requires explicit approval and a plan update.

## 3. Approved architecture

**Preferred:** React + TypeScript + Vite; Tailwind CSS if it improves maintainability, plus custom CSS; locally bundled SVG/CSS pixel-art components; GitHub REST API accessed directly by the browser.

- The **domain layer** owns selection and visual mapping, with pure functions and tests.
- The **data layer** handles fetch, abort, parsing, errors, cache, and normalization.
- The **presentation layer** renders the scene and accessibility controls.
- Use simple, maintained dependencies; justify every major library.
- Keep the initial design **SVG/CSS-based** with reusable approved sprites/components. Canvas/PixiJS is **out of scope for MVP** unless the owner approves a documented exception.
- Build a **ten-slot base garden**, then append adjoining terrain sections of up to ten slots for additional repositories. Plant placement must be deterministic and non-overlapping. Use native scroll containers (overflow-x: auto) rather than a camera/scene engine; optional pointer drag is only a small progressive enhancement.
- Do not shrink all plants to fit a single viewport when a user has more than ten repositories; make the world wider instead.
- Keep the header small; the garden itself must visually dominate the viewport. The primary input belongs in the Try Your Own dialog, not a large hero form.
- Use **locally bundled example data** for the default garden to avoid spending visitors' unauthenticated GitHub API budget on landing. Example data must be clearly marked as sample data.
- Prefer original locally bundled art. Avoid loading unlicensed art from the internet.
- Keep UI text and metadata safe: never inject untrusted repository content as HTML or execute repository code.

**Do not over-engineer:** no microservices, state-management framework, ORM, backend auth framework, or worker infrastructure for the MVP.

## 4. GitHub data contract and limitations

**Endpoint:** GET https://api.github.com/users/{username}/repos?type=owner&sort=pushed&direction=desc&per_page=100&page=1

- Only public repositories; no token in frontend code, URLs, logs, or screenshots.
- One list request per user lookup should be the normal path; avoid per-repository N+1 requests.
- Accept that the first 100 repositories may not represent a user's complete public portfolio.
- Show **all repositories retrieved in the first page, up to 100**, in a deterministic order. Forks can appear, but do not secretly omit them. **Ten is the initial scene capacity, not a repository-count limit.**
- Treat fields such as language, description, and pushed_at as nullable. Use safe default plant styles.
- Use repository ID/name as a stable visual seed, not Math.random during rendering.
- Stars must be mapped to **bounded tiers** (e.g., logarithmic or capped), not used directly as sizes.
- A push timestamp does not prove which contributor authored the change. Do not claim it represents an individual's commits.
- Do not claim to support pinned repositories or complete contribution history unless an appropriate verified data source is introduced.
- Minimize API calls; browser caching for public data may be added with a short explicit TTL.
- Unauthenticated GitHub REST API normally allows **60 requests/hour per originating IP**. Handle 403/429 and rate-limit headers, honor reset/retry-after information, and never retry aggressively.
- Handle 404 (user not found), 0 repositories, slow requests, network failures, and cancelled lookups.

## 5. GitHub Pages: non-negotiable hosting constraints

GitHub Pages is a **static hosting platform**:

- It serves the built HTML, CSS, JavaScript, images, and other static assets; it **does not run** a live Node.js, Django, Flask, Python, PHP, Ruby, or other application server.
- Build tooling may run in **GitHub Actions**, but server-side application logic does not run on the published Pages site.
- Browser requests to third-party APIs must respect **CORS**, network failures, and those APIs' own limits.
- No hidden credentials in Vite client environment variables: values bundled into JavaScript are public.
- Use the project-site base path **/pixel-garden/** in Vite. Use base-aware asset references rather than assuming the site lives at /.
- Avoid BrowserRouter history-based nested routes without a verified fallback. Prefer a single page with **?user=USERNAME**.
- Publish only the generated **dist/** artifact using a GitHub Actions Pages workflow; do not publish the source directory as the Vite runtime.
- Configure the workflow with least-privilege permissions (typically contents: read, pages: write, id-token: write); use the github-pages deployment environment.
- Repository owner must enable Pages with **Settings → Pages → Source: GitHub Actions** before deployment.
- The expected project URL after deployment is **https://fatemeh-mohseni-AI.github.io/pixel-garden/**; this is a target, not a claim that it is live.

### Official GitHub Pages usage limits (as documented on 2026-11-11)

| Area | Documented limit |
| --- | --- |
| Pages source repository | Recommended maximum **1 GB** |
| Published Pages site | Maximum **1 GB** |
| Deployment duration | Times out after **10 minutes** |
| Bandwidth | Soft limit **100 GB/month** |
| Build frequency | Soft limit **10 builds/hour**; this specific limit does **not** apply to custom GitHub Actions publishing workflows |

GitHub Pages is **not intended or allowed as free hosting primarily for commercial transactions or commercial SaaS**. It must not be used to process sensitive transactions such as passwords or card details. These policies and quotas may change; check the official documentation before launch.

**Implication for Pixel Garden:** keep the shipped bundle and artwork small, perform rendering on the user's device, do not rely on permanent server-side jobs, and do not turn the Pages site into a commercial hosted product.

## 6. Visual and UX rules — owner approval required

**Before implementation:** Present realistic approved-size mockups for a garden with up to **10 repositories** and an expanded example with **50 repositories**, plus the compact Try Your Own dialog. Explain exactly what rendering/components can achieve. Wait for owner approval **before** choosing or implementing visual shapes and layout.

- Scene quality beats feature count: cohesive **pixel art**, a mostly full-viewport garden, and minimal menu/UI.
- Keep all decorative choices provisional until owner-approved: species, palette, pixel scale, paths, buildings, props, lighting, animations, and typography.
- The home view shows a tasteful sample garden. The scene should not be obstructed by a large headline, input form, dashboard, or repo-chip row.
- One repository maps to one plant; the **default terrain has ten slots**. Additional slots extend the scene in connected horizontal sections; no page-by-page switch, zoom, or minimap.
- Use simple native horizontal scrolling on touch and keyboard; optional mouse drag must not swallow click/selection events. Give a subtle hint if more content exists offscreen.
- Repository details appear on click, tap, or focus; do not render fifty permanent text labels.
- Plant visuals must relate to repository data while retaining visual appeal for small and empty gardens.
- Support semantic labels, visible keyboard focus, and sufficient contrast; no essential action may depend on hover.
- Respect **prefers-reduced-motion**. Motion must be optional, restrained, and nonessential.
- No mandatory animation engine. Do not introduce excessive sprites, visual layers, or heavy remote imagery for MVP.
- **Export is post-MVP**; do not build whole-world rendering/export until separately approved.

## 7. Security, privacy, and asset licensing

- No secrets, access tokens, or private repository data in public source, built bundles, or browser storage.
- Do not embed unsanitized user-generated HTML; encode text and validate external link protocols.
- Do not request unnecessary browser permissions.
- No telemetry or personal data collection by default. If ever proposed, require a separate privacy review.
- Track the source and license of every third-party asset/font/library. Never copy game sprites without permission.
- A public GitHub repository does **not** automatically grant an open-source license. The repository owner must approve a LICENSE before labeling the code/art as freely reusable.

## 8. Engineering standards and review process

- Strict TypeScript; avoid unchecked casts and broad any types.
- Keep business logic testable without a browser. Use small pure functions for sorting, seeds, and growth rules.
- Handle null values, huge star counts, long names, partial API responses, and race conditions.
- Use AbortController to cancel obsolete username lookups.
- Prefer a lockfile, repeatable installs, lint checks, unit tests, and a clean production build.
- Test contained horizontal garden scrolling, 0/1/10/11/50/100 repository layouts, keyboard/touch focus, reduced-motion, offline behavior, rate limits, and the Pages base path.
- Keep feature changes narrow and reviewable; use focused PRs for implementation by default, unless the owner explicitly asks for direct changes on main.
- Never auto-merge, deploy a new capability, add a paid service, change permissions, expand scope, **or decide visual elements** without owner approval.
- Mark an item complete in the plan **only after** acceptance checks pass.

## 9. Release gate / Definition of Done

The MVP can be called released only when:

- [ ] User journey works end-to-end with public data.
- [ ] GitHub Pages URL has been visited and verified, not merely guessed.
- [ ] No broken assets or navigation under /pixel-garden/.
- [ ] Keyboard, touch, mobile, and reduced-motion checks pass.
- [ ] Missing user, empty repositories, network failure, and API limits have usable UI.
- [ ] A ten-repository garden fits its base scene and a fifty-repository garden can be explored by simple scrolling without overlaps, inaccessible plants, or a page-wide overflow.
- [ ] Type check, lint, tests, and production build pass.
- [ ] No client-side secrets or unlicensed assets.
- [ ] README accurately lists the live URL, setup steps, limitations, and license.

## 10. Change control

If new functionality or **visual decisions** conflict with the agreed mockup, the ten-slot expansion rule, the static-only deployment, or require auth, storage, tracking, paid services, or a more complex renderer:

1. Record the reason and user benefit.
2. Estimate the implementation and maintenance cost.
3. Review security/privacy and GitHub Pages compatibility.
4. Update this charter and the task plan.
5. Obtain explicit approval **before** implementation. In particular, no new plant type, scenery style, visual library, significant UI layout, or interaction model is selected unilaterally.

## 11. Official reference documentation

- GitHub Pages limits and restrictions: https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
- GitHub Pages build/deployment: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- GitHub Pages static-site behavior: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- Vite + GitHub Pages base configuration: https://vite.dev/guide/static-deploy
- Public GitHub repository API: https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user
- GitHub REST rate limits: https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api

---

**This document describes guardrails and intent. It does not mean implementation has begun.**
