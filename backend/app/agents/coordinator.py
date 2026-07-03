from typing import List, Dict, Any
from pydantic import ConfigDict
from google.adk.agents.base_agent import BaseAgent

from app.agents.adk_agent import AdkAgent
from app.services.activity_log import activity_log_service


class AdkWrapperAgent(BaseAgent):
    model_config = ConfigDict(arbitrary_types_allowed=True, extra='allow')

    def __init__(self, delegate: AdkAgent):
        super().__init__(
            name=delegate.get_name(),
            description=delegate.instructions or f"Specialist agent for {delegate.get_name()}",
        )
        self.delegate = delegate
        self.instructions = delegate.instructions
        self.responsibilities = delegate.responsibilities
        self.tools = delegate.tools

    async def _run_impl(self, *, ctx, node_input):
        payload = node_input if isinstance(node_input, dict) else {}
        user_id = payload.get("user_id", "student-1")
        agent_payload = payload.get("payload", payload)
        result = self.delegate.execute(user_id, agent_payload)
        yield {"agent": self.name, "result": result}


class CoordinatorAgent(BaseAgent):
    model_config = ConfigDict(arbitrary_types_allowed=True, extra='allow')

    def __init__(self):
        super().__init__(
            name="coordinator",
            description="Routes requests to specialist agents using a lightweight Google ADK graph.",
        )
        self.agents: Dict[str, AdkAgent] = {}
        self.adk_agents: Dict[str, AdkWrapperAgent] = {}
        self._register_default_agents()

    def _register_default_agents(self) -> None:
        from app.agents.career_agent import CareerAgent
        from app.agents.interview_agent import InterviewAgent
        from app.agents.internship import InternshipAgent
        from app.agents.life_scheduler import LifeSchedulerAgent
        from app.agents.planner import PlannerAgent
        from app.agents.resume_agent import ResumeAgent
        from app.agents.study_agent import ExamStudyAgent

        for agent in [
            PlannerAgent(),
            ExamStudyAgent(),
            CareerAgent(),
            ResumeAgent(),
            InterviewAgent(),
            InternshipAgent(),
            LifeSchedulerAgent(),
        ]:
            self.register_agent(agent)

    def register_agent(self, agent: AdkAgent) -> None:
        self.agents[agent.get_name()] = agent
        self.adk_agents[agent.get_name()] = AdkWrapperAgent(agent)

    def detect_intent(self, payload: Dict[str, Any]) -> List[str]:
        text = payload.get("request_text", "").lower()
        agents = []

        if any(term in text for term in ["plan", "schedule", "timeline", "organize"]):
            agents.append("planner")
        if any(term in text for term in ["study", "exam", "review", "prep"]):
            agents.append("study")
        if any(term in text for term in ["career", "job", "opportunity"]):
            agents.append("career")
        if any(term in text for term in ["resume", "cv", "experience", "skills"]):
            agents.append("resume")
        if any(term in text for term in ["interview", "questions", "mock", "behavioral"]):
            agents.append("interview")
        if any(term in text for term in ["internship", "search", "apply"]):
            agents.append("internship")
        if any(term in text for term in ["life", "balance", "wellness", "personal"]):
            agents.append("life_scheduler")

        if not agents:
            agents.append("planner")

        return agents

    def _build_summary(self, request_text: str, responses: Dict[str, Any]) -> str:
        summary_parts = [f"Received request: '{request_text}'."]
        for agent_name, agent_output in responses.items():
            if not isinstance(agent_output, dict):
                continue
            if agent_name == "study":
                summary_parts.append("The study agent produced a structured exam readiness plan.")
            elif agent_name == "career":
                opportunities = agent_output.get("recommendations", [])
                summary_parts.append(f"The career agent found {len(opportunities)} relevant opportunities.")
            elif agent_name == "resume":
                score = agent_output.get("score", "N/A")
                summary_parts.append(f"The resume agent reviewed the resume and returned a score of {score}.")
            elif agent_name == "planner":
                tasks = agent_output.get("tasks", [])
                summary_parts.append(f"The planner generated {len(tasks)} tasks.")
            elif agent_name == "interview":
                tips = agent_output.get("tips", [])
                summary_parts.append(f"The interview agent provided {len(tips)} coaching tips.")
            elif agent_name == "internship":
                recommendations = agent_output.get("recommendations", [])
                summary_parts.append(f"The internship agent found {len(recommendations)} recommendations.")
            elif agent_name == "life_scheduler":
                summary_parts.append("The life scheduler provided a balanced schedule suggestion.")

        if responses:
            summary_parts.append("The coordinator routed the request through the relevant specialist agents.")
        else:
            summary_parts.append("No specialist agent outputs were generated.")

        return " ".join(summary_parts)

    async def _run_impl(self, *, ctx, node_input):
        payload = node_input if isinstance(node_input, dict) else {}
        user_id = payload.get("user_id", "student-1")
        agent_payload = payload.get("payload", payload)
        result = self.execute(user_id, agent_payload)
        yield result

    def execute(self, user_id: str, payload: dict) -> dict:
        requested_agents = payload.get("agents")
        if isinstance(requested_agents, list) and requested_agents:
            selected_agents = [agent for agent in requested_agents if agent in self.agents]
        else:
            selected_agents = self.detect_intent(payload)

        selected_agents = list(dict.fromkeys(selected_agents))
        responses: Dict[str, Any] = {}
        used_agents: List[str] = []

        activity_log_service.record_event(
            user_id,
            "coordinator",
            "started",
            "orchestrate",
            f"Starting ADK orchestration for request: {payload.get('request_text', '')}",
        )

        for agent_name in selected_agents:
            agent = self.agents.get(agent_name)
            if not agent:
                activity_log_service.record_event(
                    user_id,
                    agent_name,
                    "skipped",
                    "execute",
                    "Agent not available for this request.",
                )
                continue

            used_agents.append(agent_name)
            activity_log_service.record_event(
                user_id,
                agent_name,
                "started",
                "execute",
                f"Executing {agent_name} agent.",
            )

            try:
                agent_response = agent.execute(user_id, payload)
                if isinstance(agent_response, dict) and "agent" not in agent_response:
                    agent_response = {"agent": agent_name, **agent_response}
                responses[agent_name] = agent_response
                activity_log_service.record_event(
                    user_id,
                    agent_name,
                    "completed",
                    "execute",
                    f"{agent_name.capitalize()} agent completed successfully.",
                )
            except Exception as exc:
                responses[agent_name] = {"error": str(exc)}
                activity_log_service.record_event(
                    user_id,
                    agent_name,
                    "failed",
                    "execute",
                    f"{agent_name.capitalize()} agent failed: {exc}",
                )

        combined_summary = self._build_summary(payload.get("request_text", ""), responses)

        activity_log_service.record_event(
            user_id,
            "coordinator",
            "completed",
            "summarize",
            combined_summary,
        )

        return {
            "agents": used_agents,
            "responses": responses,
            "summary": combined_summary,
            "adk": {
                "coordinator": self.name,
                "registered_agents": list(self.adk_agents.keys()),
            },
        }


_coordinator_instance: CoordinatorAgent | None = None


def get_coordinator() -> CoordinatorAgent:
    global _coordinator_instance
    if _coordinator_instance is None:
        _coordinator_instance = CoordinatorAgent()
    return _coordinator_instance
