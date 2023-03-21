from yellowsubhydro_api import models
from rest_framework import serializers

class FloodSeveritySerializer(serializers.ModelSerializer):
    """Serializes FloodSeverity Model"""
    
    class Meta:
        model = models.FloodSeverityModel
        fields = ['id', 'county', 'flood_severity_lvl', 'creation_date']
