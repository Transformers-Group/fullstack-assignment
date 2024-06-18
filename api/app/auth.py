from fastapi import Depends
from fastapi.security import APIKeyHeader


def get_token(
    raw_token=Depends(APIKeyHeader(name="Authorization", scheme_name="Bearer"))
):
    return raw_token.split(" ")[-1]
