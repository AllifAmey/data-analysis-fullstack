from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework import serializers
from drf_spectacular.utils import extend_schema, inline_serializer, PolymorphicProxySerializer
from yellowsubhydro_api import models

from yellowsubhydro_api.serializers import (
    FloodSeveritySerializer,
)

from datetime import datetime


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
    
    @extend_schema(
    request=PolymorphicProxySerializer(
        component_name='flood_data',
        serializers=[
            inline_serializer(name="user_orders",fields={
                "county": serializers.CharField(), 
                "flood_severity_lvl": serializers.IntegerField(), 
        }),
        ],
        resource_type_field_name='type',
        many=True
    ),
    responses={
            '2XX': inline_serializer(name='Order_success', fields={"message": serializers.CharField()})
        }
    )
    def create(self, request):
        """Process the flood severity data and creates models"""
        
        now = datetime.now()
        # date format is different - feedback given to Alex ( he does this stuff so I take it seriously )
        # looks 23/03 10:52 
        creation_date = now.strftime("%d/%m %H:%M")
        
        processed_data = []
        
        for data in request.data:
            serializer = self.serializer_class(data=data)
            if serializer.is_valid():
                validated_data = serializer.validated_data
                validated_data['creation_date'] = creation_date
                serializer.create(serializer.validated_data)
                processed_data.append(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
        return Response(processed_data, status=status.HTTP_201_CREATED)
