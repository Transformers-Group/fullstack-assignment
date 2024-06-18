from app.views.chat import chat

__all__ = [
    "chat",
    "status",
]


async def status():
    return {"status": "ok"}
