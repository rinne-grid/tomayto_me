from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import Q
from django.shortcuts import render, redirect, reverse
from django.views import View
from .forms_todo import ProjectForm
from .mixins import ProjectTaskAccessMixin
from .models import Project, ProjectMember
from .utils import AppSessionManager, get_user_projects


def set_common_context(request, context):
    project_list = get_user_projects(request.user.id)
    # project_list = Project.objects.filter(owner_user=request.user)
    context["project_list"] = project_list
    return context


class AppTopView(LoginRequiredMixin, View):
    def get(self, request, *args, **kwargs):
        super()
        project_form = ProjectForm()

        context = {
            "project_form": project_form,
        }
        set_common_context(request, context)
        return render(request, "todo/pages/top.html", context)


class ProjectCreateView(View, LoginRequiredMixin):
    def post(self, request, *args, **kwargs):
        super()
        project_form = ProjectForm(request.POST)
        if project_form.is_valid():
            print("project_form.is_valid")
            # project_form.owner_user = request.user
            project = project_form.save(commit=False)
            project.owner_user = request.user
            project.save()
        else:
            print(project_form)
            print("not project_form.is_valid")

        return redirect(reverse("todo:app_top"))


class ProjectTaskView(LoginRequiredMixin, ProjectTaskAccessMixin, View):
    def get(self, request, *args, **kwargs):
        context = {}
        context = set_common_context(request, context)
        project_id = kwargs["project_id"]
        current_project = Project.objects.get(id=project_id)
        context["current_project"] = current_project
        return render(request, "todo/pages/task/contents.html", context)


# ログイン済ユーザトップ
app_top = AppTopView.as_view()
# プロジェクト作成
app_project_register = ProjectCreateView.as_view()
# プロジェクトタスクページ
app_project_task = ProjectTaskView.as_view()
