# Israel — Portfolio

Personal portfolio of **Israel**, Full-Stack Engineer & Systems Architect.
Live at the homepage URL above.

Editorial, minimal design in a strict white / black / brown palette. Features a kinetic hero with masked line-by-line reveals, a horizontal-scroll work shelf with project logos that brighten on hover, per-project case-study pages, a skills matrix, and a working contact form backed by a private owner inbox with email alerts.

## Stack

- **Frontend**: React 19, Tailwind CSS, Framer Motion, Lenis smooth scrolling
- **Backend**: FastAPI, MongoDB (Motor), JWT-gated inbox API
- **Email**: transactional notifications on new contact messages

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
cp .env.example .env   # set REACT_APP_BACKEND_URL
yarn start
```

## Routes

- `/` — portfolio
- `/work/:slug` — project case studies (Bazaarflow, Clove, Jabali, Cipher, Iyapay)
- `/dashboard` — private message inbox (password-protected)

## Data

`scripts/seed_messages.json` holds a sample of inbox messages for reseeding a local database.
