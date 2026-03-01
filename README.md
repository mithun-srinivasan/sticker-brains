# Sticker Brains

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![npm](https://img.shields.io/badge/npm-10%2B-CB3837?logo=npm&logoColor=white)](https://www.npmjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
![Vibe Coded](https://img.shields.io/badge/Vibe-Coded-ff69b4)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#contributing)
[![Beginner Friendly](https://img.shields.io/badge/Beginner-Friendly-blue)](#quick-start-beginners)

Sticker Brains is a beginner-friendly web app where players solve mini brain teasers to unlock and download meme stickers.

## Features

- Sticker gallery
- Puzzle per sticker
- Unlock flow after correct answer
- Sticker download support

## Tech Stack

- Frontend: React + TypeScript + Vite
- Backend: Node.js + Express
- Database: SQLite (`better-sqlite3`) + Drizzle ORM
- UI: Tailwind CSS + shadcn/ui

## Project Structure

```text
sticker-brains/
├─ apps/
│  ├─ api/                         # Backend (Express)
│  │  ├─ db.ts
│  │  ├─ index.ts
│  │  ├─ routes.ts
│  │  ├─ static.ts
│  │  ├─ storage.ts
│  │  └─ vite.ts
│  └─ web/                         # Frontend (React + Vite)
│     ├─ index.html
│     ├─ requirements.md
│     ├─ public/
│     │  ├─ favicon.png
│     │  └─ memes/
│     │     ├─ README.md
│     │     └─ ...meme image files
│     └─ src/
│        ├─ App.tsx
│        ├─ main.tsx
│        ├─ index.css
│        ├─ components/
│        │  ├─ GameModal.tsx
│        │  ├─ Header.tsx
│        │  ├─ StickerCard.tsx
│        │  └─ ui/
│        │     ├─ accordion.tsx
│        │     ├─ alert-dialog.tsx
│        │     ├─ alert.tsx
│        │     ├─ aspect-ratio.tsx
│        │     ├─ avatar.tsx
│        │     ├─ badge.tsx
│        │     ├─ breadcrumb.tsx
│        │     ├─ button.tsx
│        │     ├─ calendar.tsx
│        │     ├─ card.tsx
│        │     ├─ carousel.tsx
│        │     ├─ chart.tsx
│        │     ├─ checkbox.tsx
│        │     ├─ collapsible.tsx
│        │     ├─ command.tsx
│        │     ├─ context-menu.tsx
│        │     ├─ dialog.tsx
│        │     ├─ drawer.tsx
│        │     ├─ dropdown-menu.tsx
│        │     ├─ form.tsx
│        │     ├─ hover-card.tsx
│        │     ├─ input-otp.tsx
│        │     ├─ input.tsx
│        │     ├─ label.tsx
│        │     ├─ menubar.tsx
│        │     ├─ navigation-menu.tsx
│        │     ├─ pagination.tsx
│        │     ├─ popover.tsx
│        │     ├─ progress.tsx
│        │     ├─ radio-group.tsx
│        │     ├─ resizable.tsx
│        │     ├─ scroll-area.tsx
│        │     ├─ select.tsx
│        │     ├─ separator.tsx
│        │     ├─ sheet.tsx
│        │     ├─ sidebar.tsx
│        │     ├─ skeleton.tsx
│        │     ├─ slider.tsx
│        │     ├─ switch.tsx
│        │     ├─ table.tsx
│        │     ├─ tabs.tsx
│        │     ├─ textarea.tsx
│        │     ├─ toast.tsx
│        │     ├─ toaster.tsx
│        │     ├─ toggle-group.tsx
│        │     ├─ toggle.tsx
│        │     └─ tooltip.tsx
│        ├─ hooks/
│        │  ├─ use-games.ts
│        │  ├─ use-mobile.tsx
│        │  ├─ use-stickers.ts
│        │  └─ use-toast.ts
│        ├─ lib/
│        │  ├─ queryClient.ts
│        │  └─ utils.ts
│        └─ pages/
│           ├─ Home.tsx
│           ├─ MyStickers.tsx
│           └─ not-found.tsx
├─ packages/
│  └─ shared/                      # Shared API contracts and DB schema types
│     ├─ routes.ts
│     └─ schema.ts
├─ scripts/
│  └─ build.ts
├─ components.json
├─ DEMO_INSTRUCTIONS.md
├─ drizzle.config.ts
├─ package.json
├─ postcss.config.js
├─ tailwind.config.ts
├─ tsconfig.json
└─ vite.config.ts
```

---

## Quick Start (Beginners)

### Prerequisites

- Node.js 20+
- npm 10+

### 1) Install dependencies

```bash
npm install
```

### 2) Start the app

```bash
npm run dev
```

### 3) Open in browser

`http://localhost:5000`

---

## Demo Day (Windows - safest)

If you want the most reliable command for presentations:

```powershell
npm run demo:start
```

This command:

- Frees port `5000` if it is already in use
- Applies database schema (`db:push`)
- Starts the app

---

## Available Scripts

- `npm run dev` - start local development server
- `npm run demo:start` - prepare + run app (best for demo)
- `npm run demo:ready` - free port + apply database schema
- `npm run check` - TypeScript type check
- `npm run build` - production build
- `npm run start` - run production build
- `npm run db:push` - apply DB schema changes

---

## Troubleshooting

### Port 5000 already in use

```powershell
npm run dev:clean
```

Then start again:

```bash
npm run dev
```

### Database table errors (example: "no such table")

```bash
npm run db:push
```

Then run:

```bash
npm run dev
```

---

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a branch (`feature/your-change`)
3. Make your changes
4. Run checks (`npm run check`)
5. Open a Pull Request

### Contribution rules

- Put frontend code in `apps/web`
- Put backend code in `apps/api`
- Put shared contracts in `packages/shared`
- Keep changes focused and easy to review

---

## License

MIT
