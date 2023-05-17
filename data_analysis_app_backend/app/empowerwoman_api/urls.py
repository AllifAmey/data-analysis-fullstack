from django.urls import path, include
from empowerwoman_api import views


from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(
    "empowerwoman/event",
    views.EventViewset,
    basename='event-viewset')


urlpatterns = [
    path('', include(router.urls)),
]
