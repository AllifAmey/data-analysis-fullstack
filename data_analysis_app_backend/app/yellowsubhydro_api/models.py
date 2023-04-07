from django.db import models
from django.conf import settings

# Create your models here.

class FloodSeverityModel(models.Model):
    """Tracks the flood severity level"""
    
    # TODO: change to datetime field or look into it
    floodAreaID = models.CharField(max_length=255)
    county = models.TextField()
    flood_severity_lvl = models.IntegerField()
    creation_date = models.CharField(max_length=255, default="")
    

    def __str__(self):
            """Return the model as a string"""
            return f'{self.county} flood level is {self.flood_severity_lvl} at {self.creation_date}'