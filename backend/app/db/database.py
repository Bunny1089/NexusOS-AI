import sqlite3
from pathlib import Path


def get_db_path() -> Path:
    data_dir = Path(__file__).resolve().parents[2] / "data"
    data_dir.mkdir(parents=True, exist_ok=True)
    return data_dir / "nexusos.db"


def get_connection() -> sqlite3.Connection:
    conn = sqlite3.connect(get_db_path(), timeout=30)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    conn.execute("PRAGMA journal_mode = WAL")
    conn.execute("PRAGMA busy_timeout = 5000")
    return conn


def init_database() -> None:
    conn = get_connection()

    with conn:
        conn.executescript(
            """
            CREATE TABLE IF NOT EXISTS activity_events (
                event_id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp TEXT NOT NULL,
                user_id TEXT NOT NULL,
                agent TEXT NOT NULL,
                status TEXT NOT NULL,
                action TEXT NOT NULL,
                message TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS dashboard_snapshots (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id TEXT NOT NULL,
                timestamp TEXT NOT NULL,
                payload TEXT NOT NULL
            );

            CREATE INDEX IF NOT EXISTS idx_activity_user_ts
            ON activity_events(user_id, timestamp DESC);
            """
        )

    conn.close()