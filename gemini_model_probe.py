from google import genai
from app.core.config import settings
client = genai.Client(api_key=settings.ai_api_key)
models = [
    'gemini-flash-latest',
    'gemini-2.0-flash',
    'gemini-2.0-flash-lite',
    'gemini-2.5-flash-lite',
    'gemini-2.5-flash',
]
for model in models:
    try:
        print('TESTING', model)
        response = client.models.generate_content(model=model, contents='Hello from model test')
        print('SUCCESS', model, repr(response.text)[:120])
        break
    except Exception as e:
        print('FAIL', model, type(e).__name__, str(e).split('\n')[0])
