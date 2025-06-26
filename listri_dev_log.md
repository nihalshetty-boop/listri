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

