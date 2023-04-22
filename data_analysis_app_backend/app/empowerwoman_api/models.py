from django.db import models
from django.conf import settings

# Create your models here.

class Event(models.Model):
    """Model for events"""
    
    title = models.CharField(max_length=255)
    description = models.TextField()
    start_time = models.DateTimeField()
    user_attendance = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True)
    # once the meetup api is setup this will be required.
    meetup_url = models.URLField(blank=True)

    def __str__(self):
            """Return the model as a string"""
            return f'Event called {self.title} starting at {self.start_time}'