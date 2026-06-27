from typing import List, Dict, Any
from datetime import datetime


class ActivityLogService:
    def __init__(self):
        # entries store a chronological list (newest first) of orchestration events
        self.entries: List[Dict[str, Any]] = []
        self.next_id = 1

    def record_event(self, user_id: str, agent: str, status: str, action: str, message: str) -> Dict[str, Any]:
        """Record a single agent orchestration event.

        Event shape:
        {
            "event_id": int,
            "timestamp": ISO8601 UTC string,
            "user_id": str,
            "agent": str,
            "status": str,  # e.g., started, completed, failed
            "action": str,  # e.g., execute, fetch_mcp, summarize
            "message": str
        }
        """
        entry = {
            "event_id": self.next_id,
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "user_id": user_id,
            "agent": agent,
            "status": status,
            "action": action,
            "message": message,
        }
        self.next_id += 1
        # newest first
        self.entries.insert(0, entry)
        # keep recent 200 events
        self.entries = self.entries[:200]
        return entry

    def list_recent(self) -> List[Dict[str, Any]]:
        return list(self.entries)


activity_log_service = ActivityLogService()
