from django.test import SimpleTestCase, TestCase
from rest_framework.test import APIClient
import json
from yellowsubhydro_api import models



class TestFloodEndpoint(TestCase):
    
    
    def test_list_flood_datapoint_basic(self):
        """
        Basic test for GET request of flood API.
        """
        client = APIClient()
        models.FloodSeverityModel.objects.create(county="Oxfordshire", flood_severity_lvl=1)
        res = client.get("/api/flood/", format="json")
        self.assertEqual(res.status_code, 200)
        self.assertEqual(json.dumps(res.data), '[{"id": 1, "county": "Oxfordshire", "flood_severity_lvl": 1}]')
    
    def test_post_flood_datapoint_basic(self):
        """
        Basic test for POST request of flood API.
        """
        
        #TODO: Figure out what is going on with ths testing functionality
        # detail of the problem:
        # When I try to post data I get a "AttributeError: 'list' object has no attribute 'items'"
        # there is an error on code line 32 with client.post
        client = APIClient()
        
        res = client.post("/api/flood/", [{"county": "Oxfordshire", "severity_lvl": 1}])
        self.assertEqual(res.status_code, 201)
        self.assertEqual(res.data, {"county": "Oxfordshire", "severity_lvl": 1})