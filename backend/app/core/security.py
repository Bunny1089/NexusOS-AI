import re
from typing import Any

MAX_PROMPT_LENGTH = 4000
MAX_RESUME_LENGTH = 50000
MAX_USER_ID_LENGTH = 64
MAX_PAYLOAD_KEYS = 32

_BLOCKED_PATTERNS = (
    r"ignore\s+(all\s+)?previous\s+instructions",
    r"system\s+prompt",
    r"<\s*script",
    r"javascript:",
    r"__import__",
    r"exec\s*\(",
    r"eval\s*\(",
)


def validate_user_id(user_id: str) -> str:
    cleaned = (user_id or "").strip()
    if not cleaned or len(cleaned) > MAX_USER_ID_LENGTH:
        raise ValueError("Invalid user_id.")
    if not re.fullmatch(r"[A-Za-z0-9._-]+", cleaned):
        raise ValueError("user_id contains invalid characters.")
    return cleaned


def validate_prompt(text: str, *, field_name: str = "message", max_length: int = MAX_PROMPT_LENGTH) -> str:
    cleaned = (text or "").strip()
    if not cleaned:
        raise ValueError(f"{field_name} is required.")
    if len(cleaned) > max_length:
        raise ValueError(f"{field_name} exceeds maximum length of {max_length} characters.")
    lowered = cleaned.lower()
    for pattern in _BLOCKED_PATTERNS:
        if re.search(pattern, lowered):
            raise ValueError(f"{field_name} contains disallowed content.")
    return cleaned


def validate_resume_text(text: str) -> str:
    return validate_prompt(text, field_name="resume_text", max_length=MAX_RESUME_LENGTH)


def sanitize_payload(payload: dict[str, Any] | None) -> dict[str, Any]:
    if payload is None:
        return {}
    if not isinstance(payload, dict):
        raise ValueError("payload must be an object.")
    if len(payload) > MAX_PAYLOAD_KEYS:
        raise ValueError("payload has too many keys.")

    sanitized: dict[str, Any] = {}
    for key, value in payload.items():
        if not isinstance(key, str) or not key.strip():
            raise ValueError("payload keys must be non-empty strings.")
        if key.startswith("_"):
            continue
        if isinstance(value, str) and key in {"request_text", "resume_text", "resumeText", "message"}:
            if key in {"resume_text", "resumeText"}:
                sanitized[key] = validate_resume_text(value)
            else:
                sanitized[key] = validate_prompt(value, field_name=key)
        elif isinstance(value, (str, int, float, bool, list, dict)) or value is None:
            sanitized[key] = value
        else:
            raise ValueError(f"Unsupported payload value type for key '{key}'.")
    return sanitized


def safe_tool_name(name: str) -> str:
    cleaned = (name or "").strip()
    if not re.fullmatch(r"[a-z0-9_.]+", cleaned):
        raise ValueError("Invalid MCP tool name.")
    return cleaned
