from app.services.ai_service import AIService
try:
    ai = AIService()
    print("API Key read successfully:", len(ai.api_key))
    reply = ai.chat("student-1", "Hello from validation script")
    print("Success! Reply:", reply)
except Exception as e:
    import traceback
    print("ERROR OCCURRED:")
    traceback.print_exc()
