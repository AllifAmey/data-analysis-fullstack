from django.urls import path, include
from profiles_api import views


from rest_framework.routers import DefaultRouter

router = DefaultRouter()
# as referance
#router.register("book", views.BookViewSet, basename='book-viewset')


urlpatterns = [
    path('', include(router.urls)),
    path('user/signup/', views.SignUpAPIView.as_view(), name='create'),
    path('user/login/', views.UserLoginApiView.as_view(), name="login"),
]