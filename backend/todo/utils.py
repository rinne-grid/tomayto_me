from django.db.models import QuerySet, Q
from django.utils import timezone
from django.core import serializers
import json

from . import models


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


def get_user_projects(user_id):
    """
    ユーザが参照可能なプロジェクト情報を取得します
    :param user_id:
    :return: QuerySet [<Project>]
    """
    # ユーザがプロジェクトメンバーとなっているプロジェクトID一覧
    project_id_list = [
        member.project.id
        for member in models.ProjectMember.objects.select_related("user").filter(
            user__id=user_id
        )
    ]
    project_list = models.Project.objects.select_related("owner_user").filter(
        Q(owner_user=user_id) | Q(id__in=project_id_list)
    )
    return project_list


def has_user_access_project(user_id, project_id):
    """
    ユーザが対象のプロジェクトにアクセス可能かどうかを返します
    :param user_id:
    :param project_id:
    :return:
    """
    project_list = get_user_projects(user_id)
    print(project_list)
    return project_list.filter(id=project_id).exists()


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
