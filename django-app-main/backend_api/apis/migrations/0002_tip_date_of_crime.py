# Generated by Django 4.2.7 on 2023-12-08 17:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apis', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='tip',
            name='date_of_crime',
            field=models.DateTimeField(null=True),
        ),
    ]
