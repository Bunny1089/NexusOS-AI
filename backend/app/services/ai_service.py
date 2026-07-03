import logging
import re
from typing import Any
from app.core.config import settings

logger = logging.getLogger(__name__)


class AIService:
    def __init__(self):
        self.api_key = settings.ai_api_key or ""
        self.provider = settings.ai_provider
        self._genai = None
        self._ClientError = None
        self._use_fallback = not self.api_key

        if self._use_fallback:
            logger.info("No AI API key configured; using built-in heuristic responses.")
            return

        try:
            from google import genai  # type: ignore
            from google.genai.errors import ClientError  # type: ignore
        except Exception as exc:  # ImportError or other import-time errors
            logger.exception("Failed to import Google GenAI SDK")
            self._use_fallback = True
            return

        self._genai = genai
        self._ClientError = ClientError

    def _mask_key(self) -> str:
        k = self.api_key or ""
        if len(k) <= 8:
            return "*" * len(k)
        return f"{k[:4]}...{k[-4:]}"

    def _extract_text(self, resp: Any) -> str | None:
        if resp is None:
            return None
        if isinstance(resp, str):
            return resp
        if hasattr(resp, "text"):
            return getattr(resp, "text")
        if hasattr(resp, "output_text"):
            return getattr(resp, "output_text")
        if isinstance(resp, dict):
            for key in ("text", "content", "output", "response"):
                val = resp.get(key)
                if isinstance(val, str):
                    return val
                if isinstance(val, dict) and "text" in val:
                    return val["text"]
            if "candidates" in resp and isinstance(resp["candidates"], list):
                first = resp["candidates"][0]
                if isinstance(first, str):
                    return first
                if isinstance(first, dict) and "content" in first:
                    return first["content"]
        if hasattr(resp, "output"):
            out = getattr(resp, "output")
            if isinstance(out, str):
                return out
            if hasattr(out, "text"):
                return getattr(out, "text")
            if isinstance(out, dict) and "text" in out:
                return out["text"]
        if hasattr(resp, "candidates"):
            try:
                cands = getattr(resp, "candidates")
                if isinstance(cands, (list, tuple)) and len(cands) > 0:
                    first = cands[0]
                    if isinstance(first, str):
                        return first
                    if hasattr(first, "content"):
                        return getattr(first, "content")
                    if isinstance(first, dict) and "content" in first:
                        return first["content"]
            except Exception:
                pass
        return None

    def _try_call_patterns(self, client: Any, model: str, message: str) -> str:
        callables = []

        if hasattr(client, "models"):
            models = getattr(client, "models")
            if hasattr(models, "generate_content"):
                callables.append(lambda: models.generate_content(model=model, contents=message))
            if hasattr(models, "generate"):
                callables.append(lambda: models.generate(model=model, content=message))

        if hasattr(client, "responses") and hasattr(client.responses, "generate"):
            callables.append(lambda: client.responses.generate(model=model, input=message))

        if hasattr(client, "generate_text"):
            callables.append(lambda: client.generate_text(model=model, prompt=message))

        if hasattr(self._genai, "generate_text"):
            callables.append(lambda: self._genai.generate_text(model=model, prompt=message))

        last_exc: Exception | None = None
        for call in callables:
            try:
                resp = call()
                text = self._extract_text(resp)
                if text:
                    return text
            except self._ClientError as exc:
                raise
            except Exception as exc:
                logger.debug("Call pattern failed for model %s: %s", model, exc, exc_info=True)
                last_exc = exc
                continue

        if last_exc is not None:
            raise last_exc

        raise RuntimeError("No compatible client call pattern succeeded for this SDK version.")

    def _is_quota_error(self, exc: Exception) -> bool:
        message = getattr(exc, "message", None) or str(exc)
        if not isinstance(message, str):
            return False
        normalized = message.lower()
        return "resource_exhausted" in normalized or "quota" in normalized or "exhausted" in normalized

    def _fallback_chat(self, message: str) -> str:
        lowered = message.lower()
        if "resume" in lowered:
            return "I can help you tighten your resume by emphasizing measurable wins, adding ATS keywords, and aligning your summary with the target role."
        if "study" in lowered or "exam" in lowered:
            return "A strong study plan should prioritize high-impact topics first, add short review blocks, and schedule weekly practice sessions."
        if "interview" in lowered:
            return "Practice concise STAR stories, prepare 2-3 technical examples, and research the company before your interview."
        return "NexusOS is ready to help you plan your week, refine your resume, and prepare for interviews."

    def _extract_resume_sections(self, resume_text: str) -> dict[str, list[str]]:
        sections: dict[str, list[str]] = {"summary": [], "skills": [], "experience": [], "education": [], "projects": []}
        if not resume_text:
            return sections

        lines = [line.strip() for line in resume_text.splitlines() if line.strip()]
        current_section = "summary"
        for line in lines:
            lowered = line.lower()
            if lowered.startswith(("summary", "profile", "objective")):
                current_section = "summary"
            elif lowered.startswith(("skills", "technical skills", "core competencies")):
                current_section = "skills"
            elif lowered.startswith(("experience", "work experience", "employment")):
                current_section = "experience"
            elif lowered.startswith(("education", "academic")):
                current_section = "education"
            elif lowered.startswith(("projects", "selected projects")):
                current_section = "projects"
            else:
                sections[current_section].append(line)

        return sections

    def _build_resume_analysis(self, payload: dict) -> dict:
        resume_text = str(payload.get("resume_text") or payload.get("resumeText") or "")
        sections = self._extract_resume_sections(resume_text)
        text_length = len(resume_text)

        score = 56
        if any(sections[section] for section in sections):
            score += 12
        if len(sections["skills"]) > 0:
            score += 8
        if len(sections["experience"]) > 0:
            score += 8
        if len(sections["projects"]) > 0:
            score += 6
        if text_length > 700:
            score += 8
        if any(keyword in resume_text.lower() for keyword in ["python", "react", "sql", "machine learning", "data", "product"]):
            score += 6
        score = min(96, score)

        highlights = []
        if sections["summary"]:
            highlights.append("Clear opening summary")
        if sections["skills"]:
            highlights.append("Skills section present")
        if sections["experience"]:
            highlights.append("Experience section included")
        if not highlights:
            highlights = ["Resume content detected", "Add stronger section headers"]

        recommendations = [
            "Quantify achievements with metrics and results.",
            "Add role-specific ATS keywords that match your target job.",
            "Tighten your summary to emphasize your strongest impact.",
        ]

        feedback = (
            f"Your resume looks promising and scored {score}% for ATS readability. "
            "Focus on measurable outcomes, clear section headers, and tailored keywords to improve recruiter response."
        )

        return {
            "score": score,
            "feedback": feedback,
            "highlights": highlights,
            "recommendations": recommendations,
            "payload": payload,
        }

    def chat(self, user_id: str, message: str) -> str:
        if self._use_fallback:
            return self._fallback_chat(message)

        logger.info("Initializing Gemini client (key=%s) for user=%s", self._mask_key(), user_id)
        try:
            client = self._genai.Client(api_key=self.api_key)
        except Exception as exc:
            logger.exception("Failed to initialize Gemini client")
            return self._fallback_chat(message)

        candidate_models = [
            "gemini-flash-latest",
            "gemini-2.5-flash-lite",
            "gemini-2.0-flash-lite",
            "gemini-2.0-flash",
        ]

        last_error: Exception | None = None
        for model in candidate_models:
            try:
                text = self._try_call_patterns(client, model, message)
                if text:
                    logger.info("Model %s responded for user=%s", model, user_id)
                    return text
            except self._ClientError as exc:
                last_error = exc
                status = getattr(exc, "status_code", None)
                logger.warning("ClientError from Gemini model=%s status=%s: %s", model, status, exc)
                if status == 404:
                    continue
                if status == 401:
                    return self._fallback_chat(message)
                if status == 429 or self._is_quota_error(exc):
                    return self._fallback_chat(message)
                if status in (502, 503, 504):
                    return self._fallback_chat(message)
                return self._fallback_chat(message)
            except Exception as exc:
                last_error = exc
                logger.exception("Non-ClientError while calling Gemini model=%s", model)
                continue

        if last_error is not None:
            logger.exception("All candidate models failed")

        return self._fallback_chat(message)

    def plan(self, user_id: str, payload: dict) -> dict:
        goals = payload.get("goals") or {"exam": "Core coursework"}
        return {
            "plan": {
                "focus_area": goals.get("exam", "Core coursework"),
                "timeline": [
                    {"day": "Monday", "schedule": "Review core concepts and notes"},
                    {"day": "Wednesday", "schedule": "Practice problems and flashcards"},
                    {"day": "Friday", "schedule": "Mock review and recap"},
                ],
                "milestones": ["Build a weekly sprint", "Track progress", "Refine weak spots"],
            },
            "payload": payload,
        }

    def resume_review(self, user_id: str, payload: dict) -> dict:
        return self._build_resume_analysis(payload)

    def internship_search(self, user_id: str, payload: dict) -> dict:
        interests = payload.get("interests") or ["AI", "product"]
        return {
            "recommendations": [
                {"title": f"{interests[0]} Product Intern", "company": "Nexus Labs", "deadline": "2026-07-15", "match": 92},
                {"title": f"{interests[0]} Research Assistant", "company": "CampusHire", "deadline": "2026-08-01", "match": 87},
            ],
            "payload": payload,
        }

    def _mock_response(self, prompt: str) -> str:
        return f"Heuristic response for: {prompt}"
