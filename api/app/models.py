from typing import List, Union

from langchain_core.documents import Document
from langchain_core.messages import AIMessage, HumanMessage
from pydantic import BaseModel, Field
from pydantic.types import Optional, UUID


class Content(BaseModel):
    uuid: UUID
    name: str
    collection: Optional[dict]
    type: str
    url: str
    is_external: bool


class IndexableFragment(Document):
    uuid: UUID
    metadata: dict
    source: Content


class RagRequest(BaseModel):
    messages: List[Union[AIMessage, HumanMessage]] = Field(min_items=1)
    conversation: UUID


class ChatRequest(BaseModel):
    messages: List[Union[AIMessage, HumanMessage]] = Field(min_items=1)


class OpenApiFunction(BaseModel):
    uuid: UUID
    spec: dict
    name: str
    path: str
    display_name: str = None
    display_description: str = None
    method: str
    description: str
    endpoint: str
    frontend_metadata: dict
