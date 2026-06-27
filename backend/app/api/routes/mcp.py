from fastapi import APIRouter
from app.mcp.calendar import CalendarServer
from app.mcp.search import SearchServer
from app.mcp.github import GitHubServer
from app.mcp.documents import DocumentServer

router = APIRouter()

@router.get("/calendar")
def calendar_events():
    return CalendarServer().list_events()

@router.get("/search")
def search(query: str):
    return SearchServer().query(query)

@router.get("/github")
def github_repos(username: str):
    return GitHubServer().list_repositories(username)

@router.get("/documents")
def documents(keyword: str = ""):
    return DocumentServer().search_documents(keyword)
