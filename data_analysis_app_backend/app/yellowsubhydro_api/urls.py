from django.urls import path, include
from yellowsubhydro_api import views

from rest_framework.routers import DefaultRouter

app_name = 'yellowsubhydro_api'

router = DefaultRouter()
# as referance
router.register("flood",
                views.FloodSeverityViewset,
                basename='floodseverity-viewset')

urlpatterns = [
    path('', include(router.urls)),
]
