from app.skills.study_plan import StudyPlanningSkill
from app.agents.adk_agent import AdkAgent
from typing import Dict, Any


class ExamStudyAgent(AdkAgent):
    def __init__(self):
        super().__init__(
            "study",
            instructions="Create an exam-readiness plan with focused study sessions and progress checkpoints.",
            responsibilities=["Assess study goals", "Generate exam preparation plans", "Recommend weekly review checkpoints"],
            tools=["study_plan_skill", "goal_parser"],
        )
        self.skill = StudyPlanningSkill()

    def execute(self, user_id: str, payload: Dict[str, Any]) -> Dict[str, Any]:
        goals = payload.get("goals", {})
        return {
            "agent": "study",
            "summary": "Study planning and exam readiness",
            "plan": self.skill.generate_plan(goals),
            "goals": goals,
        }
