from abc import ABC, abstractmethod
from typing import Dict, Any, List


class AdkAgent(ABC):
    def __init__(self, name: str, instructions: str = "", responsibilities: List[str] | None = None, tools: List[str] | None = None):
        self.name = name
        self.instructions = instructions
        self.responsibilities = responsibilities or []
        self.tools = tools or []

    @abstractmethod
    def execute(self, user_id: str, payload: Dict[str, Any]) -> Dict[str, Any]:
        """Executes the agent's logic based on the user request and payload."""
        raise NotImplementedError

    def get_name(self) -> str:
        return self.name

    def describe(self) -> Dict[str, Any]:
        return {
            "name": self.name,
            "instructions": self.instructions,
            "responsibilities": self.responsibilities,
            "tools": self.tools,
        }
