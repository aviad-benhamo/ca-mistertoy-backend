# MisterToy - Backend

> Backend API for the MisterToy Coding Academy project.

## Table of Contents

- [Project](#project)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Install](#install)
- [Run](#run)
- [Validation](#validation)
- [Release Policy](#release-policy)
- [Configuration](#configuration)
- [Frontend Assets Policy](#frontend-assets-policy)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Data](#data)
- [Contributing](#contributing)

## Project

This repository contains the backend API for MisterToy. It provides toy management, user management, and authentication endpoints used by the frontend.

The frontend source code lives in a separate project. This backend repository serves the built frontend output that is copied into `public/` during the frontend build workflow.

## Tech Stack

- Node.js (ES modules)
- Express
- MongoDB (driver)
- Other libraries: `bcrypt`, `cookie-parser`, `cors`, `cryptr`, `dotenv`

## Prerequisites

- Node.js 20.19.0+ / npm
- (Optional) MongoDB if using a real database

The recommended local runtime is defined in `.nvmrc`.

## Install

1. Clone the repository.
2. Use the recommended Node.js version from `.nvmrc`.
3. Install dependencies.

```bash
npm install
```

## Run

- Start the server:

```bash
npm run start
```

- Development and production scripts:

```bash
npm run server:dev
npm run server:prod
```

The application entry point is [server.js](server.js).

## Validation

- Run the lightweight backend syntax check:

```bash
npm run check
```

- Optional manual security check:

```bash
npm audit --omit=dev
```

The GitHub Actions workflow runs `npm ci` and `npm run check` only. It does not require MongoDB, external services, or real secrets.

## Release Policy

- Current repository status: Experimental / Not Ready
- Current package version policy: `0.x` SemVer while the project remains pre-release
- Current baseline version: `0.1.0`
- Future Git tags must use the format `vMAJOR.MINOR.PATCH`
- `CHANGELOG.md` keeps upcoming work under `[Unreleased]` until an explicit release-preparation step moves entries into a numbered version
- Do not create Git tags, GitHub Releases, or publish a release until the final GRS audit passes and release work is explicitly approved

## Configuration

Configuration files are in `config/` (`config/dev.js`, `config/prod.js`, `config/index.js`).

Create a local `.env` file from `.env.example` when environment-specific values are needed:

```bash
cp .env.example .env
```

Environment variables:

- `PORT`: Optional server port. Defaults to `3030`.
- `MONGO_URL`: MongoDB connection string. Required when `NODE_ENV=production`; defaults to local MongoDB in development.
- `MONGO_DB_NAME`: Optional database name. Defaults to `MisterToyDB`.
- `SECRET1`: Login-token encryption secret. Required when `NODE_ENV=production`.

Do not commit `.env` or real credentials.

## Frontend Assets Policy

- `public/` is intentionally tracked because this backend serves the frontend build output in production.
- `public/index.html` and `public/assets/` are deployment artifacts copied from the separate frontend project.
- Do not edit built frontend files in this repository by hand. Rebuild them from the frontend project when the UI changes.
- Do not place secrets, private tokens, or environment-specific credentials in tracked frontend assets.

## API Endpoints

Base URL: `/api`

Auth

- `POST /api/auth/login` - Log in a user
- `POST /api/auth/signup` - Create a new user
- `POST /api/auth/logout` - Log out

Toys

- `GET /api/toy/` - Get the toy list
- `GET /api/toy/:id` - Get a toy by id
- `POST /api/toy/` - Add a toy (admin only)
- `PUT /api/toy/` - Update a toy (admin only)
- `DELETE /api/toy/:id` - Delete a toy (admin only)
- `POST /api/toy/:id/msg` - Add a message to a toy (authenticated users)
- `DELETE /api/toy/:id/msg/:msgId` - Remove a message (authenticated users)

Users

- `GET /api/user/` - Get the user list
- `GET /api/user/:id` - Get a user by id
- `PUT /api/user/:id` - Update a user
- `DELETE /api/user/:id` - Delete a user

Notes

- Protected routes use middleware in `middlewares/` such as `requireAuth.middleware.js` and `logger.middleware.js`.
- See the route files in `api/` for exact handlers.

## Example Requests

- Login:

```bash
curl -X POST http://localhost:3030/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"demo","password":"1234"}'
```

- Get toys:

```bash
curl http://localhost:3030/api/toy
```

## Project Structure

- [server.js](server.js) - App entry
- [api/](api/) - Route folders for `auth`, `toy`, and `user`
- [config/](config/) - Environment configs
- [public/](public/) - Tracked frontend build output served by the backend
- [services/](services/) - Helper services such as db, util, and logger
- [middlewares/](middlewares/) - Auth and logger middleware

## Data

- Local `data/` and `logs/` folders are ignored and are not part of the shared repository baseline.
- If local sample data is needed, create it locally and do not assume it exists for other developers.

## Contributing

Feel free to open issues and pull requests. For local development, use the provided npm scripts.

---

Created for the MisterToy course project.
