"""Simple test runner to verify Gemini integration from the backend.
Run from the project root with the backend virtual env activated.
"""
import logging
from app.services.ai_service import AIService

logging.basicConfig(level=logging.INFO)

if __name__ == "__main__":
    svc = AIService()
    try:
        resp = svc.chat("test-user", "Hello")
        print("Gemini response:\n", resp)
    except Exception as e:
        print("Gemini test failed:", e)
        raise
