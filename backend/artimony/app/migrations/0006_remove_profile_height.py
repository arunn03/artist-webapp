# Generated by Django 5.0.4 on 2024-05-12 04:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_alter_profile_height'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='height',
        ),
    ]
