from app.services.ai_service import AIService
from app.agents.adk_agent import AdkAgent
from typing import Dict, Any


class InternshipAgent(AdkAgent):
    def __init__(self):
        super().__init__("internship")
        self.ai = AIService()

    def execute(self, user_id: str, payload: Dict[str, Any]) -> Dict[str, Any]:
        return self.ai.internship_search(user_id, payload)
