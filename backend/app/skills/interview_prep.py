from typing import Dict


class InterviewPrepSkill:
    def create_coaching_notes(self, role: str) -> Dict[str, object]:
        return {
            "role": role,
            "tips": [
                "Practice STAR answers for behavioral questions.",
                "Highlight leadership in academic projects.",
                "Prepare 2 technical examples and 2 questions for the interviewer."
            ]
        }
