from django.urls import path
from . import views
from . import views_todo


app_name = "todo"
urlpatterns = [
    path("", views.app_index, name="app_index"),
    path("login", views.app_login, name="app_login"),
    path("logout", views.app_logout, name="app_logout"),
    path("register", views.app_user_register, name="app_user_register"),
    # アプリケーショントップページ
    path("top/", views_todo.app_top, name="app_top"),
    # プロジェクトに関するビュー
    path(
        "projects/register",
        views_todo.app_project_register,
        name="app_project_register",
    ),
]
