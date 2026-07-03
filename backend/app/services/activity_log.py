import json
from datetime import datetime, timezone
from typing import Any

from app.db.database import get_connection


class ActivityLogService:

    def record_event(
        self,
        user_id: str,
        agent: str,
        status: str,
        action: str,
        message: str,
    ) -> dict[str, Any]:

        timestamp = datetime.now(timezone.utc).isoformat()

        conn = get_connection()

        try:
            with conn:
                cursor = conn.execute(
                    """
                    INSERT INTO activity_events
                    (timestamp,user_id,agent,status,action,message)
                    VALUES (?,?,?,?,?,?)
                    """,
                    (
                        timestamp,
                        user_id,
                        agent,
                        status,
                        action,
                        message,
                    ),
                )

                event_id = cursor.lastrowid

        finally:
            conn.close()

        return {
            "event_id": event_id,
            "timestamp": timestamp,
            "user_id": user_id,
            "agent": agent,
            "status": status,
            "action": action,
            "message": message,
        }

    def list_recent(
        self,
        user_id: str | None = None,
        limit: int = 200,
    ) -> list[dict[str, Any]]:

        conn = get_connection()

        try:

            if user_id:

                rows = conn.execute(
                    """
                    SELECT *
                    FROM activity_events
                    WHERE user_id=?
                    ORDER BY event_id DESC
                    LIMIT ?
                    """,
                    (user_id, limit),
                ).fetchall()

            else:

                rows = conn.execute(
                    """
                    SELECT *
                    FROM activity_events
                    ORDER BY event_id DESC
                    LIMIT ?
                    """,
                    (limit,),
                ).fetchall()

            return [dict(row) for row in rows]

        finally:
            conn.close()

    def save_snapshot(
        self,
        user_id: str,
        payload: dict[str, Any],
    ):

        timestamp = datetime.now(timezone.utc).isoformat()

        conn = get_connection()

        try:

            with conn:
                conn.execute(
                    """
                    INSERT INTO dashboard_snapshots
                    (user_id,timestamp,payload)
                    VALUES (?,?,?)
                    """,
                    (
                        user_id,
                        timestamp,
                        json.dumps(payload),
                    ),
                )

        finally:
            conn.close()

    def get_latest_snapshot(
        self,
        user_id: str,
    ):

        conn = get_connection()

        try:

            row = conn.execute(
                """
                SELECT payload
                FROM dashboard_snapshots
                WHERE user_id=?
                ORDER BY id DESC
                LIMIT 1
                """,
                (user_id,),
            ).fetchone()

            if row is None:
                return None

            return json.loads(row["payload"])

        finally:
            conn.close()


activity_log_service = ActivityLogService()