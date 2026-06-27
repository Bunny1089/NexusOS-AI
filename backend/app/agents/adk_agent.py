from abc import ABC, abstractmethod
from typing import Dict, Any

class AdkAgent(ABC):
    def __init__(self, name: str):
        self.name = name

    @abstractmethod
    def execute(self, user_id: str, payload: Dict[str, Any]) -> Dict[str, Any]:
        """
        Executes the agent's logic based on the user request and payload.
        """
        raise NotImplementedError

    def get_name(self) -> str:
        return self.name
