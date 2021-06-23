FROM python:3.9.5-buster

# ARG arg_django_settings_module

ENV PATH="${PATH}:/app/backend"
# ENV DJANGO_SETTINGS_MODULE="${arg_django_settings_module}"

WORKDIR /app/backend
ADD ./backend /app/backend


RUN pip install pipenv && \
    pipenv install


# 作成した秘密鍵をAPサーバーに配置する
COPY ./fabric_settings/ssh/id_ed25519 /root/.ssh/id_ed25519
# 鍵ファイルのパーミッション設定が必要。これをしないと、UNPROTECTED PRIVATE KEY FILEで怒られてしまう
RUN chmod 600 /root/.ssh/id_ed25519
COPY ./fabric_settings/ssh/config /root/.ssh/config

EXPOSE 8000
