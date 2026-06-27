from app.tools.placeholder_tools import build_study_plan
from app.agents.adk_agent import AdkAgent
from typing import Dict, Any


class PlannerAgent(AdkAgent):
    def __init__(self):
        super().__init__("planner")

    def execute(self, user_id: str, payload: Dict[str, Any]) -> Dict[str, Any]:
        goals = payload.get("goals", {"exam": "Academic success"})
        plan = build_study_plan(goals)
        return {
            "agent": "planner",
            "plan": plan,
            "tasks": [
                {"task": "Define study milestones", "status": "ready"},
                {"task": "Allocate calendar blocks", "status": "in progress"},
            ],
            "goals": goals,
        }
