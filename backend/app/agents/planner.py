from app.agents.adk_agent import AdkAgent
from app.mcp.registry import mcp_registry
from app.skills.weekly_planner import WeeklyPlannerSkill
from typing import Dict, Any


class PlannerAgent(AdkAgent):
    def __init__(self):
        super().__init__(
            "planner",
            instructions="Create a study and time-management plan for the user's current goals.",
            responsibilities=["Translate goals into milestones", "Sequence tasks and priorities", "Suggest calendar-friendly work blocks"],
            tools=["study_plan_builder", "calendar_blocks"],
        )
        self.skill = WeeklyPlannerSkill()

    def execute(self, user_id: str, payload: Dict[str, Any]) -> Dict[str, Any]:
        goals = payload.get("goals", {"exam": "Academic success"})
        plan = self.skill.build_plan(goals)
        calendar_events = mcp_registry.call("calendar.list_events")
        return {
            "agent": "planner",
            "plan": plan,
            "tasks": [
                {"task": "Define study milestones", "status": "ready"},
                {"task": "Allocate calendar blocks", "status": "in progress"},
            ],
            "goals": goals,
            "mcp": {
                "calendar": calendar_events,
            },
        }
