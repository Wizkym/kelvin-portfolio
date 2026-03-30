# CLAUDE.md — Kelvin Portfolio Project Reference

This file captures everything about this project so future sessions start with full context.

---

## Project Overview

Personal portfolio site for **Kelvin Mundi**, Senior Frontend Engineer specializing in Angular and enterprise financial applications. Based in Atlanta, GA, originally from Nairobi, Kenya.

- **Framework:** Angular 21.2 (standalone components, no NgModule)
- **Build system:** Vite-based via `@angular/build:application`
- **Styling:** SCSS + Bootstrap 5.3.8 grid/utilities
- **Icons:** IonIcons — local `ionicons.min.css` (legacy class-based) + Ionicons v7 web components loaded in `index.html`
- **State:** Angular Signals (`signal()`, `computed()`) — no NgRx
- **Forms:** Reactive forms (FormBuilder + Validators)
- **Fonts:** Poppins from Google Fonts (weights 300–800)
- **Testing:** Vitest

**Scripts:**
- `npm start` → dev server
- `npm run build` → production build

---

## Folder Structure

```
src/
├── app/
│   ├── app.ts                          Root component — composes all sections
│   ├── app.config.ts                   Angular bootstrap config (error listeners, HTTP)
│   ├── core/
│   │   ├── models/
│   │   │   ├── project.model.ts        ProjectItem interface + PROJECTS array (5 projects)
│   │   │   ├── resume.model.ts         EducationItem + ExperienceItem interfaces + data
│   │   │   └── skill.model.ts          Skill interface + SKILLS array (9 skills)
│   │   ├── pipes/
│   │   │   └── age.pipe.ts             Calculates age from a birthdate string
│   │   └── services/
│   │       ├── modal.service.ts        Singleton signal-based modal state manager
│   │       └── contact.service.ts      POSTs contact form to https://thek2mundy.com/send
│   ├── features/
│   │   ├── about/
│   │   │   └── about-modal.ts          About Me modal (bio, personal info, services)
│   │   ├── resume/
│   │   │   ├── resume-modal.ts         Resume modal (education, experience, skills)
│   │   │   └── skill-bar/
│   │   │       └── skill-bar.ts        Animated skill progress bar component
│   │   ├── portfolio/
│   │   │   ├── portfolio-modal.ts      Portfolio gallery modal
│   │   │   └── project-card/
│   │   │       └── project-card.ts     Individual project card with hover overlay
│   │   ├── contact/
│   │   │   └── contact-modal.ts        Contact form modal with submission states
│   │   └── home/
│   │       ├── home.ts                 Hero landing section (full viewport)
│   │       └── rotating-headline/
│   │           └── rotating-headline.ts  Word-rotation animation (width transition)
│   ├── layout/
│   │   └── navbar/
│   │       └── navbar.ts               Fixed top nav with modal triggers
│   └── shared/
│       ├── preloader/
│       │   └── preloader.ts            3-dot loader shown for ~900ms on startup
│       └── overlay-effect/
│           └── overlay-effect.ts       Full-screen dark overlay between modal transitions
├── main.ts                             Bootstrap entry point
├── index.html                          HTML shell (meta tags, fonts, icon scripts)
└── styles.scss                         Global styles (~759 lines)

public/
├── assets/resume.pdf                   Downloadable resume
├── favicons/                           Favicon set
├── fonts/                              Local font files
├── img/                                Profile photo (winery.jpeg) + project screenshots
└── ionicons.min.css                    Legacy icon font CSS
```

---

## Architecture & Patterns

### SPA Navigation (no routing)
There is no Angular Router. All navigation is modal-based:
- The root component renders the home hero section plus all four modals stacked in the DOM.
- `ModalService` (singleton, signals) tracks which modal is open via `activeModal: Signal<ModalId>`.
- Clicking a nav item calls `modalService.open('about' | 'resume' | 'portfolio' | 'contact')`.
- The overlay effect animates up, the modal fades in after 350ms delay; closing animates the overlay back down.

### Modal Open/Close Flow
1. `open(id)` → `overlayState = 'animate-up'`
2. After 350ms → `activeModal = id` → modal gets `modal-open` class → `z-index: 9990`, `opacity: 1`
3. `close()` → `activeModal = null` → `overlayState = 'animate-down'` (1s animation)

### Component Architecture
- All components are **standalone** — imports declared per component, no shared NgModule.
- Services injected with `inject()` function, not constructor injection.
- Template control flow uses `@for` and `@if` (Angular 17+ syntax).

### IonIcons Usage (Important)
Two systems are loaded — they are NOT interchangeable:

| System | Format | Works for |
|---|---|---|
| Legacy CSS (`ionicons.min.css`) | `<i class="ion-logo-html5">` | Class-based icons in `<i>` tags |
| Web components (v7 CDN script) | `<ion-icon name="logo-html5">` | Web component elements |

**Legacy CSS icon names use platform prefixes:** `ion-ios-*` or `ion-md-*` for most icons.
- `ion-logo-*` names work directly (no prefix needed).
- Outline variants require the prefix: `ion-ios-cloud-outline` not `ion-cloud-outline`.
- `ion-phone-portrait-outline` does NOT exist in legacy — use `ion-ios-phone-portrait`.

---

## Design Choices

