import os

OPENAI_KEY = os.getenv("OPENAI_KEY")
MAX_GENERATED_TOKENS = 1024
MODEL = "gpt-3.5-turbo-1106"
STREAM_TIMEOUT_SEC = 60