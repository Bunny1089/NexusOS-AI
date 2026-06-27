from google import genai
import os
from app.core.config import settings
try:
    client = genai.Client(api_key=settings.ai_api_key)
    response = client.models.generate_content(
        model="gemini-1.5-flash",
        contents="Hello"
    )
    print("SUCCESS on 1.5-flash:", response.text)
except Exception as e:
    print("FAILED on 1.5-flash:", type(e).__name__, str(e)[:300])
