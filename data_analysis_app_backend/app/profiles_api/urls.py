"""
Urls for the user API
"""
from django.urls import path, include
from profiles_api import views


from rest_framework.routers import DefaultRouter

router = DefaultRouter()

app_name = 'user'


urlpatterns = [
    path('', include(router.urls)),
    path('user/signup/', views.SignUpAPIView.as_view(), name='create'),
    path('user/login/', views.UserLoginApiView.as_view(), name="login"),
    path('user/EmpowerWoman/signup', views.SignUpEmpowerWomanAPIView.as_view(), name="Empowerwoman login"),
]