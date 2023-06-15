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
    """Handles the external API for horse racing"""
    
    def list(self, request):
        """List all the necessary information for horse racing"""
        """
        Laying out a plan, 
        it seems there are courses with prizes attached.
        What would be useful is extracting the following pieces of data:
        From Course -
        Course Name, Prize
        From Individual Horses in each Course -
        Horse Name, Trainer name
        
        Reasons:
        It would be useful for others to know the prizes,
        It will also be useful to know the horse name and the trainer.
        A trainer can help understand betters understand if that horse,
        is safe to bet on. I assume trainers are used to gauge safety of ,
        bet. 
        """
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
        
        horse_data = response.json()
        
        
        return Response(horse_data, status=status.HTTP_200_OK)