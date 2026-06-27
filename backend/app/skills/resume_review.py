from typing import Dict


class ResumeReviewSkill:
    def review(self, resume_text: str) -> Dict[str, object]:
        return {
            "score": 80,
            "highlights": ["Clear achievements section", "Strong academic projects"],
            "recommendations": ["Add measurable outcomes", "Tailor skills to internship role"],
            "resume_text": resume_text,
        }
