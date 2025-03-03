import slowapi
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address

from app import utils, views

def on_startup():
    utils.SingletonAioHttpClient.get_aiohttp_client()


async def on_shutdown():
    await utils.SingletonAioHttpClient.close_aiohttp_client()


app = FastAPI(
    docs_url="/schema/ui",
    title="Transformers Agents",
    redoc_url=None,
    on_startup=[on_startup],
    on_shutdown=[on_shutdown]
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


limiter = slowapi.Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded,
                          slowapi._rate_limit_exceeded_handler)


app.get("/status")(views.status)
app.post(
    "/chat/",
    response_model=None,
    response_class=StreamingResponse,
    responses={
        200: {
            "description": "Stream of ndjson messages",
            "content": {
                "application/x-ndjson": {
                    "example": "ndjson stream of events"
                }
            },
        }
    })(views.chat)