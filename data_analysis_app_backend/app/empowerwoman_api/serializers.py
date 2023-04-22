from rest_framework import serializers

from empowerwoman_api import models

class EventSerializer(serializers.ModelSerializer):
    """Serializes Product Model"""
    
    class Meta:
        model = models.Event
        fields = ['id', 'title', 'description', 'start_time', 'user_attendance', 'meetup_url']