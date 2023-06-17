from rest_framework import viewsets
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status

from kluster_api.serializers import (
    DataPointSerializer,
    RandomDataPointSerializer,
)
from kluster_api import models


# analysis tools.
import random
import statistics


# Create your views here.

class DataPointViewset(viewsets.ModelViewSet):
    """Handles creating,updating and deleting datapoints"""
    serializer_class = DataPointSerializer
    queryset = models.DataPoint.objects.all()
    http_method_names = ['get', 'post', 'patch', 'delete']

    def list(self, request):
        """Provides a list of datapoints for dataset 1 and 2"""
        # datasets grabs the datapoints models
        # I do not think the subsequent filtering hits the database.
        datasets = models.DataPoint.objects.select_related('dataset')
        dataset_1_datapoints = datasets.filter(dataset__id__exact=1)
        dataset_2_datapoints = datasets.filter(dataset__id__exact=2)
        serializer_dataset_1 = self.serializer_class(
            dataset_1_datapoints, many=True)
        serializer_dataset_2 = self.serializer_class(
            dataset_2_datapoints, many=True)
        return Response({"dataset_1": serializer_dataset_1.data,
                        "dataset_2": serializer_dataset_2.data},
                        status=status.HTTP_200_OK)

    def destroy(self, request, pk):
        """Handles deleting datapoints"""

        try:
            datapoint = models.DataPoint.objects.\
                select_related('dataset').get(id=pk)
            datapoint.delete()
            return Response({"Message": "Datapoint delete successfully"})
        except Exception:
            return Response({"Message": "Incorrect id"})


class RandomDataPointAPIView(generics.CreateAPIView):
    """Allow the flexible use of datapoints"""
    serializer_class = RandomDataPointSerializer
    queryset = models.DataPoint.objects.all()

    def create(self, request):
        """Allows bulk delete, delete 5 and add 5 datapoints"""
        action_type = request.data.get("action_type")
        dataset_id = request.data.get("dataset_id")
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            if action_type == "add_5":
                # creates 5 models with random numbers between 0, 100
                created_datapoints_data = []
                dataset = models.DataSet.objects\
                    .select_related(None).get(pk=dataset_id)

                for _ in range(5):
                    random_num = random.randint(0, 100)
                    models.DataPoint.objects.create(
                        dataset=dataset, data=random_num)
                    created_datapoints_data.append(random_num)
                return Response(
                    {"Message": f'Datapoints created:\
                     {created_datapoints_data}'},
                    status=status.HTTP_200_OK)

            elif action_type == "delete_5":
                # deletes 5 random models from datapoints
                dataset_data = models.DataPoint.objects.\
                    select_related('dataset')
                data = dataset_data.filter(dataset__id__exact=dataset_id).\
                    values_list('id', flat=True)
                len_data = data.count()

                if len_data < 5:
                    return Response(
                        {"Message": f"Can't delete\
                            5 datapoints as there are {len_data} datapoints"},
                        status=status.HTTP_400_BAD_REQUEST)
                else:
                    random_datapoint_ids = random.sample(list(data), 5)
                    random_datapoints = dataset_data.filter(
                        pk__in=random_datapoint_ids)
                    random_datapoints.delete()
                    return Response(
                        {"Message":
                            f"Datapoints with ids\
                                {random_datapoint_ids} have been deleted"},
                        status=status.HTTP_200_OK)
            elif action_type == "bulk_delete":
                delete_datapoints = models.DataPoint.objects.\
                    select_related('dataset').\
                    filter(dataset__id__exact=dataset_id)
                delete_datapoints.delete()
                return Response(
                    {"Message":
                        f"All datapoints for {dataset_id} have been deleted"},
                    status=status.HTTP_200_OK)
            else:
                return Response({"Message": "Success"})

        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST)


# maybe serialize this to ensure the data is in the correct format.
class KlusterAnalysisAPIView(generics.ListAPIView):
    """Handles data analysis and displaying all the data"""

    def get_serializer_class(self):
        return None

    def list(self, request):
        """Grabs the analysis and data for each dataset 1 or 2"""
        # for batches use prefetch_related
        datasets = models.DataPoint.objects.select_related('dataset')
        dataset_1_datapoints = set()
        dataset_2_datapoints = set()

        for datapoint in datasets:
            if datapoint.dataset.id == 1:
                dataset_1_datapoints.add(datapoint.data)
            elif datapoint.dataset.id == 2:
                dataset_2_datapoints.add(datapoint.data)
        if len(dataset_1_datapoints) == 0:
            dataset_1_datapoints.add(0)
        if len(dataset_2_datapoints) == 0:
            dataset_2_datapoints.add(0)

        dataset_1_avg = statistics.mean(dataset_1_datapoints)
        dataset_2_avg = statistics.mean(dataset_2_datapoints)
        dataset_1_median = statistics.median(dataset_1_datapoints)
        dataset_2_median = statistics.median(dataset_2_datapoints)
        dataset_1_mode = statistics.mode(dataset_1_datapoints)
        dataset_2_mode = statistics.mode(dataset_2_datapoints)

        rsp = {"dataset_1_data": dataset_1_datapoints,
               "dataset_2_data": dataset_2_datapoints,
               "dataset_1_analysis": [
                   dataset_1_avg,
                   dataset_1_median,
                   dataset_1_mode],
               "dataset_2_analysis": [
                   dataset_2_avg,
                   dataset_2_median,
                   dataset_2_mode]}

        return Response({"data": rsp},  status=status.HTTP_200_OK)
