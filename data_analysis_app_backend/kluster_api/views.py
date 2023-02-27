from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from kluster_api.serializers import (
    DataPointSerializer
)
from kluster_api import models

from rest_framework import serializers

from drf_spectacular.utils import extend_schema, inline_serializer, PolymorphicProxySerializer

import random
import numpy
import statistics


# Create your views here.

class DataPointViewset(viewsets.ModelViewSet):
    serializer_class = DataPointSerializer
    queryset = models.DataPoint.objects.all()

class RandomDataPointAPIView(APIView):
    """Allow the flexible use of datapoints"""
    
    queryset = models.DataPoint.objects.all()
    
    @extend_schema(request=inline_serializer(name="Mass_delete",fields={
        "dataset_id": serializers.IntegerField(), 
        "action_type": serializers.CharField(), 
        }),responses={
            '2XX': inline_serializer(name='Success', fields={"message": serializers.CharField()})
        })
    def post(self,request):
        """Allows bulk delete, delete 5 and add 5 datapoints"""
        action_type = request.data.get("action_type")
        dataset_id = request.data.get("dataset_id")
        validation = ["bulk_delete", "add_5", "delete_5"]
        if action_type in validation and dataset_id in [1,2]:
            dataset = models.DataSet.objects.get(pk=dataset_id)
            if action_type == "add_5":
                
                created_datapoints_data = []
                
                for _ in range(5):
                    random_num = random.randint(0,100)
                    datapoint = models.DataPoint.objects.create(dataset=dataset, data=random_num)
                    created_datapoints_data.append(random_num)
                return Response({"Message": f'Datapoints created: {created_datapoints_data}'}, status=status.HTTP_200_OK)
                    
            elif action_type == "delete_5":
                
                data = models.DataPoint.objects.filter(dataset=dataset).values_list('id', flat=True)
                len_data = len(data)
                if len_data < 5:
                    return Response({"Message": f"Can't delete 5 datapoints as there are {len_data} datapoints"}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    random_datapoint_ids = random.sample(list(data),5)
                    random_datapoints = models.DataPoint.objects.filter(pk__in=random_datapoint_ids)
                    random_datapoints.delete()
                    return Response({"Message" : f"Datapoints with ids {random_datapoint_ids} have been deleted"}, status=status.HTTP_200_OK)
            elif action_type == "bulk_delete":
                data = self.queryset
                data.delete()
                return Response({"Message": f"All datapoints for {dataset_id} have been deleted"}, status=status.HTTP_200_OK)
            else:
                return Response({"Message": "Success"})

        else:
            return Response({"Message": "Error string is not valid"}, status=status.HTTP_400_BAD_REQUEST)
        
class KlusterAnalysisAPIView(APIView):
    """Handles data analysis and displaying all the data"""
    queryset = models.DataSet.objects.all()
    
    def get(self, request):
        dataset_1 = models.DataSet.objects.get(id=1)
        dataset_2 = models.DataSet.objects.get(id=2)
        dataset_1_datapoints = [datapoint.data for datapoint in models.DataPoint.objects.filter(dataset=dataset_1)]
        dataset_2_datapoints = [datapoint.data for datapoint in models.DataPoint.objects.filter(dataset=dataset_2)]
        dataset_1_avg = numpy.average(dataset_1_datapoints)
        dataset_2_avg = numpy.average(dataset_2_datapoints)
        dataset_1_median = numpy.median(dataset_1_datapoints)
        dataset_2_median = numpy.median(dataset_2_datapoints)
        dataset_1_mode = statistics.mode(dataset_1_datapoints)
        dataset_2_mode = statistics.mode(dataset_1_datapoints)
        
        rsp = {"dataset_1_data": dataset_1_datapoints,
               "dataset_2_data": dataset_2_datapoints,
               "dataset_1_analysis": [dataset_1_avg,dataset_1_median, dataset_1_mode], 
               "dataset_2_analysis":[dataset_2_avg,dataset_2_median, dataset_2_mode] }
        
        return Response({"data": rsp},  status=status.HTTP_200_OK)