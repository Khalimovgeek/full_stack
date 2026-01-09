from django.urls import path

from .views import RegisterAPI, LoginAPI, ProfileAPI, AdminDashBoradAPI, UserDashboardAPI

urlpatterns = [
    path("api/v1/auth/register/", RegisterAPI.as_view()),
    path("api/v1/auth/login/", LoginAPI.as_view()),
    path("api/v1/profile/", ProfileAPI.as_view()),
    path("api/v1/admin/dashboard/", AdminDashBoradAPI.as_view()),
    path("api/v1/user/dashboard/", UserDashboardAPI.as_view()),

]
