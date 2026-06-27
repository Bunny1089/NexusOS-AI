from typing import Dict


class StudyPlanningSkill:
    def generate_plan(self, goals: Dict[str, str]) -> Dict[str, object]:
        return {
            "summary": "Personalized study plan",
            "schedule": [
                {"day": "Monday", "focus": "Algorithms and Data Structures"},
                {"day": "Wednesday", "focus": "Research and Career Development"},
                {"day": "Friday", "focus": "Resume refinement and applications"}
            ],
            "goals": goals,
        }
