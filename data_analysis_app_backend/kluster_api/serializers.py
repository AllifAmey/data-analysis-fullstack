from kluster_api import models
from rest_framework import serializers

class DataPointSerializer(serializers.ModelSerializer):
    """Serializes DataPoint Model"""
    
    class Meta:
        model = models.DataPoint
        fields = ['id', 'dataset', 'data']

class RandomDataPointSerializer(serializers.Serializer):
   """Your data serializer, define your fields here."""
   dataset_id = serializers.IntegerField()
   action_type = serializers.CharField()
   
   def validate(self, data):
        """
        Validates each field and raises appropate errors.
        """
        if not data["dataset_id"] in [1,2] :
            raise serializers.ValidationError("dataset_id must be 1 or 2")
        if not data["action_type"] in ["bulk_delete", "add_5", "delete_5"] :
            raise serializers.ValidationError("action_type must be 'add_5' or 'delete_5' or 'bulk_delete' ")
        return data
