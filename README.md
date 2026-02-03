# Brotherhood of Excellence Gaming Club

A Next.js 15 app for an elite gaming club community with public pages, player roster, profiles, and an admin panel. The app uses MongoDB for user data and a client-side data context for tournaments, matches, news, achievements, and sponsors.

## Highlights
- Public landing page with multiple feature sections
- Player roster with search, filters, sorting, and pagination
- Player profile with stats, device info, and social links
- Registration and login with JWT-based auth
- Admin panel for managing users and club content

## Tech Stack
- Next.js 15 (App Router)
- React 18 + TypeScript
- Tailwind CSS 4 + Radix UI
- Mongoose + MongoDB
- JWT auth + bcrypt
- Cloudinary for avatar uploads

## Quick Start
1. Install dependencies
```
npm install
```

2. Create `.env.local` and add required variables
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

## Useful Scripts
- `npm run dev` Start development server
- `npm run build` Build for production
- `npm run start` Start production server
- `npm run seed` Seed MongoDB with sample users
- `npm run clean-users` Delete all users

## Project Structure
- `app/` App Router pages and API routes
- `components/` UI and feature components
- `contexts/` Auth and data context providers
- `lib/` DB, auth utilities, types, and dummy data
- `models/` Mongoose schemas
- `public/` Images and static assets
- `script/` One-off scripts for seeding and cleanup
- `server.js` Custom Node server for deployment environments

## Pages
- `/` Home
- `/about` About
- `/players` Player roster
- `/player/[id]` Player detail
- `/player/profile` Authenticated profile
- `/tournaments` Tournaments (client data)
- `/register` Registration
- `/login` Login
- `/admin` Admin panel (admin roles only)

## Auth Roles
`ADMINISTRATOR`, `ADMIN`, `CAPTAIN`, `MEMBER`, `PENDING`

## Notes
- Tournaments, matches, news, achievements, and sponsors are currently sourced from `lib/dummy-data.ts` via `DataProvider`.
- User data is persisted in MongoDB and accessed via API routes under `app/api`.

## Documentation
- Developer guide: `docs/DEVELOPER.md`
- API reference: `docs/API.md`
