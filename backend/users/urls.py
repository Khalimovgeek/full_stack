from django.urls import path

from .views import RegisterAPI, LoginAPI, ProfileAPI

urlpatterns = [
    path("api/v1/auth/register/", RegisterAPI.as_view()),
    path("api/v1/auth/login/", LoginAPI.as_view()),
    path("api/v1/profile/", ProfileAPI.as_view()),
]
