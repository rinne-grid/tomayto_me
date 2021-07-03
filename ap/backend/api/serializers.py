from rest_framework import serializers
from todo.models import Task, TaskPomodoro, MstUserPomodoroSetting


class TaskSerializer(serializers.ModelSerializer):
    """Taskモデル用のシリアライザクラス"""

    class Meta:
        model = Task
        fields = "__all__"


class TaskPomodoroSerializer(serializers.ModelSerializer):
    """TaskPomodoroモデル用のシリアライザクラス"""

    class Meta:
        model = TaskPomodoro
        fields = (
            "task",
            "time_minutes",
        )


class MstUserPomodoroSettingSerializer(serializers.ModelSerializer):
    """TaskUserPomodoroSettingモデル用のシリアライザクラス"""

    class Meta:
        model = MstUserPomodoroSetting
        fields = "__all__"
