# Transformers assignment
The goal of this assignment is to implement a chat feature in a React application. The chat feature should use the stream from the FastAPI chat endpoint and render it on the frontend.

# Your assignment:
Your assignment is to create the front-end for a chat feature in a React application. To this end we ask you to integrate the chat API (provided to you as a docker container in the `api`) folder with the React scafolding provided in the `frontend` folder.
The big challenge here is that the response from the chat interface comes back in a streaming fashion. This means that each token produced by the model is send to the front-end. To give the user the impression that the data is being generated we require that each token is being displayed as soon as it comes in. 

## How should the output look like?
To give you a feel of what the output should look like, we've published [this video](https://youtu.be/8aOT2-yK9Ds). Here you see the sort of typing effect. This is not a real typing effect, but in fact is just the data coming over the API chunk by chunk (letters or pairs of letters) and being displayed right away.

# Getting started
This application consists of two parts the `api` which is the backend on top of `langchain` and `fastapi` and the frontend based on `react`. 

## 1. The API
The focus of the assignment is on the front-end of this application. Therefore, we've conveniently packaged the `api` in a Docker container. To run this, simply create the proper `.env` file with the OpenAI key provided to you and use `docker-compose` to run it.

Check `http://localhost:80/status/` and see that you now have a server running! Congratulations. 

We can now make the first request to get a streaming response. For this we'll use the `/chat` endpont that will return us a `ndjson` stream of data.

__Important__: The stream returned by the endpoint is formatted as `ndjson`.

For this we use `curl` with the `--no-buffer` option. This means that we display each chunk as it comes in. 

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

## The frontend
Install the dependencies and start you development server with `npm run dev`. You should now see the chat interface. Now open `/frontend/src/common/Agent/index.tsx`. This is where you'll need to implement the streaming logic.

### Some snippets to help you out
For reading the stream, we suggest you look at https://canjs.com/doc/can-ndjson-stream.html. But please use `async`/`await` syntax. 

For sending full history to the API we suggest you look at this snippet:
```bash
curl --location 'http://localhost:80/chat/' \
--header 'Content-Type: application/json' \
--no-buffer \
--data '{
    "messages": [
        {
            "type": "human",
            "content": "Hi! My name is Floris"
        },
        {
            "type": "ai",
            "content": "Hi!Nice to meet you!"
        },
        {
            "type": "human",
            "content": "Hi! What was my name again?"
        }
    ]
}'

```
