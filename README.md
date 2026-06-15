# Forge — Intelligent Machines for the Physical World

> A world class, multi page website for a futuristic robotics company.

Forge is a fictional global robotics company that designs intelligent robots for
industry, healthcare, logistics, security, manufacturing and smart cities. This
project is the complete marketing site: eight pages, a 3D humanoid hero, a voice
enabled AI assistant and cinematic motion throughout.

## Tech stack

| Concern          | Tool                                              |
| ---------------- | ------------------------------------------------- |
| Framework        | **Next.js 16** (App Router, Turbopack)            |
| Language         | **TypeScript**                                    |
| Styling          | **Tailwind CSS v4** (CSS first `@theme` tokens)   |
| 3D               | **Three.js · React Three Fiber · @react-three/drei** |
| Scroll timelines | **GSAP + ScrollTrigger**                          |
| Component motion | **Framer Motion**                                 |
| Smooth scroll    | **Lenis** (synced to the GSAP ticker)             |
| UI primitives    | **shadcn style** components (Radix + CVA)         |
| Fonts            | Space Grotesk · Geist · Geist Mono (`next/font`)  |

> The spec called for Next.js 15. This repository is intentionally pinned to
> Next 16 (see `AGENTS.md`), a fully compatible superset, so the site is built
> on 16. Pinning back to 15 is a one line `package.json` change if required.

## Pages

`Home · About · Robots · Solutions · Research · Gallery · Careers · Contact`

| Page | Highlights |
| ---- | ---------- |
| **Home** | Full screen 3D humanoid that tracks the cursor, holographic HUD, animated particle field, GSAP cinematic intro, scroll reveals and an interactive stats counter. |
| **About** | Mission, principles, a scroll linked company timeline and animated numbers. |
| **Robots** | Six machines with real images, full specifications, capabilities and expandable detail on interactive 3D tilt cards. |
| **Solutions** | Six industries, each a cinematic section with outcomes and the robots deployed. |
| **Research** | A futuristic lab: four pillars including a live machine vision scan overlay, plus an interactive milestones timeline. |
| **Gallery** | Masonry layout with category filtering, hover reveals and a keyboard navigable lightbox. |
| **Careers** | Culture, benefits, an animated recruitment timeline, open roles and a working application form. |
| **Contact** | Working contact form, an interactive office map, support channels and a live chat trigger. |

## The AI assistant (Vex)

A floating assistant is present on every page. It opens with a smooth animation,
keeps a chat history, answers questions with intelligent predefined responses,
speaks replies with the browser Speech Synthesis API and accepts voice input
through the Web Speech Recognition API where supported. It degrades gracefully
when those browser APIs are unavailable.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## A note on media

Photography is loaded directly in the browser from public CDNs (Unsplash) and a
real hosted video. Asset URLs live in `lib/media.ts`. Every image flows through
`SmartImage`, which renders a branded carbon and cyan fallback while loading or if
a URL is ever unreachable, so the layout never breaks. The 3D hero is fully
procedural and needs no external assets, so the first impression always renders.

## Project structure

```
app/                     # routes (one folder per page), layout, global styles
components/
  sections/home/         # Home page sections (hero, stats, capabilities, …)
  pages/                 # full page compositions for inner routes
  three/                 # React Three Fiber robot scene
  assistant/             # the Vex AI assistant
  interactive/           # cursor, magnetic, tilt, counter, glow button
  media/                 # SmartImage, ParallaxImage, AmbientVideo
  typography/            # masked reveal + section heading primitives
  layout/                # navbar, footer, particle field, marquee, progress
  providers/             # Lenis and GSAP smooth scroll provider
lib/                     # site, robots, solutions, research, careers, assistant data
```
