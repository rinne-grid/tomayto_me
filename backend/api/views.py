from rest_framework import generics
from rest_framework import permissions
from django.http.response import HttpResponseForbidden, HttpResponse
from django.db import transaction
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

    def perform_create(self, serializer):
        status = self.request.data["status"]
        project_id = self.kwargs["project_id"]
        with transaction.atomic():
            order_no = (
                Task.objects.filter(status=status, project_id=project_id).count() + 1
            )
            serializer.save(order_no=order_no)

    #
    # def get(self, request, *args, **kwargs):
    #     return self.list(request, *args, **kwargs)

    def get_queryset(self):
        """対象ユーザの権限があるタスクのみを取得する"""
        project_task_list = []

        project_id = self.kwargs["project_id"]

        # タスクへのアクセス権限チェック

        if has_user_access_project(self.request.user.id, project_id):
            project_task_list = Task.objects.filter(project__id=project_id).order_by(
                "order_no"
            )

        return project_task_list


class TaskRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = (permissions.IsAuthenticated,)

    # 権限があるデータを返す
    def get_queryset(self):
        project_id = self.kwargs["project_id"]
        task_id = self.kwargs["pk"]
        if has_user_access_project(self.request.user.id, project_id):
            return Task.objects.filter(pk=task_id)

    def put(self, request, *args, **kwargs):
        task_id = self.kwargs["pk"]
        task = self.get_queryset().get(pk=task_id)
        data = request.data

        if "status" in data.keys():
            task.status = data["status"]

        if "name" in data.keys():
            task.name = data["name"]

        if "start_date_time" in data.keys():
            task.start_date_time = data["start_date_time"]

        if "end_date_time" in data.keys():
            task.end_date_time = data["end_date_time"]

        if "memo" in data.keys():
            task.memo = data["memo"]

        if "order_no" in data.keys():
            task.order_no = data["order_no"]

        task.save()
        return HttpResponse(status=204)


task_list_create_api_view = TaskListCreateAPIView.as_view()
task_retrieve_update_destroy_view = TaskRetrieveUpdateDestroyAPIView.as_view()
