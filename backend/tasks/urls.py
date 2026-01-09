from django.urls import path
from .views import TaskListCreateAPI,TaskDeleteOrUpdateAPI


urlpatterns =[
    path("api/v1/tasks/", TaskListCreateAPI.as_view()),
    path("api/v1/tasks/<int:pk>/", TaskDeleteOrUpdateAPI.as_view()),

]


