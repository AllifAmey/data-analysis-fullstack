# Generated by Django 4.1.3 on 2023-03-20 15:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('yellowsubhydro_api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='floodseveritymodel',
            name='creation_date',
            field=models.DateField(default='20/03/2023 15:21:36'),
        ),
    ]