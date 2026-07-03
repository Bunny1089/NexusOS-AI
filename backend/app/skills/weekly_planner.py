from typing import Dict, List


class WeeklyPlannerSkill:
    def build_plan(self, goals: Dict[str, str]) -> Dict[str, object]:
        return {
            "focus_area": goals.get("exam", "Core coursework"),
            "timeline": [
                {"day": "Monday", "schedule": "Deep learning review"},
                {"day": "Wednesday", "schedule": "Practice interview problems"},
                {"day": "Friday", "schedule": "Resume and application polish"},
            ],
            "milestones": ["Review notes", "Practice problems", "Mock exam"],
        }
