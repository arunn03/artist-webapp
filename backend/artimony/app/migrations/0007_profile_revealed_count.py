# Generated by Django 5.0.4 on 2024-06-09 14:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0006_remove_profile_height'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='revealed_count',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
