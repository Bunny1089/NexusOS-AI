from fastapi import APIRouter, HTTPException, Query

from app.core.security import validate_prompt, validate_user_id
from app.mcp.registry import mcp_registry

router = APIRouter()


@router.get("/calendar")
def calendar_events():
    return mcp_registry.call("calendar.list_events")


@router.get("/search")
def search(query: str = Query(default="", max_length=200)):
    try:
        safe_query = validate_prompt(query or "career", field_name="query", max_length=200)
        return mcp_registry.call("search.query", safe_query)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc


@router.get("/github")
def github_repos(username: str = Query(default="student", max_length=64)):
    try:
        safe_username = validate_user_id(username or "student")
        return mcp_registry.call("github.list_repositories", safe_username)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc


@router.get("/documents")
def documents(keyword: str = Query(default="", max_length=200)):
    try:
        safe_keyword = validate_prompt(keyword or "career", field_name="keyword", max_length=200)
        return mcp_registry.call("documents.search_documents", safe_keyword)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc


@router.get("/tools")
def list_tools():
    return {"tools": mcp_registry.list_tools()}
