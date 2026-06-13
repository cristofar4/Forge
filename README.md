# Crown & Blade — Luxury Barbershop Experience

> _The Art of the Modern Gentleman._

An Awwwards-calibre, cinematic website for a fictional Mayfair grooming atelier.
Built as one continuous scroll-driven journey: a 3D hero centrepiece, GSAP scene
choreography, immersive transitions, editorial typography and luxury micro-interactions.

## Tech stack

| Concern            | Tool                                             |
| ------------------ | ------------------------------------------------ |
| Framework          | **Next.js 16** (App Router, Turbopack)           |
| Language           | **TypeScript**                                   |
| Styling            | **Tailwind CSS v4** (CSS-first `@theme` tokens)  |
| 3D                 | **Three.js · React Three Fiber · @react-three/drei** |
| Scroll timelines   | **GSAP + ScrollTrigger**                         |
| Component motion   | **Framer Motion**                                |
| Smooth scroll      | **Lenis** (synced to GSAP ticker)                |
| UI primitives      | **shadcn-style** components (Radix + CVA)        |
| Fonts              | Bodoni Moda · Cormorant · Geist (`next/font`)    |

## The experience

| Section | Signature animation |
| ------- | ------------------- |
| **Hero** | Procedural metallic straight-razor in a studio-lit 3D scene with drifting gold dust; the blade opens/closes and the camera dollies as you scroll. Letter-masked headline choreography. |
| **About** | Editorial manifesto, parallax + real ambient video, animated stat counters, the four-step "Ritual". |
| **Services** | Interactive configurator — hover a service to crossfade a cinematic preview with live pricing & inclusions. |
| **Gallery** | GSAP-pinned **horizontal** scroll reel, shot like a fashion campaign, with a progress rail. |
| **Team** | "Celebrity artist" cards with 3D pointer-tilt, gold glare and reveal-on-hover bios. |
| **Booking** | Premium 4-step reservation flow with a live summary panel and an animated confirmation. |
| **Testimonials** | Auto-advancing cinematic quotes with word-level reveals and a progress timeline. |
| **Contact** | Editorial visit panel, hours, location card, and an oversized closing wordmark. |

Throughout: a bespoke magnetic cursor, magnetic CTAs, film grain + vignette, a
gilded scroll-progress hairline, and full `prefers-reduced-motion` fallbacks.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## A note on media

Photography is loaded **directly in the browser** from public CDNs (Unsplash) and
real hosted video, rather than vendored into the repo — the asset URLs live in
[`lib/media.ts`](lib/media.ts). Every image goes through
[`SmartImage`](components/media/SmartImage.tsx), which renders a branded
obsidian/gold fallback panel while loading or if a URL is ever unreachable, so the
composition never shows a broken image. To use your own art direction, swap the
URLs in `lib/media.ts` and `lib/content.ts` (or drop files into `public/`).

The 3D hero is fully procedural (no external assets), so the first-impression
centrepiece always renders.

## Project structure

```
app/                     # layout, page composition, global styles, icon
components/
  sections/              # Hero, About, Services, Gallery, Team, Booking, …
  three/                 # React Three Fiber hero scene
  interactive/           # cursor, magnetic, tilt, counter, signature CTA
  media/                 # SmartImage, ParallaxImage, AmbientVideo
  typography/            # masked reveal + section heading primitives
  layout/                # navbar, footer, grain, marquee, scroll progress
  providers/             # Lenis ↔ GSAP smooth-scroll provider
lib/                     # design-token helpers, gsap setup, content & media data
```
