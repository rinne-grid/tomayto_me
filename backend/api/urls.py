from django.urls import path
from . import views

app_name = "api"

urlpatterns = [
    path(
        "projects/<int:project_id>/tasks/",
        views.task_list_create_api_view,
        name="task_list_create_api",
    ),
    path(
        "projects/<int:project_id>/tasks/<int:pk>/update/",
        views.task_retrieve_update_destroy_view,
        name="task_retrieve_update_destroy_view",
    ),
    path(
        "projects/<int:project_id>/tasks/<str:status>/update/",
        views.task_list_update_api_view,
        name="task_list_update_api_view",
    ),
]
