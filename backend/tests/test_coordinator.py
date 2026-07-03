import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app.agents.career_agent import CareerAgent
from app.agents.coordinator import CoordinatorAgent
from app.agents.interview_agent import InterviewAgent
from app.agents.internship import InternshipAgent
from app.agents.life_scheduler import LifeSchedulerAgent
from app.agents.planner import PlannerAgent
from app.agents.resume_agent import ResumeAgent
from app.agents.study_agent import ExamStudyAgent


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
        self.assertIn("study", result["agents"])
        self.assertIn("resume", result["agents"])
        self.assertIn("responses", result)
        self.assertIn("summary", result)
        self.assertTrue(result["summary"].startswith("Received request:"))

    def test_specialist_agents_expose_adk_metadata(self):
        agents = [
            PlannerAgent(),
            ExamStudyAgent(),
            CareerAgent(),
            ResumeAgent(),
            InterviewAgent(),
            InternshipAgent(),
            LifeSchedulerAgent(),
        ]

        for agent in agents:
            self.assertTrue(agent.instructions)
            self.assertTrue(agent.responsibilities)
            self.assertTrue(agent.tools)
            self.assertIn(agent.get_name(), agent.describe()["name"])


if __name__ == "__main__":
    unittest.main()
