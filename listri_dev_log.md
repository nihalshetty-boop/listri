# Listri Development Log

This document tracks the development progress of the Listri application, a marketplace platform built with Next.js, Express, and PostgreSQL.

## Phase 1: Project Setup & Authentication

### Initial Setup
- Created monorepo structure with `apps/frontend` and `apps/backend`
- Set up Next.js 14 with TypeScript and Tailwind CSS
- Configured Express backend with TypeScript
- Added PostgreSQL database with Prisma ORM
- Implemented basic authentication system

### Authentication System
- Created registration and login forms
- Implemented JWT token-based authentication
- Added protected routes with `RequireAuth` component
- Set up Redux store for user state management
- Created user profile page with logout functionality

### Database Schema
- Designed user table with email, password, and profile fields
- Set up Prisma migrations and client generation
- Implemented password hashing with bcrypt
- Added JWT secret configuration

## Phase 2: Homepage & Listings Display

### Homepage Components
- Created:
  - `HeroSection`: Headline, subheading, CTA button.
  - `FeaturedListings`: Fetched live data from [Fake Store API](https://fakestoreapi.com).
  - `CategoryHighlights`: Interactive, icon-based category grid with links to filters.
  - `HowItWorks`: 4-step guide with icons (Lucide).
  - `Footer`: Links to static `/about`, `/contact`, `/terms` pages.

### Listings Integration
- Combined mock `userListings` with external API results.
- Created reusable `Listing` type and shared across modules.
- Stored mock images in `public/images/mock/`.
- Implemented category-based filtering via `?category=...`.

### UI Behavior & Routing
- Fixed hydration errors in `Header` by deferring client-side state rendering with `useEffect`.
- Added "Clear Filters" button using `router.push("/")`.
- Footer links route to real static pages with placeholder content.

### Folder Structure & Best Practices
- Kept all homepage components modular in `components/home/`.
- API listings fetched on client; real listings stubbed in from mock data for now.
- Updated `next.config.js` to allow external image domains.

### Phase Closure
- Phase 2 complete with homepage MVP + live data integration.
- UI polish and design enhancements deferred to after Phase 4 or 5.
- Next phase: **User Dashboard & Profile (`/dashboard`)**

---

## Phase 3: User Listing System (Dashboard → Posting → Editing)

### Dashboard & User Listings
- Created `/dashboard` route with protected access.
- Displays logged-in user info and their posted listings.
- Listings pulled dynamically from `listingsSlice` in Redux.
- Filtered using `userId` to show only relevant data.

### Listings Redux Slice
- Added `listingsSlice.ts` with full CRUD actions:
  - `addListing`, `editListing`, `deleteListing`
- Created `selectUserListings(userId)` selector.
- Mock listings seeded with sample users and categories.

### Listing Card Actions
- Each listing includes:
  - **Edit** button → links to `/edit-item/:id`
  - **Delete** button → removes from Redux
- Cards show title, price, and image using `next/image`.

### Post New Item Entry Point
- Added "Post New Item" button linking to `/post-item`.
- Prepares for Phase 4 (listing creation form and detail view).

### Phase Closure
- Phase 3 delivers a complete internal user listing system:
  - Listing display, management, and ownership filtering.
- All functionality built using frontend state (Redux) as a stand-in for future backend logic.

---

## Phase 4: Listing Creation, Detail View & Routing

### Post Item Form (`/post-item`)
- Created full listing form with React Hook Form + Zod validation.
- Fields: `title`, `description`, `price`, `imageUrl`, `category`.
- On submit:
  - Generates `id`, `createdAt`, `userId`.
  - Dispatches to Redux `listingsSlice`.
  - Redirects to `/dashboard`.

### Listing Detail Page (`/listing/:id`)
- Created dynamic route with fallback logic:
  - First checks Redux state
  - Then checks `userListings.ts`
  - Finally fetches from [Fake Store API](https://fakestoreapi.com/products/:id)
- Normalized results using a shared `UnifiedListing` type.
- Displays image, title, price, description, category, and seller ID.
- Added "Contact Seller" (stub) and "Back to Home" navigation.

### Internal Routing Enhancements
- Wrapped homepage and dashboard cards in `<Link href="/listing/:id">` for navigation.
- Supported ID normalization (number or string).
- Resolved 404 issue by supporting multi-source ID lookups.

### Technical Improvements
- Used `useParams()` for dynamic routing.
- Applied `"use client"` to all affected components.
- Improved error resilience with `loading` and `notFound()` logic.

### Phase Closure
- Phase 4 completed with full listing creation, viewing, and routing.
- Fully supports merged data sources: Redux, local mock, and external API.
- Ready for backend/database integration in Phase 5.

---

## Phase 5: Backend Integration (Listings CRUD with API & DB)

### Database Integration with Prisma
- Setup real `POST /api/listings` route in Express.
- Created listing in DB with real `userId`, `createdAt`, `id` via Prisma.
- Verified creation via Postman and database.

### Read Listings from Backend
- Replaced Redux listing reads in `FeaturedListings` with `fetch("/api/listings")`.
- Combined results with Fake Store API for fallback/placeholder listings.
- Applied filters via query params.
- Updated `next.config.js` with `placehold.co` as a valid image domain.

### Dashboard Backend Integration
- Modified `/dashboard` to fetch listings from API.
- Filtered by `userId` to show current user's listings.
- Removed Redux dependency for listings.

### Listing Creation with API
- `/post-item` now `POST`s to backend API instead of using Redux.
- Fields: title, description, price, imageUrl, category, userId.
- Redirects to dashboard after creation.

### Listing Deletion
- Implemented `DELETE /api/listings/:id` route in Express.
- Hooked up Delete button in Dashboard.
- Listings removed from database and UI upon success.

### Listing Editing
- Created `PUT /api/listings/:id` route in backend.
- Created `/edit-item/:id` page:
  - Fetches existing listing data from API
  - Pre-fills form
  - Updates backend on submit
  - Redirects to dashboard

### Phase Closure
- Full CRUD support connected to backend:
  - Create, Read, Update, Delete listings via REST API.
- Removed Redux listing logic in favor of persistent backend.
- Project is now fully database-driven for listings.
- Next: **Phase 6 – Backend Infrastructure & Bug Fixes**

---

## Phase 6: Backend Infrastructure & Bug Fixes

### Critical Backend Infrastructure Fixes
- **Fixed Prisma Client Issues**: Added missing `@prisma/client` dependency to backend `package.json`.
- **Resolved Environment Variables**: Copied `.env` file to backend directory to fix `DATABASE_URL` not found error.
- **Fixed TypeScript Configuration**: Moved `listings.ts` routes from `routes/` to `src/routes/` to resolve TypeScript `rootDir` errors.
- **Prisma Client Generation**: Properly generated Prisma client and copied to backend's `node_modules` directory.

### Registration & Login Bug Fixes
- **Fixed JSON Parsing Error**: Resolved "Unexpected token '<', "<!DOCTYPE "... is not valid JSON" error during registration.
- **Root Cause**: Backend server was missing Prisma dependencies and environment variables.
- **Solution**: Complete backend dependency setup and environment configuration.

### API Route Integration
- **Unified Backend Server**: Combined auth routes (`/auth`) and listings routes (`/api/listings`) in single Express server.
- **Fixed Import Paths**: Updated all route imports to use correct relative paths within `src/` directory.
- **Server Consolidation**: Eliminated duplicate server files (`app.ts` vs `src/index.ts`).

### Testing & Verification
- **API Endpoint Testing**: Verified both `/auth/register` and `/api/listings` endpoints return proper JSON responses.
- **Database Connectivity**: Confirmed PostgreSQL connection and Prisma migrations working correctly.
- **Frontend Integration**: Tested complete user registration → login → view listings flow.

### Project Structure Improvements
- **Backend Organization**: Standardized backend structure with all routes under `src/routes/`.
- **Dependency Management**: Properly configured Prisma client generation and installation.
- **Environment Setup**: Ensured consistent environment variable loading across development.

### Phase Closure
- **Critical Infrastructure**: Backend now fully functional with proper database connectivity.
- **User Authentication**: Registration and login working without JSON parsing errors.
- **Listings Display**: Homepage now shows listings from both database and external API.
- **Development Ready**: Project structure optimized for continued development.
- Next: **Phase 7 – Chat System Integration & Real-time Messaging**

---

## Phase 7: Chat System Integration & Real-time Messaging

### API Route Integration
- **Chat System Integration**: Implemented real-time messaging functionality using WebSockets.
- **WebSocket Setup**: Configured WebSockets for real-time communication between users.
- **Message Handling**: Implemented message handling logic in backend to manage incoming messages.

### Testing & Verification
- **Chat System Testing**: Verified real-time messaging functionality in the application.
- **Message Delivery**: Confirmed messages are delivered to the correct recipient.
- **Error Handling**: Tested error handling logic for message delivery failures.

### Project Structure Improvements
- **Backend Organization**: Standardized backend structure with all routes under `src/routes/`.
- **Dependency Management**: Properly configured WebSocket setup and integration.
- **Environment Setup**: Ensured consistent environment variable loading across development.

### Phase Closure
- **Real-time Messaging**: Application now supports real-time messaging between users.
- **Development Ready**: Project structure optimized for continued development.
