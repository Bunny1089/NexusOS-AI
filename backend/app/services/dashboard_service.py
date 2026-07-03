import json
from datetime import datetime, timezone
from typing import Any

from app.services.activity_log import activity_log_service


class DashboardService:
    def get_dashboard(self, user_id: str) -> dict[str, Any]:
        events = activity_log_service.list_recent(user_id=user_id, limit=50)
        latest_snapshot = activity_log_service.get_latest_snapshot(user_id)

        metrics = self._default_metrics()
        if latest_snapshot:
            metrics.update(latest_snapshot)

        agent_health = self._build_agent_health(events)
        recent_activity = events[:10]

        return {
            "user_id": user_id,
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "metrics": metrics,
            "agent_health": agent_health,
            "recent_activity_count": len(events),
            "recent_activity": recent_activity,
        }

    def _default_metrics(self) -> dict[str, Any]:
        return {
            "today_tasks": [],
            "weekly_completion": 0,
            "study_progress": 0,
            "resume_score": None,
            "internship_recommendations": [],
            "coordinator_status": "Ready",
        }

    def _build_agent_health(self, events: list[dict[str, Any]]) -> dict[str, str]:
        health = {
            "coordinator": "Idle",
            "planner": "Idle",
            "study": "Idle",
            "career": "Idle",
            "resume": "Idle",
            "interview": "Idle",
            "internship": "Idle",
            "life_scheduler": "Idle",
        }
        for event in events[:20]:
            agent = event.get("agent")
            status = event.get("status")
            if agent not in health:
                continue
            if status == "started":
                health[agent] = "Running"
            elif status == "completed":
                health[agent] = "Ready"
            elif status == "failed":
                health[agent] = "Error"
        if any(event.get("agent") == "coordinator" for event in events[:5]):
            health["coordinator"] = "Active"
        return health

    def save_from_coordinator(self, user_id: str, result: dict[str, Any]) -> None:
        responses = result.get("responses", {})
        planner = responses.get("planner", {})
        study = responses.get("study", {})
        career = responses.get("career", {})
        resume = responses.get("resume", {})
        internship = responses.get("internship", {})

        metrics = {
            "today_tasks": [item.get("task") for item in planner.get("tasks", []) if item.get("task")],
            "weekly_completion": min(100, 50 + len(planner.get("tasks", [])) * 10),
            "study_progress": 72 if study.get("plan") else 48,
            "resume_score": resume.get("score"),
            "internship_recommendations": (
                internship.get("recommendations")
                or career.get("recommendations")
                or []
            ),
            "coordinator_status": "Active",
            "summary": result.get("summary", ""),
            "agents_used": result.get("agents", []),
        }
        activity_log_service.save_snapshot(user_id, metrics)


dashboard_service = DashboardService()
