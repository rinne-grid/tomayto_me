from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render, redirect, reverse
from django.views import View
from .forms_todo import ProjectForm
from .models import Project


class AppTopView(View, LoginRequiredMixin):
    def get(self, request, *args, **kwargs):
        super()
        project_form = ProjectForm()

        project_list = Project.objects.filter(owner_user=request.user)

        context = {
            "project_form": project_form,
            "project_list": project_list,
        }
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


# ログイン済ユーザトップ
app_top = AppTopView.as_view()
# プロジェクト作成
app_project_register = ProjectCreateView.as_view()
