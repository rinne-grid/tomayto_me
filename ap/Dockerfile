FROM python:3.9.5-buster

# ARG arg_django_settings_module

ENV PATH="${PATH}:/app/backend"
# ENV DJANGO_SETTINGS_MODULE="${arg_django_settings_module}"

WORKDIR /app/backend
ADD ./backend /app/backend


RUN pip install pipenv && \
    pipenv install

EXPOSE 8000
