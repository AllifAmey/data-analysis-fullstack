from django.urls import path, include
from horse_racing_api import views

from rest_framework.routers import DefaultRouter


app_name = 'horse_racing_api'

router = DefaultRouter()
# as referance
router.register(
    "horse-racing",
    views.HorseRacingViewSet, basename='horseracing-viewset')


urlpatterns = [
    path('', include(router.urls)),
]
