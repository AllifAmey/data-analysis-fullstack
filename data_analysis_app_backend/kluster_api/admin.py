from django.contrib import admin
from kluster_api import models

# Register your models here.
admin.site.register(models.DataSet)
admin.site.register(models.DataPoint)