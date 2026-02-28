# 🚗 Scroll-Driven Hero Section Animation

**Assignment Submission — Itzfizz Digital Web Development Internship**

A premium, scroll-driven hero section animation built with React/Next.js, GSAP, Tailwind CSS, and Bootstrap — showcasing fluid motion design, scroll-synced interactions, and modern frontend engineering.

---

## ✅ Assignment Requirements — All Fulfilled

### 1. Hero Section Layout
- Full-screen hero section (above the fold, `100vh`)
- Letter-spaced headline: **W E L C O M E  I T Z F I Z Z**
- Four percentage-based impact metrics displayed below the headline

### 2. Initial Load Animation
- Headline letters animate in with a **staggered 3D flip + fade** (GSAP `stagger`, `rotateX`, `opacity`)
- Stats cards animate in sequence with smooth delay
- All animations feel premium and non-abrupt

### 3. Scroll-Based Animation (Core Feature)
- A custom SVG car moves horizontally across the screen, **fully tied to scroll progress** (not time-based)
- Animation uses GSAP `ScrollTrigger` with `scrub: 1` for smooth, natural easing
- Stats cards animate in from the bottom as you scroll down, and reverse back on scroll up
- Parallax effect on background grid and decorative SVGs
- Scroll progress bar at the top of the viewport

### 4. Motion & Performance Guidelines
- All animations use **CSS transform properties** (`translateX`, `translateY`, `scale`, `skewX`) — zero layout reflows
- `will-change: transform` applied to animated elements for GPU acceleration
- Scroll events use RAF (RequestAnimationFrame) batching to prevent jank
- No heavy calculations on the main thread during scroll

---

## 🛠️ Tech Stack

| Requirement | Status | Technology |
|---|---|---|
| HTML | ✅ | JSX (compiles to semantic HTML5) |
| CSS | ✅ | Tailwind CSS + Bootstrap 5 |
| JavaScript | ✅ | TypeScript (strict superset of JS) |
| GSAP | ✅ | `gsap` + `ScrollTrigger` plugin |
| Next.js / React.js | ✅ | Next.js 16 (App Router) |
| Tailwind | ✅ | Tailwind CSS |
| Bootstrap ⭐ (Plus Point) | ✅ | Bootstrap 5 Grid System |

> **Note:** Next.js compiles to standard HTML, CSS, and JavaScript — no special runtime is needed in the browser. It satisfies the mandatory vanilla web stack requirement while enabling a modern developer experience.

---

## ✨ Bonus Features

- 🖱️ **Cursor trail effect** — golden glowing dots follow the mouse in the hero section
- 🚗 **Car click easter egg** — clicking the car triggers an engine rev animation with speed lines
- ⌨️ **Keyboard navigation** — Arrow keys scroll the page (like driving!)
- 📱 **Touch support** — custom touch handler for mobile scroll experience
- 💡 **Headlight animation** — looping ambient glow on the car's headlights
- 🌫️ **Exhaust smoke** — smoke particles appear at high scroll velocity

---

## 🚀 Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📦 Deployment

Deployable to **GitHub Pages** (via static export) or **Vercel**.

---

*Built by Milind Shandilya*
