import asyncio
import json
import re
from socket import AF_INET

import aiohttp
import async_timeout
from fastapi import HTTPException
from fastapi.encoders import jsonable_encoder

from app import config

SIZE_POOL_AIOHTTP = 100


class SingletonAioHttpClient:
    aiohttp_client = None

    @classmethod
    def get_aiohttp_client(cls):
        if cls.aiohttp_client is None:
            connector = aiohttp.TCPConnector(family=AF_INET, limit_per_host=SIZE_POOL_AIOHTTP)
            cls.aiohttp_client = aiohttp.ClientSession(connector=connector)

        return cls.aiohttp_client

    @classmethod
    async def close_aiohttp_client(cls):
        if cls.aiohttp_client:
            await cls.aiohttp_client.close()
            cls.aiohttp_client = None


async def stream_subscription_as_ndjson(subscription):
    async with async_timeout.timeout(config.STREAM_TIMEOUT_SEC):
        try:
            async for chunk in subscription:
                yield json.dumps(jsonable_encoder(chunk)) + "\n"
        except asyncio.TimeoutError:
            raise HTTPException(status_code=504, detail="Stream timed out")


def get_headers(token):
    return {
        "Authorization": f"Token {token}",
        "Content-Type": "application/json"
    }


def to_snake_case(val):
    return (re.sub(r"(?<=[a-z])(?=[A-Z])|[^a-zA-Z]", " ", val)
            .replace(" ", "_")
            .strip("_"))
