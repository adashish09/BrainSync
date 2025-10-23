# BrainSync

A modern, responsive video learning platform with a React frontend and Node.js/Express backend.

## What to install and where

- Frontend (React): install inside `brain-sync/frontend`
  - Node.js 16+ (recommend 18 LTS)
  - npm packages: run `npm install` in `brain-sync/frontend`
  - Env file `brain-sync/frontend/.env` with:
    - `REACT_APP_API_URL=http://localhost:5000/api`
    - `REACT_APP_FIREBASE_API_KEY=...` and related Firebase vars if using auth

- Backend (Node/Express): install inside `brain-sync/backend`
  - Node.js 16+ (recommend 18 LTS)
  - MongoDB (local or Atlas)
  - npm packages: run `npm install` in `brain-sync/backend`
  - Env file `brain-sync/backend/.env` with:
    - `MONGODB_URI=mongodb://localhost:27017/brainsync` (or Atlas URI)
    - `PORT=5000`
    - `CORS_ORIGIN=http://localhost:3000`

- Docker (optional): from `brain-sync/` you can run `docker-compose up --build` to run MongoDB, backend, and frontend together.

## Quick start (local dev)

1) Backend
```
cd brain-sync/backend
cp .env.example .env  # if provided, otherwise create using above keys
npm install
npm run dev
```
Backend runs on http://localhost:5000

2) Frontend
```
cd brain-sync/frontend
cp .env.example .env  # if provided, otherwise create using above keys
npm install
npm start
```
Frontend runs on http://localhost:3000

## Notes
- Bootstrap 5 is included via `import 'bootstrap/dist/css/bootstrap.min.css'` in `src/index.js`.
- Icons use Font Awesome via CDN tag in `public/index.html`.
- For production builds, use `npm run build` in the frontend and deploy the `build/` folder or use the provided Dockerfiles.
