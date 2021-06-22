from rest_framework import serializers
from todo.models import Task, TaskPomodoro


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
