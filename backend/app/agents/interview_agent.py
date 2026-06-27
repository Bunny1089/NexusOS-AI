from typing import Dict, Any
from app.agents.adk_agent import AdkAgent
from app.skills.interview_prep import InterviewPrepSkill # Assuming this skill is used for interview prep


class InterviewAgent(AdkAgent):
    def __init__(self):
        super().__init__("interview")
        self.skill = InterviewPrepSkill()

    def execute(self, user_id: str, payload: Dict[str, Any]) -> Dict[str, Any]:
        role = payload.get("role", "intern")
        return self.skill.create_coaching_notes(role)
