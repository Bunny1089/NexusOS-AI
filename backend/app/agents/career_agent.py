from typing import Dict, Any
from app.agents.adk_agent import AdkAgent
from app.mcp.registry import mcp_registry
from app.skills.career_roadmap import CareerRoadmapSkill


class CareerAgent(AdkAgent):
    def __init__(self):
        super().__init__(
            "career",
            instructions="Recommend career opportunities and growth paths aligned to the user's interests.",
            responsibilities=["Match user interests to opportunities", "Suggest career next steps", "Prioritize growth areas"],
            tools=["career_recommendation_engine"],
        )
        self.skill = CareerRoadmapSkill()

    def execute(self, user_id: str, payload: Dict[str, Any]) -> Dict[str, Any]:
        interests = payload.get("interests", ["AI", "product"])
        search_results = mcp_registry.call("search.query", " ".join(interests))
        roadmap = self.skill.build_roadmap(interests)
        return {
            "agent": "career",
            "recommendations": roadmap.get("recommendations", []),
            "interests": interests,
            "mcp": {
                "search": search_results,
            },
        }
