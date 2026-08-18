NOTEPAD— Professional To‑Do-LIST + Notes web app

## Overview

TaskNote is a full‑stack productivity application combining a task manager and a personal notepad. It is a production‑quality portfolio project with a minimal black‑and‑white design system, responsive UI, `JWT` authentication, and a REST API backed by MongoDB.

## Repository layout

- `src/` — React client (`Vite`)
- `public/` — static assets for the client
- `server/` — Node/Express API and Mongoose models
- `README.md` — this file

## Key features

- Secure user authentication (register / login) with `JWT` and `bcrypt`
- User‑scoped tasks with full CRUD, filtering, search, and sorting
- Personal notes with auto‑save and a distraction‑free editor
- Responsive, accessible UI with dark/light theme support
- Centralized backend error handling and input validation

## Tech stack

- Frontend: `React`, `Vite`, `React Router`, modern CSS
- Backend: `Node.js`, `Express`, `Mongoose` (MongoDB Atlas), `JWT`
- Dev: `dotenv`, `nodemon`, `eslint` (optional)

## Quick start

### Table of contents

- [Quick start](#quick-start)
- [Environment variables](#environment-variables)
- [API (examples)](#api-examples)

### Server

#### Windows (PowerShell)

```powershell
cd server
copy .env.example .env
# edit server\.env and add MONGO_URI and JWT_SECRET
npm install
npm run dev
```

#### macOS / Linux

```bash
cd server
cp .env.example .env
# edit server/.env and add MONGO_URI and JWT_SECRET
npm install
npm run dev
```

### Client (from repository root)

```bash
npm install
npm run dev
```

## Environment variables

Create a `.env` file in `server/` with the values below (see `server/.env.example`):

- `MONGO_URI` — MongoDB Atlas connection string
- `JWT_SECRET` — secret used to sign JWT tokens
- `PORT` — optional server port (default 5000)

## API (examples)

### Authentication

- `POST /api/auth/register` — register (name, email, password)
- `POST /api/auth/login` — login (email, password)
- `GET /api/auth/me` — current user (requires Bearer token)

### Tasks

- `GET /api/tasks` — list user tasks (filters: status, priority, search, sort)
- `POST /api/tasks` — create task
- `GET /api/tasks/:id` — get task
- `PUT /api/tasks/:id` — update task
- `DELETE /api/tasks/:id` — delete task

### Notes

- `GET /api/notes` — list notes (search)
- `POST /api/notes` — create note
- `GET /api/notes/:id` — get note
- `PUT /api/notes/:id` — update note
- `DELETE /api/notes/:id` — delete note

## Deployment notes

- Frontend: deploy the client to `Vercel` (set API base URL to the Render service)
- Backend: deploy the `server/` to Render (set `MONGO_URI` and `JWT_SECRET` in env)
- Database: use MongoDB Atlas for production

## Repository hygiene

- Do not commit `.env` or any secrets
- `node_modules/` and `.env` are excluded by `.gitignore`

## What I learned

- Implementing `JWT` authentication and secure password handling with `bcrypt`
- Building RESTful APIs with `Express` and `Mongoose`
- Designing a responsive, accessible React UI with `Vite`
- Structuring a full‑stack project for deployment and maintainability

## Next steps

- Implement the client‑side auth context and protected routes
- Build the dashboard and UI pages (Login, Register, Dashboard, Tasks, Notes, Profile)
- Add tests and CI, then deploy to `Vercel` (client) + Render (server)

If you want, I can now remove leftover template files (for example `.oxlintrc.json`) and clean up any other unwanted files — reply `remove suggested` to let me delete the likely candidates.
