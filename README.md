# Transformers assignment
The goal of this assignment is to implement a chat feature in a React application. The chat feature should use the stream from the FastAPI chat endpoint and render it on the frontend.

# Your assignment:
Your assignment is to create a chat feature in a react application. To this end you'll need to implement two parts:

1. You need to implement the ChatAPI to return data in a streaming fashion.
2. You need to update the frontend to read and display that data in a streaming fashion.

The big challenge here is that we want the response to stream to the user! This means that each token produced by the model is sent to the front-end seperately. To give the user the impression that the data is being generated we require that each token is being displayed as soon as it comes in. You are allowed to use 3rd party libraries.

## How should the output look like?
To give you a feel of what the output should look like, we've published [this video](https://youtu.be/8aOT2-yK9Ds). Here you see the sort of typing effect. This is not a real typing effect, but in fact is just the data coming over the API chunk by chunk (letters or pairs of letters) and being displayed right away.

# Getting started
This application consists of two parts the `api` which is the backend on top of `langchain` and `fastapi` and the frontend based on `react`. 

## 1. The API
To start the api, simply create the proper `.env` file with the OpenAI key provided. Next create a python virtual environment and install the `requirements.txt` file into it. After you've done that you should be able to start a `uvicorn` dev server using:
```shell
uvicorn main:app --reload
```
Check `http://localhost:80/status/` and see that you now have a server running! Congratulations. You can test your (to be turned into a stream) endpoint by:

```bash
curl --location 'http://localhost:80/chat/' \
--header 'Content-Type: application/json' \
--no-buffer \
--data '{
    "messages": [
        {
            "type": "human",
            "content": "Hi! Can you give me a lengthy description about how you feel today?"
        },
    ]
}'

```

Now, have a look at the file in `/api/app/views/chat.py` on line 73 you see where you'll need to get to work to make this endpoint streaming. We've already provided the starting point for you by making all interactions with the model and langchain work. Now, it is your task to make sure we send these back as an ndjson (or any other format you like ofcourse) stream.

## The frontend
Install the dependencies and start you development server with `npm run dev`. You should now see the chat interface. Now open `/frontend/src/common/Agent/index.tsx`. This is where you'll need to implement the streaming logic.

Good Luck!

```