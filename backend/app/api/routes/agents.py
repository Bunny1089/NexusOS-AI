from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from app.agents.coordinator import get_coordinator
from app.core.security import sanitize_payload, validate_user_id
from app.services.dashboard_service import dashboard_service

router = APIRouter()


class AgentRequest(BaseModel):
    user_id: str = Field(..., min_length=1, max_length=64)
    payload: dict = Field(default_factory=dict)


class AgentResponse(BaseModel):
    result: dict


def _run_agent(user_id: str, payload: dict, agents: list[str]) -> dict:
    validated_user = validate_user_id(user_id)
    sanitized_payload = sanitize_payload(payload)
    coordinator = get_coordinator()
    result = coordinator.execute(validated_user, {**sanitized_payload, "agents": agents})
    dashboard_service.save_from_coordinator(validated_user, result)
    return result


@router.post("/plan", response_model=AgentResponse)
def plan(request: AgentRequest):
    try:
        return {"result": _run_agent(request.user_id, request.payload, ["planner"])}
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc


@router.post("/resume-review", response_model=AgentResponse)
def resume_review(request: AgentRequest):
    try:
        return {"result": _run_agent(request.user_id, request.payload, ["resume"])}
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc


@router.post("/career", response_model=AgentResponse)
def career(request: AgentRequest):
    try:
        return {"result": _run_agent(request.user_id, request.payload, ["career"])}
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc


@router.post("/internship-search", response_model=AgentResponse)
def internship_search(request: AgentRequest):
    try:
        return {"result": _run_agent(request.user_id, request.payload, ["internship"])}
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc


@router.post("/study-plan", response_model=AgentResponse)
def study_plan(request: AgentRequest):
    try:
        return {"result": _run_agent(request.user_id, request.payload, ["study"])}
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc


@router.post("/interview-coach", response_model=AgentResponse)
def interview_coach(request: AgentRequest):
    try:
        return {"result": _run_agent(request.user_id, request.payload, ["interview"])}
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc


@router.post("/life-schedule", response_model=AgentResponse)
def life_schedule(request: AgentRequest):
    try:
        return {"result": _run_agent(request.user_id, request.payload, ["life_scheduler"])}
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc


@router.post("/dispatch", response_model=AgentResponse)
def dispatch(request: AgentRequest):
    try:
        validated_user = validate_user_id(request.user_id)
        sanitized_payload = sanitize_payload(request.payload)
        coordinator = get_coordinator()
        result = coordinator.execute(validated_user, sanitized_payload)
        dashboard_service.save_from_coordinator(validated_user, result)
        return {"result": result}
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc


@router.get("/activity")
def activity(user_id: str | None = None):
    from app.services.activity_log import activity_log_service

    if user_id:
        try:
            validated_user = validate_user_id(user_id)
        except ValueError as exc:
            raise HTTPException(status_code=400, detail=str(exc)) from exc
        return activity_log_service.list_recent(user_id=validated_user)
    return activity_log_service.list_recent()
