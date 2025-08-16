from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime, timezone

app = FastAPI(title="Music Friends API (Python)")

class NowPlaying(BaseModel):
    userId: str
    title: str
    artist: str
    album: str | None = None
    artworkUrl: str | None = None
    service: str = "demo"
    startedAt: str
    positionSec: int
    isPaused: bool = False
    updatedAt: str

@app.get("/health")
def health():
    return {"ok": True, "backend": "python", "time": datetime.now(timezone.utc).isoformat()}

@app.get("/now/{friendId}", response_model=NowPlaying)
def now(friendId: str):
    now_iso = datetime.now(timezone.utc).isoformat()
    return NowPlaying(
        userId=friendId,
        title="Lose Yourself",
        artist="Eminem",
        album="8 Mile",
        artworkUrl="https://via.placeholder.com/128",
        service="demo",
        startedAt=now_iso,
        positionSec=42,
        isPaused=False,
        updatedAt=now_iso
    )
