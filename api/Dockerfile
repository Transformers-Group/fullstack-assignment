FROM python:3.11

ARG APP_VERSION=0.0.0
ENV APP_VERSION="${APP_VERSION}"

RUN useradd app

WORKDIR /app

COPY .env .

COPY requirements.txt ./
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

COPY main.py .
COPY app ./app

EXPOSE 80

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]
