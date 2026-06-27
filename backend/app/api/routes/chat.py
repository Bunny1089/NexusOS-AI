from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
import logging
from app.services.ai_service import AIService

logger = logging.getLogger(__name__)

router = APIRouter()

class ChatRequest(BaseModel):
    user_id: str = Field(..., min_length=1)
    message: str = Field(..., min_length=1, max_length=2000)

class ChatResponse(BaseModel):
    reply: str

@router.post("", response_model=ChatResponse)
def chat(request: ChatRequest):
    try:
        ai = AIService()
        reply = ai.chat(request.user_id, request.message)
        return {"reply": reply}
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    except RuntimeError as exc:
        detail = str(exc)
        if "quota" in detail.lower():
            raise HTTPException(status_code=429, detail=detail)
        if "temporarily unavailable" in detail.lower():
            raise HTTPException(status_code=503, detail=detail)
        raise HTTPException(status_code=502, detail=detail)
    except Exception as exc:
        # Log the full exception for debugging
        logger.exception("Unhandled exception while generating AI chat response")
        # Return a meaningful JSON error message while avoiding leaking secrets
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error while generating AI response: {str(exc)}",
        )
