from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
import os
import requests
import json
from requests.auth import HTTPBasicAuth

# Create your views here.

class HorseRacingViewSet(viewsets.ViewSet):
    
    def list(self, request):
        
        the_racing_api_user = os.environ.get('THE_RACING_API_USER')
        the_racing_api_pass = os.environ.get('THE_RACING_API_PASS')
        base_url = "https://api.theracingapi.com"
        horse_racing_endpoint = base_url + "/v1/racecards/free"
        params = {}
        response = requests.request(
            "GET",
            horse_racing_endpoint,
            auth=HTTPBasicAuth(
                the_racing_api_user,
                the_racing_api_pass),
            params=params)
        
        
        
        return Response(response.json(), status=status.HTTP_200_OK)