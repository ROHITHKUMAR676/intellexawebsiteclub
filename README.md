# INTELLEXA — Club Website

Premium, cinematic frontend for INTELLEXA, the technical innovation club of
Rajalakshmi Engineering College. Built with React, TypeScript, Tailwind CSS v4,
Framer Motion, GSAP-ready tooling, Lenis smooth scroll, and a Three.js particle
background.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

`npm run build` outputs a static site to `dist/` — deploy that folder anywhere
(Vercel, Netlify, GitHub Pages, any static host).

## What's inside

- `src/components/IntroSequence.tsx` — the cinematic sketch-line intro, coin
  drop, and logo reveal. Includes a synthesized impact "thud" (Web Audio,
  no external audio file) and a "Skip intro" control. Respects
  `prefers-reduced-motion`.
- `src/components/CustomCursor.tsx` — magnetic ring cursor that morphs over
  buttons, links, and cards. Automatically disabled on touch devices.
- `src/three/ParticleField.tsx` — ambient Three.js starfield behind the hero,
  mouse-reactive, capped at a lower particle count on small screens.
- `src/components/Navbar.tsx` — sticky glass navbar with scroll-spy active
  state and a mobile menu.
- `src/components/History.tsx` — scroll-driven vertical timeline (single
  column on mobile, alternating on desktop).
- `src/components/Events.tsx` / `Achievements.tsx` — horizontal scroll
  storytelling on desktop, native swipeable carousels on mobile.
- `src/components/Members.tsx` — tilting glass profile cards with orbiting
  rings (no external images — initials avatars keep the project self-contained).
- `src/data/content.ts` — all copy in one place. Edit this file to update
  history milestones, events, achievements, and member details without
  touching component code.

## Notes

- All colors/type live in `src/index.css` under `@theme` (Tailwind v4 token
  system) — change the palette or fonts there.
- Member photos are intentionally generated (gradient + initials) rather than
  external image URLs, so the site works fully offline once installed.
- The contact form is front-end only (no backend wired up) — connect
  `handleSubmit` in `src/components/Contact.tsx` to your form provider or API
  of choice.
