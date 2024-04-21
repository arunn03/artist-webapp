from django.db import models
from django.contrib.auth import get_user_model
from colorfield.fields import ColorField

User = get_user_model()

class Interest(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return 'user_{0}/{1}'.format(instance.profile.user.id, filename)

class GalleryItem(models.Model):
    profile = models.ForeignKey('Profile', on_delete=models.CASCADE, related_name='gallery')
    file = models.FileField(upload_to=user_directory_path)
    is_video = models.BooleanField(default=False)

    def __str__(self):
        return f"Media for {self.profile.user.email}"

    
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    skin_tone = ColorField()
    city = models.CharField(max_length=100)
    gender = models.CharField(max_length=10, choices=[('male', 'Male'), ('female', 'Female'), ('other', 'Other')])
    interests = models.ManyToManyField(Interest, blank=True)

    def __str__(self):
        return self.user.email
