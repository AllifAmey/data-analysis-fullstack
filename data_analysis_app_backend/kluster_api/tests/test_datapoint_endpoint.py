from django.test import SimpleTestCase, TestCase
from rest_framework.test import APIClient
from kluster_api import models
from ..serializers import DataPointSerializer

class TestDatapointEndpoint(TestCase):
    
    def create_test_foundation(self):
        """
        Create foundation for testing datapoint endpoint
        """
        client = APIClient()
        dataset_1 = models.DataSet.objects.create()
        dataset_2 = models.DataSet.objects.create()
        return [client, dataset_1, dataset_2]
    
    def test_get_datapoints_empty(self):
        """
        Basic Test for GET request of datapoints API
        """
        client, *rest = self.create_test_foundation()
        res = client.get("/api/datapoint/")
        
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data, {"dataset_1": [], "dataset_2": []})
        
    def test_get_datapoints_full(self):
        """
        Test for GET request of datapoints API with 2 datasets and 1 datapoint each.
        """

        client, dataset_1, dataset_2 = self.create_test_foundation()
        models.DataPoint.objects.create(dataset=dataset_1, data=1)
        models.DataPoint.objects.create(dataset=dataset_2, data=2)
        datasets =  models.DataPoint.objects.select_related('dataset')
        dataset_1_datapoints = datasets.filter(dataset__id__exact=1)
        dataset_2_datapoints = datasets.filter(dataset__id__exact=2)
        serializer_dataset_1 = DataPointSerializer(dataset_1_datapoints, many=True)
        serializer_dataset_2 = DataPointSerializer(dataset_2_datapoints, many=True)
        
        res = client.get("/api/datapoint/")
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data, {"dataset_1": serializer_dataset_1.data, "dataset_2": serializer_dataset_2.data})
    
    
    def test_post_datapoints_basic(self):
        """
        Basic test for POST request of datapoints API
        """
        client, *rest = self.create_test_foundation()
        
        res = client.post("/api/datapoint/", {"dataset": 1,"data": 2})
        self.assertEqual(res.status_code, 201)
        self.assertEqual(res.data, {'id': 1, 'dataset': 1, 'data': 2})
        
    def test_post_datapoints_advance(self):
        """
        Test for POST request creates model and the get request returns correctly.
        """
        client, *rest = self.create_test_foundation()
        
        res = client.post("/api/datapoint/", {"dataset": 1,"data": 2})
        self.assertEqual(res.status_code, 201)
        datasets =  models.DataPoint.objects.select_related('dataset')
        dataset_1_datapoints = datasets.filter(dataset__id__exact=1)
        serializer_dataset_1 = DataPointSerializer(dataset_1_datapoints, many=True)
        res = client.get("/api/datapoint/")
        self.assertEqual(res.data, {"dataset_1": serializer_dataset_1.data, "dataset_2": []})
    