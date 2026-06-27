import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app.agents.coordinator import CoordinatorAgent


class CoordinatorAgentTest(unittest.TestCase):
    def test_execute_routes_request_and_returns_specialist_outputs(self):
        coordinator = CoordinatorAgent()
        payload = {
            "request_text": "Help me plan my study schedule and review my resume",
            "goals": {"exam": "Capstone"},
            "resume_text": "Built a student dashboard app",
        }

        result = coordinator.execute("user-1", payload)

        self.assertIn("planner", result["agents"])
        self.assertIn("resume", result["agents"])
        self.assertIn("responses", result)
        self.assertIn("summary", result)
        self.assertTrue(result["summary"].startswith("Received request:"))


if __name__ == "__main__":
    unittest.main()
