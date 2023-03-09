from django.test import SimpleTestCase, TestCase
from rest_framework.test import APIClient
from kluster_api import models
from ..serializers import DataPointSerializer

class TestGetViews(TestCase):
    
    def test_get_datapoints_empty(self):
        """
        Basic Test for GET request of datapoints API
        """
        client = APIClient()
        res = client.get("/api/datapoint/")
        
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data, {"dataset_1": [], "dataset_2": []})
        
    def test_get_datapoints_full(self):
        """
        Test for GET request of datapoints API
        """
        client = APIClient()
        dataset_1 = models.DataSet.objects.create()
        dataset_2 = models.DataSet.objects.create()
        models.DataPoint.objects.create(dataset=dataset_1, data=1)
        models.DataPoint.objects.create(dataset=dataset_2, data=2)
        datasets =  models.DataPoint.objects.select_related('dataset')
        dataset_1_datapoints = datasets.filter(dataset__id__exact=1)
        dataset_2_datapoints = datasets.filter(dataset__id__exact=2)
        serializer_dataset_1 = DataPointSerializer(dataset_1_datapoints, many=True)
        serializer_dataset_2 = DataPointSerializer(dataset_2_datapoints, many=True)
        client.post("/api/datapoint/", {"dataset": 1,"data": 0})
        res = client.get("/api/datapoint/")
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data, {"dataset_1": serializer_dataset_1.data, "dataset_2": serializer_dataset_2.data})