import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from google.adk.agents.base_agent import BaseAgent

from app.api.routes import agents, chat, dashboard, mcp
from app.core.config import settings
from app.db.database import init_database

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s: %(message)s",
)

logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(_: FastAPI):
    init_database()
    logger.info("SQLite database initialized successfully.")
    yield


app = FastAPI(
    title="NexusOS AI Backend",
    description="AI orchestration backend for NexusOS AI platform.",
    version="1.0.0",
    lifespan=lifespan,
)


@app.exception_handler(Exception)
async def unhandled_exception_handler(_: Request, exc: Exception):
    logger.exception("Unhandled application error", exc_info=exc)
    return JSONResponse(
        status_code=500,
        content={
            "detail": "Internal server error.",
            "error": str(exc),
        },
    )


@app.get("/api/adk/status")
def adk_status():
    return {
        "adk_installed": True,
        "base_agent": str(BaseAgent),
        "status": "Google ADK is loaded successfully",
    }


allowed_origins = [
    str(settings.frontend_url).rstrip("/"),
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_origin_regex=r"http://(localhost|127\.0\.0\.1)(:\d+)?$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(chat.router, prefix="/api/chat", tags=["Chat"])
app.include_router(agents.router, prefix="/api/agents", tags=["Agents"])
app.include_router(dashboard.router, prefix="/api/dashboard", tags=["Dashboard"])
app.include_router(mcp.router, prefix="/api/mcp", tags=["MCP"])


@app.get("/")
def root():
    return {
        "status": "ok",
        "message": "NexusOS AI Backend is running.",
        "adk": True,
        "version": "1.0.0",
    }