from django.db import models
from django.conf import settings

# Create your models here.

class DataSet(models.Model):
    
    pass

    def __str__(self):
            """Return the model as a string"""
            return f'Dataset {self.id}'

class DataPoint(models.Model):
    
    
    dataset = models.ForeignKey(DataSet, on_delete=models.CASCADE)
    data = models.IntegerField()
    
    def __str__(self):
        """Return the model as a string"""
        return f'{self.dataset} with datapoint: {self.data}'
    
