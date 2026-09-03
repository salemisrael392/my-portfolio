# Israel — Portfolio

Personal portfolio of **Israel**, Full-Stack Engineer & Systems Architect.

Editorial, minimal design in a strict white / black / brown palette. Features a kinetic hero with masked line-by-line reveals, a horizontal-scroll work shelf with project logos that brighten on hover, per-project case-study pages, a skills matrix, and a working contact form backed by a private owner inbox with email alerts.

## Stack

- **Frontend**: React 19, Tailwind CSS, Framer Motion, Lenis smooth scrolling (`frontend/`)
- **Backend**: FastAPI, MongoDB (Motor), JWT-gated inbox API — `backend/` for local dev, `api/index.py` as the Vercel serverless entry
- **Email**: transactional notifications on new contact messages

## Deploy to Vercel (one repo, frontend + API together)

1. Push this repo to GitHub, then in Vercel: **Add New → Project → Import** this repo. No build settings needed — `vercel.json` builds the React app and turns `api/index.py` into a serverless function; `/api/*` requests go to FastAPI, everything else serves the site.
2. Add these **Environment Variables** in the Vercel project (Settings → Environment Variables):

| Key | Value |
|---|---|
| `MONGO_URL` | your MongoDB Atlas connection string (see below) |
| `DB_NAME` | e.g. `portfolio` |
| `JWT_SECRET` | any long random string |
| `INBOX_PASSWORD` | your private inbox password |
| `EMERGENT_EMAIL_KEY` | your email key |
| `EMAIL_FROM_NAME` | `Israel Portfolio` |
| `OWNER_EMAIL` | your inbox-alert email |
| `REACT_APP_BACKEND_URL` | leave **empty** (same-origin API) |
| `CORS_ORIGINS` | `*` |

3. **Database**: Vercel can't reach a local MongoDB — create a free cluster at mongodb.com/atlas, add a database user, allow access from anywhere (0.0.0.0/0), and paste the connection string as `MONGO_URL`.
4. Deploy. Client routes (`/work/...`, `/dashboard`) are handled by the SPA fallback already configured.

## Run locally

```bash
# backend
cd backend
pip install -r requirements.txt
cp .env.example .env   # fill in values
uvicorn server:app --port 8001

# frontend
cd frontend
yarn install
cp .env.example .env   # set REACT_APP_BACKEND_URL=http://localhost:8001
yarn start
```

## Routes

- `/` — portfolio
- `/work/:slug` — project case studies (Bazaarflow, Clove, Jabali, Cipher, Iyapay)
- `/dashboard` — private message inbox (password-protected)

## Data

`scripts/seed_messages.json` holds a sample of inbox messages for reseeding a local database.
