import json

from langchain.agents import AgentExecutor, create_openai_tools_agent
from langchain_core.prompts import (
    ChatPromptTemplate,
    MessagesPlaceholder,
)
from langchain_openai import ChatOpenAI
from fastapi.responses import Response
from starlette.responses import StreamingResponse

from app import config, utils, tools
from app.models import ChatRequest

def _get_agent_executor(model, system_prompt, callbacks=None):
    prompt = ChatPromptTemplate.from_messages([
        ("system", system_prompt),
        MessagesPlaceholder("chat_history"),
        MessagesPlaceholder("agent_scratchpad")
    ])
    provider = model["provider"]
    if provider != "OPENAI":
        raise Exception(f"Model provider {provider} is not implemented")
    llm = ChatOpenAI(openai_api_key=config.OPENAI_KEY, model=model["name"])
    combined_tools = [tools.datetime_tool]

    agent = create_openai_tools_agent(llm, combined_tools, prompt)

    return AgentExecutor.from_agent_and_tools(
        agent=agent,
        tools=combined_tools,
        verbose=False,
        callbacks=callbacks
    )


def _chat_message_maker(event):
    kind = event["event"]
    if kind == "on_chat_model_stream":
        content = event["data"]["chunk"].content
        if content:
            # Empty content in the context of OpenAI means
            # that the model is asking for a tool to be invoked.
            # So we only print non-empty content
            return {"type": "answer", "content": content}
    elif kind == "on_tool_start":
        return {
            "type": "tool_call",
            "content": {"name": event["name"], "data": event["data"]},
        }
    elif kind == "on_retriever_end":
        if event["data"]["output"]:
            return {
                "type": "context",
                "content": event["data"]["output"].get("documents"),
            }


async def chat(data: ChatRequest):
    chain = _get_agent_executor(
        model={"name": 'gpt-3.5-turbo', "provider": "OPENAI"},
        system_prompt='You are a helpfull assistant called Astrid that can answer questions about any topic. '
                      'You are are employed at Transformers group and are tasked with making the employees happy.',
    )
    subscription = chain.astream_events({"chat_history": data.messages}, version="v1")

    async for event in subscription:
        parsed_message = _chat_message_maker(event)
        if parsed_message:
            print(parsed_message)


    # TODO: Add your part here!

    return Response(json.dumps({'status': 'Help! Please make me streaming!'}), media_type='application/json')