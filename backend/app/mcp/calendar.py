from typing import List, Dict


class CalendarServer:
    def list_events(self) -> List[Dict[str, str]]:
        return [
            {"title": "Machine Learning Exam", "date": "2026-07-10", "type": "Exam"},
            {"title": "Career Workshop", "date": "2026-07-12", "type": "Event"},
            {"title": "Study Session", "date": "2026-07-08", "type": "Study"}
        ]