### Color Palette (CSS variables in `styles.scss`)
```scss
--color-scheme:       #009e66   // Primary green accent
--color-scheme-dark:  #006b45   // Hover state
--color-scheme-hover: #005235   // Darker hover
--color-scheme-light: #00bd7a   // Lighter green
--color-scheme-focus: #00d187   // Input focus ring
```
- Body background: `#111` (near black)
- Card/surface backgrounds: `#161616`
- Overlay background: `#181818`
- Default text: `#9f9f9f` (mid gray)
- Headings: `#f0f0f0` (near white)
- Borders/dividers: `rgba(255,255,255,0.08)` or `#313131`

### Typography
- Font family: **Poppins** everywhere (Google Fonts)
- Base: 14px, line-height 1.95
- Home name: 70px → 62px → 48px (responsive)
- Home headline: 32px → 30px → 26px
- Section titles: 46px (page), 38px (sub), 36px (mobile)

### Layout
- Bootstrap 5 grid for column layouts.
- Modals are full-screen lightboxes with `position: fixed; inset: 0`.
- Content inside modals uses `.container` (Bootstrap) with `margin: 70px auto` for vertical spacing + horizontal centering.
- The `.lightbox-content` `margin` must be `70px auto` (not `70px 0`) — `0` kills Bootstrap's auto left/right margins and left-aligns content.

### Responsive Breakpoints
- `≥992px` — Desktop: full nav, multi-column layouts
- `768–991px` — Tablet: hamburger menu, adjusted font sizes
- `<768px` — Mobile: hamburger menu, single column, fixed social icons hidden

---

## Sections & Content

### Navbar
- Logo: "Kelvin Mundi" (uppercase via CSS)
- Nav items: About | Resume | Portfolio | Contact
- Mobile: hamburger (30px wide), dropdown at 200px, dark bg `#191919`

### Home (Hero)
- Full viewport, dark background with cover image
- Circular profile photo (200×200px, white border)
- Name: "Kelvin **Mundi**" — "Mundi" styled in `--color-scheme` green
- Rotating headline: "I'm [a Developer / an Engineer / a Designer / a Freelancer]"
- Fixed social icons bottom-right: LinkedIn + GitHub (hidden on mobile)

### About Modal
- **Bio:** Senior Frontend Engineer, Angular + enterprise financial apps, Atlanta GA, Nairobi Kenya roots
- **Personal info:** Name, Email (kevkmundy@gmail.com), Age (calculated from 1993/12/18), Location (Atlanta, GA, USA)
- **Profile image:** `img/winery.jpeg`
- **Resume:** Downloads `assets/resume.pdf`
- **Social links:** LinkedIn (`linkedin.com/in/kelvin-mundi`), GitHub (`github.com/Wizkym`), Instagram (`instagram.com/kymosabe_/`)
- **Services:**
  1. Web Development (`ion-logo-html5`) — Angular, React, TypeScript
  2. Mobile Apps (`ion-ios-phone-portrait`) — Cross-platform mobile
  3. Cloud Native (`ion-ios-cloud-outline`) — Microservices, CI/CD, Docker

### Resume Modal
- **Education (left column):**
  1. BS Information Technology — Strayer University, 2018–2019
  2. Full Stack Dev Certificate — Georgia Tech, 2018–2019
  3. AAS Computer Programming — West Georgia Tech, 2014–2017
- **Experience (right column):**
  1. Senior Frontend Engineer @ Backbase USA — 04/2021–Present (4 bullets)
  2. Software Engineering Consultant @ EY — 02/2019–11/2020 (3 bullets)
- **Skills (full-width):** Angular 95%, TypeScript 95%, HTML/CSS/SASS 90%, JavaScript 90%, NgRx 80%, React 75%, Node.js/Express 75%, Docker/CI-CD 70%, MongoDB/MySQL 65%

### Portfolio Modal
5 projects in a responsive grid:
1. LIRI-Bot — CLI Node.js app
2. SouthPark Click — React memory game
3. Bingo Game — Visual Basic bingo app
4. My Hours — Time tracking app
5. Pet Perfect — Pet adoption finder

### Contact Modal
- Reactive form: Name, Email, Subject, Message (all required)
- Submit states: idle → wait (gray) → success (green) / error (red) → auto-reset after 6s
- Endpoint: POST `https://thek2mundy.com/send`
- Right column info: Name, Email, Location (Atlanta GA), Phone (+1 404 789 9005)

---

## Key Files to Know

| File | Why it matters |
|---|---|
| `src/styles.scss` | All global + component styles in one file (~759 lines) |
| `src/app/core/services/modal.service.ts` | Central state; drives all navigation |
| `src/app/app.ts` | Root template; add any new top-level component here |
| `src/index.html` | Icon scripts, fonts, meta tags live here |
| `public/ionicons.min.css` | Source of truth for valid legacy icon class names |
| `src/app/core/models/*.ts` | All static data (projects, resume, skills) lives here |

---

## Gotchas & Notes

- **IonIcons legacy names:** always check `public/ionicons.min.css` before using a class-based icon — `ion-X-outline` format only works with the `ion-ios-` or `ion-md-` prefix for most icons.
- **Modal centering:** `.lightbox-content` needs `margin: 70px auto`, NOT `margin: 70px 0`. The latter removes Bootstrap container's auto horizontal margin.
- **No router:** Navigation is purely signal-based modal toggling. Don't add `RouterModule` or `<router-outlet>`.
- **Standalone only:** No NgModule exists. Every component declares its own `imports: []`.
- **AgePipe is impure** (`pure: false`) — this is intentional so age recalculates on change detection cycles.
- **CUSTOM_ELEMENTS_SCHEMA** is set on `app.ts` (root) — required for Ionicons v7 web component tags like `<ion-icon>` to avoid template errors.
