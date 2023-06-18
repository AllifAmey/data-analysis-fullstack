from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse

LIST_HORSE_RACE_URL = reverse("horse_racing_api:horseracing-viewset-list")


class HorseRacingTestProduct(TestCase):
    """Test the horse racing API"""

    def setUp(self):
        """Sets up the test client."""
        self.client = APIClient()

    def test_list_horseracing(self):
        """Test Horse data is listed"""
        res = self.client.get(LIST_HORSE_RACE_URL)
        data = res.data
        data_keys = dict.keys(data[0])
        # check if there are certain keys and no other ones.
        self.assertTrue("race_name" in data_keys)
        self.assertTrue("race_prize" in data_keys)
        self.assertTrue("runners" in data_keys)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
