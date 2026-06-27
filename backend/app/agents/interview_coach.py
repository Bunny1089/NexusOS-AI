from app.skills.interview_prep import InterviewPrepSkill


class InterviewCoachAgent:
    def __init__(self):
        self.skill = InterviewPrepSkill()

    def execute(self, user_id: str, payload: dict) -> dict:
        role = payload.get("role", "intern")
        return self.skill.create_coaching_notes(role)
