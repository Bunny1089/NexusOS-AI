from typing import Dict, Any
from app.agents.adk_agent import AdkAgent
from app.services.ai_service import AIService


class ResumeAgent(AdkAgent):
    def __init__(self):
        super().__init__("resume")
        self.ai = AIService()

    def execute(self, user_id: str, payload: Dict[str, Any]) -> Dict[str, Any]:
        resume_text = payload.get("resume_text", "")
        # Use the AI service for resume review instead of mock data
        return self.ai.resume_review(user_id, payload)
