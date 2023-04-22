from django.test import SimpleTestCase, TestCase
from rest_framework.test import APIClient
from empowerwoman_api import models
from ..serializers import EventSerializer
from datetime import datetime

class TestEventEndpoint(TestCase):
    
    def test_get_event_empty(self):
        """
        Basic Test for GET request of event API
        """
        
        client = APIClient()
        res = client.get("/api/empowerwoman/event/")
        
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data, [])
        
        """
        Test for GET request for event API with one event
        """
        event_start_time_test = datetime.now()
        models.Event.objects.create(title="test",
                                    description="",
                                    start_time=event_start_time_test,
                                    user_attendance="",
                                    meetup_url="")
        res = client.get("/api/empowerwoman/event/")
        
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data, [{"id":1,
                                     "title":"test", 
                                     "description":"",
                                     "start_time":event_start_time_test,
                                     "user_attendance":"", 
                                     "meetup_url":""}])
        
        """
        Basic test for POST request of event API
        """
        data = {"title":"test", "description":"", 
                "start_time":event_start_time_test,
                "user_attendance":"", 
                "meetup_url":""}
        res = client.post("/api/empowerwoman/event/", data, format='json')
        self.assertEqual(res.data, [{"id":2,
                                     "title":"test", 
                                     "description":"",
                                     "start_time":event_start_time_test,
                                     "user_attendance":"", 
                                     "meetup_url":""}])
        self.assertEqual(res.status_code, 201)
        
        """
        Test for PATCH request return model and the status code is correct. 
        """
        res = client.patch("/api/empowerwoman/event/1/", {"title":"different", 
                                     "description":"",
                                     "start_time":event_start_time_test,
                                     "user_attendance":"", 
                                     "meetup_url":""})
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data, {"id": 1,"title":"different", 
                                     "description":"",
                                     "start_time":event_start_time_test,
                                     "user_attendance":"", 
                                     "meetup_url":""})

        """
        Test for DELETE request deletes model
        """
        res = client.delete("/api/empowerwoman/event/1/")
        self.assertEqual(res.status_code, 200)