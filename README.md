# Itzfizz - Scroll-Driven Hero Section Animation

A scroll-driven hero section animation built for the **Itzfizz Digital Web Development Internship** assignment.

## Tech Stack

This project satisfies the mandatory and optional tech stack requirements:

| Requirement | Technology Used |
|---|---|
| HTML | JSX (React component syntax — compiles to HTML) |
| CSS | Tailwind CSS + Bootstrap 5 (grid layout) |
| JavaScript | TypeScript (superset of JS) |
| GSAP | gsap + ScrollTrigger plugin |
| Next.js / React.js | Next.js 16 (App Router) |
| Tailwind | Tailwind CSS |
| Bootstrap (Plus Point) | Bootstrap 5 grid (`bootstrap/dist/css/bootstrap-grid.min.css`) |

> **Note on vanilla HTML/CSS/JS:** Next.js/React compiles down to standard HTML, CSS, and JavaScript — no special runtime is needed in production. The assignment explicitly lists Next.js/React and Tailwind as acceptable technologies in the tech stack.

## Features

- Scroll-driven car animation tied to scroll progress (not time-based)
- Staggered headline letter reveal on load
- Percentage-based impact metrics animating in with scroll
- GSAP ScrollTrigger scrub for smooth bidirectional animation
- Parallax grid + decorative elements
- Cursor trail effect
- Car click easter egg (engine rev)
- Keyboard arrow key navigation
- Mobile touch support

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view.

## Deployment

The project can be deployed to GitHub Pages via `next export` or hosted on Vercel.
