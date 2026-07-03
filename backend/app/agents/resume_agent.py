from typing import Dict, Any
from app.agents.adk_agent import AdkAgent
from app.mcp.registry import mcp_registry
from app.services.ai_service import AIService
from app.skills.resume_review import ResumeReviewSkill


class ResumeAgent(AdkAgent):
    def __init__(self):
        super().__init__(
            "resume",
            instructions="Review a resume and provide actionable feedback about impact, completeness, and positioning.",
            responsibilities=["Assess resume strengths", "Recommend wording improvements", "Highlight missing achievements"],
            tools=["resume_review_service"],
        )
        self.ai = AIService()
        self.skill = ResumeReviewSkill()

    def execute(self, user_id: str, payload: Dict[str, Any]) -> Dict[str, Any]:
        resume_text = payload.get("resume_text", "")
        documents = mcp_registry.call("documents.search_documents", resume_text or "resume")
        review = self.ai.resume_review(user_id, payload)
        skill_result = self.skill.review(resume_text or "")
        review["agent"] = "resume"
        review["mcp"] = {"documents": documents}
        review["resume_text"] = resume_text
        review.setdefault("highlights", skill_result.get("highlights", []))
        review.setdefault("recommendations", skill_result.get("recommendations", []))
        review.setdefault("score", skill_result.get("score", 0))
        return review
