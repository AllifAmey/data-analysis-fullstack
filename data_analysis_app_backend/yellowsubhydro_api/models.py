from django.db import models
from django.conf import settings
from datetime import datetime

# Create your models here.

class FloodSeverityModel(models.Model):
    """Tracks the flood severity level"""
    
    # I will first attempt to use ids instead of creation_date to order the models.
    # If that doesn't work creation date will be used as a more reliable way. 
    now = datetime.now()
    dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
    county = models.TextField()
    flood_severity_lvl = models.IntegerField()
    creation_date = models.CharField(max_length=255, default=dt_string)

    def __str__(self):
            """Return the model as a string"""
            return f'{self.county} flood level is {self.flood_severity_lvl} at {self.creation_date}'