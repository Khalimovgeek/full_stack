from django.urls import path
from .views import TaskListCreateAPI


urlpatterns =[
    path("api/v1/tasks/", TaskListCreateAPI.as_view()),
]


