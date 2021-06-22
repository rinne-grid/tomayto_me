from django.contrib.auth.mixins import AccessMixin

from todo.models import Project
from todo.utils import has_user_access_project


class ProjectTaskAccessMixin(AccessMixin):
    """Projectのタスクへのアクセス権限を制御します"""

    def dispatch(self, request, *args, **kwargs):
        super().dispatch(request, *args, **kwargs)
        project_id = kwargs["project_id"]
        projects = Project.objects.filter(id=project_id, owner_user=request.user)
        has_access = has_user_access_project(request.user.id, project_id)
        # if len(projects) > 0:
        if has_access:
            return super().dispatch(request, *args, **kwargs)
        else:
            return self.handle_no_permission()
