from google import genai
from app.core.config import settings
client = genai.Client(api_key=settings.ai_api_key)
try:
    for model in client.models.list():
        print(model.name, model.supported_actions)
except Exception as e:
    print("FAILED:", e)
