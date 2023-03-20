from django.test import SimpleTestCase, TestCase
from rest_framework.test import APIClient


class TestFloodEndpoint(TestCase):
    
    
    def test_list_flood_datapoint_basic(self):
        """
        Basic test for GET request of flood API.
        """
        client = APIClient()
        res = client.post("/api/flood/", [{"county": "Oxfordshire", "severity_lvl": 1}])
        res = client.get("/api/flood/")
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data, [{"county": "Oxfordshire", "severity_lvl": 1}])
    
    def test_post_flood_datapoint_basic(self):
        """
        Basic test for POST request of flood API.
        """
        client = APIClient()
        
        res = client.post("/api/flood/", [{"county": "Oxfordshire", "severity_lvl": 1}])
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data, {"county": "Oxfordshire", "severity_lvl": 1})
        
   