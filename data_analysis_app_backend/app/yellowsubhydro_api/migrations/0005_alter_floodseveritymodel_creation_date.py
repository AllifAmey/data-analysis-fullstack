# Generated by Django 4.1.7 on 2023-03-22 14:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('yellowsubhydro_api', '0004_alter_floodseveritymodel_creation_date_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='floodseveritymodel',
            name='creation_date',
            field=models.CharField(default='', max_length=255),
        ),
    ]
