import json
import httpx

url = "http://127.0.0.1:8000/api/chat"
payload = {"user_id": "test-user", "message": "Hello from end-to-end test"}

with httpx.Client(timeout=30.0) as client:
    r = client.post(url, json=payload)
    print(r.status_code)
    try:
        print(json.dumps(r.json(), indent=2))
    except Exception:
        print(r.text)
