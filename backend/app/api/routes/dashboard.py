from fastapi import APIRouter, HTTPException, Query
from app.core.security import validate_user_id
from app.services.dashboard_service import dashboard_service

router = APIRouter()


@router.get("")
def get_dashboard(user_id: str = Query(default="student-1")):
    try:
        validated_user = validate_user_id(user_id)
        return dashboard_service.get_dashboard(validated_user)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
