from django.urls import path, include
from kluster_api import views


from rest_framework.routers import DefaultRouter



app_name = 'kluster_api'

router = DefaultRouter()
# as referance
router.register("datapoint", views.DataPointViewset, basename='datapoint-viewset')
# RandomDataPointAPIView



urlpatterns = [
    path('', include(router.urls)),
    path('datapoint/random', views.RandomDataPointAPIView.as_view(), name='random-datapoints'),
    path('datapoint/analysis', views.KlusterAnalysisAPIView.as_view(), name='analysis-datapoints'),
]