from app.skills.time_management import TimeManagementSkill
from app.agents.adk_agent import AdkAgent
from typing import Dict, Any


class LifeSchedulerAgent(AdkAgent):
    def __init__(self):
        super().__init__(
            "life_scheduler",
            instructions="Recommend balanced personal routines and time-management habits for daily life.",
            responsibilities=["Suggest life balance routines", "Recommend scheduling habits", "Support weekly personal planning"],
            tools=["time_management_skill"],
        )
        self.skill = TimeManagementSkill()

    def execute(self, user_id: str, payload: Dict[str, Any]) -> Dict[str, Any]:
        return self.skill.generate_tips()
