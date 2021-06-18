from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

from . import consts
from . import utils


class AppUser(AbstractUser):
    """
    カスタムユーザモデル
    https://docs.djangoproject.com/ja/3.2/topics/auth/customizing/#using-a-custom-user-model-when-starting-a-project
    """

    pass


class Project(models.Model):
    """プロジェクト"""

    class Meta:
        verbose_name = verbose_name_plural = "プロジェクト"

    name = models.CharField(max_length=100, verbose_name="プロジェクト名")
    status = models.CharField(
        max_length=10, choices=consts.CHOICES_PROJECT_STATUS, verbose_name="ステータス"
    )
    explain = models.TextField(verbose_name="説明", blank=True, null=True)
    thumbnail = models.FileField(
        upload_to=utils.upload_to_info, verbose_name="サムネイル", blank=True, null=True
    )
    deadline = models.DateTimeField(verbose_name="締め切り", blank=True, null=True)
    # プロジェクトの所有者
    owner_user = models.ForeignKey(
        AppUser, on_delete=models.CASCADE, verbose_name="所有ユーザ"
    )

    def __str__(self):
        return f"{self.name}"


class ProjectMember(models.Model):
    """プロジェクトメンバー"""

    class Meta:
        verbose_name = verbose_name_plural = "プロジェクトメンバー"

    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, verbose_name="プロジェクト"
    )
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE, verbose_name="メンバーユーザ")
    join_date = models.DateField(verbose_name="参加日", blank=True, null=True)

    def __str__(self):
        return f"{self.project.name} {self.user.last_name} {self.user.first_name}"


class Task(models.Model):
    """タスク"""

    class Meta:
        verbose_name = verbose_name_plural = "タスク"

    name = models.CharField(max_length=100, verbose_name="タスク名")
    status = models.CharField(
        max_length=10, choices=consts.CHOICES_TASK_STATUS, verbose_name="ステータス"
    )
    start_date_time = models.DateTimeField(verbose_name="開始日時", blank=True, null=True)
    end_date_time = models.DateTimeField(verbose_name="終了日時", blank=True, null=True)
    memo = models.TextField(verbose_name="メモ", blank=True, null=True)

    project = models.ForeignKey(
        Project,
        verbose_name="プロジェクトタスク",
        on_delete=models.CASCADE,
    )

    order_no = models.IntegerField(verbose_name="順番", blank=True, null=True)

    def __str__(self):
        return f"{self.name}"


class TaskPomodoro(models.Model):
    """タスクのポモドーロ管理"""

    class Meta:
        verbose_name = verbose_name_plural = "タスクポモドーロ管理"

    id = models.BigAutoField(primary_key=True)
    task = models.ForeignKey(Task, on_delete=models.CASCADE, verbose_name="対象タスク")
    time_minutes = models.BigIntegerField(verbose_name="ポモドーロ時間")

    def __str__(self):
        return f"{self.task.name} {self.time_minutes}"


class TaskMemberAssign(models.Model):
    """タスクへのメンバーアサイン管理"""

    class Meta:
        verbose_name = verbose_name_plural = "タスクメンバーアサイン管理"

    id = models.BigAutoField(primary_key=True)
    pj_member = models.ForeignKey(
        ProjectMember, on_delete=models.CASCADE, verbose_name="プロジェクトメンバー"
    )
    task = models.ForeignKey(Task, on_delete=models.CASCADE, verbose_name="アサインタスク")

    def __str__(self):
        return f"{self.pj_member.user.last_name} {self.task.name}"


class MstPomodoroSetting(models.Model):
    """ポモドーロ設定マスタ"""

    class Meta:
        verbose_name = verbose_name_plural = "ポモドーロ設定マスタ"

    work_time = models.IntegerField(verbose_name="作業時間")
    short_break_time = models.IntegerField(verbose_name="短い休憩時間")
    long_break_time = models.IntegerField(verbose_name="長い休憩時間：時間")
    long_break_pomodoro = models.IntegerField(verbose_name="長い休憩時間：ポモドーロ")

    def __str__(self):
        return f"{self.work_time}"


class MstUserPomodoroSetting(MstPomodoroSetting):
    """ポモドーロユーザ設定マスタ"""

    class Meta:
        verbose_name = verbose_name_plural = "ポモドーロユーザ設定マスタ"

    user = models.ForeignKey(AppUser, on_delete=models.CASCADE, verbose_name="対象ユーザ")

    def __str__(self):
        return f"{self.user.last_name} {self.work_time}"
