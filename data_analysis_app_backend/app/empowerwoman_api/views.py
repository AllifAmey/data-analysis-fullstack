# settings.AUTH_USER_MODEL - best practice to refer to model. 

from django.shortcuts import render
from rest_framework import viewsets,  authentication

from empowerwoman_api import models
from empowerwoman_api.serializers import (
    EventSerializer,
)
from empowerwoman_api.permissions import (
    EventPermissions
)

class EventViewset(viewsets.ModelViewSet):
    """Handles creating,updating and deleting datapoints"""
    serializer_class = EventSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = (EventPermissions, )
    queryset = models.Event.objects.all()
    