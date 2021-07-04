from django.urls import path
from . import views
from .views import task_pomodoro_create_api_view, task_pomodoro_list_api_view

app_name = "api"

urlpatterns = [
    # タスク取得・作成ビュー
    path(
        "projects/<int:project_id>/tasks/",
        views.task_list_create_api_view,
        name="task_list_create_api",
    ),
    # タスク取得・更新・削除ビュー
    path(
        "projects/<int:project_id>/tasks/<int:pk>/update/",
        views.task_retrieve_update_destroy_view,
        name="task_retrieve_update_destroy_view",
    ),
    # タスク一覧取得・更新ビュー
    path(
        "projects/<int:project_id>/tasks/<str:status>/update/",
        views.task_list_update_api_view,
        name="task_list_update_api_view",
    ),
    # タスクポモドーロ作成ビュー
    path(
        "projects/<int:project_id>/tasks/<int:task_id>/create_pomodoro/",
        task_pomodoro_create_api_view,
        name="task_pomodoro_create_api_view",
    ),
    # タスクポモドーロ一覧取得ビュー
    path(
        "projects/<int:project_id>/tasks/<int:task_id>/list_task_pomodoro/",
        task_pomodoro_list_api_view,
        name="task_pomodoro_list_api_view",
    ),
    # ユーザポモドーロ設定ビュー
    path(
        "user_pomodoro_setting/",
        views.mst_user_pomodoro_setting_list_api_view,
        name="mst_user_pomodoro_setting_list_api_view",
    ),
]
