from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from requests.auth import HTTPBasicAuth

import os
import requests

from horse_racing_api import serializers


class HorseRacingViewSet(viewsets.ViewSet):
    """Handles the external API for horse racing"""

    serializer_class = serializers.HorseRacingSerializer

    def extract_horse_data(self, horse):
        """Grabs relevant horse data and returns it"""
        horse_name = horse['horse']
        trainer = horse['trainer']
        # note should be made:
        # jockey weight is important for betters
        # lower the weight the better.
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
            .translate({ord(i): "" for i in ','})
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

    def call_racing_api_racecard(self, region_code="gb"):
        """Calls the racecard endpoint in the racing api"""
        the_racing_api_user = os.environ.get('THE_RACING_API_USER')
        the_racing_api_pass = os.environ.get('THE_RACING_API_PASS')
        base_url = "https://api.theracingapi.com"
        horse_racing_endpoint = base_url + "/v1/racecards/free"
        params = {
            "region_codes": [
                region_code
            ]}
        if region_code == "":
            params = {}
        response = requests.request(
            "GET",
            horse_racing_endpoint,
            auth=HTTPBasicAuth(
                the_racing_api_user,
                the_racing_api_pass),
            params=params)
        racecard_data = response.json()
        return racecard_data

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

        racecard_data = self.call_racing_api_racecard()

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

        all_racecard_data = self.call_racing_api_racecard("")
        available_regions = list(
            set(r['region'].lower() for r in all_racecard_data['racecards']))

        # potential loading to database:
        # Model Race
        # Field Race_name String 255 char
        # Field Race_prize Int
        # Field Runners Foreignkey Horse
        # Model Horse
        # Field horse_name String 255
        # Field jockey_weight Int
        # Field trainer String 255

        return Response(
            racecard_data_parsed+[available_regions],
            status=status.HTTP_200_OK)

    def create(self, request):
        """Post horse data dependant on request"""

        """
        Laying out plan:
        Post request accepts region code parameter,
        The params for requesting the horse data changes,
        to the region code in the parameter
        Then the data is parsed and returned.
        """
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            valid_region_code = serializer.validated_data.get('region_code')
            racecard_data = self.call_racing_api_racecard(valid_region_code)
            racecard_data_parsed = [
                {"region_code": valid_region_code,
                 **self.extract_racecard_data(racecard)}
                for racecard in racecard_data['racecards']]

            return Response(racecard_data_parsed,
                            status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)
