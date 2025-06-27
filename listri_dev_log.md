# 📘 Listri Development Log

A structured record of all development phases and progress for the **Listri** full-stack marketplace project.

---

## ✅ Phase 1: Project Foundation Setup

### 🧱 Monorepo Setup
- Switched to a monorepo structure using **Turborepo**.
- Created base folders: `apps/frontend`, `apps/backend`, `packages`, `services`.
- Initialized Turborepo pipelines (`tasks` field in `turbo.json`).

### 🌐 Frontend Initialization
- Bootstrapped Next.js 15 (App Router) in `apps/frontend`.
- Added `src/` directory.
- Tailwind CSS and `shadcn/ui` configured.
- Added base components: `Button`, `Input`, `Card`.

### 🔐 Form Validation & Auth UI
- Integrated **React Hook Form** with **Zod** for schema-based validation.
- Created `/register` and `/login` pages with validation.
- Built frontend API connection using `fetch()`.

### 🔄 Redux State Management
- Integrated **Redux Toolkit**.
- Created `authSlice` to handle login state.
- Added `Provider` in root layout.

### 🗂️ Persistent Auth State
- Implemented `localStorage` sync in Redux.
- Hydrates login state on page reload.
- Adds `logout()` with localStorage clear.

### 🧭 Dynamic Header
- Header reflects auth state:
  - "Login / Register" when logged out
  - "Dashboard / Logout" when logged in

### 🚫 Route Protection
- Added reusable `<RequireAuth>` wrapper.
- Protects pages like `/dashboard` and `/post-item`.
- Redirects unauthenticated users to `/login`.

### ⚙️ Backend Setup
- Built Express server in `apps/backend`.
- Configured TypeScript and `ts-node-dev`.
- Setup environment loading with `dotenv`.
- Enabled CORS and JSON middleware.

### 🧬 Prisma ORM + PostgreSQL
- Created `prisma/schema.prisma` and migrated DB.
- Defined `User` model with `id`, `name`, `email`, `password`.
- Connected Prisma client.

### 🔐 Backend Auth Routes
- `/auth/register`: hashed password, create user.
- `/auth/login`: verify credentials, return JWT.
- JWT secret loaded from `.env`.

---

## ✅ Phase Transition
- Phase 1 completed.
- Phase 2 will begin with the **Homepage Layout**.
- Future development will be appended here by phase.

---

## ✅ Phase 2: Homepage Build & Integration

### 🏠 Homepage Sections
- Built the main homepage layout using modular components.
- Created:
  - `HeroSection`: Headline, subheading, CTA button.
  - `FeaturedListings`: Fetched live data from [Fake Store API](https://fakestoreapi.com).
  - `CategoryHighlights`: Interactive, icon-based category grid with links to filters.
  - `HowItWorks`: 4-step guide with icons (Lucide).
  - `Footer`: Links to static `/about`, `/contact`, `/terms` pages.

### 📦 Listings Integration
- Combined mock `userListings` with external API results.
- Created reusable `Listing` type and shared across modules.
- Stored mock images in `public/images/mock/`.
- Implemented category-based filtering via `?category=...`.

### 🔧 UI Behavior & Routing
- Fixed hydration errors in `Header` by deferring client-side state rendering with `useEffect`.
- Added "Clear Filters" button using `router.push("/")`.
- Footer links route to real static pages with placeholder content.

### 🛠 Folder Structure & Best Practices
- Kept all homepage components modular in `components/home/`.
- API listings fetched on client; real listings stubbed in from mock data for now.
- Updated `next.config.js` to allow external image domains.

### ✅ Phase Closure
- Phase 2 complete with homepage MVP + live data integration.
- UI polish and design enhancements deferred to after Phase 4 or 5.
- Next phase: **User Dashboard & Profile (`/dashboard`)**


