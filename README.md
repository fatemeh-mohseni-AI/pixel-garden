# 🌱 Pixel Garden

<div align="center">

**Turn your GitHub repositories into a cozy little pixel-art garden.**

*Every project is a plant. Every garden tells a story.*

**Status: 🌰 Concept / Planning — not yet implemented**

</div>

---

## 🌼 What is Pixel Garden?

Pixel Garden is a playful, open-source web experience that transforms **public GitHub repositories** into a personalized, interactive **pixel-art garden**.

Instead of looking at another stats dashboard, enter a GitHub username and watch a tiny garden take shape. Each plant represents a repository, with its appearance inspired by the project's public metadata.

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

- [ ] Enter a GitHub username to generate a garden.
- [ ] Fetch the user's **public repositories** via the GitHub REST API.
- [ ] Select up to **nine repositories** using a consistent, documented rule.
- [ ] Display each repository as a distinct pixel-art plant.
- [ ] Open a plant's details by mouse, keyboard, or touch.
- [ ] Show repository name, language, stars, last update, and GitHub link.
- [ ] Add gentle animation and respect reduced-motion preferences.
- [ ] Export the garden as a shareable image.
- [ ] Deploy the app to **GitHub Pages**.

**Not in the MVP:** GitHub login, private repositories, a database, multiplayer features, or a dedicated backend.

## 🎨 Design direction

We're aiming for the feeling of a **cozy pixel-art game**, rather than a conventional analytics dashboard:

- Crisp pixel edges and a cohesive, limited color palette.
- A small garden scene with plants, pathways, and ambient details.
- Playful but lightweight animation.
- Responsive layouts, accessible controls, and readable text.
- A garden that stays visually interesting even when a user has few repositories.

The final art style and mapping rules will be refined during prototyping.

## 🛠️ Planned tech stack

| Layer | Technology |
| --- | --- |
| UI | React + TypeScript + Vite |
| Styling | Tailwind CSS + custom pixel-art CSS |
| Visuals | SVG / CSS animations (Canvas only if needed) |
| Data | GitHub REST API (public endpoints) |
| Hosting | GitHub Pages |
| Image export | Client-side rendering/export |

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
- Render a small garden with basic plant variations.

### Phase 2 — Let it bloom 🌷
- Polish the pixel art and interactions.
- Add animations and image export.
- Test accessibility and mobile layouts.
- Publish the MVP with GitHub Pages.

### Phase 3 — A bigger world 🦋
Possible future ideas (not committed features):
- Seasons and day/night themes.
- Tiny animals and rare plants.
- Custom garden themes.
- More ways to share and compare gardens.

## 🤝 Contributing

Pixel Garden is at the **planning stage**. Ideas, feedback, pixel-art concepts, and accessibility suggestions are welcome.

Please open an Issue to discuss substantial changes before implementing them. Contribution setup instructions will be added once the initial codebase exists.

## 📍 Current status

**This repository currently contains the project concept and roadmap, not a working application.** A live demo, screenshots, installation instructions, and an explicit license will be added when available.

---

<div align="center">

**Grow something lovely from your code.** 🌸

</div>
