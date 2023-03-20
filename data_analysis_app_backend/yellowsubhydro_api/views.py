from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status

from yellowsubhydro_api import models

from yellowsubhydro_api.serializers import (
    FloodSeveritySerializer,
)


# Create your views here.

class FloodSeverityViewset(viewsets.ModelViewSet):
    """Handles creating,updating and deleting datapoints for Flood Severity model"""
    
    serializer_class = FloodSeveritySerializer
    queryset = models.FloodSeverityModel.objects.all()
    http_method_names = ['get', 'post',]
    
    def get_queryset(self):
        """To prevent errors regarding data sychronisation call this method."""
        return models.FloodSeverityModel.objects.all()
    
    def list(self,request):
        """Provides a list of datapoints for flood severity """
        #queryset is saved to prevent constant queries
        floodseverityModels =  self.get_queryset()
        # either the server does the parsing or the client not sure..
        # instinct is on server but I'll leave that later.
        # here's how the passing would work:
        # get all the unique values in the queryset.
        # loop over the unique values and in each iteration
        # grab all of the data for each unique value and order then according to id
        # id dictates the time of creation by default. 
        # then display it in the response

        serializer = self.serializer_class(floodseverityModels, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
    
