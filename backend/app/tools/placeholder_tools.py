from typing import Dict, List


def fetch_suggested_schedule(goals: Dict[str, str]) -> List[Dict[str, str]]:
    return [
        {"day": "Monday", "schedule": "Deep learning review"},
        {"day": "Wednesday", "schedule": "Practice interview problems"},
        {"day": "Friday", "schedule": "Resume and application polish"},
    ]


def analyze_resume_text(resume_text: str) -> Dict[str, object]:
    return {
        "score": 82,
        "highlights": ["Clear academic project descriptions", "Consistent formatting"],
        "areas_for_improvement": ["Add metrics", "Tailor skills to role descriptions"],
        "resume_text": resume_text,
    }


def infer_career_recommendations(interests: List[str]) -> List[Dict[str, object]]:
    return [
        {"title": "AI Product Intern", "company": "Nexus Labs", "match": 93},
        {"title": "Research Assistant", "company": "CampusLab", "match": 87},
    ]


def generate_interview_coaching(role: str) -> Dict[str, object]:
    return {
        "role": role,
        "tips": [
            "Frame answers with STAR structure.",
            "Use concrete outcomes and metrics.",
            "Prepare questions aligned to team goals.",
        ],
    }


def build_study_plan(goals: Dict[str, str]) -> Dict[str, object]:
    return {
        "focus_area": goals.get("exam", "Core coursework"),
        "timeline": fetch_suggested_schedule(goals),
        "milestones": ["Review notes", "Practice problems", "Mock exam"],
    }
