from typing import List, Dict


class SearchServer:
    def query(self, query_text: str) -> Dict[str, object]:
        return {
            "query": query_text,
            "results": [
                {"title": "Study plan best practices", "snippet": "Learn how to create a scalable study schedule."},
                {"title": "Resume tips for internships", "snippet": "Optimize your resume for academic internship applications."}
            ]
        }
