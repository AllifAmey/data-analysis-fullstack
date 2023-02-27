from kluster_api import models
from rest_framework import serializers

class DataPointSerializer(serializers.ModelSerializer):
    """Serializes DataPoint Model"""
    
    class Meta:
        model = models.DataPoint
        fields = ['id', 'dataset', 'data']


