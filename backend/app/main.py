from pathlib import Path
import os
import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import chat, agents, mcp
from app.core.config import settings

# Basic logging configuration so exceptions are visible in the terminal
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s")

app = FastAPI(
    title="NexusOS AI Backend",
    description="AI orchestration backend for NexusOS AI platform.",
    version="0.1.0",
)

allowed_origins = [
    str(settings.frontend_url).rstrip("/"),
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(chat.router, prefix="/api/chat", tags=["chat"])
app.include_router(agents.router, prefix="/api/agents", tags=["agents"])
app.include_router(mcp.router, prefix="/api/mcp", tags=["mcp"])

@app.get("/")
def root():
    return {"message": "NexusOS AI backend is running."}
