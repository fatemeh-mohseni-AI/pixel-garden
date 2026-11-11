# 🌱 Pixel Garden

<div align="center">

**Turn your GitHub repositories into a cozy little pixel-art garden.**

*Every project is a plant. Every garden tells a story.*

**Status: 🌰 Concept / Planning — not yet implemented**

</div>

---

## 🌼 What is Pixel Garden?

Pixel Garden is a playful, open-source web experience that transforms **public GitHub repositories** into a personalized, interactive **pixel-art garden**.

Instead of another stats dashboard, the **one-page site opens directly into a near-full-screen example garden**. Select **Try Your Own** in the small header to enter a GitHub username or profile link and grow a personal garden. Each public repository becomes a plant. **Up to 10 repositories** live in the default-size garden; with **11 or more**, the landscape extends horizontally so plants stay readable. Explore extra sections with simple scrolling or dragging.

The goal is simple: **make your coding journey something delightful to explore and share.**

## 🪴 How the garden works

| GitHub data | Garden interpretation |
| --- | --- |
| Repository | One plant in the garden |
| Primary programming language | Plant species or color |
| Star count | Growth stage, flowers, or decoration |
| Recent repository activity | Subtle visual details and animations |
| Repository name and description | Plant information panel |

These are **creative visual metaphors**, not scores of developer ability or code quality. Quiet and older projects deserve a place in the garden, too.

## ✨ MVP features

The first release will focus on one polished, browser-based experience.

- [ ] Open directly into a **mostly full-screen**, clearly labeled example garden.
- [ ] Use a compact **Try Your Own** button and dialog for a GitHub username or profile link.
- [ ] Fetch and display public repositories via GitHub REST API (first **100 at most** in MVP).
- [ ] Display **1–10 repositories in the default garden**; extend contiguous garden sections horizontally for **11–100**.
- [ ] Let visitors explore extended gardens with simple touch/keyboard scrolling and optional mouse dragging—**no zoom or minimap**.
- [ ] Display one distinct pixel-art plant per retrieved repository; show details on selection rather than always-visible labels.
- [ ] Handle empty profiles, failures, and GitHub API limits gracefully.
- [ ] Support mobile layouts, accessible controls, and optional lightweight motion.
- [ ] Deploy the static site to **GitHub Pages**.

**Not in the MVP:** GitHub login, private repositories, a database, multiplayer, a backend, a complex camera or game engine, minimap, zoom, repo search, or **full-garden image export**. Export can be considered after MVP. **All final visual decisions require owner approval before implementation.**

## 🎨 Design direction

We're aiming for the feeling of a **cozy pixel-art game**, rather than a conventional analytics dashboard:

- Crisp pixel edges and a cohesive, limited color palette.
- A **large, continuous garden** taking up most of the viewport, with a small menu instead of a large input section.
- Playful but lightweight animation.
- Responsive layouts, accessible controls, and readable text.
- A garden that stays visually interesting even when a user has few repositories.

Pixel-art shapes, species, scenery, colors, layout, and animations must be proposed with realistic mockups and **approved by the repository owner before implementation**. The earlier AI-generated concepts are inspiration, not implementation guarantees.

## 🛠️ Planned tech stack

| Layer | Technology |
| --- | --- |
| UI | React + TypeScript + Vite |
| Styling | Tailwind CSS + custom pixel-art CSS |
| Visuals | Lightweight SVG / CSS pixel art |
| Scrolling | Native horizontal overflow; minimal drag enhancement if useful |
| Data | GitHub REST API (public endpoints) and clearly labeled local demo fixtures |
| Hosting | GitHub Pages |

The MVP is planned as a **static site**, so it should not require a personal VPS.

### API and privacy considerations

- Only public GitHub information will be requested.
- Visitors will **not** be asked to paste GitHub access tokens.
- Missing users, empty profiles, network errors, and API rate limits should have clear UI states.
- Any public API requests from the browser must respect GitHub's rate limits.
- No personal account data will be stored on a server in the MVP.

## 🗺️ Roadmap

### Phase 1 — Plant the seed 🌱
- Set up the frontend.
- Integrate public repository data.
- Render the approved ten-slot default garden and a simple horizontal extension for larger collections.

### Phase 2 — Let it bloom 🌷
- Polish the pixel art and interactions.
- Add minimal optional animation and accessible horizontal navigation.
- Test accessibility and mobile layouts.
- Publish the MVP with GitHub Pages.

### Phase 3 — A bigger world 🦋
Possible future ideas (not committed features):
- Seasons and day/night themes.
- Tiny animals and rare plants.
- Custom garden themes.
- Full-garden image export.
- More ways to share and compare gardens.

## 📋 Project documentation

- [Implementation plan](./docs/IMPLEMENTATION_PLAN.md) — phased tasks, acceptance criteria, and the 10-slot expansion rule.
- [Project rules](./docs/PROJECT_RULES.md) — goals, visual approval process, simple MVP boundaries, and GitHub Pages constraints.

## 🤝 Contributing

Pixel Garden is at the **planning stage**. Ideas, feedback, pixel-art concepts, and accessibility suggestions are welcome.

Please open an Issue to discuss substantial changes before implementing them. Contribution setup instructions will be added once the initial codebase exists.

## 📍 Current status

**This repository currently contains the project concept and roadmap, not a working application.** A live demo, screenshots, installation instructions, and an explicit license will be added when available.

---

<div align="center">

**Grow something lovely from your code.** 🌸

</div>
