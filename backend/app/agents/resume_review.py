from app.services.ai_service import AIService


class ResumeReviewAgent:
    def __init__(self):
        self.ai = AIService()

    def execute(self, user_id: str, payload: dict) -> dict:
        return self.ai.resume_review(user_id, payload)
