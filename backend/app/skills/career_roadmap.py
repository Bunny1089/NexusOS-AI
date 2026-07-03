from typing import Dict, List


class CareerRoadmapSkill:
    def build_roadmap(self, interests: List[str]) -> Dict[str, object]:
        return {
            "interests": interests,
            "recommendations": [
                {"title": "AI Product Intern", "company": "Nexus Labs", "match": 93},
                {"title": "Research Assistant", "company": "CampusLab", "match": 87},
            ],
        }
