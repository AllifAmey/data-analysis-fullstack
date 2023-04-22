from django.test import SimpleTestCase, TestCase
from rest_framework.test import APIClient
from kluster_api import models
from ..serializers import DataPointSerializer

class TestDatapointEndpoint(TestCase):
    
    def test_datapoint(self):
        """
        Basic Test for GET request of datapoints API
        """
        client = APIClient()
        models.DataSet.objects.create()
        models.DataSet.objects.create()
        res = self.client.get("/api/datapoint/")
        
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data, {"dataset_1": [], "dataset_2": []})
        
        """
        Test for GET request of datapoints API with 2 datasets and 1 datapoint each.
        """
        models.DataPoint.objects.create(dataset_id=1, data=1)
        models.DataPoint.objects.create(dataset_id=2, data=2)
        datasets =  models.DataPoint.objects.select_related('dataset')
        dataset_1_datapoints = datasets.get(data=1, dataset_id=1)
        dataset_2_datapoints = datasets.get(data=2, dataset_id=2)
        
        res = client.get("/api/datapoint/")
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data, {"dataset_1": [{"id": 1,"dataset": 1,"data": 1}], "dataset_2": [{"id": 2,"dataset": 2,"data": 2}]})
        """
        Basic test for POST request of datapoints API
        """
        data = {'dataset':  1,'data': 2}
        res = client.post("/api/datapoint/", data, format='json')
        self.assertEqual(res.data, {'id': 3, 'dataset': 1, 'data': 2})
        self.assertEqual(res.status_code, 201)
        
        """
        Test for POST request creates model and the get request returns correctly.
        """
        res = client.post("/api/datapoint/", {"dataset": 1,"data": 2})
        self.assertEqual(res.status_code, 201)
        datasets =  models.DataPoint.objects.select_related('dataset')
        dataset_1_datapoints = datasets.filter(dataset__id__exact=1)
        dataset_2_datapoints = datasets.filter(dataset__id__exact=2)
        serializer_dataset_1 = DataPointSerializer(dataset_1_datapoints, many=True)
        serializer_dataset_2 = DataPointSerializer(dataset_2_datapoints, many=True)
        res = client.get("/api/datapoint/")
        self.assertEqual(res.data, {"dataset_1": serializer_dataset_1.data, "dataset_2": serializer_dataset_2.data})
        """
        Test for PATCH request return model and the status code is correct. 
        """
        res = client.post("/api/datapoint/", {"dataset": 1,"data": 2})
        self.assertEqual(res.status_code, 201)
        res = client.patch("/api/datapoint/1/", {"dataset": 1,"data": 2000000})
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data, {"id": 1,"dataset": 1,"data": 2000000})
        """
        Test for DELETE request deletes model
        """
        res = client.delete("/api/datapoint/1/")
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data, {'Message': 'Datapoint delete successfully'})
    
        