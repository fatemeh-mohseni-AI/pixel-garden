# Pixel Garden — Project Charter & Engineering Rules

**Version:** 1.0  
**Last reviewed:** 2026-11-11  
**Status:** Approved constraints for planning; implementation not started  
**Implementation checklist:** [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md)

> **North star:** Turn public GitHub repositories into a beautiful, approachable pixel-art garden that is delightful to explore, works on a phone, and can be shared as an image — all without operating a server.

## 1. Product principles

1. **Garden first, metrics second.** It must look like one coherent pixel-art scene, not a dashboard of repository cards.
2. **Simple enough to finish.** The MVP is username → public repos → up to nine plants → inspect → export.
3. **Deterministic and explainable.** Same input data must create the same plant identity, layout, and growth stage.
4. **Accessible by default.** Keyboard and touch interactions are first-class; motion is optional.
5. **Private by design.** Do not ask users for secrets or silently collect personal information.
6. **Free to host and operate at MVP scale.** No required VPS, database, commercial AI API, or always-on backend.
7. **Accurate representation.** Stars, language, and push recency are visual cues, not evaluations of developer skill.

## 2. Explicit MVP boundaries

### MUST include

- A single responsive page with a username field and a garden result.
- Public GitHub REST API data, safely normalized.
- Up to nine plants with different visual identities and meaningful detail interactions.
- Loading, empty, error, and rate-limit states.
- Browser-side image export.
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

Anything outside this scope requires explicit approval and a plan update.

## 3. Approved architecture

**Preferred:** React + TypeScript + Vite; Tailwind CSS if it improves maintainability, plus custom CSS; locally bundled SVG/CSS pixel-art components; GitHub REST API accessed directly by the browser.

- The **domain layer** owns selection and visual mapping, with pure functions and tests.
- The **data layer** handles fetch, abort, parsing, errors, cache, and normalization.
- The **presentation layer** renders the scene and accessibility controls.
- Use simple, maintained dependencies; justify every major library.
- Keep the initial design SVG/CSS-based. Introduce Canvas/PixiJS only if profiling or export requirements justify it.
- Prefer original locally bundled art. Avoid loading unlicensed art from the internet.
- Keep UI text and metadata safe: never inject untrusted repository content as HTML or execute repository code.

**Do not over-engineer:** no microservices, state-management framework, ORM, backend auth framework, or worker infrastructure for the MVP.

## 4. GitHub data contract and limitations

**Endpoint:** GET https://api.github.com/users/{username}/repos?type=owner&sort=pushed&direction=desc&per_page=100&page=1

- Only public repositories; no token in frontend code, URLs, logs, or screenshots.
- One list request per user lookup should be the normal path; avoid per-repository N+1 requests.
- Accept that the first 100 repositories may not represent a user's complete public portfolio.
- Prefer non-forks, then use forks if needed to fill up to nine garden slots; selection must remain documented and stable.
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

## 6. Visual and UX rules

- Scene quality beats feature count: original plant silhouettes, harmonious palette, terrain, and subtle details.
- Plant visuals must visibly relate to repository data while still looking intentional for small/empty profiles.
- Design for touchscreens and desktop; no essential action may depend on hover alone.
- Support keyboard focus, semantic labels, visible focus indicators, and sufficient text contrast.
- Respect **prefers-reduced-motion**. Do not make essential information depend on animation.
- Keep animation lightweight and stop decorative work when unnecessary.
- Avoid using external images in the export surface unless their cross-origin behavior is explicitly tested; otherwise PNG export may fail.
- Export only the garden scene, not unrelated browser UI. Validate image dimensions and legibility.

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
- Test small-screen overflow, keyboard/touch, reduced-motion, offline behavior, rate limits, image export, and the Pages base path.
- Keep feature changes narrow and reviewable; use focused PRs for implementation by default, unless the owner explicitly asks for direct changes on main.
- Never auto-merge, deploy a new capability, add a paid service, change permissions, or expand scope without owner approval.
- Mark an item complete in the plan **only after** acceptance checks pass.

## 9. Release gate / Definition of Done

The MVP can be called released only when:

- [ ] User journey works end-to-end with public data.
- [ ] GitHub Pages URL has been visited and verified, not merely guessed.
- [ ] No broken assets or navigation under /pixel-garden/.
- [ ] Keyboard, touch, mobile, and reduced-motion checks pass.
- [ ] Missing user, empty repositories, network failure, and API limits have usable UI.
- [ ] PNG export passes with locally bundled assets.
- [ ] Type check, lint, tests, and production build pass.
- [ ] No client-side secrets or unlicensed assets.
- [ ] README accurately lists the live URL, setup steps, limitations, and license.

## 10. Change control

If new functionality conflicts with the static-only deployment or requires auth, storage, tracking, a paid service, or a more complex renderer:

1. Record the reason and user benefit.
2. Estimate the implementation and maintenance cost.
3. Review security/privacy and GitHub Pages compatibility.
4. Update this charter and the task plan.
5. Obtain explicit approval **before** implementation.

## 11. Official reference documentation

- GitHub Pages limits and restrictions: https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
- GitHub Pages build/deployment: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- GitHub Pages static-site behavior: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- Vite + GitHub Pages base configuration: https://vite.dev/guide/static-deploy
- Public GitHub repository API: https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user
- GitHub REST rate limits: https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api

---

**This document describes guardrails and intent. It does not mean implementation has begun.**
