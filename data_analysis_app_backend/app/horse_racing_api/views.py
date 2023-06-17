from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
import os
import requests

from requests.auth import HTTPBasicAuth


class HorseRacingViewSet(viewsets.ViewSet):
    """Handles the external API for horse racing"""

    def extract_horse_data(self, horse):
        """Grabs relevant horse data and returns it"""
        horse_name = horse['horse']
        trainer = horse['trainer']
        jockey_weight = horse['lbs']
        extracted_horse_data = {
                    "horse_name": horse_name,
                    "trainer": trainer,
                    "jockey_weight": f'{jockey_weight}'
                    }
        return extracted_horse_data

    def extract_racecard_data(self, racecard):
        """Grabs relevant racecard data and returns it"""
        race_name = racecard['race_name']
        race_prize = racecard['prize']\
            .translate({ord(i): "" for i in '£,'})
        horses = racecard['runners']
        parsed_horses = [
                self.extract_horse_data(horse)
                for horse in horses]
        racecard_data_parsed = {
            "race_name": race_name,
            "race_prize": race_prize,
            "runners": parsed_horses
        }
        return racecard_data_parsed

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

        racecard_data = response.json()

        # crap way optimising later
        """
        horse_data_parsed = []
        for race_card in horse_data['racecards']:
            race_name = race_card['race_name']
            race_prize = race_card['prize']\
                .translate({ord(i): "" for i in '£,'})
            horses = race_card['runners']
            parsed_horses = []
            for horse in horses:
                horse_name = horse['horse']
                trainer = horse['trainer']
                jockey_weight = horse['lbs']
                parsed_horses.append({
                    "horse_name": horse_name,
                    "trainer": trainer,
                    "jockey_weight": f'{jockey_weight}'
                    })
            horse_data_parsed.append(
                {
                    "race_name": race_name,
                    "race_prize": race_prize,
                    "runners": parsed_horses
                }
            )
        """
        # optimised way using list comprehension
        racecard_data_parsed = [
            self.extract_racecard_data(racecard)
            for racecard in racecard_data['racecards']]

        # potential loading to database:
        # Model Race
        # Field Race_name String 255 char
        # Field Race_prize Int
        # Field Runners Foreignkey Horse
        # Model Horse
        # Field horse_name String 255
        # Field jockey_weight Int
        # Field trainer String 255

        return Response(racecard_data_parsed, status=status.HTTP_200_OK)
