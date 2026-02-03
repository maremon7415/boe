# API Reference

Base path is the Next.js app router under `/api`.

## Auth

### POST `/api/auth/register`
Registers a new user in `PENDING` role and returns basic info.

Request body (JSON):
```
{
  "fullName": "...",
  "email": "...",
  "password": "...",
  "efootballId": "...",
  "device": { "name": "...", "model": "..." },
  "socialAccounts": {
    "facebook": "...",
    "twitter": "",
    "youtube": "",
    "discord": ""
  },
  "dob": "YYYY-MM-DD",
  "bloodGroup": "...",
  "gender": "Male" | "Female" | "Other"
}
```

Response (201):
```
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "...",
    "clubId": "BOE-0001",
    "fullName": "...",
    "email": "...",
    "role": "PENDING"
  }
}
```

### POST `/api/auth/login`
Authenticates an existing user and returns a JWT and user profile. Users with `PENDING` role are blocked.

Request body (JSON):
```
{ "email": "...", "password": "..." }
```

Response (200):
```
{
  "token": "...",
  "user": {
    "fullName": "...",
    "email": "...",
    "role": "...",
    "clubId": "...",
    "avatar": "...",
    "device": { "name": "...", "model": "..." },
    "stats": { "points": 0, "goalDiff": 0, ... },
    "socials": { "...": "..." },
    "bloodGroup": "...",
    "dob": "...",
    "efootballId": "..."
  }
}
```

### GET `/api/auth/me`
Returns the current user profile based on JWT.

Headers:
```
Authorization: Bearer <token>
```

Response (200):
```
{ "user": { "fullName": "...", "email": "...", "role": "...", ... } }
```

## Players

### GET `/api/players`
Returns a paginated player list (members + admins).

Query params:
- `page` (default: 1)
- `limit` (default: 20)
- `search` (name search)
- `sortBy` (`points`, `goals`, `name`)
- `role` (`all`, `MEMBER`, `CAPTAIN`, `ADMIN`, `ADMINISTRATOR`)

Response (200):
```
{
  "players": [ { "_id": "...", "fullName": "...", "stats": { ... } } ],
  "total": 0,
  "page": 1,
  "totalPages": 1
}
```

### GET `/api/players/top`
Returns top 20 players sorted by points then goal difference.

Response (200):
```
{ "players": [ { "_id": "...", "fullName": "...", "stats": { ... } } ] }
```

### GET `/api/player/[id]`
Returns a single player by MongoDB ObjectId.

Response (200):
```
{ "player": { "_id": "...", "fullName": "...", ... } }
```

## User Profile

### PUT `/api/user/profile`
Updates the authenticated user profile, including optional avatar upload to Cloudinary.

Headers:
```
Authorization: Bearer <token>
```

Body: `multipart/form-data`
- `fullName`
- `efootballId`
- `deviceName`
- `deviceModel`
- `dob`
- `bloodGroup`
- `gender`
- `facebook`
- `twitter`
- `discord`
- `youtube`
- `image` (file, max 5MB)

Response (200):
```
{ "message": "Profile updated successfully", "user": { "...": "..." } }
```

## Admin

### GET `/api/admin/users`
Returns users with optional role filtering. Requires `ADMIN` or `ADMINISTRATOR`.

Headers:
```
Authorization: Bearer <token>
```

Query params:
- `role` (example: `player`, `admin`, `administrator`, `pending`)

Response (200):
```
[ { "_id": "...", "fullName": "...", "role": "..." } ]
```

### PUT `/api/admin/users/[id]`
Updates a user by id. Requires `ADMIN` or `ADMINISTRATOR`.

Headers:
```
Authorization: Bearer <token>
```

Body: JSON (any fields to update)

Response (200):
```
{ "_id": "...", "fullName": "...", "role": "..." }
```

### DELETE `/api/admin/users/[id]`
Deletes a user by id. Requires `ADMINISTRATOR`.

Headers:
```
Authorization: Bearer <token>
```

Response (200):
```
{ "message": "User deleted successfully" }
```

## Notes
- Auth uses JWT in `Authorization: Bearer <token>` header.
- `/api/auth/logut` exists in the repo but has no implementation.
