from abc import ABC, abstractmethod


class BaseAgent(ABC):
    @abstractmethod
    def execute(self, user_id: str, payload: dict) -> dict:
        raise NotImplementedError
