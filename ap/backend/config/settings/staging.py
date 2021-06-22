import mimetypes
from .base import *

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "USER": "admin",
        "PASSWORD": "admin",
        "NAME": "tomayto_me",
        "HOST": "db",
        "PORT": "5432",
    }
}

DEBUG = False

STATIC_URL = "/static/"

SESSION_ENGINE = "redis_sessions.session"
SESSION_REDIS = {
    "host": "ss",
    "port": "6379",
    "db": 0,
    "password": "",
    "prefix": "session",
    "socket_timeout": 1,
    "retry_on_timeout": False,
}

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "verbose": {
            "format": "{levelname} {asctime} {module} {process:d} {thread:d} {message}",
            "style": "{",
        },
        "simple": {
            "format": "{levelname} {message}",
            "style": "{",
        },
    },
    "handlers": {
        "file": {
            "level": "DEBUG",
            "class": "logging.FileHandler",
            "filename": "logs/debug.log",
            "formatter": "verbose",
        },
    },
    "loggers": {
        "django.db": {
            "handlers": ["file"],
            "level": "DEBUG",
            "propagate": False,
        },
    },
}


# INSTALLED_APPS += (
#     "debug_toolbar",
#     "django_extensions",
# )
#
# mimetypes.add_type("application/javascript", ".js", True)
# INTERNAL_IPS = ["127.0.0.1"]

# django_extensions shell_plus
# python manage.py shell_plus --print-sql
# SHELL_PLUS_PRINT_SQL = True
