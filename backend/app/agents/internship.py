from app.services.ai_service import AIService
from app.agents.adk_agent import AdkAgent
from app.skills.internship_search import InternshipSearchSkill
from typing import Dict, Any


class InternshipAgent(AdkAgent):
    def __init__(self):
        super().__init__(
            "internship",
            instructions="Search for relevant internship opportunities and summarize fit and deadlines.",
            responsibilities=["Find internship matches", "Summarize relevance and deadlines", "Highlight strong application targets"],
            tools=["internship_search_service"],
        )
        self.ai = AIService()
        self.skill = InternshipSearchSkill()

    def execute(self, user_id: str, payload: Dict[str, Any]) -> Dict[str, Any]:
        internship_result = self.ai.internship_search(user_id, payload)
        interests = payload.get("interests", ["AI", "product"])
        skill_result = self.skill.find_opportunities(interests)
        internship_result.setdefault("matches", skill_result.get("matches", []))
        internship_result.setdefault("interests", interests)
        return internship_result
