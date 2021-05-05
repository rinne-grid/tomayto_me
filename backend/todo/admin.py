from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from . import models

admin.site.register(models.AppUser, UserAdmin)
admin.site.register(models.Project)
admin.site.register(models.ProjectMember)
admin.site.register(models.Task)
admin.site.register(models.TaskPomodoro)
admin.site.register(models.TaskMemberAssign)
admin.site.register(models.MstPomodoroSetting)
admin.site.register(models.MstUserPomodoroSetting)
