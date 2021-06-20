FROM python:3.9.5-buster

ENV PATH="${PATH}:/app/backend"

WORKDIR /app/backend
ADD ./backend /app/backend


RUN pip install pipenv && \
    pipenv install

EXPOSE 8000

