from rest_framework import generics
from rest_framework import permissions
from api.serializers import TaskSerializer
from todo.models import Task, Project, ProjectMember


class TaskListCreateAPIView(generics.ListCreateAPIView):
    """タスク作成及び取得ビューです"""

    serializer_class = TaskSerializer
    permission_classes = (permissions.IsAuthenticated,)

    # TODO: タスク作成時のエスケープ処理、バリデーションが必要
    # def post(self, request, *args, **kwargs):
    #     return self.create(request, *args, **kwargs)
    #
    # def get(self, request, *args, **kwargs):
    #     return self.list(request, *args, **kwargs)

    def get_queryset(self):
        """対象ユーザの権限があるタスクのみを取得する"""
        project_task_list = []

        project_id = self.kwargs["project_id"]

        # TODO: タスク一覧の取得とアクセス権限チェックが密結合になっているため、分割を検討する
        # タスクへのアクセス権限チェック：対象プロジェクトのオーナーかどうか
        project_owner_count = (
            Project.objects.select_related("owner_user").filter(id=project_id).count()
        )
        # 対象プロジェクトのメンバーかどうか
        project_member_list = (
            ProjectMember.objects.select_related("project")
            .filter(project__id=project_id, user=self.request.user)
            .count()
        )
        if project_owner_count + project_member_list > 0:
            project_task_list = Task.objects.filter(project__id=project_id)
        return project_task_list


task_list_create_api_view = TaskListCreateAPIView.as_view()
