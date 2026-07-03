import logging
from typing import Any, Dict, List

from app.core.security import safe_tool_name
from app.mcp.calendar import CalendarServer
from app.mcp.documents import DocumentServer
from app.mcp.github import GitHubServer
from app.mcp.search import SearchServer


class MCPToolRegistry:
    def __init__(self) -> None:
        self._tools: Dict[str, Any] = {}
        self._register_defaults()

    def _register_defaults(self) -> None:
        self.register_tool("calendar.list_events", CalendarServer().list_events)
        self.register_tool("documents.search_documents", DocumentServer().search_documents)
        self.register_tool("search.query", SearchServer().query)
        self.register_tool("github.list_repositories", GitHubServer().list_repositories)

    def register_tool(self, name: str, handler: Any) -> None:
        self._tools[name] = handler

    def get_tool(self, name: str) -> Any:
        return self._tools.get(name)

    def call(self, name: str, *args: Any, **kwargs: Any) -> Any:
        validated_name = safe_tool_name(name)
        tool = self.get_tool(validated_name)
        if tool is None:
            raise KeyError(f"Unknown MCP tool: {validated_name}")
        try:
            return tool(*args, **kwargs)
        except Exception as exc:
            logging.getLogger(__name__).exception("MCP tool execution failed: %s", validated_name)
            raise RuntimeError(f"MCP tool '{validated_name}' failed safely.") from exc

    def list_tools(self) -> List[Dict[str, Any]]:
        return [
            {
                "name": name,
                "description": "MCP-compatible tool",
            }
            for name in sorted(self._tools.keys())
        ]


mcp_registry = MCPToolRegistry()
