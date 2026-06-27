from typing import List, Dict


class GitHubServer:
    def list_repositories(self, username: str) -> Dict[str, object]:
        return {
            "username": username,
            "repositories": [
                {"name": "nexusos-ai", "description": "Academic and career OS dashboard.", "stars": 120},
                {"name": "study-scheduler", "description": "Student study planning tools.", "stars": 45}
            ]
        }
