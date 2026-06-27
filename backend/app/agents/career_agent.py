from typing import Dict, Any
from app.agents.adk_agent import AdkAgent


class CareerAgent(AdkAgent):
    def __init__(self):
        super().__init__("career")

    def execute(self, user_id: str, payload: Dict[str, Any]) -> Dict[str, Any]:
        interests = payload.get("interests", ["AI", "product"])
        return {
            "agent": "career",
            "recommendations": [
                {"title": "AI Product Intern", "company": "Nexus Labs", "match": 92},
                {"title": "Data Science Intern", "company": "CampusWorks", "match": 84},
            ],
            "interests": interests,
        }
