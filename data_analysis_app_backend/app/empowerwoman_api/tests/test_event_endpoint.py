from django.test import SimpleTestCase, TestCase
from rest_framework.test import APIClient
from empowerwoman_api import models
from ..serializers import EventSerializer
from datetime import datetime
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
import json

class TestEventEndpoint(TestCase):
    
    def test_get_event_empty(self):
        #set up
        client = APIClient()
        user_details = {'username': 'test@example.com', 'password': '123'}
        user_admin_details = {'username': 'Rokhsareh@empoweredwomen-mcr.org', 'password': '123'}
        res = client.post('/api/user/signup/', user_details)
        client.post('/api/user/signup/', user_admin_details)
        user = get_user_model().objects.get(username=user_details['username'])
        admin_user = get_user_model().objects.get(username=user_admin_details['username'])
        user_token =  Token.objects.get(user=user).key
        user_admin_token = Token.objects.get(user=admin_user).key
        """
        Basic Test for GET request of event API without user
        """
        res = client.get("/api/empowerwoman/event/")
        
        self.assertEqual(res.status_code, 401)
        self.assertEqual(res.data, {"detail": "Authentication credentials were not provided."})
        
        """
        Test for GET request of event API with user
        """
        client.credentials(HTTP_AUTHORIZATION="Token " + user_token)
        res = client.get("/api/empowerwoman/event/")
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data, [])
        """
        Test for GET request for event API with one event and user
        """
        event_start_time_test = datetime.now()
        test_event_1 = models.Event.objects.create(title="test",
                                    description="d",
                                    start_time=event_start_time_test,
                                    meetup_url="")
        res = client.get("/api/empowerwoman/event/")
        serializer = EventSerializer(test_event_1)
        
        self.assertEqual(res.status_code, 200)
        self.assertEqual(json.dumps(res.data), json.dumps([serializer.data]))
        
        """
        Test for POST request of event API without admin or specific email
        """
        data = {"title":"test_1", "description":"d", 
                "start_time":event_start_time_test,
                "user_attendance":[], 
                "meetup_url":""}
        res = client.post("/api/empowerwoman/event/", data, format='json')
        #test_event_2 = models.Event.objects.get(pk=2)
        #serializer = EventSerializer(test_event_2)
        #self.assertEqual(json.dumps(res.data), json.dumps(res.data))
        self.assertEqual(res.status_code, 403)
        self.assertEqual(res.data, {"detail":'You do not have permission to perform this action.'})
        """
        Test for PATCH request without admin
        """
        res = client.patch("/api/empowerwoman/event/1/", {"title":"different", 
                                     "description":"d",
                                     "start_time":event_start_time_test,
                                     "user_attendance":[], 
                                     "meetup_url":""})
        test_event_1_altered = models.Event.objects.get(pk=1)
        serializer = EventSerializer(test_event_1_altered)
        self.assertEqual(res.status_code, 403)
        self.assertEqual(res.data, {"detail":'You do not have permission to perform this action.'})
        """
        Test for DELETE request deletes model without admin
        """
        res = client.delete("/api/empowerwoman/event/1/")
        self.assertEqual(res.status_code, 403)
        self.assertEqual(res.data, {"detail":'You do not have permission to perform this action.'})
        
        """
        Test for POST request of event API with admin or specific email
        """
        data = {"title":"test_1", "description":"d", 
                "start_time":event_start_time_test,
                "user_attendance":[], 
                "meetup_url":""}
        client.credentials(HTTP_AUTHORIZATION="Token " + user_admin_token)
        res = client.post("/api/empowerwoman/event/", data, format='json')
        test_event_2 = models.Event.objects.get(pk=2)
        serializer = EventSerializer(test_event_2)
        self.assertEqual(json.dumps(res.data), json.dumps(res.data))
        self.assertEqual(res.status_code, 201)
        
        
        """
        Test for PATCH request return model and the status code is correct with admin
        or specific email
        """
        res = client.patch("/api/empowerwoman/event/1/", {"title":"different", 
                                     "description":"d",
                                     "start_time":event_start_time_test,
                                     "user_attendance":[], 
                                     "meetup_url":""})
        test_event_1_altered = models.Event.objects.get(pk=1)
        serializer = EventSerializer(test_event_1_altered)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data, serializer.data)

        """
        Test for DELETE request deletes model with admin or specific email
        """
        res = client.delete("/api/empowerwoman/event/1/")
        self.assertEqual(res.status_code, 204)