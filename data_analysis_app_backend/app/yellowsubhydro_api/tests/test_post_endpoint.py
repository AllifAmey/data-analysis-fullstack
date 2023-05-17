from django.test import TestCase
from rest_framework.test import APIClient
import json
from datetime import datetime
from yellowsubhydro_api import models


class TestFloodEndpoint(TestCase):
    """Test the flood endpoint"""

    def test_list_flood_datapoint_basic(self):
        """
        Basic test for GET request of flood API.
        """
        client = APIClient()
        models.FloodSeverityModel.objects.create(
            floodAreaID="",
            county="Oxfordshire",
            flood_severity_lvl=1)
        res = client.get("/api/flood/", format="json")
        self.assertEqual(res.status_code, 200)
        self.assertEqual(json.dumps(res.data), '[{"id": 1, '
                         '"floodAreaID": "", "county": '
                         '"Oxfordshire", "flood_severity_lvl": 1, '
                         '"creation_date": ""}]')

    def test_post_flood_datapoint_basic(self):
        """
        Basic test for POST request of flood API.
        """
        client = APIClient()
        data = [
            {
                "county": "Oxfordshire",
                "flood_severity_lvl": 1,
                "floodAreaID": "d2"
                }]
        res = client.post("/api/flood/",
                          data=json.dumps(data),
                          content_type='application/json')
        now = datetime.now()
        creation_date = now.strftime("%d/%m %H:%M")
        self.assertEqual(res.status_code, 201)
        self.assertEqual(res.data, [
            {
                "county": "Oxfordshire",
                "flood_severity_lvl": 1,
                "floodAreaID": "d2",
                "creation_date": creation_date
                }])
