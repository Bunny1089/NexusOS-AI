from typing import Dict, Any
from app.agents.adk_agent import AdkAgent
from app.skills.interview_prep import InterviewPrepSkill


class InterviewAgent(AdkAgent):
    def __init__(self):
        super().__init__(
            "interview",
            instructions="Prepare interview coaching notes and practice guidance for the target role.",
            responsibilities=["Create role-specific interview tips", "Frame answers using STAR principles", "Suggest interview themes"],
            tools=["interview_prep_skill"],
        )
        self.skill = InterviewPrepSkill()

    def execute(self, user_id: str, payload: Dict[str, Any]) -> Dict[str, Any]:
        role = payload.get("role", "intern")
        return self.skill.create_coaching_notes(role)
