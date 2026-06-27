from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from app.agents.coordinator import CoordinatorAgent

router = APIRouter()

class AgentRequest(BaseModel):
    user_id: str = Field(..., min_length=1)
    payload: dict

class AgentResponse(BaseModel):
    result: dict

@router.post("/plan", response_model=AgentResponse)
def plan(request: AgentRequest):
    try:
        coordinator = CoordinatorAgent()
        result = coordinator.execute(request.user_id, {**request.payload, "agents": ["planner"]})
        return {"result": result}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))

@router.post("/resume-review", response_model=AgentResponse)
def resume_review(request: AgentRequest):
    try:
        coordinator = CoordinatorAgent()
        result = coordinator.execute(request.user_id, {**request.payload, "agents": ["resume"]})
        return {"result": result}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))

@router.post("/internship-search", response_model=AgentResponse)
def internship_search(request: AgentRequest):
    try:
        coordinator = CoordinatorAgent()
        result = coordinator.execute(request.user_id, {**request.payload, "agents": ["career"]})
        return {"result": result}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))

@router.post("/study-plan", response_model=AgentResponse)
def study_plan(request: AgentRequest):
    try:
        coordinator = CoordinatorAgent()
        result = coordinator.execute(request.user_id, {**request.payload, "agents": ["study"]})
        return {"result": result}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))

@router.post("/interview-coach", response_model=AgentResponse)
def interview_coach(request: AgentRequest):
    try:
        coordinator = CoordinatorAgent()
        result = coordinator.execute(request.user_id, {**request.payload, "agents": ["interview"]})
        return {"result": result}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))

@router.post("/life-schedule", response_model=AgentResponse)
def life_schedule(request: AgentRequest):
    try:
        coordinator = CoordinatorAgent()
        result = coordinator.execute(request.user_id, {**request.payload, "agents": ["planner"]})
        return {"result": result}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))

@router.post("/dispatch", response_model=AgentResponse)
def dispatch(request: AgentRequest):
    try:
        coordinator = CoordinatorAgent()
        result = coordinator.execute(request.user_id, request.payload)
        return {"result": result}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))

@router.get("/activity")
def activity():
    from app.services.activity_log import activity_log_service

    return activity_log_service.list_recent()
