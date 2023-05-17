from django.db import models

# Create your models here.


class DataSet(models.Model):
    """Empty Dataset for Datapoint to attach to"""
    pass

    def __str__(self):
        """Return the model as a string"""
        return f'Dataset {self.id}'


class DataPoint(models.Model):
    """Datapoint containing a data (sale)"""

    dataset = models.ForeignKey(DataSet, on_delete=models.CASCADE)
    data = models.IntegerField()

    def __str__(self):
        """Return the model as a string"""
        return f'{self.dataset} with datapoint: {self.data}'
