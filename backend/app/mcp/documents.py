from typing import List, Dict


class DocumentServer:
    def search_documents(self, keyword: str) -> Dict[str, object]:
        return {
            "keyword": keyword,
            "documents": [
                {"title": "Academic Success Guide", "summary": "Strategies for exam prep and time management."},
                {"title": "Internship Application Workbook", "summary": "Checklist for resumes, cover letters, and interviews."}
            ]
        }
