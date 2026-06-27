from pathlib import Path
from pydantic import AnyUrl
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_env: str = "development"
    backend_host: str = "127.0.0.1"
    backend_port: int = 8000
    frontend_url: AnyUrl = "http://localhost:3000"
    ai_provider: str = "gemini"
    ai_api_key: str = ""

    class Config:
        env_file = Path(__file__).resolve().parent.parent.parent.parent / ".env"
        env_file_encoding = "utf-8"


settings = Settings()
