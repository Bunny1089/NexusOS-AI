from typing import Dict, List


class InternshipSearchSkill:
    def find_opportunities(self, interests: List[str]) -> Dict[str, object]:
        return {
            "matches": [
                {"title": "AI Product Intern", "company": "Nexus Labs", "deadline": "2026-07-15"},
                {"title": "Software Engineering Intern", "company": "CampusWorks", "deadline": "2026-08-01"}
            ],
            "interests": interests,
        }
