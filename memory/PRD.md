# PRD — Israel's Portfolio

## Original Problem Statement
"i want to build a clean and minimal portfolio using only colours like white, black, and brown" — later refined: owner is **Israel**, a **Full-Stack Engineer & Systems Architect**, inspired by a Swiss-editorial framed layout sample (framed white canvas, massive overlapping headline, vertical nav list, metadata blocks).

## User Personas
- **Israel (owner)**: full-stack engineer + systems architect; wants a minimal editorial portfolio and an inbox to view contact enquiries.
- **Visitors/recruiters**: browse work, read the manifesto, send a message via the contact form.

## Architecture
- **Frontend**: React 19 + Tailwind + framer-motion (masked line reveals, scroll reveals, 3D tilt/parallax hero) + lenis smooth scrolling. Routes: `/` (portfolio), `/dashboard` (inbox).
- **Backend**: FastAPI, MongoDB (motor). Endpoints (all `/api` prefixed):
  - `POST /api/messages` — create enquiry
  - `GET /api/messages` — list enquiries (newest first)
  - `PATCH /api/messages/{id}/read` — mark read
  - `DELETE /api/messages/{id}` — delete
- **Palette**: cream `#F1EDE4`, paper `#FDFBF7`, ink `#111111`, espresso `#6E473B`, rust `#8C5A4A`, tan `#D4A373`. Fonts: Cormorant Garamond (display), Plus Jakarta Sans (body), JetBrains Mono (mono).

## Core Requirements (static)
- Hero, About, Projects/Work, Skills, Contact sections
- Contact form saves messages to a viewable dashboard
- Strict white/black/brown palette, warm-light editorial mood

## Implemented (2026-09-02)
- Signature framed hero: masked line-by-line headline reveal, sepia code-window visual with 3D mouse tilt + scroll parallax, vertical nav list, metadata blocks, circular CTA
- Slow editorial marquee strip
- About as numbered manifesto chapters (01 Craft / 02 Systems / 03 Discipline)
- 4 code-focused project cards with syntax-tinted snippet windows (Lattice, Ledgerline, Pulseboard, Forge — sample content)
- Skills capability matrix on dark ink panel
- Contact form → backend → `/dashboard` inbox with unread badge, mark-read, delete
- Lenis smooth scrolling, grain texture overlay, custom link-underline micro-interactions
- **Inbox Lock**: `/dashboard` gated by owner password (`INBOX_PASSWORD` env) → JWT (12h) via `POST /api/auth/inbox-login`; GET/PATCH/DELETE `/api/messages` require Bearer token; POST stays public; login gate + "Lock" (logout) in dashboard header
- **Availability Badge**: pulsing "Available for work" dot + live local clock (Africa/Lagos, UTC+1) in the hero
- **Real Projects** (2026-09-02): 5 real projects — Bazaarflow (SaaS store builder), Clove (permission-based autonomous AI agent), Jabali (Nigerian real estate marketplace), Cipher (E2E encrypted ephemeral messaging), Iyapay (fintech for unbanked Nigeria, USSD)
- **Horizontal layouts**: Work is a sticky horizontal-scroll shelf (scroll-driven, with progress hairline); About chapters sit side-by-side in 3 columns; nav links horizontal; name "ISRAEL" in bold caps with espresso highlight box; wave mark removed from hero
- **Contact email**: salemisrael392@gmail.com shown in Contact section + footer (mailto)
- **Email Alerts**: every new contact message triggers a Resend notification (Emergent-managed) to salemisrael392@gmail.com — background, non-blocking; verified with a real 202 Accepted send

- **Mobile polish** (2026-09-02): fixed page-wide horizontal overflow (12-col grid gaps forced 440px min width on Contact/CaseStudy → responsive `gap-6 md:gap-*`); hero parallax + 3D tilt gated to desktop (≥1024px) to stop mobile overlap; hero stat/location stack on small screens; all nav links visible on mobile with slim tracking; fixed nav got `bg-cream/80 backdrop-blur-md` so text never bleeds through

## Backlog / Next Tasks
- P0: ~~Attach real project screenshots~~ PARTIAL (2026-09-02): 4 brand logos placed on cards (Bazaarflow, Clove, Jabali, Iyapay — grayscale → full color on hover/click; full color on case-study pages). Cipher keeps its code window (no logo provided). App screenshots still welcome — `image:` field per project in `src/data/projects.js`
- NOTE: Spelling confirmed by owner as "Bazaarflow" (site title correct; logo artwork itself reads "Bazzarflow" — accepted as-is). Cipher intentionally keeps its code window, no logo.
- P1: ~~Real GitHub/LinkedIn URLs for footer links~~ DONE (2026-09-02): github.com/salemisrael392 + linkedin.com/in/israel-ibrahim-a8b816340, open in new tab
- P2: ~~Case-study detail pages per project~~ DONE (2026-09-02): `/work/:slug` pages for all 5 projects (shared data in `src/data/projects.js`) with role/year/stack meta, code window, Problem → What I Built → Outcome story chapters, and next-project navigation; blog/writing section; dark-mode toggle
