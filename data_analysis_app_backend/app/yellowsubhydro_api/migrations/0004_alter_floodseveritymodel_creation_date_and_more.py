# Generated by Django 4.1.3 on 2023-03-20 16:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('yellowsubhydro_api', '0003_alter_floodseveritymodel_creation_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='floodseveritymodel',
            name='creation_date',
            field=models.CharField(default='20/03/2023 16:06:08', max_length=255),
        ),
        migrations.AlterField(
            model_name='floodseveritymodel',
            name='flood_severity_lvl',
            field=models.IntegerField(),
        ),
    ]