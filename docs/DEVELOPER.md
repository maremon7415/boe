# Developer Guide

This guide explains how the app is structured and how to work with its data, auth, and admin features.

## Local Setup
1. Install dependencies
```
npm install
```

2. Environment variables
Create `.env.local` at repo root:
```
MONGODB_URI=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

3. Run the dev server
```
npm run dev
```

## Data Sources
- User data: MongoDB via Mongoose models in `models/`
- Club content (tournaments, matches, news, achievements, sponsors): in-memory client state from `lib/dummy-data.ts` through `contexts/data-context.tsx`

## Auth Flow
- Login: `POST /api/auth/login` returns a JWT and user object
- Token storage: `localStorage` in `contexts/auth-context.tsx`
- Session refresh: `GET /api/auth/me` to refresh the stored profile
- Role checks: `lib/auth.ts` with `isAuthenticated`, `isAdmin`, and `isAdministrator`

## Admin Panel
- Route: `/admin`
- Access: only `ADMIN` and `ADMINISTRATOR` (checked client-side and server-side for API)
- User management APIs:
  - `GET /api/admin/users`
  - `PUT /api/admin/users/[id]`
  - `DELETE /api/admin/users/[id]` (administrator only)

## Database Schema
Primary model: `models/User.ts`
- Required fields: `clubId`, `fullName`, `email`, `password`, `device`, `dob`, `gender`
- `role` defaults to `PENDING`
- `stats` uses points and goal difference for sorting

## Seeding and Cleanup
- Seed the database with sample users
```
npm run seed
```
- Delete all users
```
npm run clean-users
```

Seed script defaults:
- Creates 30 users across roles
- Default password: `password123`
- Resets the club ID counter to `BOE-0031`

## Deployment Notes
- Standard Next.js production flow: `npm run build` then `npm run start`
- Custom server: `server.js` runs a Node HTTP server for environments like cPanel

## Common Gotchas
- `MONGODB_URI` is required; the app throws on boot if missing
- Cloudinary credentials are required for profile image updates
- `/api/auth/logut` exists but has no implementation
