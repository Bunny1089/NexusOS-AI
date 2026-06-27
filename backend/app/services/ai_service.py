import logging
from typing import Any
from app.core.config import settings

logger = logging.getLogger(__name__)


class AIService:
    def __init__(self):
        self.api_key = settings.ai_api_key
        self.provider = settings.ai_provider

        if not self.api_key:
            raise ValueError(
                "Google Gemini API key is missing. Set AI_API_KEY in the .env file."
            )

        # Lazy import of the Google GenAI SDK so we can provide a helpful error
        try:
            from google import genai  # type: ignore
            from google.genai.errors import ClientError  # type: ignore
        except Exception as exc:  # ImportError or other import-time errors
            logger.exception("Failed to import Google GenAI SDK")
            raise ImportError(
                "Google GenAI SDK not available. Install `google-genai` (pip) and try again."
            ) from exc

        self._genai = genai
        self._ClientError = ClientError

    def _mask_key(self) -> str:
        k = self.api_key or ""
        if len(k) <= 8:
            return "*" * len(k)
        return f"{k[:4]}...{k[-4:]}"

    def _extract_text(self, resp: Any) -> str | None:
        # Normalized extraction from many possible SDK response shapes
        if resp is None:
            return None
        if isinstance(resp, str):
            return resp
        if hasattr(resp, "text"):
            return getattr(resp, "text")
        if hasattr(resp, "output_text"):
            return getattr(resp, "output_text")
        # dict-like
        if isinstance(resp, dict):
            # common keys
            for key in ("text", "content", "output", "response"):
                val = resp.get(key)
                if isinstance(val, str):
                    return val
                if isinstance(val, dict) and "text" in val:
                    return val["text"]
            # candidates -> take first
            if "candidates" in resp and isinstance(resp["candidates"], list):
                first = resp["candidates"][0]
                if isinstance(first, str):
                    return first
                if isinstance(first, dict) and "content" in first:
                    return first["content"]
        # objects with nested output attribute
        if hasattr(resp, "output"):
            out = getattr(resp, "output")
            if isinstance(out, str):
                return out
            if hasattr(out, "text"):
                return getattr(out, "text")
            if isinstance(out, dict) and "text" in out:
                return out["text"]

        # Try iterating candidates attribute
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
        # Try multiple call patterns to support different SDK versions
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

        # Module-level helpers (older/newer SDKs)
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
                # bubble up ClientError for status-specific handling
                raise
            except Exception as exc:
                logger.debug("Call pattern failed for model %s: %s", model, exc, exc_info=True)
                last_exc = exc
                continue

        if last_exc is not None:
            raise last_exc

        raise RuntimeError("No compatible client call pattern succeeded for this SDK version.")

    def _is_quota_error(self, exc: Exception) -> bool:
        message = getattr(exc, 'message', None) or str(exc)
        if not isinstance(message, str):
            return False
        normalized = message.lower()
        return 'resource_exhausted' in normalized or 'quota' in normalized or 'exhausted' in normalized

    def chat(self, user_id: str, message: str) -> str:
        logger.info("Initializing Gemini client (key=%s) for user=%s", self._mask_key(), user_id)
        try:
            client = self._genai.Client(api_key=self.api_key)
        except Exception as exc:
            logger.exception("Failed to initialize Gemini client")
            raise RuntimeError("Failed to initialize Gemini client. Verify API key and SDK installation.") from exc

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
                    # model not available for this account
                    continue
                if status == 401:
                    raise RuntimeError("Invalid Google Gemini API key. Please check AI_API_KEY.") from exc
                if status == 429 or self._is_quota_error(exc):
                    logger.exception("Gemini quota error for model=%s", model)
                    raise RuntimeError(
                        "The AI service has temporarily reached its usage limit. Please try again in a minute or use another API key."
                    ) from exc
                if status in (502, 503, 504):
                    logger.exception("Gemini service unavailable for model=%s", model)
                    raise RuntimeError(
                        "Google Gemini service is temporarily unavailable. Please try again later."
                    ) from exc
                logger.exception("Google Gemini request failed for model=%s", model)
                raise RuntimeError("Google Gemini request failed. Please try again later.") from exc
            except Exception as exc:
                last_error = exc
                logger.exception("Non-ClientError while calling Gemini model=%s", model)
                continue

        if last_error is not None:
            logger.exception("All candidate models failed")
            raise RuntimeError(
                "Google Gemini chat failed. Please verify your API key and network connectivity."
            ) from last_error

        raise RuntimeError("Google Gemini did not find a supported model for this account.")

    def plan(self, user_id: str, payload: dict) -> dict:
        return {"plan": self._mock_response("Create a study plan."), "payload": payload}

    def resume_review(self, user_id: str, payload: dict) -> dict:
        return {"score": 82, "feedback": self._mock_response("Review resume"), "payload": payload}

    def internship_search(self, user_id: str, payload: dict) -> dict:
        return {"recommendations": [
            {"title": "AI Product Intern", "company": "Nexus Labs", "deadline": "2026-07-15"},
            {"title": "Data Science Intern", "company": "CampusHire", "deadline": "2026-08-01"}
        ], "payload": payload}

    def _mock_response(self, prompt: str) -> str:
        return f"Simulated Gemini response for: {prompt}"
