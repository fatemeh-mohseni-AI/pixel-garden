# Pixel Garden

Pixel Garden turns public GitHub repositories into an interactive pixel-art garden. The opening scene contains ten fictional projects and loads without using the GitHub API.

![The ten-plant example garden on desktop](docs/screenshots/example-garden-10.png)

[Expanded 50-repository garden](docs/screenshots/expanded-garden-50.png) · [Mobile example](docs/screenshots/example-garden-mobile.png) · [Try Your Own dialog](docs/screenshots/try-your-own-dialog.png)

The expanded screenshot uses a 50-repository test fixture and shows a 481-star rare tree in the second of five sections. All screenshots were captured from the production build in Chromium.

## Explore a garden

- Select **Try Your Own** and enter a GitHub username or profile URL. Once loaded, the garden URL includes `?user=USERNAME` so you can reopen it directly.
- Select a plant to see its repository, primary language, stars, and last push or update. With a keyboard, tab to a plant to show details and press Enter to move into the panel. Escape dismisses the panel.
- The first ten plants fit in one scene. Larger profiles extend the garden to the right. Swipe, scroll horizontally, or use the section arrows. With focus on the landscape, use Left, Right, Home, or End.

## How repositories become plants

| GitHub data | Garden rule |
| --- | --- |
| Repository | One plant per retrieved public repository, including forks |
| Primary language | Foliage and blossom palette, with a stable fallback when language is unavailable |
| Repository ID | Stable fallback palette and sprite direction |
| Stars | Sprout (0–2), bush (3–14), flowering bush (15–59), large tree (60–249), rare flowering tree (250+) |
| Push timestamp | A small gold accent for pushes within 14 days of the newest retrieved push |
| Ordering | Latest push first, then stars descending, case-insensitive name, and ID |

The same set of public records produces the same plants and slot order. The garden opens with a small cottage, a cat, and two birds in the first section. The birds glide and the cat flicks its tail briefly when the garden opens. Reduced-motion settings disable those movements.

The browser requests the first GitHub REST page of up to **100** public, owned repositories. The UI indicates when it reaches that cap. GitHub applies limits to unauthenticated requests. Successful lookups are cached in memory for five minutes, up to 20 profiles per tab. Pixel Garden has no server, credentials, analytics, or persistent application storage.

## Run locally

Use Node.js 22.12+ on the 22 LTS line, or Node.js 24.

```sh
npm ci
npm run dev
```

Open the local address shown by Vite under `/pixel-garden/`.

```sh
npm run format:check
npm run lint
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

On Linux, use `npx playwright install --with-deps chromium` if Chromium's system dependencies are missing. Browser tests serve the built `dist/` at the Pages subpath. They cover desktop and emulated mobile Chromium, all supported garden sizes, keyboard and touch, reduced motion, and axe checks. The live GitHub smoke test can be repeated by loading `https://github.com/octocat` through **Try Your Own**.

## GitHub Pages

The Vite build uses `/pixel-garden/`. The Pages workflow runs on manual dispatch from `main` and uploads only `dist/`. For an approved release, enable **Settings → Pages → Source → GitHub Actions**, then run **Deploy Pixel Garden to Pages** from `main`. Verify the URL emitted by the workflow and reload a profile URL with `?user=USERNAME`. This review build is pending release.

## Project notes

- [Implementation plan and checklist](docs/IMPLEMENTATION_PLAN.md)
- [Project charter](docs/PROJECT_RULES.md)
- [Approved design brief](docs/DESIGN_BRIEF.md)
- The SVG artwork is original to this project. DM Sans and Space Mono are bundled under the SIL Open Font License with their [license texts](public/licenses/). The project code and artwork license is pending owner approval.
