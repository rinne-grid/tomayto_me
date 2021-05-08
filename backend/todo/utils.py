from django.db.models import QuerySet
from django.utils import timezone
from django.core import serializers
import json


def upload_to_info(instance, file_name):
    """アップロード先のパス情報を編集します
    :param instance: Model
    :param file_name:
    :return: str
    """
    current_date = timezone.now()
    year_str = str(current_date.year).zfill(4)
    month_str = str(current_date.month).zfill(2)
    day_str = str(current_date.day).zfill(2)
    date_str = f"{year_str}/{month_str}/{day_str}"
    return f"uploads/{date_str}/{instance.user.id}/{file_name}"


class AppSessionManager:
    @classmethod
    def set_session(cls, request, key, obj):
        if type(obj) == QuerySet:
            data = serializers.serialize("json", obj)
        else:
            data = obj
        request.session[key] = data

    @classmethod
    def get_session(cls, request, key):
        data = serializers.deserialize("json", request.session[key])
        return data.save()
