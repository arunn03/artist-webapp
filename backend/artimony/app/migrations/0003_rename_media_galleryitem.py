# Generated by Django 5.0.4 on 2024-04-21 10:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_rename_userprofile_profile_media'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Media',
            new_name='GalleryItem',
        ),
    ]
