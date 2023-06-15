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
        # we're only interested in GB
        
        params = {
            "region_codes": [
                "gb"
            ]
            }
        response = requests.request(
            "GET",
            horse_racing_endpoint,
            auth=HTTPBasicAuth(
                the_racing_api_user,
                the_racing_api_pass),
            params=params)
        
        horse_data = response.json()
        
        #generator = ( item['racecards']['courses'] for item in horse_data )
        
        #for i in generator:
            #print(i)
        # crap way optimising later
        
        
        horse_data_parsed = []
        for race_card in horse_data['racecards']:
            race_name = race_card['race_name']
            race_prize = race_card['prize']
            horses = race_card['runners']
            parsed_horses = []
            for horse in horses:
                horse_name = horse['horse']
                trainer = horse['trainer']
                jockey_weight = horse['lbs']
                parsed_horses.append({
                    "horse_name": horse_name,
                    "trainer": trainer,
                    "jockey_weight": f'{jockey_weight}lb'
                    })
            horse_data_parsed.append(
                {
                    "race_name": race_name,
                    "race_prize": race_prize,
                    "runners": parsed_horses
                }
            )
        print(horse_data_parsed)
           
        # optimised way
        
        
        return Response(horse_data_parsed, status=status.HTTP_200_OK)