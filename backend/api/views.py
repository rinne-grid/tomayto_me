from rest_framework import generics
from rest_framework import permissions
from django.http.response import HttpResponseForbidden
from api.serializers import TaskSerializer
from todo.models import Task, Project, ProjectMember
from todo.utils import has_user_access_project


class TaskListCreateAPIView(generics.ListCreateAPIView):
    """タスク作成及び取得ビューです"""

    serializer_class = TaskSerializer
    permission_classes = (permissions.IsAuthenticated,)

    # TODO: タスク作成時のエスケープ処理、バリデーションが必要
    def post(self, request, *args, **kwargs):
        project_id = kwargs["project_id"]
        if has_user_access_project(request.user.id, project_id):
            return self.create(request, *args, **kwargs)
        else:
            return HttpResponseForbidden()

    #
    # def get(self, request, *args, **kwargs):
    #     return self.list(request, *args, **kwargs)

    def get_queryset(self):
        """対象ユーザの権限があるタスクのみを取得する"""
        project_task_list = []

        project_id = self.kwargs["project_id"]

        # タスクへのアクセス権限チェック

        if has_user_access_project(self.request.user.id, project_id):
            project_task_list = Task.objects.filter(project__id=project_id)

        return project_task_list


task_list_create_api_view = TaskListCreateAPIView.as_view()
