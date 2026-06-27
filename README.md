# NexusOS AI – Personal Academic & Career Operating System

## Overview
NexusOS AI is a modular full-stack platform for academic and career support. It features AI-powered planning, study tracking, calendar scheduling, resume review, internship search, and interview coaching.

## Architecture
- Frontend: React + Vite + Tailwind CSS
- Backend: FastAPI with agent orchestration and MCP support
- AI: Gemini-style integration via backend service wrapper

## Folder structure
- `frontend/`: React app and UI
- `backend/`: FastAPI backend, agents, skills, MCP servers
- `.env.example`: environment variable template

## Run locally
1. Install backend dependencies
   - `python -m pip install -r backend/requirements.txt`
2. Install frontend dependencies
   - `cd frontend && npm install`
3. Start backend
   - `cd backend && python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000`
   - or from the repo root: `python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000 --app-dir backend`
4. Start frontend
   - `cd frontend && npm run dev -- --host 0.0.0.0 --port 3000`

## Environment
Create `.env` from `.env.example` and set values for:
- `AI_API_KEY`
- `FRONTEND_URL=http://localhost:3000`

### Optional
- `APP_ENV=development`
- `BACKEND_HOST=127.0.0.1`
- `BACKEND_PORT=8000`

## Notes
This is a starter implementation for NexusOS AI. It includes core architecture, sample endpoints, and a modern dashboard layout.

## Quick start
1. Copy `.env.example` to `.env` and fill in `AI_API_KEY`.
2. From the repo root:
   - `python -m pip install -r backend/requirements.txt`
   - `npm install --prefix frontend`
3. Run backend:
   - `python -m uvicorn backend.app.main:app --reload --host 127.0.0.1 --port 8000`
4. Run frontend:
   - `npm run dev --prefix frontend -- --host 0.0.0.0 --port 3000`

## One-command startup
If you have `npm` installed, run:
- `npm install`
- `npm run start`

Then open `http://localhost:3000` in your browser.
